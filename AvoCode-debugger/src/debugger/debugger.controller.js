import {
    findBySessionId,
    saveFile,
    compileFile,
    debugFile,
    deleteBySessionId,
} from "./debugger.service.js";

export async function getDebugLogs(req, res) {
    try {
        const sessionId = req.params.uuid;
        const data = await findBySessionId(sessionId);
        res.status(200).json({
            message: "results searched successfully",
            data,
        });
    } catch (err) {
        if (err.statusCode)
            res.status(err.statusCode).json({ message: err.message });
        else {
            console.error("Error getting list", err);
            res.status(500).json({ message: "Error retrieving data" });
        }
    }
}

export async function uploadFile(req, res) {
    try {
        const fileName = saveFile(req.file);
        const executablePath = await compileFile(fileName);
        const sessionId = await debugFile(executablePath);
        res.status(200).json({
            message: "file uploaded successfully",
            session_id: sessionId,
        });
    } catch (err) {
        if (err.statusCode)
            res.status(err.statusCode).json({ message: err.message });
        else {
            console.error("Error getting list", err);
            res.status(500).json({ message: "Error retrieving data" });
        }
    }
}

export async function exitDebugging(req, res) {
    try {
        const { session_id } = req.body;
        await deleteBySessionId(session_id);
        res.status(200).json({ message: "Session deleted successfully" });
    } catch (err) {
        if (err.statusCode)
            res.status(err.statusCode).json({ message: err.message });
        else {
            console.error("Error getting list", err);
            res.status(500).json({ message: "Error removing data" });
        }
    }
}
