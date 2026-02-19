'use client';

import React, { useState, useEffect, useRef } from 'react';
import { HexColorPicker } from 'react-colorful';
import { useDesignSystem } from '../context/DesignSystemContext';
import { TbPlus, TbTrash, TbChevronDown } from 'react-icons/tb';

// ── Inline hex input ────────────────────────────────────────────────────────
const HexInput: React.FC<{
  value: string;
  onChange: (hex: string) => void;
  isDarkMode: boolean;
}> = ({ value, onChange, isDarkMode }) => {
  const [local, setLocal] = useState(value);

  useEffect(() => { setLocal(value); }, [value]);

  const commit = (v: string) => {
    if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(v)) onChange(v);
    else setLocal(value);
  };

  return (
    <input
      className="flex-1 px-2 py-1 text-xs font-mono border rounded outline-none min-w-0"
      style={{
        backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
        borderColor: isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
        color: isDarkMode ? '#e5e5e5' : '#111',
      }}
      value={local}
      onChange={(e) => setLocal(e.target.value)}
      onBlur={(e) => commit(e.target.value)}
      onKeyDown={(e) => { if (e.key === 'Enter') commit((e.target as HTMLInputElement).value); }}
      maxLength={7}
      placeholder="#rrggbb"
    />
  );
};

// ── Palette row ─────────────────────────────────────────────────────────────
interface PaletteRowProps {
  id: string;
  name: string;
  color: string;
  isBuiltIn: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onColorChange: (hex: string) => void;
  onNameChange?: (name: string) => void;
  onRemove?: () => void;
  isDarkMode: boolean;
  borderClr: string;
  bgColor: string;
  textPrimary: string;
  textMuted: string;
}

