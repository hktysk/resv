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
    '-e, --exts [extensions]',
    'Extensions separated by commas or pipes. Defaults to html,css,sass,scss,js,jsx,tsx,vue,php,rb,go,py'
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

function main(): void {
  const targets = argv.args
  let target: string = targets.length > 0 ? targets[0] : process.cwd()
  const isUrl: boolean = (
    target.slice(0, 7) === 'http://'
    || target.slice(0, 8) === 'https://'
  )

  if (isUrl === false) {
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
  let watchPath: string = argv.watchDir || target
  if (watchPath.slice(0, 1) !== '/' && isUrl === false) {
    watchPath = path.join(__dirname, watchPath)
  }

  options.push('--watch-dir')
  options.push(watchPath)

  let exts: string[] = argv.exts ? argv.exts.split(/(\||,)/) : []
  const defaultExts: string[] = [
    'html',
    'css',
    'sass',
    'scss',
    'js',
    'jsx',
    'tsx',
    'vue',
    'php',
    'rb',
    'go',
    'py'
  ]

  exts = Array.from(new Set([
    ...exts,
    ...defaultExts
  ]))

  options.push('--exts')
  options.push(exts.join(','))

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
  let reload: string
  const modulesPath: string = path.join(__dirname, '../node_modules')
  options = ['-b', '-d', path.join(__dirname, '../assets'), ...options]

  try {
    fs.statSync(modulesPath)
    reload = path.join(modulesPath, '.bin/reload')
  } catch(err) {
    if (err.code === 'ENOENT') {
      reload = 'npx'
      options.unshift('reload')
    }
  }

  let s = spawn(reload, options)

  s.stdout.setEncoding('utf8')
  s.stdout.on('data', data => {
    console.log(
      data
      .replace('monitoring dir', 'monitoring')
      .replace(path.join(__dirname, '../assets'), watchPath)
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
