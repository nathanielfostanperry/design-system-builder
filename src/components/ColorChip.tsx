'use client';

import React, { useState } from 'react';
import chroma from 'chroma-js';

type CopyFormat = 'hex' | 'oklch';

interface ColorChipProps {
  color: string;
  label: string;
  size?: 'sm' | 'md' | 'lg';
}

function hexToOklchCss(hex: string): string | null {
  try {
    const c = chroma(hex);
    const oklch = c.css('oklch');
    return oklch ?? null;
  } catch {
    return null;
  }
}

const ColorChip: React.FC<ColorChipProps> = ({ color, label, size = 'md' }) => {
  const [copiedFormat, setCopiedFormat] = useState<CopyFormat | null>(null);

  const oklchValue = hexToOklchCss(color);

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
    console.warn('Invalid color provided to ColorChip:', color);
  }

  const handleCopy = async (value: string, format: CopyFormat) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Color swatch */}
      <div
        className={`${chipSize} rounded-lg flex-shrink-0 shadow-sm ring-1 ring-black/5 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer`}
        style={{ backgroundColor: color }}
        onClick={() => handleCopy(color, 'hex')}
        title="Click to copy hex"
      >
        <span className={`text-xs font-semibold ${textColor}`}>{label}</span>
      </div>

      {/* Value display: hex and OKLCH, each clickable to copy */}
      <div className="mt-2 w-full flex flex-col gap-1 min-w-0">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); handleCopy(color, 'hex'); }}
          className="w-full text-left text-[11px] font-mono truncate px-1.5 py-0.5 rounded hover:opacity-80 transition-opacity opacity-75"
          style={{ color: 'inherit' }}
          title="Copy hex"
        >
          {color.toUpperCase()}
        </button>
        {oklchValue && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); handleCopy(oklchValue, 'oklch'); }}
            className="w-full text-left text-[11px] font-mono truncate px-1.5 py-0.5 rounded hover:opacity-80 transition-opacity opacity-75"
            style={{ color: 'inherit' }}
            title="Copy OKLCH"
          >
            {oklchValue.replace(/^oklch\(|\)$/g, '')}
          </button>
        )}
        {copiedFormat && (
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
            Copied {copiedFormat.toUpperCase()}!
          </span>
        )}
      </div>
    </div>
  );
};

export default ColorChip;
