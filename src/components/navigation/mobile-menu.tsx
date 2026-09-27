import { useEffect, useRef } from "react"
import { X, ArrowUpRight } from "lucide-react"

interface NavItem {
  id: string
  label: string
  index: string
  href: string
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navItems: NavItem[]
  activeSection: string
  onNavigate: (href: string) => void
}

export function MobileMenu({
  isOpen,
  onClose,
  navItems,
  activeSection,
  onNavigate,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  // Escape key handler and focus management
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    // Focus first link on opening
    setTimeout(() => {
      firstLinkRef.current?.focus()
    }, 50)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={menuRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-[100] flex flex-col bg-[#070707] text-[#ededed] bg-tactical-grid md:hidden animate-in fade-in duration-200"
    >
      {/* Top Header inside Drawer */}
      <div className="flex h-16 items-center justify-between border-hairline-b px-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold tracking-wider text-[#ededed]">
            [DV]
          </span>
          <span className="font-mono text-[10px] text-[#8c8c8c] border-hairline-l pl-3">
            TACTICAL MENU
          </span>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="flex h-9 w-9 items-center justify-center rounded border border-white/10 bg-[#111111] text-[#ededed] hover:border-white/20 hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation Links with Tactical Indices */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[#8c8c8c] mb-6">
          // NAVIGATION INDEX
        </div>

        <nav className="flex flex-col space-y-4">
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.id

            return (
              <a
                key={item.id}
                ref={idx === 0 ? firstLinkRef : undefined}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(item.href)
                }}
                className={`group flex items-baseline justify-between border-hairline-b pb-4 transition-colors ${
                  isActive ? "text-[#ededed]" : "text-[#8c8c8c] hover:text-[#ededed]"
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs text-[#525252] group-hover:text-[#10b981] transition-colors">
                    {item.index}
                  </span>
                  <span className="text-3xl font-bold tracking-tight">
                    {item.label}
                  </span>
                </div>

                {isActive && (
                  <span className="inline-flex h-2 w-2 rounded-full bg-[#10b981]" />
                )}
              </a>
            )
          })}
        </nav>
      </div>

      {/* Drawer Footer Metadata */}
      <div className="border-hairline-t bg-[#0d0d0d] px-6 py-6 font-mono text-xs text-[#8c8c8c]">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] text-[#525252]">[COORDINATES]</span>
          <span className="text-[11px] text-[#ededed]">28.5833° N, 77.3167° E</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-hairline-t">
          <span className="text-[11px]">ATHLETE & DEVELOPER</span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/vatsdevansh18"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[#ededed] hover:text-[#10b981] transition-colors"
            >
              <span>GITHUB</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
            <span className="text-white/20">/</span>
            <a
              href="https://www.linkedin.com/in/devansh-vattsss/?isSelfProfile=true"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[#ededed] hover:text-[#10b981] transition-colors"
            >
              <span>LINKEDIN</span>
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
