'use client';

import React from 'react';
import Image from 'next/image';
import { useDesignSystem } from '@/context/DesignSystemContext';

export default function DemoTeamCard() {
  const { radius } = useDesignSystem();

  return (
    <div
      className={`bg-white shadow-md overflow-hidden border border-gray-200 ${radius.name}`}
    >
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <div
            className={`relative h-12 w-12 ${
              radius.name === 'rounded-full' ? 'rounded-full' : 'rounded-lg'
            } overflow-hidden`}
          >
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              alt="Team member"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">John Doe</h4>
            <p className="text-sm text-gray-500">Software Engineer</p>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <button
            className={`px-3 py-1 bg-primary-50 text-primary-700 text-sm ${radius.name}`}
          >
            Message
          </button>
          <button
            className={`px-3 py-1 bg-gray-50 text-gray-700 text-sm ${radius.name}`}
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
}
