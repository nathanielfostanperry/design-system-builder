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
    radius,
    borderWidth,
    setBorderWidth,
    borderOpacity,
    setBorderOpacity,
    primaryColorScale,
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

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Borders</h3>
      <div className="flex items-center gap-4">
        <button
          onClick={handleWidthClick}
          className={`w-16 h-16 ${radius.name} ${borderWidth.name}`}
          style={{
            borderColor: `${primaryColorScale['600']}${
              borderOpacity.name === '100' ? '' : borderOpacity.name
            }`,
          }}
        />
        <button
          onClick={handleOpacityClick}
          className={`w-16 h-16 ${radius.name} border-2`}
          style={{
            borderColor: `${primaryColorScale['600']}${
              borderOpacity.name === '100' ? '' : borderOpacity.name
            }`,
          }}
        />
      </div>
    </div>
  );
}
