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

  btn.mobile.onclick = () => {
    wrap.classList.remove('pc-mode')
    localStorage.setItem('mode', 'mobile')
    btn.pc.classList.remove('select')
    btn.mobile.classList.add('select')
    rotateIcon.classList.remove('rotate-icon-stop')
  }
  btn.pc.onclick = () => {
    wrap.classList.add('pc-mode')
    localStorage.setItem('mode', 'pc')
    btn.mobile.classList.remove('select')
    btn.pc.classList.add('select')
    rotateIcon.classList.add('rotate-icon-stop')
  }

  // Automatically switch mode of first view
  const mode: string | undefined = localStorage.getItem('mode')
  if (!mode) {
    localStorage.setItem('mode', 'mobile')
  } else {
    mode === 'mobile' ?
      btn.mobile.click()
      : btn.pc.click()
  }
}
