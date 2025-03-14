'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { HiHeart } from 'react-icons/hi';
import { BiHeart } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { IoHeartOutline } from 'react-icons/io5';
import { LuHeart } from 'react-icons/lu';
import { MdFavorite } from 'react-icons/md';
import { PiHeart } from 'react-icons/pi';
import { RiHeartLine } from 'react-icons/ri';
import { TbHeart } from 'react-icons/tb';

const ICON_MAP = {
  hi: HiHeart,
  bi: BiHeart,
  fa: FaHeart,
  fi: FiHeart,
  io: IoHeartOutline,
  lu: LuHeart,
  md: MdFavorite,
  pi: PiHeart,
  ri: RiHeartLine,
  tb: TbHeart,
} as const;

export default function DemoIconButtonSecondary() {
  const { radius, primaryColorScale, iconLibrary } = useDesignSystem();

  const IconComponent =
    ICON_MAP[iconLibrary as keyof typeof ICON_MAP] || ICON_MAP.hi;

  return (
    <button
      className={`p-2 ${radius.name} transition-colors`}
      style={{
        backgroundColor: 'transparent',
        color: primaryColorScale['500'],
        border: `1px solid ${primaryColorScale['200']}`,
      }}
    >
      <IconComponent size={20} />
    </button>
  );
}
