'use client';

import React from 'react';

export default function DemoInput() {
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="Type something..."
        />
      </div>
      <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors">
        Submit
      </button>
    </div>
  );
}
