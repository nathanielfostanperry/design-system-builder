import React, { useState, useEffect } from 'react';
import ColorScaleDisplay from './ColorScaleDisplay';
import BezierCurveEditor from './BezierCurveEditor';
import { generateColorScale } from '@/utils/colorUtils';

interface ColorScaleEditorProps {
  baseColor: string;
  initialColorScale?: Record<string, string>;
  onColorScaleChange?: (colorScale: Record<string, string>) => void;
  title?: string;
}

const ColorScaleEditor: React.FC<ColorScaleEditorProps> = ({
  baseColor,
  initialColorScale,
  onColorScaleChange,
  title = 'Color Scale',
}) => {
  // If no initial color scale is provided, generate one
  const [colorScale, setColorScale] = useState<Record<string, string>>(() => {
    if (initialColorScale && Object.keys(initialColorScale).length > 0) {
      return initialColorScale;
    }
    // Generate a default color scale if none is provided
    return generateColorScale(baseColor);
  });

  // Handle changes from either curve editor
  const handleCurveChange = (
    newColorScale: Record<string, string>,
    range: [string, string]
  ) => {
    setColorScale(newColorScale);
    if (onColorScaleChange) onColorScaleChange(newColorScale);
  };

  // Re-generate color scale when base color changes
  useEffect(() => {
    if (!initialColorScale || Object.keys(initialColorScale).length === 0) {
      const newScale = generateColorScale(baseColor);
      setColorScale(newScale);
      if (onColorScaleChange) onColorScaleChange(newScale);
    }
  }, [baseColor]);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6 text-center">{title}</h2>

      {/* Color Chips */}
      {Object.keys(colorScale).length > 0 && (
        <div className="mb-8">
          <p className="text-sm text-center mb-6">
            Drag the handles to adjust your color curves
          </p>
          <ColorScaleDisplay colorScale={colorScale} />
        </div>
      )}

      {/* Curve Editors */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Light values editor (50-500) */}
        <div>
          <BezierCurveEditor
            baseColor={baseColor}
            onChange={handleCurveChange}
            label="Light Values (50-500)"
            width={400}
            height={340}
            range={['50', '500']}
            existingColorScale={colorScale}
          />

          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm">
            <h3 className="font-medium mb-2">Light Values Tips:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Control the progression from white to mid-tones</li>
              <li>Create subtle light tones with a flatter curve</li>
              <li>Increase contrast with a steeper curve</li>
            </ul>
          </div>
        </div>

        {/* Dark values editor (600-950) */}
        <div>
          <BezierCurveEditor
            baseColor={baseColor}
            onChange={handleCurveChange}
            label="Dark Values (600-950)"
            width={400}
            height={340}
            range={['600', '950']}
            existingColorScale={colorScale}
          />

          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-sm">
            <h3 className="font-medium mb-2">Dark Values Tips:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Control the progression from mid-tones to black</li>
              <li>Increase readability with sufficient contrast</li>
              <li>Create accessible dark UIs with careful curve shaping</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-600">
        <p>
          The combined effect of both curves creates your complete color scale
        </p>
      </div>
    </div>
  );
};

export default ColorScaleEditor;
