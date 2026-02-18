'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import type { IconType } from 'react-icons';

// ── Heroicons ──────────────────────────────────────────────────────────────
import { HiBell, HiChevronRight, HiChevronDown, HiPlus, HiSearch, HiHome, HiCog, HiUser, HiHeart, HiX, HiStar, HiBookmark, HiMail, HiCalendar, HiPencil, HiTrash, HiDownload, HiExternalLink } from 'react-icons/hi';
// ── Bootstrap Icons ────────────────────────────────────────────────────────
import { BiBell, BiChevronRight, BiChevronDown, BiPlus, BiSearch, BiHome, BiCog, BiUser, BiHeart, BiX, BiStar, BiBookmark, BiEnvelope, BiCalendar, BiPencil, BiTrash, BiDownload, BiLinkExternal } from 'react-icons/bi';
// ── Font Awesome ───────────────────────────────────────────────────────────
import { FaBell, FaChevronRight, FaChevronDown, FaPlus, FaSearch, FaHome, FaCog, FaUser, FaHeart, FaTimes, FaStar, FaBookmark, FaEnvelope, FaCalendar, FaEdit, FaTrash, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
// ── Feather Icons ──────────────────────────────────────────────────────────
import { FiBell, FiChevronRight, FiChevronDown, FiPlus, FiSearch, FiHome, FiSettings, FiUser, FiHeart, FiX, FiStar, FiBookmark, FiMail, FiCalendar, FiEdit2, FiTrash2, FiDownload, FiExternalLink } from 'react-icons/fi';
// ── Ionicons 5 ─────────────────────────────────────────────────────────────
import { IoNotificationsOutline, IoChevronForward, IoChevronDown, IoAdd, IoSearch, IoHome, IoSettings, IoPerson, IoHeart, IoClose, IoStarOutline, IoBookmarkOutline, IoMailOutline, IoCalendarOutline, IoPencilOutline, IoTrashOutline, IoDownloadOutline, IoOpenOutline } from 'react-icons/io5';
// ── Lucide ─────────────────────────────────────────────────────────────────
import { LuBell, LuChevronRight, LuChevronDown, LuPlus, LuSearch, LuHouse, LuSettings, LuUser, LuHeart, LuX, LuStar, LuBookmark, LuMail, LuCalendar, LuPencil, LuTrash, LuDownload, LuExternalLink } from 'react-icons/lu';
// ── Material Design ────────────────────────────────────────────────────────
import { MdNotifications, MdChevronRight, MdExpandMore, MdAdd, MdSearch, MdHome, MdSettings, MdPerson, MdFavorite, MdClose, MdStar, MdBookmark, MdEmail, MdCalendarToday, MdEdit, MdDelete, MdDownload, MdOpenInNew } from 'react-icons/md';
// ── Phosphor ───────────────────────────────────────────────────────────────
import { PiBell, PiCaretRight, PiCaretDown, PiPlus, PiMagnifyingGlass, PiHouse, PiGear, PiUser, PiHeart, PiX, PiStar, PiBookmark, PiEnvelope, PiCalendar, PiPencil, PiTrash, PiDownload, PiArrowSquareOut } from 'react-icons/pi';
// ── Remix Icons ────────────────────────────────────────────────────────────
import { RiNotificationLine, RiArrowRightSLine, RiArrowDownSLine, RiAddLine, RiSearchLine, RiHome2Line, RiSettings2Line, RiUserLine, RiHeartLine, RiCloseLine, RiStarLine, RiBookmarkLine, RiMailLine, RiCalendarLine, RiPencilLine, RiDeleteBinLine, RiDownloadLine, RiExternalLinkLine } from 'react-icons/ri';
// ── Tabler Icons ───────────────────────────────────────────────────────────
import { TbBell, TbChevronRight, TbChevronDown, TbPlus, TbSearch, TbHome, TbSettings, TbUser, TbHeart, TbX, TbStar, TbBookmark, TbMail, TbCalendar, TbPencil, TbTrash, TbDownload, TbExternalLink } from 'react-icons/tb';

// ── Library config ──────────────────────────────────────────────────────────
// icons[]: chevronRight, chevronDown, plus, search, home, settings, user, heart, close,
//          bell, star, bookmark, mail, calendar, edit, trash, download, externalLink
const ICON_LIBRARIES = [
  { id: 'hi', name: 'Heroicons',       BellIcon: HiBell,                icons: [HiChevronRight, HiChevronDown, HiPlus, HiSearch, HiHome, HiCog, HiUser, HiHeart, HiX, HiBell, HiStar, HiBookmark, HiMail, HiCalendar, HiPencil, HiTrash, HiDownload, HiExternalLink] },
  { id: 'bi', name: 'Bootstrap Icons', BellIcon: BiBell,                icons: [BiChevronRight, BiChevronDown, BiPlus, BiSearch, BiHome, BiCog, BiUser, BiHeart, BiX, BiBell, BiStar, BiBookmark, BiEnvelope, BiCalendar, BiPencil, BiTrash, BiDownload, BiLinkExternal] },
  { id: 'fa', name: 'Font Awesome',    BellIcon: FaBell,                icons: [FaChevronRight, FaChevronDown, FaPlus, FaSearch, FaHome, FaCog, FaUser, FaHeart, FaTimes, FaBell, FaStar, FaBookmark, FaEnvelope, FaCalendar, FaEdit, FaTrash, FaDownload, FaExternalLinkAlt] },
  { id: 'fi', name: 'Feather Icons',   BellIcon: FiBell,                icons: [FiChevronRight, FiChevronDown, FiPlus, FiSearch, FiHome, FiSettings, FiUser, FiHeart, FiX, FiBell, FiStar, FiBookmark, FiMail, FiCalendar, FiEdit2, FiTrash2, FiDownload, FiExternalLink] },
  { id: 'io', name: 'Ionicons',        BellIcon: IoNotificationsOutline, icons: [IoChevronForward, IoChevronDown, IoAdd, IoSearch, IoHome, IoSettings, IoPerson, IoHeart, IoClose, IoNotificationsOutline, IoStarOutline, IoBookmarkOutline, IoMailOutline, IoCalendarOutline, IoPencilOutline, IoTrashOutline, IoDownloadOutline, IoOpenOutline] },
  { id: 'lu', name: 'Lucide',          BellIcon: LuBell,                icons: [LuChevronRight, LuChevronDown, LuPlus, LuSearch, LuHouse, LuSettings, LuUser, LuHeart, LuX, LuBell, LuStar, LuBookmark, LuMail, LuCalendar, LuPencil, LuTrash, LuDownload, LuExternalLink] },
  { id: 'md', name: 'Material Design', BellIcon: MdNotifications,       icons: [MdChevronRight, MdExpandMore, MdAdd, MdSearch, MdHome, MdSettings, MdPerson, MdFavorite, MdClose, MdNotifications, MdStar, MdBookmark, MdEmail, MdCalendarToday, MdEdit, MdDelete, MdDownload, MdOpenInNew] },
  { id: 'pi', name: 'Phosphor Icons',  BellIcon: PiBell,                icons: [PiCaretRight, PiCaretDown, PiPlus, PiMagnifyingGlass, PiHouse, PiGear, PiUser, PiHeart, PiX, PiBell, PiStar, PiBookmark, PiEnvelope, PiCalendar, PiPencil, PiTrash, PiDownload, PiArrowSquareOut] },
  { id: 'ri', name: 'Remix Icons',     BellIcon: RiNotificationLine,    icons: [RiArrowRightSLine, RiArrowDownSLine, RiAddLine, RiSearchLine, RiHome2Line, RiSettings2Line, RiUserLine, RiHeartLine, RiCloseLine, RiNotificationLine, RiStarLine, RiBookmarkLine, RiMailLine, RiCalendarLine, RiPencilLine, RiDeleteBinLine, RiDownloadLine, RiExternalLinkLine] },
  { id: 'tb', name: 'Tabler Icons',    BellIcon: TbBell,                icons: [TbChevronRight, TbChevronDown, TbPlus, TbSearch, TbHome, TbSettings, TbUser, TbHeart, TbX, TbBell, TbStar, TbBookmark, TbMail, TbCalendar, TbPencil, TbTrash, TbDownload, TbExternalLink] },
] as const;

type IconLibraryId = (typeof ICON_LIBRARIES)[number]['id'];

const GRID_LABELS = [
  'Chevron →', 'Chevron ↓', 'Plus', 'Search', 'Home', 'Settings', 'User', 'Heart', 'Close',
  'Bell', 'Star', 'Bookmark', 'Mail', 'Calendar', 'Edit', 'Trash', 'Download', 'External Link',
];

export default function IconLibraryPicker() {
  const { iconLibrary, setIconLibrary, primaryColorScale, neutralColorScale, isDarkMode } = useDesignSystem();

  const selected = ICON_LIBRARIES.find((lib) => lib.id === iconLibrary) ?? ICON_LIBRARIES[0];

  const borderClr   = isDarkMode ? `rgba(255,255,255,0.08)` : `rgba(0,0,0,0.08)`;
  const bgColor     = isDarkMode ? neutralColorScale['800'] : '#fff';
  const textPrimary = isDarkMode ? neutralColorScale['100'] : neutralColorScale['900'];
  const textMuted   = isDarkMode ? neutralColorScale['500'] : neutralColorScale['400'];
  const gridBg      = isDarkMode ? neutralColorScale['800'] : neutralColorScale['50'];
  const gridHover   = isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';

  return (
    <div className="flex flex-col gap-4">
      {/* ── Library select ── */}
      <div>
        <label className="block text-xs font-medium mb-2" style={{ color: textMuted }}>
          Icon Library
        </label>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              className="w-full flex items-center justify-between px-3 py-2 border rounded-md text-sm transition-colors hover:opacity-80 outline-none"
              style={{ backgroundColor: bgColor, borderColor: borderClr, color: textPrimary }}
            >
              <div className="flex items-center gap-2">
                <selected.BellIcon size={16} />
                <span>{selected.name}</span>
              </div>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[220px] rounded-lg p-1.5 shadow-lg z-50"
              sideOffset={4}
              style={{ backgroundColor: bgColor, border: `1px solid ${borderClr}` }}
            >
              {ICON_LIBRARIES.map((lib) => (
                <DropdownMenu.Item
                  key={lib.id}
                  className="flex items-center gap-3 px-3 py-2 text-sm outline-none cursor-pointer rounded-md transition-colors"
                  onClick={() => setIconLibrary(lib.id as IconLibraryId)}
                  style={{
                    backgroundColor: lib.id === iconLibrary
                      ? isDarkMode ? neutralColorScale['700'] : primaryColorScale['50']
                      : 'transparent',
                    color: textPrimary,
                  }}
                >
                  <lib.BellIcon size={18} />
                  <span>{lib.name}</span>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      {/* ── 6×3 icon preview grid (18 icons) ── */}
      <div>
        <label className="block text-xs font-medium mb-2" style={{ color: textMuted }}>
          Preview
        </label>
        <div
          className="grid grid-cols-3 gap-1 p-2 rounded-lg"
          style={{ backgroundColor: gridBg, border: `1px solid ${borderClr}` }}
        >
          {(selected.icons as readonly IconType[]).map((Icon, i) => (
            <div
              key={i}
              title={GRID_LABELS[i]}
              className="flex items-center justify-center aspect-square rounded-md transition-colors cursor-default"
              style={{ color: primaryColorScale['500'] }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = gridHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <Icon size={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
