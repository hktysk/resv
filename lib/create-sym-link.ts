import * as path from 'path'
import * as fs from 'fs'

export default function createSymLink(target: string): boolean {
  /* Check if 'index.html' exists in the directory */
  try {
    fs.statSync(path.join(target, 'index.html'))
  } catch(err) {
    console.log('file or directory does not exist.')
    console.log('please specify the directory that index.html is located or URL.')
    return false
  }

  /* Create symbolic link */
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

  return true
}
