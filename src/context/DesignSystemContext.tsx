'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  generateColorScale,
  applyColorCurves,
  CurveControlPoint,
  generateNeutrals,
} from '../utils/colorUtils';
import type { FontOption } from '@/types/designSystem';
import {
  BORDER_WIDTH_OPTIONS,
  BORDER_OPACITY_OPTIONS,
} from '@/components/Borders';

export type ExtraPalette = {
  id: string;
  name: string;
  baseColor: string;
  scale: Record<string, string>;
};

type SpacingOption = {
  name: string;
  label: string;
};

type RadiusOption = {
  name: string;
  label: string;
};

type ShadowOption = {
  name: string;
  label: string;
};

type BorderWidthOption = {
  name: string;
  label: string;
};

type BorderOpacityOption = {
  name: string;
  label: string;
};

type FontCategory =
  | 'serif'
  | 'sans-serif'
  | 'display'
  | 'handwriting'
  | 'monospace';

// Define the shape of our design system
interface DesignSystemContextType {
  // Base colors
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  primaryColorScale: Record<string, string>;
  setPrimaryColorScale: (scale: Record<string, string>) => void;

  accentColor: string;
  setAccentColor: (color: string) => void;
  accentColorScale: Record<string, string>;
  setAccentColorScale: (scale: Record<string, string>) => void;

  neutralColor: string;
  setNeutralColor: (color: string) => void;
  neutralColorScale: Record<string, string>;
  setNeutralColorScale: (scale: Record<string, string>) => void;

  // Icon library control
  iconLibrary: string;
  setIconLibrary: (library: string) => void;

  // Method to set a base color that handles updating scales
  setBaseColor: (type: 'primary' | 'accent' | 'neutral', color: string) => void;

  // Curve control points
  lightnessControlPoints: CurveControlPoint[];
  setLightnessControlPoints: (points: CurveControlPoint[]) => void;

  chromaControlPoints: CurveControlPoint[];
  setChromaControlPoints: (points: CurveControlPoint[]) => void;

  // Spacing control
  spacing: SpacingOption;
  setSpacing: (spacing: SpacingOption) => void;

  // Corner radius control
  radius: RadiusOption;
  setRadius: (radius: RadiusOption) => void;

  // Shadow control
  shadow: ShadowOption;
  setShadow: (shadow: ShadowOption) => void;

  // Font control
  headingFont: FontOption;
  setHeadingFont: (font: FontOption) => void;
  bodyFont: FontOption;
  setBodyFont: (font: FontOption) => void;

  // Dark mode control
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;

  // Border control
  borderWidth: BorderWidthOption;
  setBorderWidth: (width: BorderWidthOption) => void;
  borderOpacity: BorderOpacityOption;
  setBorderOpacity: (opacity: BorderOpacityOption) => void;

  // Extra color palettes
  extraPalettes: ExtraPalette[];
  addExtraPalette: (name: string, color?: string) => void;
  removeExtraPalette: (id: string) => void;
  updateExtraPaletteColor: (id: string, color: string) => void;
  updateExtraPaletteName: (id: string, name: string) => void;

  // Component → palette assignments
  componentPaletteMap: Record<string, string>;
  setComponentPalette: (componentId: string, paletteId: string) => void;

  // Component → style settings (e.g. layout, border type, arrow style)
  componentSettingsMap: Record<string, Record<string, string>>;
  setComponentSetting: (componentId: string, key: string, value: string) => void;
}

// Create context with default values
const DesignSystemContext = createContext<DesignSystemContextType | undefined>(
  undefined
);

// Provider component
interface DesignSystemProviderProps {
  children: ReactNode;
  initialPrimaryColor?: string;
  initialAccentColor?: string;
}

