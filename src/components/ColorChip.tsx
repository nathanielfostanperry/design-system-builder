'use client';

import React, { useState } from 'react';
import chroma from 'chroma-js';

interface ColorChipProps {
  color: string;
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

const ColorChip: React.FC<ColorChipProps> = ({ color, label, size = 'md' }) => {
  const [copied, setCopied] = useState(false);

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

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(true);

      // Reset the copied state after 1.5 seconds
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex flex-col items-center relative">
      <div
        className={`${chipSize} rounded-md flex flex-col items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95 shadow-sm`}
        style={{ backgroundColor: color }}
        onClick={handleClick}
        title="Click to copy hex code"
      >
        <span className={`text-xs font-medium ${textColor}`}>{label}</span>
        <span className={`text-xs font-mono mt-1 ${textColor} opacity-80`}>
          {color}
        </span>
      </div>
      {copied && (
        <div className="absolute -bottom-6 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-90">
          Copied!
        </div>
      )}
    </div>
  );
};

export default ColorChip;
