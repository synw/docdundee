const { spawn } = require('child_process');

async function execute(
  command,
  args = [],
  {
    onStderr = (data) => { },
    onError = (data) => { },
  } = {
      onStderr: (data) => process.stderr.write(data),
      onError: (err) => { if (err) throw err },
    },
) {
  let buffer = "";
  let child = spawn(command, args, { shell: true });
  child.stdout.setEncoding('utf8');
  child.stdout.on('data', (data) => buffer += data);
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', (data) => onStderr(data));
  child.on("error", (data) => onError(data));
  let finish;
  let end = new Promise((r) => finish = r);
  child.on('close', () => finish(true));
  await end
  return buffer.split("\n")
}

module.exports = { execute }
