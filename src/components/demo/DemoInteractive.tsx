'use client';

import React from 'react';
import DemoAccordion from './DemoAccordion';
import DemoRadioGroup from './DemoRadioGroup';
import DemoSlider from './DemoSlider';

export default function DemoInteractive() {
  return (
    <div className="space-y-8">
      <DemoAccordion />
      <DemoRadioGroup />
      <DemoSlider />
    </div>
  );
}
