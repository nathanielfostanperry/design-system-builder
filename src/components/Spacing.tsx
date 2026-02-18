'use client';

import React from 'react';
import {
  useDesignSystem,
  SPACING_OPTIONS,
} from '@/context/DesignSystemContext';

export default function Spacing() {
  const { spacing, setSpacing, isDarkMode, primaryColorScale, neutralColorScale } = useDesignSystem();

  const handleClick = () => {
    const currentIndex = SPACING_OPTIONS.findIndex(
      (option) => option.name === spacing.name
    );
    const nextIndex = (currentIndex + 1) % SPACING_OPTIONS.length;
    setSpacing(SPACING_OPTIONS[nextIndex]);
  };

  const textColors = {
    primary: isDarkMode ? neutralColorScale['100'] : neutralColorScale['900'],
    secondary: isDarkMode ? neutralColorScale['300'] : neutralColorScale['600'],
    tertiary: isDarkMode ? neutralColorScale['400'] : neutralColorScale['500'],
  };

  const borderColor = isDarkMode
    ? `rgba(255, 255, 255, 0.1)`
    : `rgba(0, 0, 0, 0.1)`;

  const bgColor = isDarkMode
    ? neutralColorScale['800']
    : 'white';

  return (
    <div>
      <label
        className="block text-xs font-medium mb-2"
        style={{ color: textColors.secondary }}
      >
        Spacing
      </label>
      <button
        onClick={handleClick}
        className="w-full flex items-center justify-between px-3 py-2 border rounded-md transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-1"
        style={{
          backgroundColor: bgColor,
          borderColor: borderColor,
          color: textColors.primary,
        }}
      >
        <span className="text-sm">
          {spacing.label}
        </span>
        <div className={`flex ${spacing.name}`}>
          <div
            className="w-4 h-4"
            style={{
              backgroundColor: primaryColorScale['500'],
            }}
          />
          <div
            className="w-4 h-4"
            style={{
              backgroundColor: primaryColorScale['500'],
            }}
          />
        </div>
      </button>
    </div>
  );
}
