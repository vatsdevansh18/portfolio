export type RouteType = "directory" | "immersive"

export interface RouteMeta {
  path: string
  name: string
  type: RouteType
  parentDirectory?: string
  description?: string
}

export const ROUTES_CONFIG: RouteMeta[] = [
  // Directory Routes (Mode A: Fixed Viewport, Contained UI)
  { path: "/", name: "ROOT", type: "directory", description: "Workstation Desktop" },
  { path: "/about", name: "ABOUT", type: "directory", description: "Identity & Philosophy" },
  { path: "/projects", name: "PROJECTS", type: "directory", description: "Projects Directory" },
  { path: "/skills", name: "SKILLS", type: "directory", description: "System Modules" },
  { path: "/football", name: "FOOTBALL", type: "directory", description: "Varsity Records" },
  { path: "/experience", name: "EXPERIENCE", type: "directory", description: "Timeline Logs" },
  { path: "/contact", name: "CONTACT", type: "directory", description: "Transmission Endpoints" },

  // Immersive Destination Routes (Mode B: Scroll-Driven, 3D Canvas, Deep Storytelling)
  {
    path: "/projects/portfolio-v3",
    name: "portfolio_v3.app",
    type: "immersive",
    parentDirectory: "/projects",
    description: "Spatial 3D Workstation Case Study",
  },
  {
    path: "/projects/football-attendance",
    name: "football_attendance.sys",
    type: "immersive",
    parentDirectory: "/projects",
    description: "Varsity Operations & Squad System",
  },
  {
    path: "/projects/tactical-pitch",
    name: "tactical_pitch_3d.sim",
    type: "immersive",
    parentDirectory: "/projects",
    description: "3D WebGL Pitch Tactical Engine",
  },
]

export function getRouteMeta(pathname: string): RouteMeta | undefined {
  return ROUTES_CONFIG.find((route) => route.path === pathname)
}

export function isImmersiveRoute(pathname: string): boolean {
  const meta = getRouteMeta(pathname)
  if (meta) return meta.type === "immersive"
  // Check if pathname starts with any immersive route or /projects/
  return pathname.startsWith("/projects/") && pathname !== "/projects"
}
