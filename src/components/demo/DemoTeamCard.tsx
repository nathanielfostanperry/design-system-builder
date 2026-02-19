'use client';

import React from 'react';
import Image from 'next/image';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useSemanticColor } from '@/hooks/useSemanticColor';
import { useTypographyToken } from '@/hooks/useTypographyToken';

export default function DemoTeamCard() {
  const { radius, shadow } = useDesignSystem();
  const bgSurface = useSemanticColor('background-surface');
  const bgSubtle = useSemanticColor('background-subtle');
  const borderColor = useSemanticColor('border-default');
  const textPrimary = useSemanticColor('text-primary');
  const textSecondary = useSemanticColor('text-secondary');
  const heading4 = useTypographyToken('heading-4');
  const body = useTypographyToken('body');

  return (
    <div
      className={`overflow-hidden ${radius.name} ${shadow.name} border`}
      style={{ backgroundColor: bgSurface, borderColor }}
    >
      <div className="p-4 flex items-center gap-4">
        <div className={`relative flex-shrink-0 h-12 w-12 ${radius.name} overflow-hidden`}>
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
            alt="Team member"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h4
            className="text-lg font-semibold"
            style={{ fontFamily: heading4.fontFamily, color: textPrimary }}
          >
            John Doe
          </h4>
          <p
            className="text-sm"
            style={{ fontFamily: body.fontFamily, color: textSecondary }}
          >
            Software Engineer
          </p>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          <button
            className={`px-3 py-1 text-sm ${radius.name}`}
            style={{
              fontFamily: body.fontFamily,
              backgroundColor: bgSubtle,
              color: textPrimary,
            }}
          >
            Message
          </button>
          <button
            className={`px-3 py-1 text-sm ${radius.name}`}
            style={{
              fontFamily: body.fontFamily,
              backgroundColor: bgSubtle,
              color: textSecondary,
            }}
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
}
