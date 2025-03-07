'use client';

import React, { useState, useEffect } from 'react';
import { useDesignSystem, FONT_OPTIONS } from '@/context/DesignSystemContext';
import type { FontOption } from '@/types/designSystem';

type FontSelectProps = {
  label: string;
  value: FontOption;
  onChange: (font: FontOption) => void;
};

export default function FontSelect({
  label,
  value,
  onChange,
}: FontSelectProps) {
  const { radius } = useDesignSystem();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );

  const categories = [
    'serif',
    'sans-serif',
    'display',
    'handwriting',
    'monospace',
  ];

  // Filter fonts based on search and categories
  const filteredFonts = FONT_OPTIONS.filter((font) => {
    const matchesSearch = font.family
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategories.size === 0 || selectedCategories.has(font.category);
    return matchesSearch && matchesCategory;
  });

  // Load selected font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${value.family.replace(
      ' ',
      '+'
    )}:wght@${value.variants.join(';')}&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [value]);

  const toggleCategory = (category: string) => {
    const newCategories = new Set(selectedCategories);
    if (newCategories.has(category)) {
      newCategories.delete(category);
    } else {
      newCategories.add(category);
    }
    setSelectedCategories(newCategories);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-2 bg-white border border-gray-300 flex justify-between items-center ${radius.name}`}
      >
        <span style={{ fontFamily: value.family }}>{value.family}</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute z-10 w-full mt-1 bg-white border border-gray-300 ${radius.name}`}
        >
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search fonts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full px-3 py-2 border border-gray-300 ${radius.name}`}
            />
          </div>

          <div className="p-2 border-b border-gray-200 flex flex-wrap gap-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.has(category)}
                  onChange={() => toggleCategory(category)}
                  className="rounded text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredFonts.map((font) => (
              <button
                key={font.family}
                onClick={() => {
                  onChange(font);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-gray-100 ${
                  value.family === font.family ? 'bg-primary-50' : ''
                }`}
                style={{ fontFamily: font.family }}
              >
                <span className="text-lg">{font.family}</span>
                <span className="text-sm text-gray-500 ml-2">
                  {font.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
