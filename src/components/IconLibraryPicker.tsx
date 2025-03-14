import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { HiBell } from 'react-icons/hi';
import { BiBell } from 'react-icons/bi';
import { FaBell } from 'react-icons/fa';
import { FiBell } from 'react-icons/fi';
import { IoNotificationsOutline } from 'react-icons/io5';
import { LuBell } from 'react-icons/lu';
import { MdNotifications } from 'react-icons/md';
import { PiBell } from 'react-icons/pi';
import { RiNotificationLine } from 'react-icons/ri';
import { TbBell } from 'react-icons/tb';

const ICON_LIBRARIES = [
  { id: 'hi', name: 'Heroicons', Icon: HiBell },
  { id: 'bi', name: 'Bootstrap Icons', Icon: BiBell },
  { id: 'fa', name: 'Font Awesome', Icon: FaBell },
  { id: 'fi', name: 'Feather Icons', Icon: FiBell },
  { id: 'io', name: 'Ionicons', Icon: IoNotificationsOutline },
  { id: 'lu', name: 'Lucide', Icon: LuBell },
  { id: 'md', name: 'Material Design', Icon: MdNotifications },
  { id: 'pi', name: 'Phosphor Icons', Icon: PiBell },
  { id: 'ri', name: 'Remix Icons', Icon: RiNotificationLine },
  { id: 'tb', name: 'Tabler Icons', Icon: TbBell },
] as const;

type IconLibraryId = (typeof ICON_LIBRARIES)[number]['id'];

export default function IconLibraryPicker() {
  const {
    iconLibrary,
    setIconLibrary,
    primaryColorScale,
    neutralColorScale,
    radius,
    isDarkMode,
  } = useDesignSystem();

  const selectedLibrary =
    ICON_LIBRARIES.find((lib) => lib.id === iconLibrary) || ICON_LIBRARIES[0];

  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-sm font-medium"
        style={{ color: neutralColorScale['600'] }}
      >
        Icon Library
      </label>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className={`p-2 flex items-center justify-center ${radius.name} transition-colors`}
            style={{
              backgroundColor: isDarkMode
                ? neutralColorScale['800']
                : neutralColorScale['100'],
              color: primaryColorScale['500'],
              border: `1px solid ${
                isDarkMode ? neutralColorScale['700'] : neutralColorScale['200']
              }`,
            }}
          >
            <selectedLibrary.Icon size={24} />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={`min-w-[220px] bg-white rounded-lg p-2 shadow-lg ${radius.name}`}
            style={{
              backgroundColor: isDarkMode ? neutralColorScale['800'] : 'white',
              border: `1px solid ${
                isDarkMode ? neutralColorScale['700'] : neutralColorScale['200']
              }`,
            }}
          >
            {ICON_LIBRARIES.map((lib) => (
              <DropdownMenu.Item
                key={lib.id}
                className={`flex items-center gap-3 px-3 py-2 outline-none cursor-pointer rounded ${
                  lib.id === iconLibrary ? 'bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setIconLibrary(lib.id)}
                style={{
                  backgroundColor:
                    lib.id === iconLibrary
                      ? isDarkMode
                        ? neutralColorScale['700']
                        : primaryColorScale['50']
                      : 'transparent',
                  color: isDarkMode
                    ? neutralColorScale['100']
                    : neutralColorScale['900'],
                }}
              >
                <lib.Icon size={20} />
                <span>{lib.name}</span>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
