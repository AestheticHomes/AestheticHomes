import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'

const tmpDir = path.join(process.cwd(), '.tmp')
fs.mkdirSync(tmpDir, { recursive: true })

const env = {
  ...process.env,
  TMPDIR: tmpDir,
  TMP: tmpDir,
  TEMP: tmpDir,
}

const nextBin = path.join(process.cwd(), 'node_modules', 'next', 'dist', 'bin', 'next')
const child = spawn(process.execPath, [nextBin, 'build'], {
  env,
  stdio: 'inherit',
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }
  process.exit(code ?? 1)
})

