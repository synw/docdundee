import { default as path } from "path";
import { default as fs } from "fs";


function _getMdRawFilename(name) {
  // remove extensions
  return name.split(".")[1];
}

function _getTitle(name) {
  // replace spaces
  let s = name.split("_").join(" ");
  // uppercase first letter
  s = s[0].toUpperCase() + s.slice(1);
  return s
}

function _readFilesInDir(dir) {
  const md = [];
  const dirs = [];
  let hasDocstrings = false;
  let hasExamples = false;
  let hasExtraMd = false;
  const name = dir.split("/").pop();
  let title = _getTitle(name);
  //console.log("DIR", dir)
  fs.readdirSync(dir).forEach((filename) => {
    // console.log(file);
    const filepath = path.join(dir, filename);
    const isDir = fs.statSync(filepath).isDirectory();
    //console.log(isDir, filename);
    if (isDir) {
      if (filename != "examples") {
        if (filename == "md") {
          hasExtraMd = true;
        } else {
          dirs.push({
            name: filename,
            title: _getTitle(filename),
          });
        }
      } else {
        hasExamples = true
      }
    } else {
      const isMarkdown = filename.endsWith(".md");
      if (isMarkdown) {
        const n = _getMdRawFilename(filename);
        md.push({
          name: n,
          title: _getTitle(n),
          filename: filename,
        })
      } else {
        if (filename == "docstrings.json") {
          hasDocstrings = true
        }
      }
    }
  });
  return { name, title, dirs, md, hasDocstrings, hasExamples, hasExtraMd }
}

function listDocstrings(dir) {
  const rawdata = fs.readFileSync(dir + '/docstrings.json');
  const data = JSON.parse(rawdata);
  const dsnames = Object.keys(data)
  const ds = [];
  dsnames.forEach((d) => {
    ds.push({
      name: d,
      title: _getTitle(d)
    });
    // check examples
  });
  return ds
}

function saveIndex(dirpath, data) {
  const filename = dirpath + "/index.json";
  fs.writeFileSync(filename, data);
  console.log("Saved", filename)
}

function _parseExample(ex) {
  const isExecutable = ex.startsWith("# exec");
  let code = ex;
  if (isExecutable) {
    code = ex.replace("# exec\n", "")
  }
  return {
    isExecutable,
    code
  }
}

function updateDocstringsWithExtraMd(dirpath) {
  let md = [];
  fs.readdirSync(dirpath + "/md").forEach((filename) => {
    const rawcode = fs.readFileSync(dirpath + "/md/" + filename, "utf-8");
    md.push({
      name: filename.split(".").slice(-2)[0],
      content: rawcode,
    });
  });
  // open docstrings file and update with the extra markdown
  const data = fs.readFileSync(dirpath + "/docstrings.json");
  const ds = JSON.parse(data);
  //console.log("DS", ds)
  for (const _md of md) {
    //console.log("e", ex.name, ds[ex.name]);
    ds[_md.name]["extra_md"] = _md.content
  }
  fs.writeFileSync(dirpath + "/docstrings.json", JSON.stringify(ds, null, "  "))
  console.log("Updated", dirpath + "/docstrings.json", "with extra markdown")
}

function updateDocstringsWithExtraExamples(dirpath) {
  const examples = [];
  fs.readdirSync(dirpath + "/examples").forEach((filename) => {
    const rawcode = fs.readFileSync(dirpath + "/examples/" + filename, "utf-8");
    const { isExecutable, code } = _parseExample(rawcode);
    examples.push({
      name: filename.split(".").slice(-2)[0],
      code: code,
      isExecutable: isExecutable,
    });
  });
  // open docstrings file and update with the examples
  const data = fs.readFileSync(dirpath + "/docstrings.json");
  const ds = JSON.parse(data);
  //console.log("DS", ds)
  for (const ex of examples) {
    //console.log("e", ex.name, ds[ex.name]);
    ds[ex.name]["extra_examples"] = [{
      code: ex.code,
      is_executable: ex.isExecutable
    }];
  }
  fs.writeFileSync(dirpath + "/docstrings.json", JSON.stringify(ds, null, "  "))
  console.log("Updated", dirpath + "/docstrings.json", "with extra examples")
}

function parseDir(dirpath) {
  //console.log("Parsing dir", dir);
  let { name, title, dirs, md, hasDocstrings, hasExamples, hasExtraMd } = _readFilesInDir(dirpath);
  let data = {
    name: name,
    title: title,
    dirs: dirs,
    md: md,
    docstrings: []
  }
  if (hasDocstrings) {
    data.docstrings = listDocstrings(dirpath)
    // check extra examples
    if (hasExamples) {
      updateDocstringsWithExtraExamples(dirpath)
    }
    if (hasExtraMd) {
      updateDocstringsWithExtraMd(dirpath)
    }
  }
  //console.log("DATa", data)
  saveIndex(dirpath, JSON.stringify(data));
  for (const d of dirs) {
    parseDir(dirpath + "/" + d.name)
  }
}

export { parseDir }