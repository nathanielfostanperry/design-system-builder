'use client';

import React from 'react';
import {
  useDesignSystem,
  SPACING_OPTIONS,
} from '@/context/DesignSystemContext';

export default function Spacing() {
  const { spacing, setSpacing } = useDesignSystem();

  const handleClick = () => {
    const currentIndex = SPACING_OPTIONS.findIndex(
      (option) => option.name === spacing.name
    );
    const nextIndex = (currentIndex + 1) % SPACING_OPTIONS.length;
    setSpacing(SPACING_OPTIONS[nextIndex]);
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Spacing</h3>
      <div
        onClick={handleClick}
        className={`flex ${spacing.name} bg-red-100 p-4 rounded cursor-pointer`}
      >
        <div className="w-16 h-16 bg-red-600" />
        <div className="w-16 h-16 bg-red-600" />
      </div>
      <span className="text-sm text-gray-600 mt-2 block">{spacing.label}</span>
    </div>
  );
}
