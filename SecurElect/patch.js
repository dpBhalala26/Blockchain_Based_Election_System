const fs = require("fs");

const f1 =
  "node_modules/webpack/node_modules/enhanced-resolve/lib/Resolver.js";
const f1find = 'const idxQuery = identifier.indexOf("?");';
const f1replace = 'const idxQuery = String(identifier).indexOf("?");';
makeChange(f1, f1find, f1replace);

const f2 =
  "node_modules/webpack/node_modules/enhanced-resolve/lib/AliasPlugin.js";
const f2find = 'if (string.charCodeAt(index) !== searchString.charCodeAt(index))';
const f2replace = 'if (String(string).charCodeAt(index) !== String(searchString).charCodeAt(index))';
makeChange(f2, f2find, f2replace);

const f3 =
  "node_modules/webpack/node_modules/enhanced-resolve/lib/AliasFieldPlugin.js";
const f3find = 'const data2 = fieldData[innerRequest.replace(\/^\\\.\\\/\/, "")];';
const f3replace = 'const data2 = fieldData[String(innerRequest).replace(\/^\\\.\\\/\/, "")];';
makeChange(f3, f3find, f3replace);

const f4 = "node_modules/@angular-devkit/build-angular/src/webpack/configs/browser.js";
const f4find = 'node: false';
const f4replace = 'node: {crypto: true, stream: true}';
makeChange(f4, f4find, f4replace);

function makeChange(file, findTxt, replaceTxt) {
  const f = file;

  fs.readFile(f, "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(findTxt,replaceTxt);
    //console.log("result of patch" + result);

    fs.writeFile(f, result, "utf8", function (err) {
      if (err) return console.log(err);
    });
    console.log("Success: " + file);
  });
}
