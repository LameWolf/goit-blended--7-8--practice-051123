import express from "express";
import { createFile, getFileInfo, getFiles } from "./files.js";

const filesRouter = express.Router();

filesRouter.get("/", getFiles);
filesRouter.post("/", createFile);
filesRouter.get("/:fileName", getFileInfo);

export { filesRouter };
