export function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return

  const navbarHeight = 90
  const y = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight

  window.scrollTo({ top: y, behavior: 'smooth' })
}