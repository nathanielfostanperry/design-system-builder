'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export default function DemoDropdown() {
  const { radius, primaryColorScale, accentColorScale, isDarkMode } = useDesignSystem();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className={`inline-flex items-center px-4 py-2 border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${radius.name}`}
          style={{
            borderColor: isDarkMode ? primaryColorScale[600] : primaryColorScale[200],
            backgroundColor: isDarkMode ? primaryColorScale[800] : 'white',
            color: isDarkMode ? primaryColorScale[100] : primaryColorScale[700],
          }}
        >
          Options
          <svg
            className="ml-2 h-5 w-5"
            style={{ color: isDarkMode ? primaryColorScale[400] : primaryColorScale[400] }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`w-56 shadow-lg ring-1 ring-black ring-opacity-5 ${radius.name}`}
          style={{
            backgroundColor: isDarkMode ? primaryColorScale[800] : 'white',
            border: `1px solid ${isDarkMode ? primaryColorScale[700] : primaryColorScale[200]}`,
          }}
        >
          <div className="py-1">
            <DropdownMenu.Item
              className="block px-4 py-2 text-sm outline-none cursor-pointer focus:bg-primary-50 focus:text-primary-900"
              style={{
                color: isDarkMode ? primaryColorScale[100] : primaryColorScale[700],
              }}
            >
              Account settings
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className="block px-4 py-2 text-sm outline-none cursor-pointer focus:bg-primary-50 focus:text-primary-900"
              style={{
                color: isDarkMode ? primaryColorScale[100] : primaryColorScale[700],
              }}
            >
              Support
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className="block px-4 py-2 text-sm outline-none cursor-pointer focus:bg-primary-50 focus:text-primary-900"
              style={{
                color: isDarkMode ? primaryColorScale[100] : primaryColorScale[700],
              }}
            >
              License
            </DropdownMenu.Item>
            <DropdownMenu.Separator
              className="h-px my-1"
              style={{
                backgroundColor: isDarkMode ? primaryColorScale[700] : primaryColorScale[200],
              }}
            />
            <DropdownMenu.Item
              className="block px-4 py-2 text-sm outline-none cursor-pointer focus:bg-accent-50 focus:text-accent-900"
              style={{
                color: isDarkMode ? accentColorScale[300] : accentColorScale[700],
              }}
            >
              Sign out
            </DropdownMenu.Item>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
