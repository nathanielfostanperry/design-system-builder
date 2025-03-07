'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';

export default function DemoPrimaryButton() {
  const { radius } = useDesignSystem();

  return (
    <button
      className={`w-full px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors ${radius.name}`}
    >
      Primary Button
    </button>
  );
}
