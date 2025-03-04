'use client';

import React from 'react';
import chroma from 'chroma-js';

interface ColorChipProps {
  color: string;
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

const ColorChip: React.FC<ColorChipProps> = ({ color, label, size = 'md' }) => {
  // Determine size classes
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const chipSize = sizeClasses[size];

  // Calculate text color for contrast (safely handle invalid colors)
  let textColor = 'text-white';
  try {
    const isLight = chroma(color).luminance() > 0.5;
    textColor = isLight ? 'text-gray-900' : 'text-white';
  } catch (e) {
    // If color is invalid, default to white text
    console.warn('Invalid color provided to ColorChip:', color);
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className={`${chipSize} rounded-md flex items-center justify-center mb-1 shadow-sm`}
        style={{ backgroundColor: color }}
      >
        <span className={`text-xs font-medium ${textColor}`}>{label}</span>
      </div>
    </div>
  );
};

export default ColorChip;
