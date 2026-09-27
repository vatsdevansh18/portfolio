import { useEffect, useState } from "react"
import { useSmoothScroll } from "@/components/providers/smooth-scroll-provider"
import { ScrollProgress } from "@/components/navigation/scroll-progress"
import { MobileMenu } from "@/components/navigation/mobile-menu"
import { ArrowUpRight } from "lucide-react"

export interface NavItem {
  id: string
  label: string
  index: string
  href: string
}

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "HOME", index: "00", href: "#home" },
  { id: "about", label: "ABOUT", index: "01", href: "#about" },
  { id: "work", label: "WORK", index: "02", href: "#work" },
  { id: "skills", label: "SKILLS", index: "03", href: "#skills" },
  { id: "football", label: "FOOTBALL", index: "04", href: "#football" },
  { id: "contact", label: "CONTACT", index: "05", href: "#contact" },
]

export function Navbar() {
  const { scrollTo, lockScroll } = useSmoothScroll()
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Scroll position detection: navbar appears smoothly when scrolling out of the desktop workstation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 140)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Active section detection via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id)
    const observers: IntersectionObserver[] = []

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px",
      threshold: 0,
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  // Manage body scroll locking when mobile menu opens/closes
  const handleToggleMobileMenu = (open: boolean) => {
    setIsMobileMenuOpen(open)
    lockScroll(open)
  }

  const handleNavigate = (href: string) => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
      lockScroll(false)
    }
    const targetId = href.replace("#", "")
    setActiveSection(targetId)
    setTimeout(() => {
      scrollTo(href, { offset: -68 })
      window.history.pushState(null, "", href)
    }, 20)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? "translate-y-0 opacity-100 h-14 bg-[#070707]/90 backdrop-blur-md border-hairline-b pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none h-14 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand & Tactical Status */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              handleNavigate("#home")
            }}
            className="group flex items-center gap-3 focus-visible:outline-none"
            aria-label="Devansh Vats — Home"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10b981] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10b981]"></span>
              </span>
              <span className="font-mono text-xs font-bold tracking-wider text-[#ededed] group-hover:text-white transition-colors">
                [DV]
              </span>
            </div>
            <div className="hidden sm:flex items-center border-hairline-l pl-3">
              <span className="text-xs font-semibold tracking-tight text-[#ededed]">
                DEVANSH VATS
              </span>
              <span className="ml-2 font-mono text-[10px] text-[#8c8c8c]">
                // ATHLETE & DEV
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id

              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigate(item.href)
                  }}
                  className={`group relative flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs tracking-wider transition-colors duration-200 ${
                    isActive
                      ? "text-[#ededed] font-semibold"
                      : "text-[#8c8c8c] hover:text-[#ededed]"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span
                    className={`text-[10px] transition-colors ${
                      isActive
                        ? "text-[#10b981]"
                        : "text-[#525252] group-hover:text-[#8c8c8c]"
                    }`}
                  >
                    {item.index}
                  </span>
                  <span>{item.label}</span>

                  {/* Active Indicator Line */}
                  {isActive && (
                    <span 
                      className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-[#10b981]"
                      aria-hidden="true"
                    />
                  )}
                </a>
              )
            })}
          </nav>

          {/* Right Action / Contact Teaser */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleNavigate("#contact")
              }}
              className="inline-flex items-center gap-1 rounded border border-white/10 bg-[#111111] px-3 py-1 font-mono text-[11px] text-[#ededed] hover:border-white/20 hover:text-white transition-colors"
            >
              <span>CONNECT</span>
              <ArrowUpRight className="h-3 w-3 text-[#10b981]" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => handleToggleMobileMenu(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded border border-white/10 bg-[#111111] text-[#ededed] md:hidden hover:border-white/20 hover:text-white transition-colors cursor-pointer"
          >
            <span
              className={`h-[1.5px] w-4 bg-current transition-transform duration-200 ${
                isMobileMenuOpen ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-4 bg-current transition-transform duration-200 ${
                isMobileMenuOpen ? "-translate-y-[3px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>

        {/* Global Hairline Scroll Progress Bar */}
        <ScrollProgress />
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => handleToggleMobileMenu(false)}
        navItems={NAV_ITEMS}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />
    </>
  )
}
