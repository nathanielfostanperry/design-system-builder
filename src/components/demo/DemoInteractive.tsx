'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import DemoAccordion from './DemoAccordion';
import DemoRadioGroup from './DemoRadioGroup';
import DemoSlider from './DemoSlider';

export default function DemoInteractive() {
  const { spacing } = useDesignSystem();

  return (
    <div className={`${spacing.name} h-full`}>
      <DemoAccordion />
      <DemoRadioGroup />
      <DemoSlider />
    </div>
  );
}
