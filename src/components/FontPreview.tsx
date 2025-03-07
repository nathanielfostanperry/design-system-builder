'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';

export default function FontPreview() {
  const { headingFont, bodyFont } = useDesignSystem();

  return (
    <div className="mt-12 mb-12">
      <h2 className="text-2xl font-bold mb-8">Typography Preview</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Headings</h3>
          <div className="space-y-4" style={{ fontFamily: headingFont.family }}>
            <h1 className="text-5xl font-bold">Heading 1</h1>
            <h2 className="text-4xl font-bold">Heading 2</h2>
            <h3 className="text-3xl font-bold">Heading 3</h3>
            <h4 className="text-2xl font-bold">Heading 4</h4>
            <h5 className="text-xl font-bold">Heading 5</h5>
            <h6 className="text-lg font-bold">Heading 6</h6>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Body Text</h3>
          <div style={{ fontFamily: bodyFont.family }}>
            <p className="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
