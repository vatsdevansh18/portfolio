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
    subtext: "Start",
    description: "back to start",
    path: "/",
    filesCount: "ROOT",
    type: "SYSTEM_ROOT",
    lastModified: "2026.09.27",
  },
  {
    id: "about",
    name: "01_ABOUT",
    subtext: "Profile",
    description: "who i am",
    path: "/about",
    filesCount: "INFO",
    type: "DOSSIER",
    lastModified: "2026.09.26",
  },
  {
    id: "projects",
    name: "02_PROJECTS",
    subtext: "Work",
    description: "what i've built",
    path: "/projects",
    filesCount: "APPS",
    type: "BIN_DIR",
    lastModified: "2026.09.27",
  },
  {
    id: "experience",
    name: "03_EXPERIENCE",
    subtext: "History",
    description: "where i've been",
    path: "/experience",
    filesCount: "TIMELINE",
    type: "TIMELINE",
    lastModified: "2026.09.24",
  },
  {
    id: "skills",
    name: "04_SKILLS",
    subtext: "Stack",
    description: "what i know",
    path: "/skills",
    filesCount: "TECH",
    type: "DIAGNOSTICS",
    lastModified: "2026.09.25",
  },
  {
    id: "football",
    name: "05_FOOTBALL",
    subtext: "Athletics",
    description: "my other field",
    path: "/football",
    filesCount: "SQUAD",
    type: "SIM_BOARD",
    lastModified: "2026.09.27",
  },
  {
    id: "contact",
    name: "06_CONTACT",
    subtext: "Connect",
    description: "let's talk",
    path: "/contact",
    filesCount: "LINKS",
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
