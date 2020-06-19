const sourceMap = require("source-map");
const SourceMapGenerator = sourceMap.SourceMapGenerator;
const fs = require("fs");

compile("index.org.js", "index.js");

function compile(srcFileName, outputFileName) {
  const publicDir = "public";
  const srcFilePath = `${publicDir}/${srcFileName}`;
  const outputFilePath = `${publicDir}/${outputFileName}`;
  const mapFileName = `${outputFileName}.map`;
  const mapFilePath = `${publicDir}/${mapFileName}`;

  const orgData = fs.readFileSync(srcFilePath, "utf-8");
  const gen = new SourceMapGenerator({ file: srcFileName });
  gen.setSourceContent(srcFilePath, orgData);

  let nextColumn = 0;
  const compiled = orgData
    .split("\n")
    .map((line, index) => {
      gen.addMapping({
        source: srcFilePath,
        original: { line: index + 1, column: 0 },
        generated: { line: 1, column: nextColumn },
      });
      nextColumn += line.length;
      return line;
    })
    .join("");

  fs.writeFileSync(
    outputFilePath,
    compiled + `\n//# sourceMappingURL=${mapFileName}`
  );
  fs.writeFileSync(mapFilePath, gen.toString());
}
