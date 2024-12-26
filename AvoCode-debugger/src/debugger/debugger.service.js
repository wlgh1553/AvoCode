import { v4 as uuidv4 } from "uuid";
import { find, insert, remove } from "./debugger.repository.js";
import {
    BREAK_POINT_EXCEPTION,
    COMPILATION_FAILED_EXCEPTION,
    INVALID_FILE_FORMAT_EXCEPTION,
} from "./debugger.exception.js";
import os from "os";
import fs from "fs";
import path from "path";
import { spawn, execSync } from "child_process";

export async function findBySessionId(sessionId) {
    return find(sessionId);
}

export async function deleteBySessionId(sessionId) {
    await remove(sessionId);
}

function validateFileFormat(file) {
    if (!file || !file.originalname.endsWith(".c"))
        throw INVALID_FILE_FORMAT_EXCEPTION();
}

export function saveFile(file) {
    validateFileFormat(file);
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "gdb-"));
    const filePath = path.join(tempDir, file.originalname);
    fs.renameSync(file.path, filePath);
    return filePath;
}

export function compileFile(fileName) {
    const executablePath = fileName.replace(".c", "");

    return new Promise((resolve, reject) => {
        const compile = spawn("gcc", ["-g", "-o", executablePath, fileName]);

        compile.on("close", (code) => {
            if (code !== 0) reject(COMPILATION_FAILED_EXCEPTION());
            else {
                console.log("File compiled successfully.");
                resolve(executablePath);
            }
        });
    });
}

export async function debugFile(executablePath) {
    const gdbProcess = spawn("gdb", [executablePath]);
    await initBreakPoints(executablePath, gdbProcess);
    const logs = await getDebugLogs(gdbProcess);
    gdbProcess.kill();
    const sessionId = uuidv4();
    for (const log of logs) await insert(sessionId, log);
    return sessionId;
}

function initBreakPoints(executable, gdbProcess) {
    try {
        return Promise.all(
            findUserFunctions(executable).map(
                (func) =>
                    new Promise((resolve) => {
                        gdbProcess.stdin.write(`b ${func}\n`);
                        registerOutputListener(gdbProcess, "Breakpoint").then(
                            resolve
                        );
                    })
            )
        );
    } catch (error) {
        throw BREAK_POINT_EXCEPTION();
    }
}

function findUserFunctions(executable) {
    const systemFunctions = ["_fini", "_init", "_start"]; // 시스템 함수 목록
    const tSymbolRegex = /\bT\b\s+(\w+)/; // 'T' 심볼을 가진 함수 이름 추출하는 정규식
    return execSync(`nm -g --defined-only ${executable}`)
        .toString()
        .split("\n")
        .filter((line) => tSymbolRegex.test(line))
        .map((line) => line.match(tSymbolRegex)[1])
        .filter((name) => !systemFunctions.includes(name));
}

function registerOutputListener(gdbProcess, breakString) {
    return new Promise((resolve) => {
        let outputs = "";
        const waitHandler = (data) => {
            const output = data.toString();
            outputs += output;
            if (output.includes(breakString)) {
                gdbProcess.stdout.off("data", waitHandler);
                resolve(outputs);
            }
        };
        gdbProcess.stdout.on("data", waitHandler);
    });
}

async function getDebugLogs(gdbProcess) {
    const logs = [];
    let processKilled = false;

    await writeCommand(gdbProcess, "run");

    while (!processKilled) {
        const outputBuffer = {};
        processKilled = await executeCommands(gdbProcess, outputBuffer);
        logs.push(outputBuffer);
    }

    return logs;
}

async function executeCommands(gdbProcess, outputBuffer) {
    const commands = {
        "info line": handleInfoLine,
        "info locals": handleInfoLocals,
        "info args": handleInfoArgs,
    };
    for (const command of Object.keys(commands)) {
        const handler = commands[command];
        const output = await writeCommand(gdbProcess, command);
        Object.assign(outputBuffer, handler(output));
    }

    const { args } = outputBuffer;
    if (args) {
        for (const arg of args) {
            const { name } = arg;
            const output = await writeCommand(gdbProcess, `p *${name}`);
            handleInfoValues(output, arg);
        }
    }

    const nextOutput = await writeCommand(gdbProcess, "next");
    return handleInfoNext(nextOutput);
}

function writeCommand(gdbProcess, command) {
    return new Promise((resolve) => {
        registerOutputListener(gdbProcess, "(gdb)").then(resolve);
        gdbProcess.stdin.write(`${command}\n`);
    });
}

function handleInfoLine(output) {
    const line = output.match(/Line (\d+) of/);
    return { line: line ? line[1] : null };
}

function handleInfoLocals(output) {
    const infoLocals = [...output.matchAll(/(\w+)\s*=\s*(.+)/g)];
    const locals = infoLocals.map((match) => ({
        name: match[1],
        value: match[2],
    }));
    return { locals: locals.length === 0 ? null : locals };
}

function handleInfoArgs(output) {
    const infoArgs = [...output.matchAll(/(\w+)\s*=\s*(0x[0-9a-fA-F]+)/g)];
    const args = infoArgs.map((match) => ({
        name: match[1],
    }));
    return { args: args.length === 0 ? null : args };
}

function handleInfoValues(output, currentArg) {
    const value = output.match(/=\s*(\w+)/);
    currentArg["value"] = value ? value[1] : null;
    return currentArg;
}

function handleInfoNext(output) {
    return output.includes("__libc_start_call_main");
}
