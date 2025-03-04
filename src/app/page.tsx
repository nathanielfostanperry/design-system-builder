'use client';

import React, { useState, useEffect } from 'react';
import ColorScaleDisplay from '@/components/ColorScaleDisplay';
import DesignSystemPreview from '@/components/DesignSystemPreview';
import CodeExport from '@/components/CodeExport';
import { generateColorScale, generateNeutrals } from '@/utils/colorUtils';

export default function Home() {
  const [baseColor, setBaseColor] = useState('#3b82f6'); // Default blue color
  const [accentColor, setAccentColor] = useState('#f59e0b'); // Default amber color
  const [colorScale, setColorScale] = useState<Record<string, string>>({});
  const [accentColorScale, setAccentColorScale] = useState<
    Record<string, string>
  >({});
  const [neutralColorScale, setNeutralColorScale] = useState<
    Record<string, string>
  >({});
  const [error, setError] = useState<string | null>(null);
  const [accentError, setAccentError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(true);
  const [isAccentValid, setIsAccentValid] = useState(true);

  // Validate hex color format
  const validateHexColor = (color: string): boolean => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
  };

  // Handle primary color input change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBaseColor(value);

    // Add a hash if it doesn't already exist
    let colorToValidate = value;
    if (!colorToValidate.startsWith('#')) {
      colorToValidate = `#${colorToValidate}`;
    }

    const valid = validateHexColor(colorToValidate);
    setIsValid(valid);
    setError(valid ? null : 'Please enter a valid hex color code.');
  };

  // Handle accent color input change
  const handleAccentColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAccentColor(value);

    // Add a hash if it doesn't already exist
    let colorToValidate = value;
    if (!colorToValidate.startsWith('#')) {
      colorToValidate = `#${colorToValidate}`;
    }

    const valid = validateHexColor(colorToValidate);
    setIsAccentValid(valid);
    setAccentError(valid ? null : 'Please enter a valid hex color code.');
  };

  // Generate the primary color scale when base color changes
  useEffect(() => {
    if (isValid) {
      try {
        let colorToUse = baseColor;
        // Add a hash if it doesn't already exist
        if (!colorToUse.startsWith('#')) {
          colorToUse = `#${colorToUse}`;
        }
        const scale = generateColorScale(colorToUse);
        setColorScale(scale);

        // Generate neutral colors based on the primary color
        const neutrals = generateNeutrals(colorToUse);
        setNeutralColorScale(neutrals);

        setError(null);
      } catch (err) {
        setError('Error generating color scale. Check your color format.');
      }
    }
  }, [baseColor, isValid]);

  // Generate the accent color scale when accent color changes
  useEffect(() => {
    if (isAccentValid) {
      try {
        let colorToUse = accentColor;
        // Add a hash if it doesn't already exist
        if (!colorToUse.startsWith('#')) {
          colorToUse = `#${colorToUse}`;
        }
        const scale = generateColorScale(colorToUse);
        setAccentColorScale(scale);
        setAccentError(null);
      } catch (err) {
        setAccentError(
          'Error generating accent color scale. Check your color format.'
        );
      }
    }
  }, [accentColor, isAccentValid]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">
          Design System Color Generator
        </h1>
        <p className="text-lg mb-8">
          Enter base colors to generate complete color scales for your design
          system.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          {/* Primary Color Input */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Primary Color</h2>
            <div className="flex items-center gap-4 mb-2">
              <label htmlFor="colorInput" className="text-lg font-medium">
                Base:
              </label>
              <div className="flex flex-1 rounded-md overflow-hidden border-2 focus-within:border-blue-500 transition-colors">
                <input
                  type="text"
                  id="colorInput"
                  value={baseColor}
                  onChange={handleColorChange}
                  placeholder="Enter hex color (e.g. #3b82f6)"
                  className="flex-1 p-3 outline-none"
                />
                <div
                  className="w-12 border-l"
                  style={{ backgroundColor: isValid ? baseColor : '#cccccc' }}
                ></div>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}

            <div className="flex items-center gap-2 mt-4">
              <input
                type="color"
                value={isValid ? baseColor : '#cccccc'}
                onChange={(e) => setBaseColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
              <span className="text-sm text-gray-600">Or pick a color</span>
            </div>
          </div>

          {/* Accent Color Input */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Accent Color</h2>
            <div className="flex items-center gap-4 mb-2">
              <label htmlFor="accentColorInput" className="text-lg font-medium">
                Base:
              </label>
              <div className="flex flex-1 rounded-md overflow-hidden border-2 focus-within:border-blue-500 transition-colors">
                <input
                  type="text"
                  id="accentColorInput"
                  value={accentColor}
                  onChange={handleAccentColorChange}
                  placeholder="Enter hex color (e.g. #f59e0b)"
                  className="flex-1 p-3 outline-none"
                />
                <div
                  className="w-12 border-l"
                  style={{
                    backgroundColor: isAccentValid ? accentColor : '#cccccc',
                  }}
                ></div>
              </div>
            </div>

            {accentError && (
              <div className="text-red-500 text-sm mt-1">{accentError}</div>
            )}

            <div className="flex items-center gap-2 mt-4">
              <input
                type="color"
                value={isAccentValid ? accentColor : '#cccccc'}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
              <span className="text-sm text-gray-600">Or pick a color</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary Color Scale */}
      {isValid && Object.keys(colorScale).length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Primary Color Scale
          </h2>
          <p className="text-sm text-center mb-6">
            Click on any color chip to copy its hex value
          </p>
          <ColorScaleDisplay colorScale={colorScale} />
        </div>
      )}

      {/* Accent Color Scale */}
      {isAccentValid && Object.keys(accentColorScale).length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Accent Color Scale
          </h2>
          <p className="text-sm text-center mb-6">
            Click on any color chip to copy its hex value
          </p>
          <ColorScaleDisplay colorScale={accentColorScale} />
        </div>
      )}

      {/* Neutral Color Scale */}
      {isValid && Object.keys(neutralColorScale).length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Neutral Color Scale{' '}
            <span className="text-sm font-normal">(derived from primary)</span>
          </h2>
          <p className="text-sm text-center mb-6">
            Harmonious grey tones derived from your primary color for UI
            elements
          </p>
          <ColorScaleDisplay colorScale={neutralColorScale} />
        </div>
      )}

      {/* Design System Preview */}
      {isValid &&
        isAccentValid &&
        Object.keys(colorScale).length > 0 &&
        Object.keys(accentColorScale).length > 0 && (
          <DesignSystemPreview
            primaryColor={baseColor}
            accentColor={accentColor}
            primaryColorScale={colorScale}
            accentColorScale={accentColorScale}
            neutralColorScale={neutralColorScale}
          />
        )}

      {/* Code Export */}
      {isValid &&
        isAccentValid &&
        Object.keys(colorScale).length > 0 &&
        Object.keys(accentColorScale).length > 0 &&
        Object.keys(neutralColorScale).length > 0 && (
          <CodeExport
            primaryColorScale={colorScale}
            accentColorScale={accentColorScale}
            neutralColorScale={neutralColorScale}
          />
        )}
    </div>
  );
}
