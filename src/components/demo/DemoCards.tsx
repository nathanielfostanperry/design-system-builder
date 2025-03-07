'use client';

import React from 'react';
import Image from 'next/image';
import { useDesignSystem } from '@/context/DesignSystemContext';

export default function DemoCards() {
  const { radius } = useDesignSystem();

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Team Card */}
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

      {/* Product Card */}
      <div
        className={`bg-white shadow-md overflow-hidden border border-gray-200 ${radius.name}`}
      >
        <div className="relative h-40 w-full">
          <Image
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
            alt="Product"
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 bg-accent-100 text-accent-800 text-xs font-medium ${radius.name}`}
            >
              New
            </span>
          </div>
        </div>
        <div className="p-4">
          <h4 className="text-lg font-semibold text-gray-900">
            Wireless Headphones
          </h4>
          <p className="text-sm text-gray-500 mt-1">Premium sound quality</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-lg font-bold text-gray-900">$299</span>
            <button
              className={`px-4 py-2 bg-primary-600 text-white text-sm hover:bg-primary-700 ${radius.name}`}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
