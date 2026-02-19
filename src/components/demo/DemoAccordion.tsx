'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useSemanticColor } from '@/hooks/useSemanticColor';
import { useTypographyToken } from '@/hooks/useTypographyToken';
import * as Accordion from '@radix-ui/react-accordion';

const accordionItems = [
  { title: 'What is a design system?', content: 'A design system is a collection of reusable components, guided by clear standards, that can be assembled to build any number of applications.' },
  { title: 'Why use a design system?', content: 'Design systems help maintain consistency across products, speed up development time, and improve collaboration between designers and developers.' },
  { title: 'How to implement?', content: 'Start by defining your core components, color system, and spacing rules. Then create reusable components that follow these guidelines.' },
];

function ChevronArrow({ color }: { color: string }) {
  return (
    <svg
      className="w-5 h-5 transition-transform duration-200 group-data-[state=open]:rotate-180"
      style={{ color }}
      fill="none" viewBox="0 0 24 24" stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
    </svg>
  );
}

export default function DemoAccordion() {
  const { radius, spacing } = useDesignSystem();
  const bgSurface = useSemanticColor('background-surface');
  const bgSubtle = useSemanticColor('background-subtle');
  const borderColor = useSemanticColor('border-default');
  const textPrimary = useSemanticColor('text-primary');
  const textSecondary = useSemanticColor('text-secondary');
  const heading4 = useTypographyToken('heading-4');
  const body = useTypographyToken('body');

  return (
    <Accordion.Root type="single" defaultValue="item-0" collapsible className={`${spacing.name}`}>
      {accordionItems.map((item, index) => (
        <Accordion.Item
          key={index}
          value={`item-${index}`}
          className={`border overflow-hidden ${radius.name}`}
          style={{ borderColor }}
        >
          <Accordion.Header>
            <Accordion.Trigger
              className="w-full px-4 py-3 flex justify-between items-center transition-colors group"
              style={{
                fontFamily: heading4.fontFamily,
                fontWeight: heading4.fontWeight,
                fontSize: heading4.fontSize,
                color: textPrimary,
                backgroundColor: bgSurface,
              }}
            >
              <span className="font-medium">{item.title}</span>
              <ChevronArrow color={textSecondary} />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content
            className="px-4 py-3 overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
            style={{ backgroundColor: bgSubtle }}
          >
            <p style={{ fontFamily: body.fontFamily, fontSize: body.fontSize, color: textSecondary }}>
              {item.content}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
