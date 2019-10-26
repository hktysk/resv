import * as fs from 'fs'
import * as path from 'path'
import { displayOriginalSize } from '../js/src/display-original-size'

const html: string = fs.readFileSync(path.resolve(__dirname, '../index.html')).toString()

jest.dontMock('fs')

describe('display original size', () => {
  let icons: HTMLElement[]
  beforeEach(() => {
    document.documentElement.innerHTML = html
    displayOriginalSize()
    icons = Array.from(document.getElementsByClassName('original-size-icon')) as HTMLElement[]
    icons.forEach(v => v.click())
  })
  afterEach(() => {
    jest.resetModules()
  })

  it('display', () => {
    icons.forEach(v => {
      const item: HTMLElement = v.parentNode.parentNode as HTMLElement
      const frameParent: HTMLElement = item.getElementsByClassName('frame-parent')[0] as HTMLElement
      expect(frameParent.classList.contains('original-size-' + frameParent.classList[1])).toBe(true)
    })
  })

  it('shrink', () => {
    icons.forEach(v => {
      v.click()
      const item: HTMLElement = v.parentNode.parentNode as HTMLElement
      const frameParent: HTMLElement = item.getElementsByClassName('frame-parent')[0] as HTMLElement
      expect(frameParent.classList.contains('original-size-' + frameParent.classList[1])).toBe(false)
    })
  })
})

