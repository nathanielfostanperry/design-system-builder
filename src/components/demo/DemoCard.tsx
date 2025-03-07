'use client';

import React from 'react';
import Image from 'next/image';
import { useDesignSystem } from '@/context/DesignSystemContext';

export default function DemoCard() {
  const { radius } = useDesignSystem();

  return (
    <div
      className={`bg-white shadow-md overflow-hidden border border-gray-200 max-w-sm ${radius.name}`}
    >
      <div className="relative h-48 w-full">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
          alt="Mountain landscape"
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h4 className="text-xl font-semibold text-gray-900 mb-2">
          Beautiful Mountains
        </h4>
        <p className="text-gray-600 mb-4">
          Discover the majestic beauty of mountain landscapes. Experience nature
          at its finest with breathtaking views and serene environments.
        </p>
        <button
          className={`w-full px-4 py-2 bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors ${radius.name}`}
        >
          Learn More
        </button>
      </div>
    </div>
  );
}
