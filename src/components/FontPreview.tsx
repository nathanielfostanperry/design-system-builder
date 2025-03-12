'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';

const getFontWeight = (weight: string) => {
  switch (weight) {
    case 'thin':
      return '300';
    case 'regular':
      return '400';
    case 'bold':
      return '700';
    case 'extrabold':
      return '800';
    default:
      return '400';
  }
};

const getFontSize = (size: string) => {
  switch (size) {
    case 'xxs':
      return '0.625rem'; // 10px
    case 'xs':
      return '0.75rem'; // 12px
    case 'sm':
      return '0.875rem'; // 14px
    case 'regular':
      return '1rem'; // 16px
    case 'lg':
      return '1.25rem'; // 20px
    case 'xl':
      return '1.5rem'; // 24px
    case 'xxl':
      return '2rem'; // 32px
    default:
      return '1rem';
  }
};

// Get relative heading size multiplier based on the base font size
const getHeadingSize = (level: number, baseSize: string) => {
  const baseSizeRem = parseFloat(getFontSize(baseSize));
  const multipliers = {
    1: 3, // h1 is 3x the base size
    2: 2.5, // h2 is 2.5x the base size
    3: 2, // h3 is 2x the base size
    4: 1.75, // h4 is 1.75x the base size
    5: 1.5, // h5 is 1.5x the base size
    6: 1.25, // h6 is 1.25x the base size
  };
  return `${baseSizeRem * multipliers[level as keyof typeof multipliers]}rem`;
};

export default function FontPreview() {
  const { headingFont, bodyFont, isDarkMode } = useDesignSystem();

  const textColor = isDarkMode ? 'text-gray-100' : 'text-gray-900';
  const subTextColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className="mt-12 mb-12">
      {/* <h2 className={`text-2xl font-bold mb-8 ${textColor}`}>
        Typography Preview
      </h2> */}
      <div className="space-y-8">
        <div>
          {/* <h3 className={`text-lg font-medium mb-4 ${textColor}`}>Headings</h3> */}
          <div className="space-y-0">
            {/* {[1, 2, 3, 4, 5, 6].map((level) => ( */}
            {[4].map((level) => (
              <div
                key={level}
                style={{
                  fontFamily: headingFont.family,
                  fontWeight: getFontWeight(headingFont.weight),
                  fontSize: getHeadingSize(level, headingFont.size),
                }}
                className={textColor}
              >
                Some crazy title text :: heading {level}
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* <h3 className={`text-lg font-medium mb-4 ${textColor}`}>Body Text</h3> */}
          <div
            style={{
              fontFamily: bodyFont.family,
              fontWeight: getFontWeight(bodyFont.weight),
              fontSize: getFontSize(bodyFont.size),
            }}
          >
            <p className={`mb-4 ${textColor}`}>
              This is a paragraph of text that demonstrates the body font
              styling. The quick brown fox jumps over the lazy dog. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit.
            </p>
            <p className={`mb-4 ${subTextColor}`}>
              Here's another paragraph with different text color. The quick
              brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </p>
            {/* <div className="flex gap-4">
              <div>
                <h4 className={`text-sm font-medium mb-2 ${textColor}`}>
                  List Example
                </h4>
                <ul className={`list-disc list-inside ${textColor}`}>
                  <li>First item in the list</li>
                  <li>Second item in the list</li>
                  <li>Third item in the list</li>
                </ul>
              </div>
              <div>
                <h4 className={`text-sm font-medium mb-2 ${textColor}`}>
                  Links Example
                </h4>
                <div className="space-y-2">
                  <a href="#" className="text-blue-500 hover:underline">
                    Primary Link
                  </a>
                  <br />
                  <a href="#" className="text-purple-500 hover:underline">
                    Secondary Link
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
