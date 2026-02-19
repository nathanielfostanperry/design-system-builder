'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  generateColorScaleOKLCH,
  generateNeutralsOKLCH,
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

export type BrandValueEntry = {
  id: string;
  name: string;
  sentence: string;
  inPractice: string;
  notMeans: string;
  passesIf: string;
};

export type BrandVoicePrinciple = {
  id: string;
  name: string;
  whatMeans: string;
  why: string;
  inPractice: string;
  never: string;
};

export type IsIsNotRow = { is: string; isNot: string };

export type BrandSettings = {
  // Identity
  name: string;
  industry: string;
  owner: string;

  // Values doc
  valueEntries: BrandValueEntry[];
  valueHierarchy: string;
  hardLimits: string;

  // Positioning doc
  purpose: string;
  primaryAudience: string;
  secondaryAudience: string;
  notFor: string;
  marketTension: string;
  audienceTried: string;
  uniqueOffer: string;
  category: string;
  competitors: string;
  positioningStatement: string;
  successIn3Years: string;
  knownFor: string;
  positioningIsIsNot: IsIsNotRow[];

  // Voice doc
  voicePrinciples: BrandVoicePrinciple[];
  voiceIsIsNot: IsIsNotRow[];
  wordsUse: string;
  wordsAvoid: string;
  whenInforming: string;
  whenPersuading: string;
  whenResponding: string;
  whenCelebrating: string;
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

  // Spacing control
  spacing: SpacingOption;
  setSpacing: (spacing: SpacingOption) => void;

  // Corner radius control
  radius: RadiusOption;
  setRadius: (radius: RadiusOption) => void;

  // Shadow control
  shadow: ShadowOption;
  setShadow: (shadow: ShadowOption) => void;

  // Font control (primitives)
  headingFont: FontOption;
  setHeadingFont: (font: FontOption) => void;
  bodyFont: FontOption;
  setBodyFont: (font: FontOption) => void;
  codeFont: FontOption;
  setCodeFont: (font: FontOption) => void;

  // Semantic typography token overrides
  typographyTokenOverrides: Record<string, { fontRef?: 'heading' | 'body' | 'code'; size?: string; weight?: string }>;
  setTypographyTokenOverride: (tokenId: string, override: { fontRef?: 'heading' | 'body' | 'code'; size?: string; weight?: string }) => void;
  resetTypographyTokenOverride: (tokenId: string) => void;

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

  // Usage rules per palette (when to use this color)
  usageRulesMap: Record<string, string>;
  setUsageRules: (paletteId: string, rules: string) => void;

  // Semantic token overrides (tokenId -> primitive ref e.g. "neutral-900")
  semanticTokenOverrides: Record<string, string>;
  setSemanticTokenOverride: (tokenId: string, primitiveRef: string) => void;
  resetSemanticTokenOverride: (tokenId: string) => void;

  // Component → palette assignments
  componentPaletteMap: Record<string, string>;
  setComponentPalette: (componentId: string, paletteId: string) => void;

  // Component → style settings (e.g. layout, border type, arrow style)
  componentSettingsMap: Record<string, Record<string, string>>;
  setComponentSetting: (componentId: string, key: string, value: string) => void;

  // Brand identity
  brandSettings: BrandSettings;
  setBrandField: (key: keyof BrandSettings, value: unknown) => void;
  addBrandValue: () => void;
  updateBrandValue: (id: string, field: keyof BrandValueEntry, value: string) => void;
  removeBrandValue: (id: string) => void;
  addVoicePrinciple: () => void;
  updateVoicePrinciple: (id: string, field: keyof BrandVoicePrinciple, value: string) => void;
  removeVoicePrinciple: (id: string) => void;
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
  >(generateColorScaleOKLCH(initialPrimaryColor));

  const [accentColor, setAccentColor] = useState<string>(initialAccentColor);
  const [accentColorScale, setAccentColorScale] = useState<
    Record<string, string>
  >(generateColorScaleOKLCH(initialAccentColor));

  // Icon library state
  const [iconLibrary, setIconLibrary] = useState<string>('hi'); // Default to Heroicons

  // Neutral color (derived from primary by default)
  const [neutralColor, setNeutralColor] = useState<string>(initialPrimaryColor);
  const [neutralColorScale, setNeutralColorScale] = useState<
    Record<string, string>
  >(generateNeutralsOKLCH(initialPrimaryColor));

  // Spacing control
  const [spacing, setSpacing] = useState<SpacingOption>(SPACING_OPTIONS[0]);

  // Corner radius control
  const [radius, setRadius] = useState<RadiusOption>(RADIUS_OPTIONS[0]);

  // Shadow control
  const [shadow, setShadow] = useState<ShadowOption>(SHADOW_OPTIONS[0]);

  // Font control (primitives)
  const [headingFont, setHeadingFont] = useState<FontOption>(FONT_OPTIONS[0]);
  const [bodyFont, setBodyFont] = useState<FontOption>(FONT_OPTIONS[0]);
  const [codeFont, setCodeFont] = useState<FontOption>(
    FONT_OPTIONS.find((f) => f.family === 'Fira Code') ?? FONT_OPTIONS[0]
  );

  // Semantic typography token overrides
  const [typographyTokenOverrides, setTypographyTokenOverrides] = useState<
    Record<string, { fontRef?: 'heading' | 'body' | 'code'; size?: string; weight?: string }>
  >({});
  const setTypographyTokenOverride = (
    tokenId: string,
    override: { fontRef?: 'heading' | 'body' | 'code'; size?: string; weight?: string }
  ) => {
    setTypographyTokenOverrides((prev) => ({ ...prev, [tokenId]: { ...prev[tokenId], ...override } }));
  };
  const resetTypographyTokenOverride = (tokenId: string) => {
    setTypographyTokenOverrides((prev) => {
      const next = { ...prev };
      delete next[tokenId];
      return next;
    });
  };

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
      { id, name, baseColor: color, scale: generateColorScaleOKLCH(color) },
    ]);
  };

  const removeExtraPalette = (id: string) => {
    setExtraPalettes((prev) => prev.filter((p) => p.id !== id));
  };

  const updateExtraPaletteColor = (id: string, color: string) => {
    setExtraPalettes((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, baseColor: color, scale: generateColorScaleOKLCH(color) } : p
      )
    );
  };

  const updateExtraPaletteName = (id: string, name: string) => {
    setExtraPalettes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, name } : p))
    );
  };

  // Usage rules per palette (when to use this color)
  const [usageRulesMap, setUsageRulesMap] = useState<Record<string, string>>({});
  const setUsageRules = (paletteId: string, rules: string) => {
    setUsageRulesMap((prev) => ({ ...prev, [paletteId]: rules }));
  };

  // Semantic token overrides (tokenId -> primitive ref)
  const [semanticTokenOverrides, setSemanticTokenOverrides] = useState<Record<string, string>>({});
  const setSemanticTokenOverride = (tokenId: string, primitiveRef: string) => {
    setSemanticTokenOverrides((prev) => ({ ...prev, [tokenId]: primitiveRef }));
  };
  const resetSemanticTokenOverride = (tokenId: string) => {
    setSemanticTokenOverrides((prev) => {
      const next = { ...prev };
      delete next[tokenId];
      return next;
    });
  };

  // Component → palette map
  const [componentPaletteMap, setComponentPaletteMapState] = useState<Record<string, string>>({
    'button-primary':   'primary',
    'button-secondary': 'neutral',
    'icon-button':      'primary',
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

  // Brand settings
  const [brandSettings, setBrandSettingsState] = useState<BrandSettings>({
    name: '', industry: '', owner: '',
    valueEntries: [], valueHierarchy: '', hardLimits: '',
    purpose: '', primaryAudience: '', secondaryAudience: '', notFor: '',
    marketTension: '', audienceTried: '', uniqueOffer: '',
    category: '', competitors: '', positioningStatement: '',
    successIn3Years: '', knownFor: '',
    positioningIsIsNot: [{ is: '', isNot: '' }, { is: '', isNot: '' }, { is: '', isNot: '' }],
    voicePrinciples: [],
    voiceIsIsNot: [{ is: '', isNot: '' }, { is: '', isNot: '' }, { is: '', isNot: '' }],
    wordsUse: '', wordsAvoid: '',
    whenInforming: '', whenPersuading: '', whenResponding: '', whenCelebrating: '',
  });

  const setBrandField = (key: keyof BrandSettings, value: unknown) => {
    setBrandSettingsState((prev) => ({ ...prev, [key]: value }));
  };

  const addBrandValue = () => {
    const id = Date.now().toString(36);
    setBrandSettingsState((prev) => ({
      ...prev,
      valueEntries: [...prev.valueEntries, { id, name: '', sentence: '', inPractice: '', notMeans: '', passesIf: '' }],
    }));
  };

  const updateBrandValue = (id: string, field: keyof BrandValueEntry, value: string) => {
    setBrandSettingsState((prev) => ({
      ...prev,
      valueEntries: prev.valueEntries.map((v) => v.id === id ? { ...v, [field]: value } : v),
    }));
  };

  const removeBrandValue = (id: string) => {
    setBrandSettingsState((prev) => ({
      ...prev,
      valueEntries: prev.valueEntries.filter((v) => v.id !== id),
    }));
  };

  const addVoicePrinciple = () => {
    const id = Date.now().toString(36);
    setBrandSettingsState((prev) => ({
      ...prev,
      voicePrinciples: [...prev.voicePrinciples, { id, name: '', whatMeans: '', why: '', inPractice: '', never: '' }],
    }));
  };

  const updateVoicePrinciple = (id: string, field: keyof BrandVoicePrinciple, value: string) => {
    setBrandSettingsState((prev) => ({
      ...prev,
      voicePrinciples: prev.voicePrinciples.map((p) => p.id === id ? { ...p, [field]: value } : p),
    }));
  };

  const removeVoicePrinciple = (id: string) => {
    setBrandSettingsState((prev) => ({
      ...prev,
      voicePrinciples: prev.voicePrinciples.filter((p) => p.id !== id),
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
        setPrimaryColorScale(generateColorScaleOKLCH(color));
        setNeutralColor(color);
        setNeutralColorScale(generateNeutralsOKLCH(color));
        break;

      case 'accent':
        setAccentColor(color);
        setAccentColorScale(generateColorScaleOKLCH(color));
        break;

      case 'neutral':
        setNeutralColor(color);
        setNeutralColorScale(generateNeutralsOKLCH(color));
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
    codeFont,
    setCodeFont,

    typographyTokenOverrides,
    setTypographyTokenOverride,
    resetTypographyTokenOverride,

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

    usageRulesMap,
    setUsageRules,

    semanticTokenOverrides,
    setSemanticTokenOverride,
    resetSemanticTokenOverride,

    componentPaletteMap,
    setComponentPalette,

    componentSettingsMap,
    setComponentSetting,

    brandSettings,
    setBrandField,
    addBrandValue,
    updateBrandValue,
    removeBrandValue,
    addVoicePrinciple,
    updateVoicePrinciple,
    removeVoicePrinciple,
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
