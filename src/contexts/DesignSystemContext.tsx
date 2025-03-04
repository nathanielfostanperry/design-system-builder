'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { CurveControlPoint, applyColorCurves } from '@/utils/colorUtils';

// Define the interface for a color in the design system
interface DesignSystemColor {
  base: string;
  scale: Record<string, string>;
}

// Define the design system interface
export interface DesignSystem {
  colors: {
    primary?: DesignSystemColor;
    accent?: DesignSystemColor;
    neutral?: DesignSystemColor;
    [key: string]: DesignSystemColor | undefined;
  };
  typography?: {
    fontFamily: string;
    headings: Record<string, any>;
    body: Record<string, any>;
  };
  spacing?: Record<string, string>;
  // Add other design system properties as needed
}

// Define the context interface
interface DesignSystemContextType {
  designSystem: DesignSystem;
  updateDesignSystem: (newDesignSystem: DesignSystem) => void;
  setBaseColor: (type: 'primary' | 'accent' | 'neutral', color: string) => void;
  regenerateColorScales: (
    lightLightnessPoints?: CurveControlPoint[],
    darkLightnessPoints?: CurveControlPoint[],
    lightChromaPoints?: CurveControlPoint[],
    darkChromaPoints?: CurveControlPoint[]
  ) => void;
  curves: {
    lightLightness: CurveControlPoint[];
    darkLightness: CurveControlPoint[];
    lightChroma: CurveControlPoint[];
    darkChroma: CurveControlPoint[];
  };
  setCurves: (
    curveType:
      | 'lightLightness'
      | 'darkLightness'
      | 'lightChroma'
      | 'darkChroma',
    points: CurveControlPoint[]
  ) => void;
}

// Default curve control points
const defaultLightLightnessPoints: CurveControlPoint[] = [
  { position: 0, lightness: 0.98, rangeType: 'light' as const },
  { position: 0.25, lightness: 0.9, rangeType: 'light' as const },
  { position: 0.5, lightness: 0.8, rangeType: 'light' as const },
  { position: 0.75, lightness: 0.7, rangeType: 'light' as const },
  { position: 1, lightness: 0.55, rangeType: 'light' as const },
];

const defaultDarkLightnessPoints: CurveControlPoint[] = [
  { position: 0, lightness: 0.45, rangeType: 'dark' as const },
  { position: 0.25, lightness: 0.35, rangeType: 'dark' as const },
  { position: 0.5, lightness: 0.25, rangeType: 'dark' as const },
  { position: 0.75, lightness: 0.15, rangeType: 'dark' as const },
  { position: 1, lightness: 0.05, rangeType: 'dark' as const },
];

const defaultLightChromaPoints: CurveControlPoint[] = [
  {
    position: 0,
    saturation: 1.0,
    lightness: undefined,
    rangeType: 'light' as const,
  },
  {
    position: 0.25,
    saturation: 1.0,
    lightness: undefined,
    rangeType: 'light' as const,
  },
  {
    position: 0.5,
    saturation: 1.0,
    lightness: undefined,
    rangeType: 'light' as const,
  },
  {
    position: 0.75,
    saturation: 1.0,
    lightness: undefined,
    rangeType: 'light' as const,
  },
  {
    position: 1,
    saturation: 1.0,
    lightness: undefined,
    rangeType: 'light' as const,
  },
];

const defaultDarkChromaPoints: CurveControlPoint[] = [
  {
    position: 0,
    saturation: 1.0,
    lightness: undefined,
    rangeType: 'dark' as const,
  },
  {
    position: 0.25,
    saturation: 1.0,
    lightness: undefined,
    rangeType: 'dark' as const,
  },
  {
    position: 0.5,
    saturation: 1.0,
    lightness: undefined,
    rangeType: 'dark' as const,
  },
  {
    position: 0.75,
    saturation: 1.0,
    lightness: undefined,
    rangeType: 'dark' as const,
  },
  {
    position: 1,
    saturation: 1.0,
    lightness: undefined,
    rangeType: 'dark' as const,
  },
];

// Create the context with default values
const DesignSystemContext = createContext<DesignSystemContextType | undefined>(
  undefined
);

