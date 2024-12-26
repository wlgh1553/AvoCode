import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./debugger/debugger.router.js";
dotenv.config();

const app = express();
app.use(cors({ origin: process.env.FE_ADDRESS }));

app.use(express.json());
app.use("/debugger", router);

const port = process.env.PORT;
app.listen(port, () => console.log(`listen to http://localhost:${port}`));
