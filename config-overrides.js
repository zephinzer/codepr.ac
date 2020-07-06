const { override, addBabelPlugins, disableEsLint } = require('customize-cra')

const autoImportPluginOptions = {
  "declarations": [
      { "default": "React", members: ["Component"], "path": "react" }
  ]
};


module.exports = override(
  ...addBabelPlugins([require("babel-plugin-auto-import"), autoImportPluginOptions]),
  disableEsLint(),
);
