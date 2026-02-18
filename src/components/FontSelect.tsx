'use client';

import React, { useState, useEffect } from 'react';
import * as Select from '@radix-ui/react-select';
import { useDesignSystem, FONT_OPTIONS } from '@/context/DesignSystemContext';
import type { FontOption, FontWeight, FontSize } from '@/types/designSystem';
// Simple chevron and check icons
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M2 6L5 9L10 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

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
  const { isDarkMode, primaryColorScale, neutralColorScale } = useDesignSystem();
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
    <div className="relative w-full">
      <label
        className="block text-sm font-medium mb-2"
        style={{ color: textColors.primary }}
      >
        {label}
      </label>
      <div className="flex flex-col gap-2">
        {/* Font Family Select */}
        <Select.Root
          value={value.family}
          onValueChange={(family) => {
            const font = FONT_OPTIONS.find(f => f.family === family);
            if (font) {
              handleFontChange(font);
            }
          }}
        >
          <Select.Trigger
            className="w-full flex items-center justify-between px-3 py-2 border rounded-md outline-none transition-colors focus:ring-2 focus:ring-offset-1"
            style={{
              backgroundColor: bgColor,
              borderColor: borderColor,
              color: textColors.primary,
              fontFamily: value.family,
              fontSize: '14px',
            }}
          >
            <Select.Value>{value.family}</Select.Value>
            <Select.Icon>
              <ChevronDownIcon className="w-4 h-4" />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content
              className="overflow-hidden bg-white border rounded-md shadow-lg z-50"
              style={{
                backgroundColor: bgColor,
                borderColor: borderColor,
              }}
            >
              <Select.Viewport className="p-2">
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Search fonts..."
                    className="w-full px-2 py-1.5 border rounded text-sm outline-none focus:ring-2 focus:ring-offset-1"
                    style={{
                      backgroundColor: isDarkMode ? neutralColorScale['900'] : 'white',
                      borderColor: borderColor,
                      color: textColors.primary,
                    }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`px-2 py-1 text-xs rounded transition-colors ${
                          selectedCategories.has(category)
                            ? 'text-white'
                            : ''
                        }`}
                        style={{
                          backgroundColor: selectedCategories.has(category)
                            ? primaryColorScale['500']
                            : isDarkMode ? neutralColorScale['700'] : 'rgba(0, 0, 0, 0.05)',
                          color: selectedCategories.has(category)
                            ? 'white'
                            : textColors.secondary,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCategory(category);
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  {filteredFonts.map((font) => (
                    <Select.Item
                      key={font.family}
                      value={font.family}
                      className="px-4 py-2 text-sm cursor-pointer outline-none hover:bg-opacity-10 data-[highlighted]:bg-opacity-10 transition-colors"
                      style={{
                        fontFamily: font.family,
                        color: textColors.primary,
                        backgroundColor: 'transparent',
                      }}
                    >
                      <Select.ItemText>{font.family}</Select.ItemText>
                      <Select.ItemIndicator className="absolute left-0 w-6 inline-flex items-center justify-center">
                        <CheckIcon className="w-4 h-4" />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </div>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>

        {/* Weight + Size side by side */}
        <div className="grid grid-cols-2 gap-2">
          {/* Font Weight Select */}
          <Select.Root
            value={value.weight}
            onValueChange={(weight) => handleWeightChange(weight as FontWeight)}
          >
            <Select.Trigger
              className="w-full flex items-center justify-between px-3 py-2 border rounded-md outline-none transition-colors focus:ring-2 focus:ring-offset-1"
              style={{
                backgroundColor: bgColor,
                borderColor: borderColor,
                color: textColors.primary,
                fontSize: '14px',
              }}
            >
              <Select.Value>
                {value.weight.charAt(0).toUpperCase() + value.weight.slice(1)}
              </Select.Value>
              <Select.Icon>
                <ChevronDownIcon className="w-4 h-4" />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content
                className="overflow-hidden border rounded-md shadow-lg z-50"
                style={{ backgroundColor: bgColor, borderColor: borderColor }}
              >
                <Select.Viewport className="p-1">
                  {weights.map((weight) => (
                    <Select.Item
                      key={weight}
                      value={weight}
                      className="px-4 py-2 text-sm cursor-pointer outline-none data-[highlighted]:bg-opacity-10 transition-colors"
                      style={{ color: textColors.primary, backgroundColor: 'transparent' }}
                    >
                      <Select.ItemText>
                        {weight.charAt(0).toUpperCase() + weight.slice(1)}
                      </Select.ItemText>
                      <Select.ItemIndicator className="absolute left-0 w-6 inline-flex items-center justify-center">
                        <CheckIcon className="w-4 h-4" />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>

          {/* Font Size Select */}
          <Select.Root
            value={value.size}
            onValueChange={(size) => handleSizeChange(size as FontSize)}
          >
            <Select.Trigger
              className="w-full flex items-center justify-between px-3 py-2 border rounded-md outline-none transition-colors focus:ring-2 focus:ring-offset-1"
              style={{
                backgroundColor: bgColor,
                borderColor: borderColor,
                color: textColors.primary,
                fontSize: '14px',
              }}
            >
              <Select.Value>
                {value.size.charAt(0).toUpperCase() + value.size.slice(1)}
              </Select.Value>
              <Select.Icon>
                <ChevronDownIcon className="w-4 h-4" />
              </Select.Icon>
            </Select.Trigger>

            <Select.Portal>
              <Select.Content
                className="overflow-hidden border rounded-md shadow-lg z-50"
                style={{ backgroundColor: bgColor, borderColor: borderColor }}
              >
                <Select.Viewport className="p-1">
                  {sizes.map((size) => (
                    <Select.Item
                      key={size}
                      value={size}
                      className="px-4 py-2 text-sm cursor-pointer outline-none data-[highlighted]:bg-opacity-10 transition-colors"
                      style={{ color: textColors.primary, backgroundColor: 'transparent' }}
                    >
                      <Select.ItemText>
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </Select.ItemText>
                      <Select.ItemIndicator className="absolute left-0 w-6 inline-flex items-center justify-center">
                        <CheckIcon className="w-4 h-4" />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Portal>
          </Select.Root>
        </div>
      </div>
    </div>
  );
}
