import React from 'react';
import ColorCurveDisplay from './ColorCurveDisplay';

interface ColorCurvesSectionProps {
  colorScale: Record<string, string>;
}

const ColorCurvesSection: React.FC<ColorCurvesSectionProps> = ({
  colorScale,
}) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Color Curve Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Light to medium curve */}
        <ColorCurveDisplay
          colorScale={colorScale}
          rangeStart="50"
          rangeEnd="400"
          type="curve"
          title="50-400 curve"
        />

        {/* Light to medium chroma */}
        <ColorCurveDisplay
          colorScale={colorScale}
          rangeStart="50"
          rangeEnd="400"
          type="chroma"
          title="50-400 chroma"
        />

        {/* Medium to dark curve */}
        <ColorCurveDisplay
          colorScale={colorScale}
          rangeStart="600"
          rangeEnd="950"
          type="curve"
          title="600-950 curve"
        />

        {/* Medium to dark chroma */}
        <ColorCurveDisplay
          colorScale={colorScale}
          rangeStart="600"
          rangeEnd="950"
          type="chroma"
          title="600-950 chroma"
        />
      </div>
      <div className="text-sm text-gray-600 mt-4">
        <p>
          <strong>Curves:</strong> Visualize how the lightness changes across
          shades. Smoother curves indicate better visual progression.
        </p>
        <p>
          <strong>Chroma:</strong> Shows how the saturation varies across the
          range. Points represent selected shades in the range.
        </p>
      </div>
    </div>
  );
};

export default ColorCurvesSection;
