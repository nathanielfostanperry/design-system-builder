'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useComponentToken } from '@/hooks/useComponentToken';
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

export default function DemoIconButtonPrimary() {
  const { radius, iconLibrary } = useDesignSystem();
  const bg = useComponentToken('icon-button', 'bg');
  const textColor = useComponentToken('icon-button', 'text');
  const Icon = ICON_MAP[iconLibrary as keyof typeof ICON_MAP] ?? ICON_MAP.hi;

  return (
    <button
      className={`p-2 ${radius.name} transition-colors hover:opacity-90 aspect-square h-fit w-fit`}
      style={{ backgroundColor: bg, color: textColor }}
    >
      <Icon size={20} />
    </button>
  );
}
