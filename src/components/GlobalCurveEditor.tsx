'use client';

import React, { useState, useEffect } from 'react';
import {
  CurveControlPoint,
  uiPointsToControlPoints,
  generateCurvePoints,
  generateChromaPoints,
  applyColorCurves,
} from '../utils/colorUtils';
import BezierCurveEditor from './BezierCurveEditor';
import { useDesignSystem } from '../context/DesignSystemContext';
import ColorChip from './ColorChip';

// The height of the curve editor
const EDITOR_HEIGHT = 200;

const GlobalCurveEditor: React.FC = () => {
  const {
    primaryColor,
    setPrimaryColorScale,
    primaryColorScale,
    accentColor,
    setAccentColorScale,
    accentColorScale,
    neutralColor,
    setNeutralColorScale,
    neutralColorScale,
  } = useDesignSystem();

  // State for curve control points
  const [lightnessControlPoints, setLightnessControlPoints] = useState<
    CurveControlPoint[]
  >([]);
  const [chromaControlPoints, setChromaControlPoints] = useState<
    CurveControlPoint[]
  >([]);

  // Handle lightness curve changes
  const handleLightnessChange = (points: { x: number; y: number }[]) => {
    const controlPoints = uiPointsToControlPoints(points, false);
    setLightnessControlPoints(controlPoints);
  };

  // Handle chroma curve changes
  const handleChromaChange = (points: { x: number; y: number }[]) => {
    const controlPoints = uiPointsToControlPoints(points, true);
    setChromaControlPoints(controlPoints);
  };

  // Apply curves to colors when control points change or base colors change
  useEffect(() => {
    // Skip if no control points are set yet
    if (primaryColor) {
      // Apply curves to primary color
      const primaryScale = applyColorCurves(
        primaryColor,
        lightnessControlPoints,
        chromaControlPoints
      );
      setPrimaryColorScale(primaryScale);
    }

    if (accentColor) {
      // Apply curves to accent color
      const accentScale = applyColorCurves(
        accentColor,
        lightnessControlPoints,
        chromaControlPoints
      );
      setAccentColorScale(accentScale);
    }

    // We are no longer updating neutrals here - they are hardcoded grayscale
  }, [
    primaryColor,
    accentColor,
    lightnessControlPoints,
    chromaControlPoints,
    setPrimaryColorScale,
    setAccentColorScale,
  ]);

  // Render color chips for a specific color scale
  const renderColorChips = (
    colorScale: Record<string, string>,
    shades: string[],
    label: string
  ) => (
    <div>
      <h4 className="text-sm font-medium text-gray-500 mb-2">{label}</h4>
      <div className="flex flex-wrap gap-2">
        {shades.map((shade) => (
          <ColorChip
            key={shade}
            color={colorScale[shade] || '#ffffff'}
            label={shade}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Global Color Curves</h2>

      <div className="space-y-8 grid grid-cols-2">
        {/* Lightness Curve Editor */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Lightness Curve</h3>
          <p className="text-sm text-gray-600 mb-4">
            Adjust how lightness changes across the entire color scale (50-950)
          </p>
          <BezierCurveEditor
            width={EDITOR_HEIGHT}
            height={EDITOR_HEIGHT}
            onChange={handleLightnessChange}
            curveType="lightness"
          />
        </div>

        {/* Chroma Curve Editor */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Chroma Curve</h3>
          <p className="text-sm text-gray-600 mb-4">
            Adjust how saturation changes across the entire color scale (50-950)
          </p>
          <BezierCurveEditor
            width={EDITOR_HEIGHT}
            height={EDITOR_HEIGHT}
            onChange={handleChromaChange}
            curveType="chroma"
          />
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-700">Tips:</h4>
        <ul className="text-sm text-blue-700 list-disc list-inside">
          <li>
            Left side of curve = lighter shades (50), right side = darker shades
            (950)
          </li>
          <li>For lightness: Higher = lighter colors, Lower = darker colors</li>
          <li>For chroma: Higher = more saturated, Lower = less saturated</li>
          <li>These curves affect ALL colors (primary, accent, neutral)</li>
        </ul>
      </div>

      {/* Color Chip Previews */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* Primary color chips */}
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-medium mb-4">Primary</h3>
          {renderColorChips(
            primaryColorScale,
            ['50', '100', '200', '300', '400', '500'],
            'Light Shades'
          )}
          <div className="mt-4">
            {renderColorChips(
              primaryColorScale,
              ['600', '700', '800', '900', '950'],
              'Dark Shades'
            )}
          </div>
        </div>

        {/* Accent color chips */}
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-medium mb-4">Accent</h3>
          {renderColorChips(
            accentColorScale,
            ['50', '100', '200', '300', '400', '500'],
            'Light Shades'
          )}
          <div className="mt-4">
            {renderColorChips(
              accentColorScale,
              ['600', '700', '800', '900', '950'],
              'Dark Shades'
            )}
          </div>
        </div>

        {/* Neutral color chips */}
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-medium mb-4">Neutral</h3>
          {renderColorChips(
            neutralColorScale,
            ['50', '100', '200', '300', '400', '500'],
            'Light Shades'
          )}
          <div className="mt-4">
            {renderColorChips(
              neutralColorScale,
              ['600', '700', '800', '900', '950'],
              'Dark Shades'
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalCurveEditor;
