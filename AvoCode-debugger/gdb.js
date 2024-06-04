const express = require("express");
const multer = require("multer");
const { spawn, execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");
const cors = require("cors");

const app = express();
const upload = multer({ dest: os.tmpdir() });
let fileName = ""; //.c포함

let gdbSessions = {};

class GDBSession {
    constructor(process) {
        this.process = process;
        this.stdoutOutput = [];
        this.terminated = false;
    }
}

app.use(cors()); // CORS 설정 추가
app.use(express.json());

app.post("/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    if (file && file.originalname.endsWith(".c")) {
        const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "gdb-"));
        const filePath = path.join(tempDir, file.originalname);
        fs.renameSync(file.path, filePath);
        fileName = filePath;
        const executablePath = filePath.slice(0, -2); // Remove .c extension for executable

        const compile = spawn("gcc", ["-g", "-o", executablePath, filePath]);

        compile.on("close", (code) => {
            if (code !== 0) {
                return res.status(400).json({ error: "Compilation failed" });
            }
            res.json({
                message: "File uploaded and compiled successfully.",
                executable: executablePath,
            });
        });
    } else {
        res.status(400).json({ error: "Invalid file format." });
    }
});

app.post("/start_debug", (req, res) => {
    const executable = req.body.executable;
    if (!executable) {
        return res.status(400).json({ error: "Missing executable." });
    }

    // 함수 목록을 가져와서 브레이크포인트 설정
    let functions = [];
    try {
        const nmOutput = execSync(
            `nm -g --defined-only ${executable}`
        ).toString();
        const lines = nmOutput.split("\n");
        lines.forEach((line) => {
            const match = line.match(/\bT\b\s+(\w+)/);
            if (match) {
                const functionName = match[1];
                // 시스템 함수 제외
                if (!["_init", "_fini", "_start"].includes(functionName)) {
                    functions.push(functionName);
                }
            }
        });
    } catch (error) {
        return res
            .status(500)
            .json({ error: "Failed to retrieve functions from executable." });
    }

    const gdbProcess = spawn("gdb", [executable]);

    const sessionId = String(Object.keys(gdbSessions).length + 1);
    gdbSessions[sessionId] = new GDBSession(gdbProcess);

    let initialized = false;
    let response = {};

    const handleInitData = (data) => {
        const output = data.toString();
        console.log(`Session ${sessionId}: ${output}`);
        gdbSessions[sessionId].stdoutOutput.push(output);

        if (!initialized && output.includes("(gdb)")) {
            functions.forEach((func) => {
                gdbProcess.stdin.write(`b ${func}\n`);
            });
            gdbProcess.stdin.write("run\n");
            initialized = true;
        }

        if (output.includes("Program exited with code")) {
            gdbSessions[sessionId].terminated = true;
        }

        if (initialized && output.includes("(gdb)")) {
            gdbProcess.stdout.off("data", handleInitData);
            // 여기서 추가적인 핸들러를 등록하여 실행 중의 출력을 계속 모니터링
            gdbProcess.stdout.on("data", handleRuntimeData);
            response = {
                ...response,
                message: "GDB session started.",
                session_id: sessionId,
            };
        }
    };

    //프로그램 실행 중 출력 모니터링
    const handleRuntimeData = async (data) => {
        const output = data.toString();
        console.log(`Runtime Output for Session ${sessionId}: ${output}`);
        const gdbSession = gdbSessions[sessionId];
        gdbSession.stdoutOutput.push(output);

        if (output.includes("Breakpoint") && output.includes("main")) {
            gdbProcess.stdout.off("data", handleRuntimeData);
            const code = output.trim("\n").split("\n")[1];
            const localsOutput = await executeGDBCommand(
                gdbSession.process,
                "info locals"
            );
            const argsOutput = await executeGDBCommand(
                gdbSession.process,
                "info args"
            );
            const variablesOutput = await executeGDBCommand(
                gdbSession.process,
                "info variables"
            );
            const locals = await parseVariables(
                gdbSession.process,
                localsOutput
            );
            const args = await parseVariables(gdbSession.process, argsOutput);
            const globals = await parseGlobals(
                gdbSession.process,
                variablesOutput
            );

            let lineNumber = "";
            const lineMatch = code.match(/^\d+(?=\t)/);
            if (lineMatch) {
                lineNumber = lineMatch[0];
            }
            res.json({
                ...response,
                data: {
                    output: code,
                },
                line: lineNumber,
                localsArray: locals,
                argsArray: args,
                globals,
            });
        }

        if (output.includes("Program exited with code")) {
            gdbSession.terminated = true;
            gdbProcess.stdout.off("data", handleRuntimeData);
            // 추가적인 정리 작업이나 클라이언트에게 종료 알림을 보낼 수 있습니다.
        }
    };

    gdbProcess.stdout.on("data", handleInitData);

    gdbProcess.on("close", () => {
        gdbSessions[sessionId].terminated = true;
    });
});