export const DesignSystemProvider: React.FC<DesignSystemProviderProps> = ({
  children,
  initialPrimaryColor = '#3b82f6', // Default blue
  initialAccentColor = '#ec4899', // Default pink
}) => {
  // Base colors
  const [primaryColor, setPrimaryColor] = useState<string>(initialPrimaryColor);
  const [primaryColorScale, setPrimaryColorScale] = useState<
    Record<string, string>
  >(generateColorScale(initialPrimaryColor));

  const [accentColor, setAccentColor] = useState<string>(initialAccentColor);
  const [accentColorScale, setAccentColorScale] = useState<
    Record<string, string>
  >(generateColorScale(initialAccentColor));

  // Icon library state
  const [iconLibrary, setIconLibrary] = useState<string>('hi'); // Default to Heroicons

  // Neutral color (derived from primary by default)
  const [neutralColor, setNeutralColor] = useState<string>(initialPrimaryColor);
  const [neutralColorScale, setNeutralColorScale] = useState<
    Record<string, string>
  >(generateNeutrals(initialPrimaryColor));

  // Curve control points
  const [lightnessControlPoints, setLightnessControlPoints] = useState<
    CurveControlPoint[]
  >([]);
  const [chromaControlPoints, setChromaControlPoints] = useState<
    CurveControlPoint[]
  >([]);

  // Spacing control
  const [spacing, setSpacing] = useState<SpacingOption>(SPACING_OPTIONS[0]);

  // Corner radius control
  const [radius, setRadius] = useState<RadiusOption>(RADIUS_OPTIONS[0]);

  // Shadow control
  const [shadow, setShadow] = useState<ShadowOption>(SHADOW_OPTIONS[0]);

  // Font control
  const [headingFont, setHeadingFont] = useState<FontOption>(FONT_OPTIONS[0]);
  const [bodyFont, setBodyFont] = useState<FontOption>(FONT_OPTIONS[0]);

  // Dark mode control
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Border control
  const [borderWidth, setBorderWidth] = useState<BorderWidthOption>(
    BORDER_WIDTH_OPTIONS[1]
  ); // Default to 'border'
  const [borderOpacity, setBorderOpacity] = useState<BorderOpacityOption>(
    BORDER_OPACITY_OPTIONS[0]
  ); // Default to 100%

  // Extra palettes
  const [extraPalettes, setExtraPalettes] = useState<ExtraPalette[]>([]);

  const addExtraPalette = (name: string, color = '#6366f1') => {
    const id = Date.now().toString(36);
    setExtraPalettes((prev) => [
      ...prev,
      { id, name, baseColor: color, scale: generateColorScale(color) },
    ]);
  };

  const removeExtraPalette = (id: string) => {
    setExtraPalettes((prev) => prev.filter((p) => p.id !== id));
  };

  const updateExtraPaletteColor = (id: string, color: string) => {
    setExtraPalettes((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, baseColor: color, scale: generateColorScale(color) } : p
      )
    );
  };

  const updateExtraPaletteName = (id: string, name: string) => {
    setExtraPalettes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name } : p))
    );
  };

  // Component → palette map
  const [componentPaletteMap, setComponentPaletteMapState] = useState<Record<string, string>>({
    'button-primary':   'primary',
    'button-secondary': 'neutral',
    'card':             'primary',
    'navigation':       'primary',
    'input':            'neutral',
    'radio-group':      'primary',
    'slider':           'primary',
    'badge':            'accent',
    'accordion':        'primary',
    'toast':            'accent',
  });

  const setComponentPalette = (componentId: string, paletteId: string) => {
    setComponentPaletteMapState((prev) => ({ ...prev, [componentId]: paletteId }));
  };

  // Component style settings
  const [componentSettingsMap, setComponentSettingsMapState] = useState<Record<string, Record<string, string>>>({
    card:      { layout: 'horizontal', avatarShape: 'rounded', showActions: 'show' },
    accordion: { arrowType: 'chevron', borderType: 'full', background: 'solid' },
  });

  const setComponentSetting = (componentId: string, key: string, value: string) => {
    setComponentSettingsMapState((prev) => ({
      ...prev,
      [componentId]: { ...(prev[componentId] ?? {}), [key]: value },
    }));
  };

  // Method to set a base color and update its scale
  const setBaseColor = (
    type: 'primary' | 'accent' | 'neutral',
    color: string
  ) => {
    switch (type) {
      case 'primary':
        setPrimaryColor(color);

        // Update primary color scale
        const primaryScale =
          lightnessControlPoints.length > 0 || chromaControlPoints.length > 0
            ? applyColorCurves(
                color,
                lightnessControlPoints,
                chromaControlPoints
              )
            : generateColorScale(color);
        setPrimaryColorScale(primaryScale);

        // Also update neutral by default when primary changes
        setNeutralColor(color);
        // Generate neutrals based on the primary color
        const neutralScale = generateNeutrals(color);
        setNeutralColorScale(neutralScale);
        break;

      case 'accent':
        setAccentColor(color);
        const accentScale =
          lightnessControlPoints.length > 0 || chromaControlPoints.length > 0
            ? applyColorCurves(
                color,
                lightnessControlPoints,
                chromaControlPoints
              )
            : generateColorScale(color);
        setAccentColorScale(accentScale);
        break;

      case 'neutral':
        setNeutralColor(color);
        // Generate neutrals based on the selected color
        const newNeutralScale = generateNeutrals(color);
        setNeutralColorScale(newNeutralScale);
        break;
    }
  };

  const value = {
    primaryColor,
    setPrimaryColor,
    primaryColorScale,
    setPrimaryColorScale,

    accentColor,
    setAccentColor,
    accentColorScale,
    setAccentColorScale,

    neutralColor,
    setNeutralColor,
    neutralColorScale,
    setNeutralColorScale,

    iconLibrary,
    setIconLibrary,

    setBaseColor,

    lightnessControlPoints,
    setLightnessControlPoints,

    chromaControlPoints,
    setChromaControlPoints,

    spacing,
    setSpacing,

    radius,
    setRadius,

    shadow,
    setShadow,

    headingFont,
    setHeadingFont,
    bodyFont,
    setBodyFont,

    isDarkMode,
    setIsDarkMode,

    borderWidth,
    setBorderWidth,
    borderOpacity,
    setBorderOpacity,

    extraPalettes,
    addExtraPalette,
    removeExtraPalette,
    updateExtraPaletteColor,
    updateExtraPaletteName,

    componentPaletteMap,
    setComponentPalette,

    componentSettingsMap,
    setComponentSetting,
  };

  return (
    <DesignSystemContext.Provider value={value}>
      {children}
    </DesignSystemContext.Provider>
  );
};

