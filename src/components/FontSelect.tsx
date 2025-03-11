'use client';

import React, { useState, useEffect } from 'react';
import { useDesignSystem, FONT_OPTIONS } from '@/context/DesignSystemContext';
import type { FontOption, FontWeight, FontSize } from '@/types/designSystem';

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

  const weights: FontWeight[] = ['thin', 'regular', 'bold', 'extrabold'];
  const sizes: FontSize[] = ['xxs', 'xs', 'sm', 'regular', 'lg', 'xl', 'xxl'];

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

  const handleFontChange = (newFont: FontOption) => {
    onChange({
      ...newFont,
      weight: value.weight,
      size: value.size,
    });
  };

  const handleWeightChange = (weight: FontWeight) => {
    onChange({
      ...value,
      weight,
    });
  };

  const handleSizeChange = (size: FontSize) => {
    onChange({
      ...value,
      size,
    });
  };

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="flex flex-col gap-2">
        {/* Font Family Select */}
        <div className="relative">
          <button
            className={`w-full flex items-center justify-between px-3 py-2 border rounded-md shadow-sm ${
              radius.name
            } ${
              isOpen ? 'border-blue-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span style={{ fontFamily: value.family }}>{value.family}</span>
            <span className="ml-2">▼</span>
          </button>

          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              <div className="p-2">
                <input
                  type="text"
                  placeholder="Search fonts..."
                  className="w-full px-2 py-1 border rounded"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex flex-wrap gap-1 mt-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`px-2 py-1 text-sm rounded ${
                        selectedCategories.has(category)
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200'
                      }`}
                      onClick={() => toggleCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filteredFonts.map((font) => (
                  <button
                    key={font.family}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    style={{ fontFamily: font.family }}
                    onClick={() => {
                      handleFontChange(font);
                      setIsOpen(false);
                    }}
                  >
                    {font.family}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Font Weight Select */}
        <select
          value={value.weight}
          onChange={(e) => handleWeightChange(e.target.value as FontWeight)}
          className={`px-3 py-2 border rounded-md shadow-sm ${radius.name} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {weights.map((weight) => (
            <option key={weight} value={weight}>
              {weight.charAt(0).toUpperCase() + weight.slice(1)}
            </option>
          ))}
        </select>

        {/* Font Size Select */}
        <select
          value={value.size}
          onChange={(e) => handleSizeChange(e.target.value as FontSize)}
          className={`px-3 py-2 border rounded-md shadow-sm ${radius.name} focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
