import { spawn } from 'node:child_process';

const npmCli = process.env.npm_execpath;

if (!npmCli) {
  throw new Error('Run this script through npm so it can locate the npm CLI.');
}

const children = ['backend', 'frontend'].map((directory) =>
  spawn(process.execPath, [npmCli, '--prefix', directory, 'run', 'dev'], {
    stdio: 'inherit',
  })
);

let stopping = false;

function stop(exitCode = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill();
  process.exitCode = exitCode;
}

for (const child of children) {
  child.on('exit', (code) => {
    if (code && !stopping) {
      console.error(`A development server exited with code ${code}.`);
      stop(code);
    }
  });
}

process.on('SIGINT', () => stop());
process.on('SIGTERM', () => stop());