// Custom hook to use the design system context
export const useDesignSystem = () => {
  const context = useContext(DesignSystemContext);
  if (context === undefined) {
    throw new Error(
      'useDesignSystem must be used within a DesignSystemProvider'
    );
  }
  return context;
};

export default DesignSystemContext;

export const SPACING_OPTIONS = [
  { name: 'gap-0', label: 'None' },
  { name: 'gap-2', label: 'Small' },
  { name: 'gap-4', label: 'Medium' },
  { name: 'gap-8', label: 'Large' },
  { name: 'gap-16', label: 'Extra Large' },
] as const;

export const RADIUS_OPTIONS = [
  { name: 'rounded-none', label: 'None' },
  { name: 'rounded-sm', label: 'Small' },
  { name: 'rounded-lg', label: 'Large' },
  { name: 'rounded-xl', label: 'Extra Large' },
  { name: 'rounded-2xl', label: '2X Large' },
  { name: 'rounded-full', label: 'Full' },
] as const;

export const SHADOW_OPTIONS = [
  { name: 'shadow-none', label: 'None' },
  { name: 'shadow-sm', label: 'Small' },
  { name: 'shadow', label: 'Medium' },
  { name: 'shadow-md', label: 'Large' },
  { name: 'shadow-lg', label: 'Extra Large' },
  { name: 'shadow-xl', label: '2X Large' },
  { name: 'shadow-2xl', label: '3X Large' },
] as const;

// A subset of Google Fonts for demonstration
export const FONT_OPTIONS: FontOption[] = [
  {
    family: 'Inter',
    category: 'sans-serif',
    variants: ['400', '500', '600', '700'],
    weight: 'regular',
    size: 'regular',
  },
  {
    family: 'Roboto',
    category: 'sans-serif',
    variants: ['400', '500', '700'],
    weight: 'regular',
    size: 'regular',
  },
  {
    family: 'Playfair Display',
    category: 'serif',
    variants: ['400', '500', '600', '700'],
    weight: 'regular',
    size: 'regular',
  },
  {
    family: 'Merriweather',
    category: 'serif',
    variants: ['400', '700'],
    weight: 'regular',
    size: 'regular',
  },
  {
    family: 'Fira Code',
    category: 'monospace',
    variants: ['400', '500', '700'],
    weight: 'regular',
    size: 'regular',
  },
  {
    family: 'Dancing Script',
    category: 'handwriting',
    variants: ['400', '700'],
    weight: 'regular',
    size: 'regular',
  },
  {
    family: 'Oswald',
    category: 'display',
    variants: ['400', '500', '600', '700'],
    weight: 'regular',
    size: 'regular',
  },
  {
    family: 'Lato',
    category: 'sans-serif',
    variants: ['400', '700'],
    weight: 'regular',
    size: 'regular',
  },
  {
    family: 'Source Code Pro',
    category: 'monospace',
    variants: ['400', '500', '600', '700'],
    weight: 'regular',
    size: 'regular',
  },
  {
    family: 'Montserrat',
    category: 'sans-serif',
    variants: ['400', '500', '600', '700'],
    weight: 'regular',
    size: 'regular',
  },
] as const;
