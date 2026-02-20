'use client';

import React from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import { useTypographyToken } from '@/hooks/useTypographyToken';

const COMPONENT_TYPES = [
  { id: 'button-primary',   label: 'Primary Button',   group: 'Buttons' },
  { id: 'button-secondary', label: 'Secondary Button', group: 'Buttons' },
  { id: 'icon-button',      label: 'Icon Button',      group: 'Buttons' },
  { id: 'card',             label: 'Card',             group: 'Layout' },
  { id: 'navigation',       label: 'Dropdown',         group: 'Layout' },
  { id: 'input',            label: 'Input',            group: 'Form' },
  { id: 'radio-group',      label: 'Radio Group',      group: 'Form' },
  { id: 'slider',           label: 'Slider',           group: 'Form' },
  { id: 'badge',            label: 'Badge / Chip',     group: 'Display' },
  { id: 'accordion',        label: 'Accordion',        group: 'Display' },
  { id: 'toast',            label: 'Toast',            group: 'Display' },
] as const;

const GROUPS = ['Buttons', 'Layout', 'Form', 'Display'] as const;

export default function ComponentsPanel() {
  const { neutralColorScale, isDarkMode } = useDesignSystem();
  const caption = useTypographyToken('caption');

  const textMuted = isDarkMode ? neutralColorScale['500'] : neutralColorScale['400'];
  const borderClr = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const sectionBg = isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';

  return (
    <div className="flex flex-col gap-5">
      <p className="text-xs leading-relaxed" style={{ color: textMuted, fontFamily: caption.fontFamily, fontSize: caption.fontSize }}>
        Components consume semantic and component-level tokens. Override component-specific colors in the Component Tokens panel; customize semantic tokens in the Semantic Tokens panel.
      </p>

      {GROUPS.map((group) => {
        const items = COMPONENT_TYPES.filter((c) => c.group === group);
        return (
          <div key={group}>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: textMuted, letterSpacing: '0.09em', fontFamily: caption.fontFamily }}
            >
              {group}
            </p>
            <div
              className="rounded-lg overflow-hidden"
              style={{ border: `1px solid ${borderClr}`, backgroundColor: sectionBg }}
            >
              {items.map((component, i) => (
                <div
                  key={component.id}
                  className="px-3 py-2.5"
                  style={{
                    borderTop: i > 0 ? `1px solid ${borderClr}` : 'none',
                    color: textMuted,
                    fontFamily: caption.fontFamily,
                    fontSize: caption.fontSize,
                  }}
                >
                  {component.label}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
