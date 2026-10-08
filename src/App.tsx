import { useState, useEffect } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { PrimaryScrollProvider } from "@/lib/scroll-context"
import { AppShell } from "@/components/desktop/AppShell"
import { InitialLoader } from "@/components/desktop/InitialLoader"
import { CustomCursor } from "@/components/ui/custom-cursor"
import { CRTOverlay } from "@/components/retro/CRTOverlay"
import { HomePage } from "@/pages/HomePage"
import { AboutPage } from "@/pages/AboutPage"
import { ProjectsPage } from "@/pages/ProjectsPage"
import { SkillsPage } from "@/pages/SkillsPage"
import { FootballPage } from "@/pages/FootballPage"
import { ExperiencePage } from "@/pages/ExperiencePage"
import { ContactPage } from "@/pages/ContactPage"
import { PortfolioV3Experience } from "@/components/immersive/PortfolioV3Experience"
import { FootballAttendanceExperience } from "@/components/immersive/FootballAttendanceExperience"
import { TacticalPitchExperience } from "@/components/immersive/TacticalPitchExperience"

import { Mascot } from "@/components/mascot/Mascot"

export default function App() {
  const [isInitialized, setIsInitialized] = useState<boolean>(() => {
    // Check if user already booted the workstation in this session
    return sessionStorage.getItem("portfolio_initialized") === "true"
  })

  const location = useLocation()

  const handleInitComplete = () => {
    sessionStorage.setItem("portfolio_initialized", "true")
    setIsInitialized(true)
  }

  // Prevent default window/body scrolling to enforce desktop container
  useEffect(() => {
    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
  }, [])

  return (
    <>
      {/* Precision Custom Cursor for tactile desktop file interaction */}
      <CustomCursor />

      {/* Subtle, zero-overhead CRT scanlines and vignette overlay */}
      <CRTOverlay />

      {/* C0R3-Y Mascot Companion */}
      {isInitialized && <Mascot />}

      {/* Initial Minimal Session Boot Screen */}
      {!isInitialized ? (
        <InitialLoader onComplete={handleInitComplete} />
      ) : (
        <PrimaryScrollProvider>
          <AppShell>
            <Routes location={location} key={location.pathname}>
              {/* Level 1 & 2: Desktop & Directory Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/football" element={<FootballPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Level 3: Deep Immersive Scroll-Driven 3D Destinations */}
              <Route path="/projects/portfolio-v3" element={<PortfolioV3Experience />} />
              <Route path="/projects/football-attendance" element={<FootballAttendanceExperience />} />
              <Route path="/projects/tactical-pitch" element={<TacticalPitchExperience />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppShell>
        </PrimaryScrollProvider>
      )}
    </>
  )
}