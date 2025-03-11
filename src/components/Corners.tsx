'use client';

import React from 'react';
import { useDesignSystem, RADIUS_OPTIONS } from '@/context/DesignSystemContext';

export default function Corners() {
  const { radius, setRadius } = useDesignSystem();

  const handleClick = () => {
    const currentIndex = RADIUS_OPTIONS.findIndex(
      (option) => option.name === radius.name
    );
    const nextIndex = (currentIndex + 1) % RADIUS_OPTIONS.length;
    setRadius(RADIUS_OPTIONS[nextIndex]);
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Border Radius</h3>
      <div className="flex items-center gap-4">
        <button
          onClick={handleClick}
          className={`w-16 h-16 bg-red-600 hover:bg-primary-700 transition-all ${radius.name}`}
        />
        <span className="text-sm text-gray-600">{radius.label}</span>
      </div>
    </div>
  );
}