// Provider component
export const DesignSystemProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize with default design system
  const [designSystem, setDesignSystem] = useState<DesignSystem>({
    colors: {
      primary: {
        base: '#3b82f6', // Default blue
        scale: {},
      },
      accent: {
        base: '#f59e0b', // Default amber
        scale: {},
      },
      neutral: {
        base: '#6b7280', // Default gray
        scale: {},
      },
    },
  });

  // Curve state
  const [curves, setCurvesState] = useState({
    lightLightness: defaultLightLightnessPoints,
    darkLightness: defaultDarkLightnessPoints,
    lightChroma: defaultLightChromaPoints,
    darkChroma: defaultDarkChromaPoints,
  });

  // Set a specific curve type
  const setCurves = useCallback(
    (
      curveType:
        | 'lightLightness'
        | 'darkLightness'
        | 'lightChroma'
        | 'darkChroma',
      points: CurveControlPoint[]
    ) => {
      setCurvesState((prev) => ({
        ...prev,
        [curveType]: points,
      }));
    },
    []
  );

  // Function to regenerate all color scales based on the current curves
  const regenerateColorScales = useCallback(
    (
      lightLightnessPoints?: CurveControlPoint[],
      darkLightnessPoints?: CurveControlPoint[],
      lightChromaPoints?: CurveControlPoint[],
      darkChromaPoints?: CurveControlPoint[]
    ) => {
      setDesignSystem((prev) => {
        const updatedColors = { ...prev.colors };

        // Use provided control points or current state
        const lightLightness = lightLightnessPoints || curves.lightLightness;
        const darkLightness = darkLightnessPoints || curves.darkLightness;
        const lightChroma = lightChromaPoints || curves.lightChroma;
        const darkChroma = darkChromaPoints || curves.darkChroma;

        // Apply curves to primary color
        if (updatedColors.primary?.base) {
          updatedColors.primary.scale = applyColorCurves(
            updatedColors.primary.base,
            lightLightness,
            darkLightness,
            lightChroma,
            darkChroma
          );
        }

        // Apply curves to accent color
        if (updatedColors.accent?.base) {
          updatedColors.accent.scale = applyColorCurves(
            updatedColors.accent.base,
            lightLightness,
            darkLightness,
            lightChroma,
            darkChroma
          );
        }

        // Apply curves to neutral color
        if (updatedColors.neutral?.base) {
          updatedColors.neutral.scale = applyColorCurves(
            updatedColors.neutral.base,
            lightLightness,
            darkLightness,
            lightChroma,
            darkChroma
          );
        }

        return {
          ...prev,
          colors: updatedColors,
        };
      });
    },
    [curves]
  );

  // Function to update the entire design system
  const updateDesignSystem = (newDesignSystem: DesignSystem) => {
    setDesignSystem(newDesignSystem);
  };

  // Function to update a specific base color
  const setBaseColor = useCallback(
    (type: 'primary' | 'accent' | 'neutral', color: string) => {
      setDesignSystem((prev) => {
        const updatedColors = { ...prev.colors };

        if (updatedColors[type]) {
          updatedColors[type] = {
            ...updatedColors[type]!,
            base: color,
          };
        } else {
          updatedColors[type] = {
            base: color,
            scale: {},
          };
        }

        return {
          ...prev,
          colors: updatedColors,
        };
      });

      // Immediately regenerate color scales when a base color changes
      regenerateColorScales();
    },
    [regenerateColorScales]
  );

  // Initialize color scales on first render
  React.useEffect(() => {
    regenerateColorScales();
  }, [regenerateColorScales]);

  return (
    <DesignSystemContext.Provider
      value={{
        designSystem,
        updateDesignSystem,
        setBaseColor,
        regenerateColorScales,
        curves,
        setCurves,
      }}
    >
      {children}
    </DesignSystemContext.Provider>
  );
};

// Custom hook for using the design system context
export const useDesignSystem = (): DesignSystemContextType => {
  const context = useContext(DesignSystemContext);
  if (context === undefined) {
    throw new Error(
      'useDesignSystem must be used within a DesignSystemProvider'
    );
  }
  return context;
};