const PaletteRow: React.FC<PaletteRowProps> = ({
  name, color, isBuiltIn, isExpanded, onToggle, onColorChange,
  onNameChange, onRemove, isDarkMode, borderClr, bgColor, textPrimary, textMuted,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ border: `1px solid ${borderClr}` }}
    >
      {/* Row header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-left transition-colors hover:opacity-80"
        style={{ backgroundColor: bgColor }}
      >
        {/* Color swatch */}
        <span
          className="w-4 h-4 rounded-full flex-shrink-0 ring-1 ring-black/10"
          style={{ backgroundColor: color }}
        />

        {/* Name */}
        {isBuiltIn ? (
          <span className="flex-1 text-sm font-medium truncate" style={{ color: textPrimary }}>
            {name}
          </span>
        ) : (
          <input
            ref={nameRef}
            className="flex-1 text-sm font-medium bg-transparent outline-none min-w-0"
            style={{ color: textPrimary }}
            value={name}
            onChange={(e) => onNameChange?.(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="Color name"
          />
        )}

        {/* Hex preview */}
        <span className="text-xs font-mono flex-shrink-0" style={{ color: textMuted }}>
          {color.toUpperCase()}
        </span>

        {/* Chevron */}
        <TbChevronDown
          size={14}
          strokeWidth={2}
          style={{
            color: textMuted,
            flexShrink: 0,
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 150ms',
          }}
        />
      </button>

      {/* Expanded picker */}
      {isExpanded && (
        <div
          className="px-3 pb-3 pt-2 flex flex-col gap-2"
          style={{ borderTop: `1px solid ${borderClr}`, backgroundColor: bgColor }}
        >
          <HexColorPicker
            color={color}
            onChange={onColorChange}
            style={{ width: '100%', height: '140px' }}
          />
          <div className="flex items-center gap-2">
            <span
              className="w-7 h-7 rounded flex-shrink-0"
              style={{ backgroundColor: color, border: `1px solid ${borderClr}` }}
            />
            <HexInput value={color} onChange={onColorChange} isDarkMode={isDarkMode} />
            {!isBuiltIn && (
              <button
                onClick={(e) => { e.stopPropagation(); onRemove?.(); }}
                className="flex-shrink-0 p-1 rounded opacity-40 hover:opacity-80 transition-opacity"
                style={{ color: isDarkMode ? '#fff' : '#000' }}
                title="Remove palette"
              >
                <TbTrash size={14} strokeWidth={2} />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Main component ──────────────────────────────────────────────────────────
const ColorSystemBuilder: React.FC = () => {
  const {
    primaryColor, setBaseColor,
    accentColor,
    extraPalettes, addExtraPalette, removeExtraPalette,
    updateExtraPaletteColor, updateExtraPaletteName,
    isDarkMode, neutralColorScale,
  } = useDesignSystem();

  const [expandedId, setExpandedId] = useState<string | null>('primary');

  const toggle = (id: string) =>
    setExpandedId((prev) => (prev === id ? null : id));

  const handleAddPalette = () => {
    const defaultNames = ['Accent 1', 'Accent 2', 'Accent 3', 'Accent 4'];
    const name = defaultNames[extraPalettes.length] ?? `Color ${extraPalettes.length + 1}`;
    addExtraPalette(name);
    // Delay toggle so the new id is available after state update
    setTimeout(() => {
      setExpandedId('__new__');
    }, 0);
  };

  // Track the last added id to auto-expand it
  const prevLengthRef = useRef(extraPalettes.length);
  useEffect(() => {
    if (extraPalettes.length > prevLengthRef.current) {
      const newest = extraPalettes[extraPalettes.length - 1];
      if (newest) setExpandedId(newest.id);
    }
    prevLengthRef.current = extraPalettes.length;
  }, [extraPalettes]);

  const borderClr  = isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
  const bgColor    = isDarkMode ? neutralColorScale['800'] : '#fff';
  const textPrimary = isDarkMode ? neutralColorScale['100'] : neutralColorScale['900'];
  const textMuted   = isDarkMode ? neutralColorScale['500'] : neutralColorScale['400'];

  return (
    <div className="flex flex-col gap-4">
      {/* ── Built-in palettes ── */}
      <div className="flex flex-col gap-2">
        <PaletteRow
          id="primary"
          name="Primary"
          color={primaryColor}
          isBuiltIn
          isExpanded={expandedId === 'primary'}
          onToggle={() => toggle('primary')}
          onColorChange={(c) => setBaseColor('primary', c)}
          isDarkMode={isDarkMode}
          borderClr={borderClr}
          bgColor={bgColor}
          textPrimary={textPrimary}
          textMuted={textMuted}
        />

        <PaletteRow
          id="accent"
          name="Secondary"
          color={accentColor}
          isBuiltIn
          isExpanded={expandedId === 'accent'}
          onToggle={() => toggle('accent')}
          onColorChange={(c) => setBaseColor('accent', c)}
          isDarkMode={isDarkMode}
          borderClr={borderClr}
          bgColor={bgColor}
          textPrimary={textPrimary}
          textMuted={textMuted}
        />

        {/* ── Extra palettes ── */}
        {extraPalettes.map((palette) => (
          <PaletteRow
            key={palette.id}
            id={palette.id}
            name={palette.name}
            color={palette.baseColor}
            isBuiltIn={false}
            isExpanded={expandedId === palette.id}
            onToggle={() => toggle(palette.id)}
            onColorChange={(c) => updateExtraPaletteColor(palette.id, c)}
            onNameChange={(n) => updateExtraPaletteName(palette.id, n)}
            onRemove={() => removeExtraPalette(palette.id)}
            isDarkMode={isDarkMode}
            borderClr={borderClr}
            bgColor={bgColor}
            textPrimary={textPrimary}
            textMuted={textMuted}
          />
        ))}
      </div>

      {/* ── Add palette ── */}
      <button
        onClick={handleAddPalette}
        className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-sm transition-colors hover:opacity-80 outline-none"
        style={{
          border: `1px dashed ${borderClr}`,
          color: textMuted,
          backgroundColor: 'transparent',
        }}
      >
        <TbPlus size={14} strokeWidth={2} />
        Add color
      </button>

    </div>
  );
};

export default ColorSystemBuilder;
