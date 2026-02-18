'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentPalette } from '@/hooks/useComponentPalette';
import { useComponentSettings } from '@/hooks/useComponentSettings';
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

function PlusMinusArrow({ color }: { color: string }) {
  return (
    <span className="relative w-5 h-5 flex items-center justify-center" style={{ color }}>
      <span className="absolute text-lg leading-none font-light transition-opacity group-data-[state=open]:opacity-0">+</span>
      <span className="absolute text-lg leading-none font-light transition-opacity group-data-[state=closed]:opacity-0">−</span>
    </span>
  );
}

function RightArrow({ color }: { color: string }) {
  return (
    <svg
      className="w-5 h-5 transition-transform duration-200 group-data-[state=open]:rotate-90"
      style={{ color }}
      fill="none" viewBox="0 0 24 24" stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l6-6-6-6"/>
    </svg>
  );
}

export default function DemoAccordion() {
  const { radius, spacing, isDarkMode, headingFont, bodyFont } = useDesignSystem();
  const scale    = useComponentPalette('accordion');
  const settings = useComponentSettings('accordion');

  const arrowType  = settings.arrowType  ?? 'chevron';
  const borderType = settings.borderType ?? 'full';
  const background = settings.background ?? 'solid';

  const solidBg       = isDarkMode ? 'rgb(31,41,55)' : 'white';
  const transparentBg = 'transparent';
  const tintedHeaderBg  = isDarkMode ? scale['900'] : scale['50'];
  const tintedContentBg = isDarkMode ? scale['800'] : scale['100'];

  const getHeaderBg = () => {
    if (background === 'tinted')      return tintedHeaderBg;
    if (background === 'transparent') return transparentBg;
    return solidBg;
  };

  const getContentBg = () => {
    if (background === 'solid')       return isDarkMode ? scale['900'] : scale['50'];
    if (background === 'tinted')      return tintedContentBg;
    return transparentBg;
  };

  const getBorderColor = () => isDarkMode ? scale['700'] : scale['200'];

  const getItemClass = () => {
    if (borderType === 'full')   return `border overflow-hidden ${radius.name}`;
    if (borderType === 'bottom') return 'border-b overflow-hidden';
    return 'overflow-hidden';
  };

  const getItemStyle = () => {
    const bc = getBorderColor();
    if (borderType === 'full')   return { borderColor: bc };
    if (borderType === 'bottom') return { borderColor: bc };
    return {};
  };

  const arrowColor = isDarkMode ? scale['400'] : scale['500'];

  const renderArrow = () => {
    if (arrowType === 'plus')  return <PlusMinusArrow color={arrowColor} />;
    if (arrowType === 'arrow') return <RightArrow color={arrowColor} />;
    return <ChevronArrow color={arrowColor} />;
  };

  return (
    <Accordion.Root type="single" defaultValue="item-0" collapsible className={`${spacing.name}`}>
      {accordionItems.map((item, index) => (
        <Accordion.Item
          key={index}
          value={`item-${index}`}
          className={getItemClass()}
          style={getItemStyle()}
        >
          <Accordion.Header>
            <Accordion.Trigger
              className="w-full px-4 py-3 flex justify-between items-center transition-colors group"
              style={{
                fontFamily: headingFont.family,
                color: isDarkMode ? scale['100'] : scale['900'],
                backgroundColor: getHeaderBg(),
              }}
            >
              <span className="font-medium">{item.title}</span>
              {renderArrow()}
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content
            className="px-4 py-3 overflow-hidden"
            style={{ backgroundColor: getContentBg() }}
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
