import * as path from 'path'
import * as fs from 'fs'

export default function rewriteIframeSrc(url: string): void {
  const targetUrlPath: string = path.join(__dirname, '../assets/target-url.js')
  let targetSetFile: string[] = fs.readFileSync(targetUrlPath)
  .toString()
  .split('\n')

  // rewrite
  targetSetFile[0] = `var targetUrl = '${ url }'`
  fs.writeFileSync(targetUrlPath, targetSetFile.join('\n'))
}
