export function rotate(): void {
  const btn: HTMLElement = document.getElementById('rotate-icon')
  const wrap: HTMLElement = document.getElementById('wrap')
  btn.onclick = () => {
    wrap.classList.toggle('horizontal')
    btn.classList.toggle('rotate-horizontal')
  }
}

