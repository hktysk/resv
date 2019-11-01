import * as path from 'path'

export function watch(watchDir: string | undefined, target: string): string[] {
  /*
    watch directory option.
    If --watch-dir is not specified, watch target directory
  */
  let watchPath: string = watchDir || target
  if (target.slice(0, 7) !== 'http://' && target.slice(0, 8) !== 'https://') {
    if (watchPath.slice(0, 1) !== '/') {
      watchPath = path.join(__dirname, watchPath)
    }
  }

  return ['--watch-dir', watchPath]
}

export function exts(extensinos: string | undefined): string[] {
  let exts: string[] = extensinos ? extensinos.split(/(\||,)/) : []
  const defaultExts: string[] = ['html', 'css', 'sass', 'scss', 'js', 'jsx', 'tsx', 'vue', 'php', 'rb', 'go', 'py']

  exts = Array.from(new Set([
    ...exts,
    ...defaultExts
  ]))

  return ['--exts', exts.join(',')]
}

export function port(port: string | undefined): string[] {
  return port ? ['--port', port] : []
}
