'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';

export default function DemoChips() {
  const { radius, isDarkMode, setIsDarkMode } = useDesignSystem();

  return (
    <div className="space-y-6">
      {/* Theme Toggle */}
      <div className="flex items-center justify-between">
        <span
          className={`text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          Theme
        </span>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`${
            isDarkMode ? 'bg-primary-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
            radius.name
          }`}
        >
          <span
            className={`${
              isDarkMode ? 'translate-x-5' : 'translate-x-0'
            } pointer-events-none relative inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
          >
            <span
              className={`${
                isDarkMode ? 'opacity-0' : 'opacity-100'
              } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
            >
              🌞
            </span>
            <span
              className={`${
                isDarkMode ? 'opacity-100' : 'opacity-0'
              } absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}
            >
              🌙
            </span>
          </span>
        </button>
      </div>

      {/* Normal Chips */}
      <div className="flex flex-wrap gap-2">
        <span
          className={`inline-flex items-center px-3 py-1 ${
            isDarkMode
              ? 'bg-gray-700 text-gray-200'
              : 'bg-gray-100 text-gray-800'
          } text-sm font-medium ${radius.name}`}
        >
          Default
        </span>
        <span
          className={`inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium ${radius.name}`}
        >
          Primary
        </span>
        <span
          className={`inline-flex items-center px-3 py-1 bg-accent-100 text-accent-800 text-sm font-medium ${radius.name}`}
        >
          Secondary
        </span>
      </div>

      {/* Status Chips */}
      <div className="flex flex-wrap gap-2">
        <span
          className={`inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium ${radius.name}`}
        >
          Success
        </span>
        <span
          className={`inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium ${radius.name}`}
        >
          Warning
        </span>
        <span
          className={`inline-flex items-center px-3 py-1 bg-red-100 text-red-800 text-sm font-medium ${radius.name}`}
        >
          Error
        </span>
      </div>

      {/* Interactive Chips */}
      <div className="flex flex-wrap gap-2">
        <button
          className={`inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium hover:bg-primary-200 ${radius.name}`}
        >
          Interactive
          <svg
            className="ml-1.5 h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          className={`inline-flex items-center px-3 py-1 bg-accent-100 text-accent-800 text-sm font-medium hover:bg-accent-200 ${radius.name}`}
        >
          Removable
          <svg
            className="ml-1.5 h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
