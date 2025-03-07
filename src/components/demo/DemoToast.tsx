'use client';

import React from 'react';

export default function DemoToast() {
  return (
    <div className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded-md shadow-lg">
      <div className="flex items-start">
        <div className="ml-3">
          <p className="text-sm font-medium text-primary-800">
            Demo Toast Message
          </p>
          <p className="mt-1 text-sm text-primary-600">
            This is a sample notification using the design system colors.
          </p>
        </div>
      </div>
    </div>
  );
}
