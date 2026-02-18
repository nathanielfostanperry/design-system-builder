'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';

export const BORDER_WIDTH_OPTIONS = [
  { name: 'border-0', label: 'None' },
  { name: 'border', label: 'Default' },
  { name: 'border-2', label: 'Medium' },
  { name: 'border-4', label: 'Large' },
] as const;

export const BORDER_OPACITY_OPTIONS = [
  { name: '100', label: '100%' },
  { name: '75', label: '75%' },
  { name: '50', label: '50%' },
  { name: '25', label: '25%' },
] as const;

export default function Borders() {
  const {
    borderWidth,
    setBorderWidth,
    borderOpacity,
    setBorderOpacity,
    primaryColorScale,
    isDarkMode,
    neutralColorScale,
  } = useDesignSystem();

  const handleWidthClick = () => {
    const currentIndex = BORDER_WIDTH_OPTIONS.findIndex(
      (option) => option.name === borderWidth.name
    );
    const nextIndex = (currentIndex + 1) % BORDER_WIDTH_OPTIONS.length;
    setBorderWidth(BORDER_WIDTH_OPTIONS[nextIndex]);
  };

  const handleOpacityClick = () => {
    const currentIndex = BORDER_OPACITY_OPTIONS.findIndex(
      (option) => option.name === borderOpacity.name
    );
    const nextIndex = (currentIndex + 1) % BORDER_OPACITY_OPTIONS.length;
    setBorderOpacity(BORDER_OPACITY_OPTIONS[nextIndex]);
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

  const getBorderOpacity = () => {
    if (borderOpacity.name === '100') return '';
    return borderOpacity.name;
  };

  return (
    <div className="space-y-3">
      <div>
        <label
          className="block text-xs font-medium mb-2"
          style={{ color: textColors.secondary }}
        >
          Border Width
        </label>
        <button
          onClick={handleWidthClick}
          className="w-full flex items-center justify-between px-3 py-2 border rounded-md transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-1"
          style={{
            backgroundColor: bgColor,
            borderColor: borderColor,
            color: textColors.primary,
          }}
        >
          <span className="text-sm">{borderWidth.label}</span>
          <div
            className={`w-8 h-8 rounded-md ${borderWidth.name}`}
            style={{
              borderColor: `${primaryColorScale['600']}${getBorderOpacity()}`,
              backgroundColor: 'transparent',
            }}
          />
        </button>
      </div>

      <div>
        <label
          className="block text-xs font-medium mb-2"
          style={{ color: textColors.secondary }}
        >
          Border Opacity
        </label>
        <button
          onClick={handleOpacityClick}
          className="w-full flex items-center justify-between px-3 py-2 border rounded-md transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-1"
          style={{
            backgroundColor: bgColor,
            borderColor: borderColor,
            color: textColors.primary,
          }}
        >
          <span className="text-sm">{borderOpacity.label}</span>
          <div
            className="w-8 h-8 rounded-md border-2"
            style={{
              borderColor: `${primaryColorScale['600']}${getBorderOpacity()}`,
              backgroundColor: 'transparent',
            }}
          />
        </button>
      </div>
    </div>
  );
}
