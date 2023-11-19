import express from "express";
import morgan from "morgan";
import { filesRouter } from "./filesRouter.js";

const app = express();
app.use(morgan("combined"));
app.use(express.json());
app.use("/files", filesRouter);
app.listen(3000, () => console.log("Listening on port 3000"));
