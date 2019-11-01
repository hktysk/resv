import * as fs from 'fs'
import * as path from 'path'
import { switchDevices } from '../js/src/switch-devices'
import 'jest-localstorage-mock'

const html: string = fs.readFileSync(path.resolve(__dirname, '../index.html')).toString()

jest.dontMock('fs')

describe('switching between pc and mobile', () => {
  let wrap: HTMLElement
  let btn: {
    mobile: HTMLElement
    pc: HTMLElement
  }
  beforeEach(() => {
    document.documentElement.innerHTML = html
    wrap = document.getElementById('wrap')
    btn = {
      mobile: document.getElementById('mobile-mode'),
      pc: document.getElementById('pc-mode')
    }

    switchDevices()
  })
  afterEach(() => {
    jest.resetModules()
  })

  it('when clicked mobile-mode', () => {
    btn.pc.click()
    btn.mobile.click()
    expect(btn.mobile.classList.contains('select')).toBe(true)
    expect(wrap.classList.contains('pc-mode')).toBe(false)
    expect(localStorage.getItem('mode')).toBe('mobile')
  })

  it('when clicked pc-mode', () => {
    btn.mobile.click()
    btn.pc.click()
    expect(btn.pc.classList.contains('select')).toBe(true)
    expect(wrap.classList.contains('pc-mode')).toBe(true)
    expect(localStorage.getItem('mode')).toBe('pc')
  })
})

