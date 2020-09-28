/**
 * Compile components
 */
const fs = require("fs-extra");
const path = require("path");
const babel = require("@babel/core");
const vantCompiler = require("@vant/compiler");

const esDir = path.join(__dirname, "../es");
const libDir = path.join(__dirname, "../lib");
const srcDir = path.join(__dirname, "../src");
const babelConfig = {
  configFile: path.join(__dirname, "../babel.config.js")
};
const vueRegExp = /\.(vue)$/;
const scriptRegExp = /\.(js|ts|tsx)$/;
const isDir = dir => fs.lstatSync(dir).isDirectory();
const isCode = path => !/(demo|test|\.md)$/.test(path);
const isVue = path => vueRegExp.test(path);
const isScript = path => scriptRegExp.test(path);

function compile(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);

    // remove unnecessary files
    if (!isCode(file)) {
      return fs.removeSync(filePath);
    }

    // scan dir
    if (isDir(filePath)) {
      return compile(filePath);
    }

    // compile js or ts
    if (isVue(file)) {
      const content = fs.readFileSync(filePath, "utf8");
      const code = vantCompiler(content, { babel: babelConfig });
      fs.removeSync(filePath);
      // if (code.css){
      //   fs.outputFileSync(filePath.replace(vueRegExp, '.css'), code.css);
      // }
      fs.outputFileSync(filePath.replace(vueRegExp, ".js"), code.js);
    }
    if (isScript(file)) {
      const { code } = babel.transformFileSync(filePath, babelConfig);
      fs.removeSync(filePath);
      fs.outputFileSync(filePath.replace(scriptRegExp, ".js"), code);
    }
  });
}

// clear dir
fs.emptyDirSync(esDir);
fs.emptyDirSync(libDir);

// compile es dir
fs.copySync(srcDir, esDir);
compile(esDir);

// compile lib dir
process.env.BABEL_MODULE = "commonjs";
fs.copySync(srcDir, libDir);
compile(libDir);
