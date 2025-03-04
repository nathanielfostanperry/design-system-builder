import React, { useState, useRef, useEffect } from 'react';
import {
  uiPointsToControlPoints,
  CurveControlPoint,
  generateCustomColorScale,
} from '@/utils/colorUtils';

interface Point {
  x: number;
  y: number;
}

interface ColorCurveEditorProps {
  baseColor: string;
  initialControlPoints?: Point[];
  width?: number;
  height?: number;
  onChange?: (colorScale: Record<string, string>) => void;
  onControlPointsChange?: (points: Point[]) => void;
  curveType: 'lightness' | 'saturation';
  label?: string;
}

const ColorCurveEditor: React.FC<ColorCurveEditorProps> = ({
  baseColor,
  initialControlPoints,
  width = 320,
  height = 240,
  onChange,
  onControlPointsChange,
  curveType = 'lightness',
  label = 'Lightness Curve',
}) => {
  const [points, setPoints] = useState<Point[]>(
    initialControlPoints || [
      { x: 0, y: 0.03 }, // 50 (almost white)
      { x: 0.25, y: 0.15 }, // ~200
      { x: 0.5, y: 0.44 }, // ~500
      { x: 0.75, y: 0.68 }, // ~700
      { x: 1, y: 0.86 }, // 950 (almost black)
    ]
  );
  const [activePointIndex, setActivePointIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const padding = 20;
  const drawWidth = width - padding * 2;
  const drawHeight = height - padding * 2;

  // Generate the path for the curve
  const generatePath = () => {
    if (points.length < 2) return '';

    const mappedPoints = points.map((point) => ({
      x: padding + point.x * drawWidth,
      y: padding + point.y * drawHeight,
    }));

    let path = `M ${mappedPoints[0].x},${mappedPoints[0].y}`;

    for (let i = 0; i < mappedPoints.length - 1; i++) {
      const current = mappedPoints[i];
      const next = mappedPoints[i + 1];

      const controlPointX1 = current.x + (next.x - current.x) * 0.5;
      const controlPointY1 = current.y;
      const controlPointX2 = next.x - (next.x - current.x) * 0.5;
      const controlPointY2 = next.y;

      path += ` C ${controlPointX1},${controlPointY1} ${controlPointX2},${controlPointY2} ${next.x},${next.y}`;
    }

    return path;
  };

  // Handle mouse down on a control point
  const handlePointMouseDown = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    setActivePointIndex(index);
  };

  // Handle mouse down on the SVG background (to add new points)
  const handleBackgroundClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (activePointIndex !== null) return; // Don't add point if we're dragging

    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const x = (e.clientX - svgRect.left - padding) / drawWidth;
      const y = (e.clientY - svgRect.top - padding) / drawHeight;

      // Only add if within bounds
      if (x >= 0 && x <= 1 && y >= 0 && y <= 1) {
        // Insert the point at the right position to maintain x-order
        const newPoints = [...points];

        // Find where to insert the new point
        let insertIndex = newPoints.length;
        for (let i = 0; i < newPoints.length; i++) {
          if (x < newPoints[i].x) {
            insertIndex = i;
            break;
          }
        }

        newPoints.splice(insertIndex, 0, { x, y });
        setPoints(newPoints);

        // Notify parent about change
        if (onControlPointsChange) onControlPointsChange(newPoints);
        updateColorScale(newPoints);
      }
    }
  };

  // Handle mouse move (for dragging points)
  const handleMouseMove = (e: MouseEvent) => {
    if (activePointIndex === null || !svgRef.current) return;

    const svgRect = svgRef.current.getBoundingClientRect();

    // Calculate new position
    let x = (e.clientX - svgRect.left - padding) / drawWidth;
    let y = (e.clientY - svgRect.top - padding) / drawHeight;

    // Constrain within bounds
    x = Math.max(0, Math.min(1, x));
    y = Math.max(0, Math.min(1, y));

    // Don't allow end points to move horizontally if they're the first or last
    if (activePointIndex === 0) x = 0;
    else if (activePointIndex === points.length - 1) x = 1;

    // Don't allow a point to move past its neighbors horizontally
    if (activePointIndex > 0) {
      x = Math.max(x, points[activePointIndex - 1].x + 0.01);
    }

    if (activePointIndex < points.length - 1) {
      x = Math.min(x, points[activePointIndex + 1].x - 0.01);
    }

    // Update point position
    const newPoints = [...points];
    newPoints[activePointIndex] = { x, y };
    setPoints(newPoints);

    // Notify parent about change
    if (onControlPointsChange) onControlPointsChange(newPoints);
    updateColorScale(newPoints);
  };

  // Handle mouse up (stop dragging)
  const handleMouseUp = () => {
    setActivePointIndex(null);
  };

  // Delete a point on double click
  const handlePointDoubleClick = (index: number) => () => {
    // Don't allow deleting the first or last point
    if (index === 0 || index === points.length - 1) return;

    const newPoints = [...points];
    newPoints.splice(index, 1);
    setPoints(newPoints);

    // Notify parent about change
    if (onControlPointsChange) onControlPointsChange(newPoints);
    updateColorScale(newPoints);
  };

  // Update the color scale based on current points
  const updateColorScale = (currentPoints: Point[]) => {
    if (!onChange) return;

    // Convert UI points to control points
    const controlPoints: CurveControlPoint[] = currentPoints.map((point) => ({
      position: point.x,
      lightness: 1 - point.y, // Invert Y because in UI 0 is top, in color theory 0 is dark
    }));

    // Generate custom color scale
    const colorScale = generateCustomColorScale(baseColor, controlPoints);
    onChange(colorScale);
  };

  // Set up event listeners
  useEffect(() => {
    if (activePointIndex !== null) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [activePointIndex, points]);

  // Update color scale on first render
  useEffect(() => {
    updateColorScale(points);
  }, [baseColor]);

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-lg font-medium mb-2">{label}</h3>
      <div
        className="relative border border-gray-200 rounded-lg bg-gray-50"
        style={{ width, height }}
      >
        <svg
          ref={svgRef}
          width={width}
          height={height}
          className="absolute top-0 left-0 cursor-crosshair"
          onClick={handleBackgroundClick}
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pos) => (
            <React.Fragment key={`grid-${pos}`}>
              <line
                x1={padding}
                y1={padding + pos * drawHeight}
                x2={width - padding}
                y2={padding + pos * drawHeight}
                stroke="#E5E7EB"
                strokeWidth="1"
              />
              <line
                x1={padding + pos * drawWidth}
                y1={padding}
                x2={padding + pos * drawWidth}
                y2={height - padding}
                stroke="#E5E7EB"
                strokeWidth="1"
              />
            </React.Fragment>
          ))}

          {/* The curve */}
          <path
            d={generatePath()}
            fill="none"
            stroke={curveType === 'lightness' ? '#000' : '#1E40AF'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Control points */}
          {points.map((point, index) => (
            <g key={index}>
              <circle
                cx={padding + point.x * drawWidth}
                cy={padding + point.y * drawHeight}
                r="6"
                fill={index === activePointIndex ? '#3B82F6' : 'white'}
                stroke={curveType === 'lightness' ? '#000' : '#1E40AF'}
                strokeWidth="2"
                className="cursor-move"
                onMouseDown={handlePointMouseDown(index)}
                onDoubleClick={handlePointDoubleClick(index)}
              />
              {index === 0 || index === points.length - 1 ? (
                <circle
                  cx={padding + point.x * drawWidth}
                  cy={padding + point.y * drawHeight}
                  r="3"
                  fill={curveType === 'lightness' ? '#000' : '#1E40AF'}
                />
              ) : null}
            </g>
          ))}
        </svg>
      </div>
      <div className="w-full flex justify-between text-xs mt-1 px-4 text-gray-600">
        <span>50</span>
        <span>500</span>
        <span>950</span>
      </div>
      <div className="mt-2 text-sm text-gray-600">
        <p>Double-click a point to delete it (except endpoints)</p>
        <p>Click anywhere to add a new control point</p>
      </div>
    </div>
  );
};

export default ColorCurveEditor;
