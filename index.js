import yargs from "yargs";
import { createFile, getFileInfo, getFiles } from "./files.js";

function invokeAction({ action, fileName, content }) {
  switch (action) {
    case "create":
      createFile(fileName, content);
      break;

    case "get":
      getFiles();
      break;

    case "getInfo":
      getFileInfo(fileName);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

const { argv } = yargs(process.argv.slice(2));

invokeAction(argv);
