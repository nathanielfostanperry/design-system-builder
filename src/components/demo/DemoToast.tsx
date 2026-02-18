'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import * as Toast from '@radix-ui/react-toast';

export default function DemoToast() {
  const { radius, primaryColorScale, isDarkMode } = useDesignSystem();
  const [open, setOpen] = useState(false);

  return (
    <Toast.Provider>
      <button
        onClick={() => setOpen(true)}
        className={`px-4 py-2 ${radius.name} transition-colors`}
        style={{
          backgroundColor: primaryColorScale[600],
          color: 'white',
        }}
      >
        Show Toast
      </button>
      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        className={`border-l-4 p-4 shadow-lg ${radius.name} data-[state=open]:animate-slideIn data-[state=closed]:animate-hide`}
        style={{
          backgroundColor: isDarkMode ? primaryColorScale[800] : primaryColorScale[50],
          borderColor: primaryColorScale[500],
        }}
      >
        <div className="flex items-start">
          <div className="ml-3">
            <Toast.Title
              className="text-sm font-medium"
              style={{
                color: isDarkMode ? primaryColorScale[200] : primaryColorScale[800],
              }}
            >
              Demo Toast Message
            </Toast.Title>
            <Toast.Description
              className="mt-1 text-sm"
              style={{
                color: isDarkMode ? primaryColorScale[300] : primaryColorScale[600],
              }}
            >
              This is a sample notification using the design system colors.
            </Toast.Description>
          </div>
          <Toast.Close
            className="ml-auto text-sm font-medium opacity-70 hover:opacity-100"
            style={{
              color: isDarkMode ? primaryColorScale[200] : primaryColorScale[800],
            }}
          >
            ×
          </Toast.Close>
        </div>
      </Toast.Root>
    </Toast.Provider>
  );
}
