import {
  Rocket,
  ShieldCheck,
  Sparkles,
  Headset,
  Globe,
  Smartphone,
  BrainCircuit,
  PenTool,
  Cloud,
  LineChart,
  HelpCircle,
} from 'lucide-react'

// Explicit name -> component map. Unlike `import * as Icons from 'lucide-react'`,
// this lets Vite/Rollup tree-shake every icon we don't reference, which is
// what kept the production bundle from ballooning (see README → Performance Notes).
const ICON_MAP = {
  Rocket,
  ShieldCheck,
  Sparkles,
  Headset,
  Globe,
  Smartphone,
  BrainCircuit,
  PenTool,
  Cloud,
  LineChart,
}

/**
 * We store icon names as plain strings in siteData.js (e.g. "Rocket")
 * so the data file has zero React/JSX dependencies. This component
 * resolves that string to the real lucide-react icon at render time.
 */
export default function Icon({ name, size = 22, className = '', strokeWidth = 2 }) {
  const LucideIcon = ICON_MAP[name] || HelpCircle
  return <LucideIcon size={size} strokeWidth={strokeWidth} className={className} />
}
