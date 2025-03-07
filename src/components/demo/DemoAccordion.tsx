import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';

export default function DemoAccordion() {
  const { radius } = useDesignSystem();
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
    <div className="space-y-2">
      {accordionItems.map((item, index) => (
        <div
          key={index}
          className={`border border-gray-200 ${radius.name} overflow-hidden`}
        >
          <button
            onClick={() =>
              setActiveAccordion(activeAccordion === index ? null : index)
            }
            className="w-full px-4 py-3 flex justify-between items-center bg-white hover:bg-gray-50"
          >
            <span className="font-medium text-gray-900">{item.title}</span>
            <svg
              className={`w-5 h-5 text-gray-500 transform transition-transform ${
                activeAccordion === index ? 'rotate-180' : ''
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
          <div
            className={`px-4 py-3 bg-gray-50 transition-[max-height] duration-200 ease-in-out ${
              activeAccordion === index ? 'max-h-40' : 'max-h-0 overflow-hidden'
            }`}
          >
            <p className="text-gray-600">{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
