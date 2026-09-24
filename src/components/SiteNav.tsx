import { useEffect, useState } from 'react'

const links = [
  { href: '#archive', label: 'The Archive' },
  { href: '#command', label: 'High Command' },
  { href: '#codex', label: 'The Codex' },
  { href: '#enlist', label: 'Enlistment' },
]

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? 'bg-void/90 backdrop-blur-sm border-b border-leather/60' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-3">
          <img
            src="/.netlify/images?url=/img/legion-crest.png&w=88&fm=webp"
            alt="XIII Legion crest"
            className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
          />
          <span className="font-display text-sm sm:text-base tracking-[0.25em] text-parchment uppercase">
            XIII Legion
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative font-display text-xs tracking-[0.2em] uppercase text-parchment-dim hover:text-brass transition-colors"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-brass transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle navigation"
          aria-expanded={open}
          className="md:hidden flex h-9 w-9 flex-col items-center justify-center gap-1.5"
        >
          <span className={`h-px w-6 bg-parchment transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-px w-6 bg-parchment transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`h-px w-6 bg-parchment transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {open && (
        <nav className="md:hidden flex flex-col gap-1 border-t border-leather/60 bg-void/95 px-5 py-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2.5 font-display text-sm tracking-[0.2em] uppercase text-parchment-dim hover:text-brass"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
