import * as path from 'path'
import * as fs from 'fs'
import { spawn } from 'child_process'

/*
  Use the reload module to update the browser.
  more: https://www.npmjs.com/package/reload
*/
export default function reload(watchPath: string, options: string[]): void {
  let reload: string
  const modulesPath: string = path.join(__dirname, '../node_modules')
  let opts = ['-b', '-d', path.join(__dirname, '../assets'), ...options]

  try {
    fs.statSync(modulesPath)
    reload = path.join(modulesPath, '.bin/reload')
  } catch(err) {
    if (err.code === 'ENOENT') {
      reload = 'npx'
      opts.unshift('reload')
    }
  }

  let s = spawn(reload, opts)

  s.stdout.setEncoding('utf8')
  s.stdout.on('data', data => {
    console.log(
      data
      .replace('monitoring dir', 'monitoring')
      .replace(path.join(__dirname, '../assets'), watchPath)
    )
  })
  s.on('error', () => process.exit(0))
  s.on('exit', () => process.exit(0))
}
