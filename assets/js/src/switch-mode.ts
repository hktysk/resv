export function switchDeviceMode(): void {
  const wrap: HTMLElement = document.getElementById('wrap')
  const rotateIcon: HTMLElement = document.getElementById('rotate-icon')
  const btn: {
    mobile: HTMLElement
    pc: HTMLElement
  } = {
    mobile: document.getElementById('mobile-mode'),
    pc: document.getElementById('pc-mode')
  }

  function switchMode(mode: 'pc' | 'mobile'): void {
    // init
    wrap.classList.remove('pc-mode')
    btn.mobile.classList.remove('select')
    btn.pc.classList.remove('select')
    rotateIcon.classList.remove('rotate-icon-stop')

    // set
    if (mode === 'pc') {
      wrap.classList.add('pc-mode')
      btn.pc.classList.add('select')
      rotateIcon.classList.add('rotate-icon-stop')
    } else {
      btn.pc.classList.add('select')
    }

    localStorage.setItem('mode', mode)
  }

  btn.mobile.onclick = () => switchMode('mobile')
  btn.pc.onclick = () => switchMode('pc')

  // Automatically switch mode of first view
  const mode: string | undefined = localStorage.getItem('mode')
  if (mode) {
    mode === 'mobile' ?
      btn.mobile.click()
      : btn.pc.click()
  } else {
    localStorage.setItem('mode', 'mobile')
  }
}
