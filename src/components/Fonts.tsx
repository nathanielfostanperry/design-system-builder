'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import FontSelect from './FontSelect';

export default function Fonts() {
  const { headingFont, setHeadingFont, bodyFont, setBodyFont } =
    useDesignSystem();

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Typography</h3>
      <div className="space-y-4">
        <FontSelect
          label="Heading Font"
          value={headingFont}
          onChange={setHeadingFont}
        />
        <FontSelect label="Body Font" value={bodyFont} onChange={setBodyFont} />
      </div>
    </div>
  );
}
