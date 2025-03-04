'use client';

import React from 'react';
import ColorChip from './ColorChip';

interface ColorScaleDisplayProps {
  colorScale: Record<string, string>;
}

const ColorScaleDisplay: React.FC<ColorScaleDisplayProps> = ({
  colorScale,
}) => {
  const orderedShades = [
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '950',
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-11 gap-4">
        {orderedShades.map((shade) => (
          <ColorChip key={shade} color={colorScale[shade]} shade={shade} />
        ))}
      </div>
    </div>
  );
};

export default ColorScaleDisplay;
