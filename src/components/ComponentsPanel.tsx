'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import * as Select from '@radix-ui/react-select';

const COMPONENT_TYPES = [
  { id: 'button-primary',   label: 'Primary Button',   group: 'Buttons' },
  { id: 'button-secondary', label: 'Secondary Button',  group: 'Buttons' },
  { id: 'card',             label: 'Card',              group: 'Layout' },
  { id: 'navigation',       label: 'Navigation',        group: 'Layout' },
  { id: 'badge',            label: 'Badge / Chip',      group: 'Display' },
  { id: 'alert',            label: 'Alert',             group: 'Display' },
  { id: 'input',            label: 'Input',             group: 'Form' },
  { id: 'link',             label: 'Link',              group: 'Form' },
] as const;

const GROUPS = ['Buttons', 'Layout', 'Display', 'Form'] as const;

const ChevronDownIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function ComponentsPanel() {
  const {
    primaryColor, accentColor, neutralColorScale,
    extraPalettes, componentPaletteMap, setComponentPalette,
    isDarkMode,
  } = useDesignSystem();

  const borderClr   = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const bgColor     = isDarkMode ? neutralColorScale['800'] : '#fff';
  const bgHover     = isDarkMode ? neutralColorScale['700'] : neutralColorScale['50'];
  const textPrimary = isDarkMode ? neutralColorScale['100'] : neutralColorScale['900'];
  const textMuted   = isDarkMode ? neutralColorScale['500'] : neutralColorScale['400'];
  const sectionBg   = isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';

  // All available palette options
  const paletteOptions = [
    { id: 'primary',  name: 'Primary',  color: primaryColor },
    { id: 'accent',   name: 'Accent',   color: accentColor },
    { id: 'neutral',  name: 'Neutral',  color: neutralColorScale['500'] },
    ...extraPalettes.map((p) => ({ id: p.id, name: p.name, color: p.baseColor })),
  ];

  const getPalette = (id: string) =>
    paletteOptions.find((p) => p.id === id) ?? paletteOptions[0];

  return (
    <div className="flex flex-col gap-5">
      {GROUPS.map((group) => {
        const items = COMPONENT_TYPES.filter((c) => c.group === group);
        return (
          <div key={group}>
            {/* Group heading */}
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: textMuted, letterSpacing: '0.09em' }}
            >
              {group}
            </p>

            <div
              className="rounded-lg overflow-hidden"
              style={{ border: `1px solid ${borderClr}`, backgroundColor: sectionBg }}
            >
              {items.map((component, i) => {
                const assignedId = componentPaletteMap[component.id] ?? 'primary';
                const assigned   = getPalette(assignedId);

                return (
                  <div
                    key={component.id}
                    className="flex items-center justify-between px-3 py-2.5"
                    style={{
                      borderTop: i > 0 ? `1px solid ${borderClr}` : 'none',
                    }}
                  >
                    {/* Component label */}
                    <span className="text-sm" style={{ color: textPrimary }}>
                      {component.label}
                    </span>

                    {/* Palette selector */}
                    <Select.Root
                      value={assignedId}
                      onValueChange={(val) => setComponentPalette(component.id, val)}
                    >
                      <Select.Trigger
                        className="flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs outline-none transition-colors hover:opacity-80"
                        style={{
                          backgroundColor: bgColor,
                          borderColor: borderClr,
                          color: textPrimary,
                          minWidth: '100px',
                        }}
                      >
                        {/* Swatch */}
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: assigned.color }}
                        />
                        <Select.Value>{assigned.name}</Select.Value>
                        <Select.Icon className="ml-auto opacity-50">
                          <ChevronDownIcon />
                        </Select.Icon>
                      </Select.Trigger>

                      <Select.Portal>
                        <Select.Content
                          className="rounded-md shadow-lg z-50 overflow-hidden"
                          sideOffset={4}
                          style={{
                            backgroundColor: bgColor,
                            border: `1px solid ${borderClr}`,
                            minWidth: '140px',
                          }}
                        >
                          <Select.Viewport className="p-1">
                            {paletteOptions.map((opt) => (
                              <Select.Item
                                key={opt.id}
                                value={opt.id}
                                className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-md cursor-pointer outline-none transition-colors"
                                style={{ color: textPrimary }}
                                onFocus={(e) => (e.currentTarget.style.backgroundColor = bgHover)}
                                onBlur={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                              >
                                <span
                                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: opt.color }}
                                />
                                <Select.ItemText>{opt.name}</Select.ItemText>
                              </Select.Item>
                            ))}
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Hint */}
      <p className="text-xs leading-relaxed" style={{ color: textMuted }}>
        Assign a color palette to each component type. New palettes appear here once added in the Colors panel.
      </p>
    </div>
  );
}
