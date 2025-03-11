'use client';

import React from 'react';
import { useDesignSystem, SHADOW_OPTIONS } from '@/context/DesignSystemContext';

export default function Shadows() {
  const { shadow, setShadow, radius } = useDesignSystem();

  const handleClick = () => {
    const currentIndex = SHADOW_OPTIONS.findIndex(
      (option) => option.name === shadow.name
    );
    const nextIndex = (currentIndex + 1) % SHADOW_OPTIONS.length;
    setShadow(SHADOW_OPTIONS[nextIndex]);
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Shadows</h3>
      <div className="flex items-center gap-4">
        <button
          onClick={handleClick}
          className={`w-16 h-16 bg-red-500 transition-all ${radius.name} ${shadow.name}`}
        />
        <span className="text-sm text-gray-600">{shadow.label}</span>
      </div>
    </div>
  );
}
