'use client';

import React from 'react';
import {
  generateCurvePoints,
  generateChromaPoints,
  getCurvePathDefinition,
} from '@/utils/colorUtils';

interface CurveChartProps {
  colorScale: Record<string, string>;
  rangeStart: string;
  rangeEnd: string;
  type: 'curve' | 'chroma';
  title: string;
  width?: number;
  height?: number;
}

const CurveChart: React.FC<CurveChartProps> = ({
  colorScale,
  rangeStart,
  rangeEnd,
  type,
  title,
  width = 300,
  height = 300,
}) => {
  // Get the curve points and path
  const getPathAndPoints = () => {
    if (type === 'curve') {
      const points = generateCurvePoints(colorScale, rangeStart, rangeEnd);
      const path = getCurvePathDefinition(points, width, height);
      return { points, path };
    } else {
      // Chroma chart
      const points = generateChromaPoints(colorScale, rangeStart, rangeEnd);
      const curvePoints = points.map((p) => ({ x: p.x, y: p.y }));
      const path = getCurvePathDefinition(curvePoints, width, height);
      return { points: curvePoints, path, colorPoints: points };
    }
  };

  const { points, path, colorPoints } = getPathAndPoints();

  return (
    <div>
      <h3 className="text-center font-medium text-lg mb-2">{title}</h3>
      <div
        className="bg-gray-50 rounded-lg border border-gray-200 relative"
        style={{ width, height }}
      >
        {/* Grid lines */}
        <svg width={width} height={height} className="absolute top-0 left-0">
          {/* Horizontal grid lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1={0}
              y1={i * (height / 10)}
              x2={width}
              y2={i * (height / 10)}
              stroke="#e5e5e5"
              strokeWidth={1}
            />
          ))}
          {/* Vertical grid lines */}
          {Array.from({ length: 10 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * (width / 10)}
              y1={0}
              x2={i * (width / 10)}
              y2={height}
              stroke="#e5e5e5"
              strokeWidth={1}
            />
          ))}
        </svg>

        {/* Curve and points */}
        <svg width={width} height={height} className="absolute top-0 left-0">
          {/* The curve path */}
          <path
            d={path}
            fill="none"
            stroke="#000"
            strokeWidth={2}
            strokeLinecap="round"
          />

          {/* Data points */}
          {points.map((point, i) => (
            <g key={i}>
              <circle
                cx={point.x * width}
                cy={point.y * height}
                r={5}
                fill="#000"
              />
              <line
                x1={point.x * width}
                y1={point.y * height}
                x2={point.x * width}
                y2={point.y * height + 20}
                stroke="#999"
                strokeWidth={1}
                strokeDasharray="2,2"
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

interface ColorCurveAnalysisProps {
  colorScale: Record<string, string>;
}

const ColorCurveAnalysis: React.FC<ColorCurveAnalysisProps> = ({
  colorScale,
}) => {
  if (!colorScale || Object.keys(colorScale).length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Color Curve Analysis
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Light values curve (50-500) */}
        <CurveChart
          colorScale={colorScale}
          rangeStart="50"
          rangeEnd="500"
          type="curve"
          title="50-400 curve"
        />

        {/* Light values chroma (50-500) */}
        <CurveChart
          colorScale={colorScale}
          rangeStart="50"
          rangeEnd="500"
          type="chroma"
          title="50-400 chroma"
        />

        {/* Dark values curve (600-950) */}
        <CurveChart
          colorScale={colorScale}
          rangeStart="600"
          rangeEnd="950"
          type="curve"
          title="600-950 curve"
        />

        {/* Dark values chroma (600-950) */}
        <CurveChart
          colorScale={colorScale}
          rangeStart="600"
          rangeEnd="950"
          type="chroma"
          title="600-950 chroma"
        />
      </div>

      <div className="mt-4 text-sm text-center text-gray-600">
        <p>
          These charts show how lightness and color saturation change across
          your color scale
        </p>
      </div>
    </div>
  );
};

export default ColorCurveAnalysis;
