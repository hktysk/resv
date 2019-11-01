import * as fs from 'fs'
import * as path from 'path'
import { rotate } from '../js/src/rotate'

const html: string = fs.readFileSync(path.resolve(__dirname, '../index.html')).toString()

jest.dontMock('fs')

describe('when rotate-icon clicked', () => {
  let icon: HTMLElement
  beforeEach(() => {
    document.documentElement.innerHTML = html
    icon = document.getElementById('rotate-icon')
    rotate()
    icon.click()
  })
  afterEach(() => {
    jest.resetModules()
  })

  it('rotate-icon rotates sideways', () => {
    expect(icon.classList.contains('rotate-horizontal')).toBe(true)
  })

  it('all framge rotates sideways', () => {
    const wrap: HTMLElement = document.getElementById('wrap')
    expect(wrap.classList.contains('horizontal')).toBe(true)
  })

})

