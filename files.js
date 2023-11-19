import path from "path";
import fs from "fs/promises";
import { validateData } from "./helpers/validateData.js";
import { checkExtension } from "./helpers/checkExtension.js";

export const createFile = async (req, res, next) => {
  const { fileName, content } = req.body;
  const file = {
    fileName,
    content,
  };

  const checkedData = validateData(file);
  if (checkedData.error) {
    res.status(400).json({
      message: `Please specified ${checkedData.error.details[0].path[0]} parametr`,
    });
    return;
  }

  const { extension, result } = checkExtension(fileName);
  if (!result) {
    res.status(400).json({
      message: `Sorry, this APP doesn't support ${extension} extension`,
    });

    return;
  }

  const filePath = path.resolve("files", fileName);
  try {
    await fs.writeFile(filePath, content, "UTF-8");
    res.status(201).json({ message: "File succesfully created" });
  } catch (error) {
    res.status(500).json({
      message: `Server error`,
    });
    console.log(error);
  }
};

export const getFiles = async (req, res, next) => {
  const pathFolder = path.resolve("files");
  try {
    const files = await fs.readdir(pathFolder);
    if (!files.length) {
      res.status(404).json({ message: "Sorry, there is no files in that dir" });
      return;
    }
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getFileInfo = async (req, res, next) => {
  const { fileName } = req.params;
  const folderPath = path.resolve("files");
  try {
    const files = await fs.readdir(folderPath);
    if (!files.includes(fileName)) {
      res
        .status(404)
        .json({ message: `Sorry there is no file named ${fileName}` });
      return;
    }

    const pathToFile = path.resolve("files", fileName);

    const fileData = await fs.readFile(pathToFile, "utf-8");
    const createdAt = (await fs.stat(pathToFile)).birthtime.toString();
    const extName = path.extname(fileName);
    const file = path.basename(fileName, extName);
    res.status(200).json({ fileData, createdAt, extName, file });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
