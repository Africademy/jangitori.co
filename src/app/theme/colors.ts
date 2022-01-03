export const colorScales = {
  gray: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  indigo: {
    50: '#eef2ff',
    100: '#e0e7ff',
    200: '#c7d2fe',
    300: '#a5b4fc',
    400: '#818cf8',
    500: '#6366f1',
    600: '#4f46e5',
    700: '#4338ca',
    800: '#3730a3',
    900: '#312e81',
  },
  red: {
    50: '#fef2f2',
    100: '#FFE8D2',
    200: '#FFCBA6',
    300: '#FFA879',
    400: '#FF8558',
    500: '#FF4D21',
    600: '#DB3018',
    700: '#B71810',
    800: '#930A0D',
    900: '#7A0611',
  },
}

export const themeUIColors = {
  text: colorScales.gray[900],
  background: colorScales.gray[50],
  primary: colorScales.blue[500],
  secondary: '#30c',
  muted: '##f6f6f6',
}

export const colors = { ...colorScales, ...themeUIColors }

export type ColorName = keyof typeof colors
