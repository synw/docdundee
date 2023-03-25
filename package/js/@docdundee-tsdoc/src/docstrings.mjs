import { default as fs } from "fs";

function parseType(typ) {
  if (typ.kind == "reflection") {
    return null
  }
  else if (typ.kind == "intrinsic") {
    return typ.type
  } else if (typ.kind == "literal") {
    return typ.value
  } else if (typ.kind == "reference") {
    return typ.name
  } else if (typ.kind == "array") {
    //console.log("Array", JSON.stringify(typ, null, "  "))
    return `Array&lt;${parseType(typ.type)}&gt;`
  } else if (typ.kind == "union") {
    let buf = [];
    typ.types.forEach((t) => {
      buf.push(parseType(t))
    })
    return buf.join(" | ")
  }
  throw new Error(`Type ${JSON.stringify(typ, null, "  ")} unknown`)
}

function interfaceFuncdef(node) {
  const generatorTag = node.comment.blockTags.find((t) => t.name == "generator");
  if (generatorTag) {
    //console.log("Gen tag", generatorTag);
    return generatorTag.text
  }
  return "interface " + node.name
}

function grabExample(node, exec) {
  const ex = node.comment.blockTags.find((t) => t.name == "example");
  if (!ex) {
    return null
  }
  return {
    code: ex.text.replace("```ts\n", "").replace("\n```", ""),
    description: "",
    is_executable: exec,
  }
}

function parseInterface(node, exec_ex) {
  const ds = {
    funcdef: interfaceFuncdef(node),
    description: node?.comment?.description,
    params: {},
    raises: [],
    example: grabExample(node, exec_ex),
    returns: null,
  }
  for (const prop of node.properties) {
    const d = {
      description: prop?.comment?.description,
      type: parseType(prop.type),
      default: null,
    }
    ds.params[prop.name] = d;
  }
  return ds
  //console.log(JSON.stringify(ds, null, "  "))
}

function parseInterfaces(dir, options = { source: null, exec_ex: false }) {
  let fin;
  if (!options.source) {
    fin = process.cwd() + '/autodoc/api.json'
  } else {
    fin = options.source
  }
  const rawdata = fs.readFileSync(fin);
  const data = JSON.parse(rawdata);
  //console.log("Data", data)
  const ds = {};
  for (const it of data.interfaces) {
    ds[it.name] = parseInterface(it, options.exec_ex);
  }
  //console.log(JSON.stringify(ds, null, "  "))
  fs.writeFileSync(dir + "/docstrings.json", JSON.stringify(ds), { encoding: 'utf8', flag: 'w' })
  console.log("Writing", dir + "/docstrings.json", "docstrings")
}

export { parseInterfaces }