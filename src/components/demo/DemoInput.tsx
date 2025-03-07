'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';

export default function DemoInput() {
  const { radius } = useDesignSystem();

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="demo-input"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Demo Input
        </label>
        <input
          type="text"
          id="demo-input"
          className={`w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${radius.name}`}
          placeholder="Type something..."
        />
      </div>
      <button
        className={`w-full px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors ${radius.name}`}
      >
        Submit
      </button>
    </div>
  );
}
