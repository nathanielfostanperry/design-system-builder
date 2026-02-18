'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentPalette } from '@/hooks/useComponentPalette';
import { useComponentSettings } from '@/hooks/useComponentSettings';
import { HiPlus } from 'react-icons/hi';
import { BiPlus } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { IoAddOutline } from 'react-icons/io5';
import { LuPlus } from 'react-icons/lu';
import { MdAdd } from 'react-icons/md';
import { PiPlus } from 'react-icons/pi';
import { RiAddLine } from 'react-icons/ri';
import { TbPlus } from 'react-icons/tb';

const ICON_MAP = {
  hi: HiPlus, bi: BiPlus, fa: FaPlus, fi: FiPlus, io: IoAddOutline,
  lu: LuPlus, md: MdAdd, pi: PiPlus, ri: RiAddLine, tb: TbPlus,
} as const;

const SIZE_MAP = {
  sm: { padding: 'p-1.5', iconSize: 16 },
  md: { padding: 'p-2',   iconSize: 20 },
  lg: { padding: 'p-3',   iconSize: 24 },
};

export default function DemoIconButtonPrimary() {
  const { radius, iconLibrary } = useDesignSystem();
  const scale    = useComponentPalette('icon-button');
  const settings = useComponentSettings('icon-button');
  const Icon     = ICON_MAP[iconLibrary as keyof typeof ICON_MAP] ?? ICON_MAP.hi;

  const size  = (settings.size  as keyof typeof SIZE_MAP) ?? 'md';
  const shape = settings.shape ?? 'rounded';

  const { padding, iconSize } = SIZE_MAP[size] ?? SIZE_MAP.md;
  const shapeClass = shape === 'circle' ? 'rounded-full' : shape === 'square' ? 'rounded-none' : radius.name;

  return (
    <button
      className={`${padding} ${shapeClass} transition-colors hover:opacity-90 aspect-square h-fit w-fit`}
      style={{ backgroundColor: scale['500'], color: 'white' }}
    >
      <Icon size={iconSize} />
    </button>
  );
}
