'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentPalette } from '@/hooks/useComponentPalette';
import * as Accordion from '@radix-ui/react-accordion';

const accordionItems = [
  { title: 'What is a design system?', content: 'A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.' },
  { title: 'Why use a design system?', content: 'Design systems help maintain consistency across products, speed up development time, and improve collaboration between designers and developers.' },
  { title: 'How to implement?', content: 'Start by defining your core components, color system, and spacing rules. Then create reusable components that follow these guidelines.' },
];

export default function DemoAccordion() {
  const { radius, spacing, isDarkMode, headingFont, bodyFont } = useDesignSystem();
  const scale = useComponentPalette('alert');

  return (
    <Accordion.Root type="single" defaultValue="item-0" collapsible className={`${spacing.name}`}>
      {accordionItems.map((item, index) => (
        <Accordion.Item
          key={index}
          value={`item-${index}`}
          className={`border ${radius.name} overflow-hidden`}
          style={{
            borderColor: isDarkMode ? scale['700'] : scale['200'],
            backgroundColor: isDarkMode ? 'rgb(31, 41, 55)' : 'white',
          }}
        >
          <Accordion.Header>
            <Accordion.Trigger
              className="w-full px-4 py-3 flex justify-between items-center transition-colors group"
              style={{
                fontFamily: headingFont.family,
                color: isDarkMode ? scale['100'] : scale['900'],
              }}
            >
              <span className="font-medium">{item.title}</span>
              <svg
                className="w-5 h-5 transform transition-transform group-data-[state=open]:rotate-180"
                style={{ color: isDarkMode ? scale['400'] : scale['500'] }}
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
              </svg>
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content
            className="px-4 py-3 overflow-hidden"
            style={{ backgroundColor: isDarkMode ? scale['900'] : scale['50'] }}
          >
            <p style={{ fontFamily: bodyFont.family, color: isDarkMode ? scale['300'] : scale['700'] }}>
              {item.content}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
