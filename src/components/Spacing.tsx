'use client';

import React, { useState } from 'react';

const GAP_CLASSES = [
  { name: 'gap-0', label: 'None' },
  { name: 'gap-2', label: 'Small' },
  { name: 'gap-4', label: 'Medium' },
  { name: 'gap-8', label: 'Large' },
  { name: 'gap-16', label: 'Extra Large' },
];

export default function Spacing() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {
    setCurrentIndex((prev) => (prev + 1) % GAP_CLASSES.length);
  };

  const currentClass = GAP_CLASSES[currentIndex];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Spacing</h3>
      <div
        onClick={handleClick}
        className={`flex ${currentClass.name} bg-red-100 p-4 rounded cursor-pointer`}
      >
        <div className="w-16 h-16 bg-red-600" />
        <div className="w-16 h-16 bg-red-600" />
      </div>
      <span className="text-sm text-gray-600 mt-2 block">
        {currentClass.label}
      </span>
    </div>
  );
}
