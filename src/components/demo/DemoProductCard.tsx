'use client';

import React from 'react';
import Image from 'next/image';
import { useDesignSystem } from '@/context/DesignSystemContext';

export default function DemoProductCard() {
  const { radius, shadow } = useDesignSystem();

  return (
    <div
      className={`bg-white overflow-hidden border border-gray-200 ${radius.name} ${shadow.name}`}
    >
      <div className="relative h-32 w-full">
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
  );
}
