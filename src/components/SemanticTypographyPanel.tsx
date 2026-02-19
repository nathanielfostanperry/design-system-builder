'use client';

import React, { useState } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';
import * as Select from '@radix-ui/react-select';
import FontSelect from './FontSelect';
import {
  SEMANTIC_TYPOGRAPHY_DEFINITIONS,
  TYPOGRAPHY_CATEGORIES,
  getEffectiveTypographyMapping,
} from '@/utils/semanticTypography';
import type { FontSize, FontWeight } from '@/types/designSystem';

const ChevronDownIcon = () => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FONT_REF_OPTIONS = [
  { value: 'heading', label: 'Heading' },
  { value: 'body', label: 'Body' },
  { value: 'code', label: 'Code' },
] as const;

const SIZE_OPTIONS: { value: FontSize; label: string }[] = [
  { value: 'xxs', label: 'XXS' },
  { value: 'xs', label: 'XS' },
  { value: 'sm', label: 'SM' },
  { value: 'regular', label: 'Regular' },
  { value: 'lg', label: 'LG' },
  { value: 'xl', label: 'XL' },
  { value: 'xxl', label: 'XXL' },
];

const WEIGHT_OPTIONS: { value: FontWeight; label: string }[] = [
  { value: 'thin', label: 'Thin' },
  { value: 'regular', label: 'Regular' },
  { value: 'bold', label: 'Bold' },
  { value: 'extrabold', label: 'Extra Bold' },
];

