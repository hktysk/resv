import * as program from 'commander'
import * as path from 'path'
import createSymLink from '../lib/create-sym-link'
import { watch, exts, port } from '../lib/options'
import rewriteIframeSrc from '../lib/rewrite-iframe-src'
import reload from '../lib/reload'

program
  .name('resv')
  .usage('<directory or url> [options]')
  .option('-w, --watch-dir [directory]', 'The directory to watch. Defaults the serving directory or file')
  .option('-e, --exts [extensions]', 'Extensions separated by commas or pipes. (default: html,css,sass,scss,js,jsx,tsx,vue,php,rb,go,py)')
  .option('-p, --port [port]', 'The port to bind to. Defaults to 8080 (default: "8080")')

program.on('--help', () => {
  console.log()
  console.log('For more information, see')
  console.log('https://github.com/hktysk/resv')
  console.log()
})

function main(argv: program.Command): void {
  let target: string = argv.args.length > 0 ? argv.args[0] : process.cwd()

  if (target.slice(0, 7) !== 'http://' && target.slice(0, 8) !== 'https://') {
    if (target.slice(0, 1) !== '/') {
      /* If 'target' is a relative path, change it to an absolute path */
      target = path.join(process.cwd(), target)
    }

    /*
      When the server is set up,
      only the files under resv/assets/ can be specified,
      so create the target directory as a symbolic link under resv/assets/
    */
    const created: boolean = createSymLink(target)
    if (created === false) return
  }

  const options: string[] = [
    ...watch(argv.watchDir, target),
    ...exts(argv.exts),
    ...port(argv.port)
  ]

  /* Rewrite target-url.js to set src path of iframe */
  rewriteIframeSrc(target.slice(0, 1) === '/' ? 'sym/index.html' : target)

  /* execute reload module */
  const watchPath: string = options[1]
  reload(watchPath, options)
}


main(program.parse(process.argv))
