'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import FontSelect from './FontSelect';

export default function Fonts() {
  const { headingFont, setHeadingFont, bodyFont, setBodyFont } =
    useDesignSystem();

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
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
