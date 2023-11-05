import path from "path";
import fs from "fs/promises";
import { validateData } from "./helpers/validateData.js";
import { checkExtension } from "./helpers/checkExtension.js";

export const createFile = async (fileName, content) => {
  const file = {
    fileName,
    content,
  };

  const checkedData = validateData(file);
  //   console.log(checkedData);
  //   console.log(checkedData.error.details[0]);
  if (checkedData.error) {
    console.log(
      `Please specified ${checkedData.error.details[0].path[0]} parametr`
    );
    return;
  }

  const { extension, result } = checkExtension(fileName);
  if (!result) {
    console.log(`Sorry, this APP doesn't support ${extension} extension`);
    return;
  }

  const filePath = path.resolve("files", fileName);
  try {
    await fs.writeFile(filePath, content, "UTF-8");
    console.log("File was created succesfully 😊");
  } catch (error) {
    console.log(error);
  }
};
