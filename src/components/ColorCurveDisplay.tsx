import React from 'react';
import {
  generateCurvePoints,
  generateChromaPoints,
  getCurvePathDefinition,
} from '@/utils/colorUtils';

interface ColorCurveDisplayProps {
  colorScale: Record<string, string>;
  rangeStart: string;
  rangeEnd: string;
  type: 'curve' | 'chroma';
  title?: string;
  width?: number;
  height?: number;
}

const ColorCurveDisplay: React.FC<ColorCurveDisplayProps> = ({
  colorScale,
  rangeStart,
  rangeEnd,
  type,
  title,
  width = 240,
  height = 240,
}) => {
  const padding = 20;
  const drawWidth = width - padding * 2;
  const drawHeight = height - padding * 2;

  // Generate the points for the curve or chroma
  const getPathAndPoints = () => {
    if (type === 'curve') {
      const points = generateCurvePoints(colorScale, rangeStart, rangeEnd);
      const path = getCurvePathDefinition(points, width, height, padding);

      return {
        path,
        points: points.map((p) => ({
          x: padding + p.x * drawWidth,
          y: padding + p.y * drawHeight,
          color: colorScale[rangeStart],
        })),
      };
    } else {
      const points = generateChromaPoints(colorScale, rangeStart, rangeEnd);
      const curvePoints = points.map((p) => ({ x: p.x, y: p.y }));
      const path = getCurvePathDefinition(curvePoints, width, height, padding);

      return {
        path,
        points: points.map((p) => ({
          x: padding + p.x * drawWidth,
          y: padding + p.y * drawHeight,
          color: p.color,
        })),
      };
    }
  };

  const { path, points } = getPathAndPoints();

  return (
    <div className="flex flex-col items-center">
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      <div
        className="relative border border-gray-200 rounded-lg bg-gray-50"
        style={{ width, height }}
      >
        {/* Grid lines */}
        <svg width={width} height={height} className="absolute top-0 left-0">
          {/* Horizontal grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pos) => (
            <line
              key={`h-${pos}`}
              x1={padding}
              y1={padding + pos * drawHeight}
              x2={width - padding}
              y2={padding + pos * drawHeight}
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          ))}

          {/* Vertical grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pos) => (
            <line
              key={`v-${pos}`}
              x1={padding + pos * drawWidth}
              y1={padding}
              x2={padding + pos * drawWidth}
              y2={height - padding}
              stroke="#E5E7EB"
              strokeWidth="1"
            />
          ))}

          {/* The actual curve */}
          <path
            d={path}
            fill="none"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="5"
              fill={point.color}
              stroke="white"
              strokeWidth="1"
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default ColorCurveDisplay;