export default function SemanticTypographyPanel() {
  const {
    headingFont,
    setHeadingFont,
    bodyFont,
    setBodyFont,
    codeFont,
    setCodeFont,
    typographyTokenOverrides,
    setTypographyTokenOverride,
    resetTypographyTokenOverride,
    neutralColorScale,
    isDarkMode,
  } = useDesignSystem();

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['display', 'heading', 'body', 'ui'])
  );

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const borderClr = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const textPrimary = isDarkMode ? neutralColorScale['100'] : neutralColorScale['900'];
  const textMuted = isDarkMode ? neutralColorScale['500'] : neutralColorScale['400'];
  const sectionBg = isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)';

  return (
    <div className="flex flex-col gap-5">
      {/* Font primitives */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: textMuted, letterSpacing: '0.09em' }}>
          Font primitives
        </p>
        <div className="flex flex-col gap-4 rounded-lg p-3" style={{ backgroundColor: sectionBg, border: `1px solid ${borderClr}` }}>
          <FontSelect label="Heading" value={headingFont} onChange={setHeadingFont} />
          <FontSelect label="Body" value={bodyFont} onChange={setBodyFont} />
          <FontSelect label="Code" value={codeFont} onChange={setCodeFont} />
        </div>
      </div>

      <p className="text-xs leading-relaxed" style={{ color: textMuted }}>
        Semantic typography tokens map use cases (display, headings, body, labels) to font primitives. Override font, size, or weight per token.
      </p>

      {TYPOGRAPHY_CATEGORIES.map((cat) => {
        const tokens = SEMANTIC_TYPOGRAPHY_DEFINITIONS.filter((t) => t.category === cat.id);
        if (tokens.length === 0) return null;

        const isExpanded = expandedCategories.has(cat.id);

        return (
          <div key={cat.id}>
            <button
              onClick={() => toggleCategory(cat.id)}
              className="flex items-center justify-between w-full text-left py-1.5"
              style={{ color: textPrimary }}
            >
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ letterSpacing: '0.09em' }}>
                {cat.label}
              </span>
              <span className="text-xs" style={{ color: textMuted }}>
                {isExpanded ? '−' : '+'}
              </span>
            </button>

            {isExpanded && (
              <div
                className="rounded-lg overflow-hidden mt-1"
                style={{ border: `1px solid ${borderClr}`, backgroundColor: sectionBg }}
              >
                {tokens.map((token, i) => {
                  const effective = getEffectiveTypographyMapping(token.id, typographyTokenOverrides);
                  const isOverridden = typographyTokenOverrides[token.id] !== undefined;

                  return (
                    <div
                      key={token.id}
                      className="px-3 py-2.5 flex flex-col gap-2"
                      style={{ borderTop: i > 0 ? `1px solid ${borderClr}` : 'none' }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium" style={{ color: textPrimary }}>
                          {token.label}
                          {isOverridden && (
                            <span className="ml-1.5 text-xs font-normal" style={{ color: textMuted }}>
                              (overridden)
                            </span>
                          )}
                        </span>
                        {isOverridden && (
                          <button
                            onClick={() => resetTypographyTokenOverride(token.id)}
                            className="px-2 py-1 text-xs rounded-md border"
                            style={{ borderColor: borderClr, color: textMuted }}
                          >
                            Reset
                          </button>
                        )}
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: textMuted }}>
                        {token.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Select.Root
                          value={effective.fontRef}
                          onValueChange={(val) =>
                            setTypographyTokenOverride(token.id, { fontRef: val as 'heading' | 'body' | 'code' })
                          }
                        >
                          <Select.Trigger
                            className="flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs"
                            style={{ borderColor: borderClr, color: textPrimary }}
                          >
                            <Select.Value />
                            <Select.Icon><ChevronDownIcon /></Select.Icon>
                          </Select.Trigger>
                          <Select.Portal>
                            <Select.Content
                              className="rounded-md shadow-lg z-50 overflow-hidden"
                              sideOffset={4}
                              style={{ backgroundColor: isDarkMode ? neutralColorScale['800'] : '#fff', border: `1px solid ${borderClr}` }}
                            >
                              <Select.Viewport className="p-1">
                                {FONT_REF_OPTIONS.map((opt) => (
                                  <Select.Item
                                    key={opt.value}
                                    value={opt.value}
                                    className="px-3 py-1.5 text-xs rounded-md cursor-pointer"
                                    style={{ color: textPrimary }}
                                  >
                                    <Select.ItemText>{opt.label}</Select.ItemText>
                                  </Select.Item>
                                ))}
                              </Select.Viewport>
                            </Select.Content>
                          </Select.Portal>
                        </Select.Root>

                        {token.defaultSize !== undefined && (
                          <Select.Root
                            value={effective.size ?? token.defaultSize}
                            onValueChange={(val) =>
                              setTypographyTokenOverride(token.id, { size: val })
                            }
                          >
                            <Select.Trigger
                              className="flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs"
                              style={{ borderColor: borderClr, color: textPrimary }}
                            >
                              <Select.Value />
                              <Select.Icon><ChevronDownIcon /></Select.Icon>
                            </Select.Trigger>
                            <Select.Portal>
                              <Select.Content
                                className="rounded-md shadow-lg z-50 overflow-hidden"
                                sideOffset={4}
                                style={{ backgroundColor: isDarkMode ? neutralColorScale['800'] : '#fff', border: `1px solid ${borderClr}` }}
                              >
                                <Select.Viewport className="p-1">
                                  {SIZE_OPTIONS.map((opt) => (
                                    <Select.Item
                                      key={opt.value}
                                      value={opt.value}
                                      className="px-3 py-1.5 text-xs rounded-md cursor-pointer"
                                      style={{ color: textPrimary }}
                                    >
                                      <Select.ItemText>{opt.label}</Select.ItemText>
                                    </Select.Item>
                                  ))}
                                </Select.Viewport>
                              </Select.Content>
                            </Select.Portal>
                          </Select.Root>
                        )}

                        <Select.Root
                          value={effective.weight ?? token.defaultWeight ?? 'regular'}
                          onValueChange={(val) =>
                            setTypographyTokenOverride(token.id, { weight: val })
                          }
                        >
                          <Select.Trigger
                            className="flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs"
                            style={{ borderColor: borderClr, color: textPrimary }}
                          >
                            <Select.Value />
                            <Select.Icon><ChevronDownIcon /></Select.Icon>
                          </Select.Trigger>
                          <Select.Portal>
                            <Select.Content
                              className="rounded-md shadow-lg z-50 overflow-hidden"
                              sideOffset={4}
                              style={{ backgroundColor: isDarkMode ? neutralColorScale['800'] : '#fff', border: `1px solid ${borderClr}` }}
                            >
                              <Select.Viewport className="p-1">
                                {WEIGHT_OPTIONS.map((opt) => (
                                  <Select.Item
                                    key={opt.value}
                                    value={opt.value}
                                    className="px-3 py-1.5 text-xs rounded-md cursor-pointer"
                                    style={{ color: textPrimary }}
                                  >
                                    <Select.ItemText>{opt.label}</Select.ItemText>
                                  </Select.Item>
                                ))}
                              </Select.Viewport>
                            </Select.Content>
                          </Select.Portal>
                        </Select.Root>
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
  );
}
