'use client';

import React, { useState, useEffect } from 'react';
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
  const [inputValue, setInputValue] = useState(value);

  // Update local state when prop value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Only update the actual color if it's a valid hex code
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(newValue)) {
      onChange(newValue);
    }
  };

  const handleBlur = () => {
    // If the user leaves with an invalid hex, reset to the current valid value
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(inputValue)) {
      setInputValue(value);
    } else if (inputValue !== value) {
      onChange(inputValue);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="flex items-start">
        <HexColorPicker color={value} onChange={onChange} />
        <div className="ml-4">
          <div
            className="w-12 h-12 rounded border border-gray-300 mb-2"
            style={{ backgroundColor: value }}
          />
          <input
            className="w-full px-2 py-1 text-sm font-mono border border-gray-300 rounded"
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder="#RRGGBB"
            maxLength={7}
          />
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
    </div>
  );
};

export default ColorSystemBuilder;
