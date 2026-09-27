import { useState } from "react"
import { FolderItem } from "@/components/desktop/FolderItem"

export interface DesktopFolder {
  id: string
  name: string
  subtext: string
  description: string
  path: string
  filesCount: string
  type: string
  lastModified: string
}

export const DESKTOP_FOLDERS: DesktopFolder[] = [
  {
    id: "home",
    name: "00_HOME",
    subtext: "ROOT_DESKTOP",
    description: "back to start",
    path: "/",
    filesCount: "ROOT",
    type: "SYSTEM_ROOT",
    lastModified: "2026.09.27",
  },
  {
    id: "about",
    name: "01_ABOUT",
    subtext: "USER_PROFILE.sys",
    description: "who i am",
    path: "/about",
    filesCount: "5 LOGS",
    type: "DOSSIER",
    lastModified: "2026.09.26",
  },
  {
    id: "projects",
    name: "02_PROJECTS",
    subtext: "EXECUTABLES",
    description: "what i've built",
    path: "/projects",
    filesCount: "3 APPS",
    type: "BIN_DIR",
    lastModified: "2026.09.27",
  },
  {
    id: "skills",
    name: "03_SKILLS",
    subtext: "TECH_MODULES",
    description: "what i know",
    path: "/skills",
    filesCount: "15 MODS",
    type: "DIAGNOSTICS",
    lastModified: "2026.09.25",
  },
  {
    id: "football",
    name: "04_FOOTBALL",
    subtext: "TACTICAL_PITCH",
    description: "my other field",
    path: "/football",
    filesCount: "SQUAD_XI",
    type: "SIM_BOARD",
    lastModified: "2026.09.27",
  },
  {
    id: "experience",
    name: "05_EXPERIENCE",
    subtext: "CHRONOLOGY.log",
    description: "where i've been",
    path: "/experience",
    filesCount: "4 RECS",
    type: "TIMELINE",
    lastModified: "2026.09.24",
  },
  {
    id: "contact",
    name: "06_CONTACT",
    subtext: "TRANSCEIVER",
    description: "let's connect",
    path: "/contact",
    filesCount: "3 PORTS",
    type: "COMM_LINE",
    lastModified: "2026.09.27",
  },
]

interface FolderNavigationProps {
  currentPath: string
  onSelectPath: (path: string) => void
  isMobileDrawer?: boolean
  onHoverFolder?: (folder: DesktopFolder | null) => void
}

export function FolderNavigation({
  currentPath,
  onSelectPath,
  isMobileDrawer = false,
  onHoverFolder,
}: FolderNavigationProps) {
  return (
    <nav
      aria-label="Desktop Folders Navigation"
      className={`flex flex-col select-none no-scrollbar ${
        isMobileDrawer ? "space-y-2.5" : "space-y-1.5 lg:space-y-2"
      }`}
    >
      {DESKTOP_FOLDERS.map((folder, index) => {
        const isActive =
          folder.path === "/"
            ? currentPath === "/"
            : currentPath.startsWith(folder.path)

        return (
          <FolderItem
            key={folder.id}
            id={folder.id}
            name={folder.name}
            subtext={folder.subtext}
            path={folder.path}
            index={index}
            filesCount={folder.filesCount}
            type={folder.type}
            isActive={isActive}
            onClick={onSelectPath}
            onHover={() => onHoverFolder?.(folder)}
            onLeave={() => onHoverFolder?.(null)}
          />
        )
      })}
    </nav>
  )
}
