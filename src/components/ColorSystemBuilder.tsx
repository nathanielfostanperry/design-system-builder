'use client';

import React from 'react';
import GlobalCurveEditor from './GlobalCurveEditor';
import ColorScaleDisplay from './ColorScaleDisplay';
import { HexColorPicker } from 'react-colorful';
import { useDesignSystem } from '../context/DesignSystemContext';

interface ColorSystemBuilderProps {
  initialPrimaryColor?: string;
  initialAccentColor?: string;
}

// Simple color picker component
const ColorPicker: React.FC<{
  value: string;
  onChange: (color: string) => void;
  label: string;
}> = ({ value, onChange, label }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="flex items-center">
        <HexColorPicker color={value} onChange={onChange} />
        <div className="ml-4">
          <div
            className="w-12 h-12 rounded border border-gray-300"
            style={{ backgroundColor: value }}
          />
          <div className="mt-2 text-sm font-mono text-center">{value}</div>
        </div>
      </div>
    </div>
  );
};

const ColorSystemBuilder: React.FC<ColorSystemBuilderProps> = ({
  initialPrimaryColor = '#3b82f6', // Default blue
  initialAccentColor = '#ec4899', // Default pink
}) => {
  // Use the design system context
  const {
    primaryColor,
    setPrimaryColor,
    primaryColorScale,
    accentColor,
    setAccentColor,
    accentColorScale,
    neutralColorScale,
    setBaseColor,
  } = useDesignSystem();

  // Handle color picker changes
  const handlePrimaryColorChange = (color: string) => {
    setBaseColor('primary', color);
  };

  const handleAccentColorChange = (color: string) => {
    setBaseColor('accent', color);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Design System Color Builder</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Primary Color Picker */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Primary Color</h2>
          <ColorPicker
            value={primaryColor}
            onChange={handlePrimaryColorChange}
            label="Primary"
          />
        </div>

        {/* Accent Color Picker */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Accent Color</h2>
          <ColorPicker
            value={accentColor}
            onChange={handleAccentColorChange}
            label="Accent"
          />
        </div>
      </div>

      {/* Global Curve Editor */}
      <div className="mb-12">
        <GlobalCurveEditor />
      </div>

      {/* Color Scales Display */}
      <div className="grid grid-cols-1 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Color Scales</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Primary Scale */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Primary Scale</h3>
              <ColorScaleDisplay colorScale={primaryColorScale} />
            </div>

            {/* Accent Scale */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Accent Scale</h3>
              <ColorScaleDisplay colorScale={accentColorScale} />
            </div>

            {/* Neutral Scale */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Neutral Scale</h3>
              <ColorScaleDisplay colorScale={neutralColorScale} />
              <p className="text-sm text-gray-500 mt-2">
                Neutral colors are derived from the primary hue with very low
                saturation for a sophisticated color-theory approach
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorSystemBuilder;
