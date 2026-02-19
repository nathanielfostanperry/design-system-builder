'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useSemanticColor } from '@/hooks/useSemanticColor';
import { useTypographyToken } from '@/hooks/useTypographyToken';
import * as Toast from '@radix-ui/react-toast';

export default function DemoToast() {
  const { radius } = useDesignSystem();
  const brandPrimary = useSemanticColor('brand-primary');
  const bgSurface = useSemanticColor('background-surface');
  const borderFocus = useSemanticColor('border-focus');
  const textPrimary = useSemanticColor('text-primary');
  const textSecondary = useSemanticColor('text-secondary');
  const label = useTypographyToken('label');
  const body = useTypographyToken('body');

  const [open, setOpen] = useState(false);

  return (
    <Toast.Provider>
      <button
        onClick={() => setOpen(true)}
        className={`px-4 py-2 text-white hover:opacity-90 transition-opacity ${radius.name}`}
        style={{ backgroundColor: brandPrimary, fontFamily: label.fontFamily, fontSize: label.fontSize }}
      >
        Show Toast
      </button>

      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        duration={3000}
        className={`border-l-4 p-4 shadow-lg ${radius.name} data-[state=open]:animate-slideIn data-[state=closed]:animate-hide`}
        style={{
          backgroundColor: bgSurface,
          borderColor: borderFocus,
        }}
      >
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <Toast.Title
              className="text-sm font-medium"
              style={{ fontFamily: label.fontFamily, color: textPrimary }}
            >
              Demo Toast Message
            </Toast.Title>
            <Toast.Description
              className="mt-1 text-sm"
              style={{ fontFamily: body.fontFamily, color: textSecondary }}
            >
              This is a sample notification using the design system colors.
            </Toast.Description>
          </div>
          <Toast.Close
            className="ml-2 text-lg leading-none opacity-50 hover:opacity-100 transition-opacity"
            style={{ color: textPrimary }}
          >
            ×
          </Toast.Close>
        </div>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-4 right-4 flex flex-col gap-2 w-80 max-w-full z-50 outline-none list-none" />
    </Toast.Provider>
  );
}
