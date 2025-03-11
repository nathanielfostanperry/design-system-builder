'use client';

import React from 'react';
import Image from 'next/image';
import { useDesignSystem } from '@/context/DesignSystemContext';

export default function DemoTeamCard() {
  const { radius, shadow, isDarkMode, headingFont, bodyFont } =
    useDesignSystem();

  return (
    <div
      className={`${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } overflow-hidden border ${radius.name} ${shadow.name}`}
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
            <h4
              className={`text-lg font-semibold ${
                isDarkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
              style={{ fontFamily: headingFont.family }}
            >
              John Doe
            </h4>
            <p
              className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
              style={{ fontFamily: bodyFont.family }}
            >
              Software Engineer
            </p>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <button
            className={`px-3 py-1 ${
              isDarkMode
                ? 'bg-primary-900 text-primary-100'
                : 'bg-primary-50 text-primary-700'
            } text-sm ${radius.name}`}
            style={{ fontFamily: bodyFont.family }}
          >
            Message
          </button>
          <button
            className={`px-3 py-1 ${
              isDarkMode
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-50 text-gray-700'
            } text-sm ${radius.name}`}
            style={{ fontFamily: bodyFont.family }}
          >
            Profile
          </button>
        </div>
      </div>
    </div>
  );
}
