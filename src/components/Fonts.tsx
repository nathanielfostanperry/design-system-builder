'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import FontSelect from './FontSelect';

export default function Fonts() {
  const { headingFont, setHeadingFont, bodyFont, setBodyFont } =
    useDesignSystem();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
