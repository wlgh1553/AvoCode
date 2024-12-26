import { Router } from "express";
import multer from "multer";
import os from "os";
import {
    getDebugLogs,
    uploadFile,
    exitDebugging,
} from "./debugger.controller.js";

const router = Router();

router.get("/:uuid", getDebugLogs);

const upload = multer({ dest: os.tmpdir() });
router.post("/", upload.single("file"), uploadFile);

router.delete("/", exitDebugging);

export default router;
