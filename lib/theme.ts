export const themeMap = {
  'industrial-dark': {
    primary: '#facc15',
    secondary: '#020617',
    accent: '#ffffff',
    surface: '#0f172a',
    muted: '#94a3b8',
    heroOverlay: 'rgba(2, 6, 23, 0.78)',
  },
  'trade-blue': {
    primary: '#2563eb',
    secondary: '#0f172a',
    accent: '#ffffff',
    surface: '#eff6ff',
    muted: '#64748b',
    heroOverlay: 'rgba(15, 23, 42, 0.7)',
  },
  'luxury-black': {
    primary: '#d4af37',
    secondary: '#111111',
    accent: '#ffffff',
    surface: '#1f1f1f',
    muted: '#a1a1aa',
    heroOverlay: 'rgba(10, 10, 10, 0.72)',
  },
} as const;

export function getTheme(themeName: string) {
  return themeMap[themeName as keyof typeof themeMap] ?? themeMap['industrial-dark'];
}
