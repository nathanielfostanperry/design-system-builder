'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  generateColorScale,
  applyColorCurves,
  CurveControlPoint,
  generateNeutrals,
} from '../utils/colorUtils';

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

  // Method to set a base color that handles updating scales
  setBaseColor: (type: 'primary' | 'accent' | 'neutral', color: string) => void;

  // Curve control points
  lightnessControlPoints: CurveControlPoint[];
  setLightnessControlPoints: (points: CurveControlPoint[]) => void;

  chromaControlPoints: CurveControlPoint[];
  setChromaControlPoints: (points: CurveControlPoint[]) => void;
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

    setBaseColor,

    lightnessControlPoints,
    setLightnessControlPoints,

    chromaControlPoints,
    setChromaControlPoints,
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
