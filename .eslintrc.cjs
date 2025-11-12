/* eslint-env node */
module.exports = {
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".js", ".jsx"]
      },
      node: {
        extensions: [".js", ".jsx"]
      }
    }
  }
};
