export function displayOriginalSize(): void {
  const btns: HTMLCollection = document.getElementsByClassName('original-size-icon')

  for (let i = 0; i < btns.length; i++) {
    const btn: HTMLElement = btns[i] as HTMLElement
    btn.onclick = () => {
      const item: HTMLElement = btn.parentNode.parentNode as HTMLElement
      const frameParent: HTMLElement = item.getElementsByClassName('frame-parent')[0] as HTMLElement
      const iframe: HTMLElement = item.getElementsByClassName('frame')[0] as HTMLElement
      if (frameParent.className.indexOf('original-size') > -1) {
        frameParent.style.transition = '0s'
        iframe.style.transition = '0s'
        frameParent.className = Array.from(frameParent.classList).slice(0, -1).join(' ')
        setTimeout(() => {
          frameParent.style.cssText = null
          iframe.style.cssText = null
        }, 100)
        return
      }
      frameParent.classList.add('original-size-' + frameParent.classList[1])
    }
  }
}
