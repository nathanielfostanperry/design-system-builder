'use client';

import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { useDesignSystem } from '@/context/DesignSystemContext';

export default function DemoTabs() {
  const { primaryColorScale, isDarkMode } = useDesignSystem();

  return (
    <div
      style={{
        '--tabs-active-border': primaryColorScale[500],
        '--tabs-active-text': primaryColorScale[600],
        '--tabs-inactive-text': isDarkMode ? primaryColorScale[300] : primaryColorScale[500],
      } as React.CSSProperties}
    >
      <Tabs.Root defaultValue="tab1" className="w-full">
        <Tabs.List
          className="flex border-b"
          style={{
            borderColor: isDarkMode ? primaryColorScale[700] : primaryColorScale[200],
          }}
        >
          <Tabs.Trigger
            value="tab1"
            className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm outline-none transition-colors tab-trigger"
          >
            Tab 1
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab2"
            className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm outline-none transition-colors tab-trigger"
          >
            Tab 2
          </Tabs.Trigger>
          <Tabs.Trigger
            value="tab3"
            className="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm outline-none transition-colors tab-trigger"
          >
            Tab 3
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1" className="mt-4">
          <p style={{ color: isDarkMode ? primaryColorScale[200] : primaryColorScale[700] }}>
            Content for Tab 1
          </p>
        </Tabs.Content>
        <Tabs.Content value="tab2" className="mt-4">
          <p style={{ color: isDarkMode ? primaryColorScale[200] : primaryColorScale[700] }}>
            Content for Tab 2
          </p>
        </Tabs.Content>
        <Tabs.Content value="tab3" className="mt-4">
          <p style={{ color: isDarkMode ? primaryColorScale[200] : primaryColorScale[700] }}>
            Content for Tab 3
          </p>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}
