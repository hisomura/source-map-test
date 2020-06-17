const fs = require("fs");

compile("public/index.org.js", "public/index.js");

function compile(srcFileName, destFileName) {
  const orgData = fs.readFileSync(srcFileName, "utf-8");
  const compiled = orgData.split("\n").join(" ");
  fs.writeFileSync(destFileName, compiled);
}

