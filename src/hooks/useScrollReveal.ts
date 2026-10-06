import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    const root = document.documentElement
    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    root.classList.add('motion-ready')

    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealTargets.forEach((target) => target.classList.add('is-revealed'))
      return () => root.classList.remove('motion-ready')
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 })

    revealTargets.forEach((target) => observer.observe(target))

    return () => {
      observer.disconnect()
      root.classList.remove('motion-ready')
    }
  }, [])
}
