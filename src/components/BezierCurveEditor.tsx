'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { CurveControlPoint } from '../utils/colorUtils';

export interface BezierCurveEditorProps {
  width: number;
  height: number;
  onChange: (points: { x: number; y: number }[]) => void;
  curveType: 'lightness' | 'chroma';
}

const BezierCurveEditor: React.FC<BezierCurveEditorProps> = ({
  width = 320,
  height = 320,
  onChange,
  curveType = 'lightness',
}) => {
  // Create initial control points for a cubic bezier curve
  const [points, setPoints] = useState<{ x: number; y: number }[]>([
    { x: 0, y: height * 0.1 }, // Start point (top left - high lightness or saturation)
    { x: width * 0.33, y: height * 0.3 }, // Control point 1
    { x: width * 0.67, y: height * 0.7 }, // Control point 2
    { x: width, y: height * 0.9 }, // End point (bottom right - low lightness or saturation)
  ]);

  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  const [notifiedPoints, setNotifiedPoints] = useState<string>('');

  const svgRef = useRef<SVGSVGElement>(null);

  // Notify parent of control point changes
  const notifyControlPointChanges = useCallback(() => {
    // Create a string representation of current points to check for changes
    const pointsString = JSON.stringify(points);

    // Only notify if points have changed
    if (pointsString !== notifiedPoints) {
      onChange(points);
      setNotifiedPoints(pointsString);
    }
  }, [points, onChange, notifiedPoints]);

  // Handle initial notification
  useEffect(() => {
    notifyControlPointChanges();
  }, [notifyControlPointChanges]);

  // Handle mouse down on a control point
  const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActivePointIndex(index);
  };

  // Handle mouse move to update control point position
  const handleMouseMove = (e: MouseEvent) => {
    if (activePointIndex === null || !svgRef.current) return;

    const svgRect = svgRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(width, e.clientX - svgRect.left));
    const y = Math.max(0, Math.min(height, e.clientY - svgRect.top));

    // Update the point position
    const newPoints = [...points];

    // Special handling for end points - only allow vertical movement
    if (activePointIndex === 0) {
      newPoints[activePointIndex] = { x: 0, y };
    } else if (activePointIndex === points.length - 1) {
      newPoints[activePointIndex] = { x: width, y };
    } else {
      newPoints[activePointIndex] = { x, y };
    }

    setPoints(newPoints);
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    if (activePointIndex !== null) {
      setActivePointIndex(null);
      notifyControlPointChanges();
    }
  };

  // Set up global mouse event listeners
  useEffect(() => {
    if (activePointIndex !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activePointIndex, handleMouseMove]);

  // Generate the path for the bezier curve
  const getPath = () => {
    if (points.length !== 4) return '';

    const [p0, p1, p2, p3] = points;
    return `M ${p0.x},${p0.y} C ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;
  };

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="border border-gray-300 bg-white"
      >
        {/* Grid lines */}
        <g className="grid-lines">
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={height * (i / 4)}
              x2={width}
              y2={height * (i / 4)}
              stroke="#f0f0f0"
              strokeWidth="1"
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={width * (i / 4)}
              y1="0"
              x2={width * (i / 4)}
              y2={height}
              stroke="#f0f0f0"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* Curve */}
        <path d={getPath()} fill="none" stroke="#2563eb" strokeWidth="2" />

        {/* Control points */}
        {points.map((point, index) => (
          <g key={index}>
            {/* Control point handles */}
            {index > 0 && index < points.length - 1 && (
              <line
                x1={points[index - 1].x}
                y1={points[index - 1].y}
                x2={point.x}
                y2={point.y}
                stroke="#94a3b8"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            )}
            {index < points.length - 1 && (
              <line
                x1={point.x}
                y1={point.y}
                x2={points[index + 1].x}
                y2={points[index + 1].y}
                stroke="#94a3b8"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            )}

            {/* Control point */}
            <circle
              cx={point.x}
              cy={point.y}
              r={index === 0 || index === points.length - 1 ? 6 : 6}
              fill="white"
              stroke={activePointIndex === index ? '#2563eb' : '#64748b'}
              strokeWidth="2"
              onMouseDown={handleMouseDown(index)}
              style={{ cursor: 'pointer' }}
            />
          </g>
        ))}

        {/* Labels */}
        <text x="10" y="20" fontSize="12" fill="#64748b">
          50
        </text>
        <text x={width - 30} y="20" fontSize="12" fill="#64748b">
          950
        </text>

        {curveType === 'lightness' ? (
          <>
            <text x="10" y={height - 10} fontSize="12" fill="#64748b">
              Darker
            </text>
            <text x="10" y="20" fontSize="12" fill="#64748b">
              Lighter
            </text>
          </>
        ) : (
          <>
            <text x="10" y={height - 10} fontSize="12" fill="#64748b">
              Less Saturated
            </text>
            <text x="10" y="20" fontSize="12" fill="#64748b">
              More Saturated
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

export default BezierCurveEditor;
