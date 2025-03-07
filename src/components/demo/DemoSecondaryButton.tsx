'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';

export default function DemoSecondaryButton() {
  const { radius } = useDesignSystem();

  return (
    <button
      className={`w-full px-4 py-2 bg-white text-primary-700 border border-primary-600 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors ${radius.name}`}
    >
      Secondary Button
    </button>
  );
}
