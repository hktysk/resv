import * as program from 'commander'
import * as path from 'path'
import * as fs from 'fs'
import { spawn } from 'child_process'

program
  .name('resv')
  .usage('<directory or url> [options]')
  .option(
    '-w, --watch-dir [directory]',
    'The directory to watch. Defaults the serving directory or file'
  )
  .option(
    '-p, --port [port]',
    'The port to bind to. Defaults to 8080 (default: "8080")'
  )

program.on('--help', () => {
  console.log()
  console.log('For more information, see')
  console.log('https://github.com/hktysk/resv')
  console.log()
})

const argv = program.parse(process.argv)
const main = (): void => {
  const targets = argv.args
  let target: string = targets.length > 0 ? targets[0] : process.cwd()

  if (target.slice(0, 7) !== 'http://' && target.slice(0, 8) !== 'https://') {
    /*
      If it is not a URL,
      check for existence and adjust the path
    */
    if (target.slice(0, 1) !== '/') {
      /* If 'target' is a relative path, change it to an absolute path */
      target = path.join(process.cwd(), target)
    }

    /* Check if 'index.html' exists in the directory */
    try {
      fs.statSync(path.join(target, 'index.html'))
    } catch(err) {
      if (err.code !== 'ENOENT') return
      console.log('file or directory does not exist.')
      console.log('please specify the directory that index.html is located or URL.')
      return
    }

    /*
      When the server is set up,
      only the files under resv/assets/ can be specified,
      so create the target directory as a symbolic link under resv/assets/
    */
    const sym: string = path.join(__dirname, '../assets/sym')
    try {
      fs.lstatSync(sym).isSymbolicLink()
      fs.unlinkSync(sym)
      fs.symlinkSync(target, sym)
    } catch(err) {
      if (err.code === 'ENOENT') {
        fs.symlinkSync(target, sym)
      }
    }
  }


  let options: string[] = []

  /*
    watch directory option.
    If --watch-dir is not specified, watch target directory
  */
  options.push('--watch-dir')
  options.push(
    argv.watchDir ? path.join(process.cwd(), argv.watchDir) : target
  )

  if (argv.port) {
    const port: string = argv.port

    options.push('--port')
    options.push(port)
  }

  /*
    Rewrite target-url.js to set src path of iframe
  */
  const targetUrlPath: string = path.join(__dirname, '../assets/target-url.js')
  let targetSetFile: string[] = fs.readFileSync(targetUrlPath)
  .toString()
  .split('\n')

  const url = target.slice(0, 1) === '/' ? 'sym/index.html' : target
  targetSetFile[0] = `var targetUrl = '${ url }'`
  fs.writeFileSync(targetUrlPath, targetSetFile.join('\n'))

  /*
    Use the reload module to update the browser.
    more: https://www.npmjs.com/package/reload
  */
  let s = spawn(
    path.join(__dirname, '../node_modules/.bin/reload'),
    ['-b', '-d', path.join(__dirname, '../assets'), ...options]
  )

  s.stdout.setEncoding('utf8')
  s.stdout.on('data', data => {
    console.log(
      data.replace(path.join(__dirname, '../assets'), target)
    )
  })
  s.on('error', () => {
    process.exit(0)
  })
  s.on('exit', () => {
    process.exit(0)
  })
}


main()
