'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import * as Select from '@radix-ui/react-select';

const COMPONENT_TYPES = [
  { id: 'button-primary',   label: 'Primary Button',   group: 'Buttons' },
  { id: 'button-secondary', label: 'Secondary Button',  group: 'Buttons' },
  { id: 'icon-button',      label: 'Icon Button',       group: 'Buttons' },
  { id: 'card',             label: 'Card',              group: 'Layout' },
  { id: 'navigation',       label: 'Dropdown',          group: 'Layout' },
  { id: 'input',            label: 'Input',             group: 'Form' },
  { id: 'radio-group',      label: 'Radio Group',       group: 'Form' },
  { id: 'slider',           label: 'Slider',            group: 'Form' },
  { id: 'badge',            label: 'Badge / Chip',      group: 'Display' },
  { id: 'accordion',        label: 'Accordion',         group: 'Display' },
  { id: 'toast',            label: 'Toast',             group: 'Display' },
] as const;

const GROUPS = ['Buttons', 'Layout', 'Form', 'Display'] as const;

type SettingOption = { value: string; label: string };
type SettingConfig = { key: string; label: string; options: SettingOption[] };

const COMPONENT_SETTINGS: Record<string, SettingConfig[]> = {
  'icon-button': [
    {
      key: 'size', label: 'Size',
      options: [{ value: 'sm', label: 'Small' }, { value: 'md', label: 'Medium' }, { value: 'lg', label: 'Large' }],
    },
    {
      key: 'shape', label: 'Shape',
      options: [{ value: 'rounded', label: 'Rounded' }, { value: 'circle', label: 'Circle' }, { value: 'square', label: 'Square' }],
    },
  ],
  card: [
    {
      key: 'layout', label: 'Layout',
      options: [{ value: 'horizontal', label: 'Horizontal' }, { value: 'vertical', label: 'Vertical' }],
    },
    {
      key: 'avatarShape', label: 'Avatar',
      options: [{ value: 'rounded', label: 'Rounded' }, { value: 'circle', label: 'Circle' }, { value: 'square', label: 'Square' }],
    },
    {
      key: 'showActions', label: 'Actions',
      options: [{ value: 'show', label: 'Show' }, { value: 'hide', label: 'Hide' }],
    },
  ],
  accordion: [
    {
      key: 'arrowType', label: 'Arrow',
      options: [{ value: 'chevron', label: 'Chevron' }, { value: 'plus', label: 'Plus' }, { value: 'arrow', label: 'Arrow' }],
    },
    {
      key: 'borderType', label: 'Border',
      options: [{ value: 'full', label: 'Full' }, { value: 'bottom', label: 'Bottom' }, { value: 'none', label: 'None' }],
    },
    {
      key: 'background', label: 'Background',
      options: [{ value: 'solid', label: 'Solid' }, { value: 'tinted', label: 'Tinted' }, { value: 'transparent', label: 'None' }],
    },
  ],
};

const ChevronDownIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function ComponentsPanel() {
  const {
    primaryColor, accentColor, neutralColorScale,
    extraPalettes, componentPaletteMap, setComponentPalette,
    componentSettingsMap, setComponentSetting,
    isDarkMode,
  } = useDesignSystem();

  const [expandedSettings, setExpandedSettings] = useState<Set<string>>(new Set());

  const toggleSettings = (id: string) => {
    setExpandedSettings((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const borderClr   = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const bgColor     = isDarkMode ? neutralColorScale['800'] : '#fff';
  const bgHover     = isDarkMode ? neutralColorScale['700'] : neutralColorScale['50'];
  const textPrimary = isDarkMode ? neutralColorScale['100'] : neutralColorScale['900'];
  const textMuted   = isDarkMode ? neutralColorScale['500'] : neutralColorScale['400'];
  const sectionBg   = isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';
  const settingsBg  = isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.025)';

  const paletteOptions = [
    { id: 'primary',  name: 'Primary',   color: primaryColor },
    { id: 'accent',   name: 'Secondary', color: accentColor },
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
                const assignedId   = componentPaletteMap[component.id] ?? 'primary';
                const assigned     = getPalette(assignedId);
                const settings     = COMPONENT_SETTINGS[component.id];
                const isExpanded   = expandedSettings.has(component.id);
                const compSettings = componentSettingsMap[component.id] ?? {};

                return (
                  <div
                    key={component.id}
                    style={{ borderTop: i > 0 ? `1px solid ${borderClr}` : 'none' }}
                  >
                    {/* Main row */}
                    <div className="flex items-center justify-between px-3 py-2.5 gap-2">
                      <span className="text-sm flex-1" style={{ color: textPrimary }}>
                        {component.label}
                      </span>

                      <div className="flex items-center gap-1.5">
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
                              minWidth: '96px',
                            }}
                          >
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

                        {/* Settings toggle — only for components that have settings */}
                        {settings && (
                          <button
                            onClick={() => toggleSettings(component.id)}
                            className="flex items-center justify-center w-6 h-6 rounded-md border transition-colors"
                            title="Component settings"
                            style={{
                              backgroundColor: isExpanded ? (isDarkMode ? neutralColorScale['700'] : neutralColorScale['100']) : bgColor,
                              borderColor: borderClr,
                              color: isExpanded ? textPrimary : textMuted,
                            }}
                          >
                            <SettingsIcon />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Inline settings panel */}
                    {settings && isExpanded && (
                      <div
                        className="px-3 pb-3 flex flex-col gap-2.5"
                        style={{ backgroundColor: settingsBg, borderTop: `1px solid ${borderClr}` }}
                      >
                        {settings.map((setting) => {
                          const currentValue = compSettings[setting.key] ?? setting.options[0].value;
                          return (
                            <div key={setting.key} className="flex flex-col gap-1.5 pt-2">
                              <span className="text-xs" style={{ color: textMuted }}>
                                {setting.label}
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {setting.options.map((opt) => {
                                  const isActive = currentValue === opt.value;
                                  return (
                                    <button
                                      key={opt.value}
                                      onClick={() => setComponentSetting(component.id, setting.key, opt.value)}
                                      className="px-2 py-1 text-xs rounded-md border transition-colors"
                                      style={{
                                        backgroundColor: isActive
                                          ? (isDarkMode ? neutralColorScale['600'] : neutralColorScale['800'])
                                          : bgColor,
                                        borderColor: isActive
                                          ? (isDarkMode ? neutralColorScale['500'] : neutralColorScale['700'])
                                          : borderClr,
                                        color: isActive
                                          ? (isDarkMode ? '#fff' : '#fff')
                                          : textMuted,
                                        fontWeight: isActive ? 500 : 400,
                                      }}
                                    >
                                      {opt.label}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <p className="text-xs leading-relaxed" style={{ color: textMuted }}>
        Assign a palette and configure style settings per component. New palettes appear here once added in the Colors panel.
      </p>
    </div>
  );
}
