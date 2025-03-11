import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';

export default function DemoAccordion() {
  const {
    radius,
    spacing,
    isDarkMode,
    headingFont,
    bodyFont,
    primaryColorScale,
    accentColorScale,
  } = useDesignSystem();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  const accordionItems = [
    {
      title: 'What is a design system?',
      content:
        'A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.',
    },
    {
      title: 'Why use a design system?',
      content:
        'Design systems help maintain consistency across products, speed up development time, and improve collaboration between designers and developers.',
    },
    {
      title: 'How to implement?',
      content:
        'Start by defining your core components, color system, and spacing rules. Then create reusable components that follow these guidelines.',
    },
  ];

  return (
    <div className={`${spacing.name}`}>
      {accordionItems.map((item, index) => (
        <div
          key={index}
          className={`border ${radius.name} overflow-hidden`}
          style={{
            borderColor: isDarkMode
              ? primaryColorScale[700]
              : primaryColorScale[200],
            backgroundColor: isDarkMode ? 'rgb(31, 41, 55)' : 'white',
          }}
        >
          <button
            onClick={() =>
              setActiveAccordion(activeAccordion === index ? null : index)
            }
            className={`w-full px-4 py-3 flex justify-between items-center transition-colors`}
            style={{
              fontFamily: headingFont.family,
              backgroundColor: isDarkMode
                ? activeAccordion === index
                  ? primaryColorScale[800]
                  : 'rgb(31, 41, 55)'
                : activeAccordion === index
                ? primaryColorScale[50]
                : 'white',
              color: isDarkMode
                ? primaryColorScale[100]
                : primaryColorScale[900],
            }}
          >
            <span className="font-medium">{item.title}</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${
                activeAccordion === index ? 'rotate-180' : ''
              }`}
              style={{
                color: isDarkMode
                  ? primaryColorScale[400]
                  : primaryColorScale[500],
              }}
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
          <div
            className={`px-4 py-3 transition-[max-height] duration-200 ease-in-out ${
              activeAccordion === index ? 'max-h-40' : 'max-h-0 overflow-hidden'
            }`}
            style={{
              backgroundColor: isDarkMode
                ? primaryColorScale[900]
                : primaryColorScale[50],
            }}
          >
            <p
              style={{
                fontFamily: bodyFont.family,
                color: isDarkMode
                  ? primaryColorScale[300]
                  : primaryColorScale[700],
              }}
            >
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
