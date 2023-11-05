export const checkExtension = (fileName) => {
  const EXTENSIONS = ["txt", "css", "html", "json"];
  const includedDot = fileName.lastIndexOf(".");
  const extension = fileName.slice(includedDot + 1);
  const result = EXTENSIONS.includes(extension);
  return {
    extension,
    result,
  };
};
