/**
 * Persists design system state to localStorage so updates survive page refresh.
 */

const STORAGE_KEY = 'design-system-builder-state';

export interface PersistedDesignSystemState {
  primaryColor?: string;
  accentColor?: string;
  neutralColor?: string;
  iconLibrary?: string;
  spacing?: string;
  radius?: string;
  shadow?: string;
  headingFontFamily?: string;
  bodyFontFamily?: string;
  codeFontFamily?: string;
  typographyTokenOverrides?: Record<string, { fontRef?: string; size?: string; weight?: string }>;
  isDarkMode?: boolean;
  borderWidth?: string;
  borderOpacity?: string;
  extraPalettes?: { id: string; name: string; baseColor: string }[];
  usageRulesMap?: Record<string, string>;
  semanticTokenOverrides?: Record<string, string>;
  componentTokenOverrides?: Record<string, string>;
  brandSettings?: Record<string, unknown>;
}

export function loadDesignSystemState(): PersistedDesignSystemState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedDesignSystemState;
  } catch {
    return null;
  }
}

export function saveDesignSystemState(state: PersistedDesignSystemState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore quota exceeded or other storage errors
  }
}