app.post("/debug", async (req, res) => {
    const sessionId = req.body.session_id;
    const gdbCommand = req.body.command;
    const globalNames = req.body.global_names;

    if (!sessionId || !gdbCommand) {
        return res
            .status(400)
            .json({ error: "Missing session_id or command." });
    }

    const gdbSession = gdbSessions[sessionId];
    if (!gdbSession) {
        return res.status(400).json({ error: "Invalid session_id." });
    }

    if (gdbSession.terminated) {
        return res.status(400).json({ error: "GDB session has terminated." });
    }

    gdbSession.process.stdin.write(gdbCommand + "\n");

    let output = "";
    const handleData = async (data) => {
        output += data.toString();
        if (output.includes("(gdb)")) {
            gdbSession.process.stdout.off("data", handleData);

            // 추가 명령 실행
            const localsOutput = await executeGDBCommand(
                gdbSession.process,
                "info locals"
            );
            const argsOutput = await executeGDBCommand(
                gdbSession.process,
                "info args"
            );
            const lineOutput = await executeGDBCommand(
                gdbSession.process,
                "info line"
            );
            const variablesOutput = [];
            for (const e of globalNames) {
                const result = await executeGDBCommand(
                    gdbSession.process,
                    `print ::${e}`
                );
                variablesOutput.push({
                    name: e,
                    value: result,
                });
            }

            const locals = await parseVariables(
                gdbSession.process,
                localsOutput
            );
            const args = await parseVariables(gdbSession.process, argsOutput);
            const globals = [];
            for (const e of variablesOutput) {
                const match = e.value.match(/=\s*(-?\d+(\.\d+)?)/);
                if (match) {
                    globals.push({
                        name: e.name,
                        value: match[1],
                    });
                }
            }

            let lineNumber = "";
            const lineMatch = lineOutput.match(/Line (\d+)/);
            if (lineMatch) {
                lineNumber = lineMatch[1];
            }

            if (output.includes("__libc_start_call_main")) {
                gdbSession.terminated = true;
                return res.json({
                    output,
                    status: "terminated",
                    localsArray: locals,
                    argsArray: args,
                    line: lineNumber,
                    globals,
                });
            } else if (gdbSession.terminated) {
                return res.status(400).json({
                    error: "GDB session has terminated.",
                    output,
                    line: lineNumber,
                    localsArray: locals,
                    argsArray: args,
                    globals,
                });
            } else {
                res.json({
                    output,
                    status: "running",
                    localsArray: locals,
                    argsArray: args,
                    line: lineNumber,
                    globals,
                });
            }
        }
    };

    gdbSession.process.stdout.on("data", handleData);
});

const executeGDBCommand = (process, command) => {
    return new Promise((resolve) => {
        let output = "";
        const handleCommandData = (data) => {
            output += data.toString();
            if (output.includes("(gdb)")) {
                process.stdout.off("data", handleCommandData);
                resolve(output);
            }
        };

        process.stdout.on("data", handleCommandData);
        process.stdin.write(command + "\n");
    });
};

const parseVariables = async (process, output) => {
    const lines = output.split("\n");
    const variables = [];
    for (const line of lines) {
        const match = line.match(/(\w+) = (.+)/);
        if (match) {
            const name = match[1];
            let value = match[2];

            // Check for array types and handle accordingly
            if (value.startsWith("{") || /\[/.test(value)) {
                value = await parseArray(process, name);
            }

            const addressOutput = await executeGDBCommand(
                process,
                `p &${name}`
            );
            const addressMatch = addressOutput.match(
                /\$\d+ = \((\w+ \*?)\) (0x[0-9a-fA-F]+)/
            );
            const address = addressMatch ? addressMatch[2] : "";
            variables.push({ name, value, address });
        }
    }
    return variables;
};

const parseArray = async (process, name) => {
    let arrayValues = "";
    try {
        const typeOutput = await executeGDBCommand(process, `whatis ${name}`);
        const typeMatch = typeOutput.match(/type = (.+)/);
        if (typeMatch) {
            const type = typeMatch[1];
            const elementOutput = await executeGDBCommand(
                process,
                `print ${name}`
            );
            const elementMatch = elementOutput.match(/\{(.+)\}/s);
            if (elementMatch) {
                arrayValues = elementMatch[1].split(",").map((v) => v.trim());

                // Handle char array separately for better readability
                if (type.includes("char")) {
                    arrayValues = arrayValues
                        .map((c) => c.replace(/\\0/g, "\\x00"))
                        .join("");
                } else {
                    arrayValues = arrayValues.join(", ");
                }
            }
        }
    } catch (error) {
        console.error(`Failed to parse array ${name}:`, error);
    }
    return `{ ${arrayValues} }`;
};
const parseGlobals = async (process, output) => {
    const globalVarRegex = new RegExp(
        `File ${fileName}:\\n([\\s\\S]*?)(?=\\nFile |\\nNon-debugging symbols:)`,
        "g"
    );
    const matches = output.match(globalVarRegex);

    if (matches) {
        const globalVariables = matches[0].split("\n").slice(1); // Skip the "File <fileName>:" line
        const variableNames = globalVariables
            .map((line) => {
                const match = line.match(/\b(\w+)\b\s*;/);
                return match ? match[1] : null;
            })
            .filter((name) => name !== null);

        const variables = [];
        for (const name of variableNames) {
            const valueOutput = await executeGDBCommand(process, `p ${name}`);
            const valueMatch = valueOutput.match(/\$[\d]+ = (\d+)/);
            const value = valueMatch ? valueMatch[1] : "";
            const addressOutput = await executeGDBCommand(
                process,
                `p &${name}`
            );
            const addressMatch = addressOutput.match(
                /\$\d+ = \((\w+ \*?)\) (0x[0-9a-fA-F]+)/
            );
            const address = addressMatch ? addressMatch[2] : "";
            variables.push({ name, value, address });
        }
        return variables;
    }

    return [];
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
