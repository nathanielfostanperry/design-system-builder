'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import Fonts from './Fonts';
import Corners from './Corners';
import Spacing from './Spacing';
import Shadows from './Shadows';
import Borders from './Borders';
import ColorSystemBuilder from './ColorSystemBuilder';
import IconLibraryPicker from './IconLibraryPicker';
import ComponentsPanel from './ComponentsPanel';
import { TbTypography, TbAdjustmentsHorizontal, TbPalette, TbMoon, TbSun, TbX, TbIcons, TbComponents } from 'react-icons/tb';

type PanelId = 'typography' | 'icons' | 'spacing' | 'colors' | 'components';

const NAV_ITEMS = [
  { id: 'typography'  as PanelId, label: 'Typography',  Icon: TbTypography },
  { id: 'icons'       as PanelId, label: 'Icons',       Icon: TbIcons },
  { id: 'spacing'     as PanelId, label: 'Spacing',     Icon: TbAdjustmentsHorizontal },
  { id: 'colors'      as PanelId, label: 'Colors',      Icon: TbPalette },
  { id: 'components'  as PanelId, label: 'Components',  Icon: TbComponents },
];

const PANEL_WIDTH = 296;

export default function DesignSidebar() {
  const { isDarkMode, setIsDarkMode, neutralColorScale } = useDesignSystem();
  const [activePanel, setActivePanel] = useState<PanelId | null>('colors');

  const toggle = (id: PanelId) =>
    setActivePanel((prev) => (prev === id ? null : id));

  const railBg     = isDarkMode ? neutralColorScale['950'] ?? '#090909' : '#f5f5f5';
  const panelBg    = isDarkMode ? neutralColorScale['900'] : '#ffffff';
  const borderClr  = isDarkMode ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
  const iconMuted  = isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)';
  const iconActive = isDarkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.85)';
  const activeBg   = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';

  const panelLabel: Record<PanelId, string> = {
    typography: 'Typography',
    icons:      'Icons',
    spacing:    'Spacing',
    colors:     'Colors',
    components: 'Components',
  };

  return (
    <div
      className="flex flex-shrink-0 h-full"
      style={{ borderRight: `1px solid ${borderClr}` }}
    >
      {/* ── Icon rail ── */}
      <nav
        className="flex flex-col items-center py-3 gap-1 flex-shrink-0"
        style={{ width: 52, backgroundColor: railBg }}
      >
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const active = activePanel === id;
          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              title={label}
              className="relative flex flex-col items-center justify-center w-9 h-9 rounded-lg transition-all duration-150 outline-none focus-visible:ring-2"
              style={{
                backgroundColor: active ? activeBg : 'transparent',
                color: active ? iconActive : iconMuted,
              }}
            >
              <Icon size={17} strokeWidth={active ? 2 : 1.5} />
              {active && (
                <span
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full"
                  style={{ backgroundColor: iconActive }}
                />
              )}
            </button>
          );
        })}

        <div className="flex-1" />

        {/* Dark / light toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          className="flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-150 outline-none"
          style={{ color: iconMuted }}
        >
          {isDarkMode ? <TbSun size={17} strokeWidth={1.5} /> : <TbMoon size={17} strokeWidth={1.5} />}
        </button>
      </nav>

      {/* ── Secondary panel ── */}
      <div
        className="overflow-hidden transition-[width] duration-200 ease-in-out flex-shrink-0"
        style={{
          width: activePanel ? PANEL_WIDTH : 0,
          borderRight: activePanel ? `1px solid ${borderClr}` : 'none',
        }}
      >
        <div
          className="h-full flex flex-col overflow-hidden"
          style={{ width: PANEL_WIDTH, backgroundColor: panelBg }}
        >
          {/* Panel header */}
          <div
            className="sticky top-0 z-10 flex items-center justify-between px-4 h-11 flex-shrink-0"
            style={{
              backgroundColor: panelBg,
              borderBottom: `1px solid ${borderClr}`,
            }}
          >
            <span
              className="text-xs font-semibold uppercase tracking-widest select-none"
              style={{ color: isDarkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)', letterSpacing: '0.1em' }}
            >
              {activePanel ? panelLabel[activePanel] : ''}
            </span>
            <button
              onClick={() => setActivePanel(null)}
              className="w-6 h-6 flex items-center justify-center rounded-md transition-opacity opacity-30 hover:opacity-70 outline-none"
              style={{ color: isDarkMode ? '#fff' : '#000' }}
            >
              <TbX size={14} strokeWidth={2} />
            </button>
          </div>

          {/* Panel content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-5">
              {activePanel === 'typography' && <Fonts />}

              {activePanel === 'icons' && <IconLibraryPicker />}

              {activePanel === 'spacing' && (
                <div className="flex flex-col gap-4">
                  <Corners />
                  <Spacing />
                  <Shadows />
                  <Borders />
                </div>
              )}

              {activePanel === 'colors' && <ColorSystemBuilder />}

              {activePanel === 'components' && <ComponentsPanel />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
