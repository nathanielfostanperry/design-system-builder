'use client';

import React, { useState } from 'react';

const RADIUS_CLASSES = [
  { name: 'rounded-none', label: 'None' },
  { name: 'rounded-sm', label: 'Small' },
  { name: 'rounded-lg', label: 'Large' },
  { name: 'rounded-xl', label: 'Extra Large' },
  { name: 'rounded-2xl', label: '2X Large' },
  { name: 'rounded-full', label: 'Full' },
];

export default function Corners() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {
    setCurrentIndex((prev) => (prev + 1) % RADIUS_CLASSES.length);
  };

  const currentClass = RADIUS_CLASSES[currentIndex];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Border Radius</h3>
      <div className="flex items-center gap-4">
        <button
          onClick={handleClick}
          className={`w-16 h-16 bg-red-600 hover:bg-red-700 transition-all ${currentClass.name}`}
        />
        <span className="text-sm text-gray-600">{currentClass.label}</span>
      </div>
    </div>
  );
}
