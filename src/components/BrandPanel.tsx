'use client';

import React, { useState, KeyboardEvent } from 'react';
import { useDesignSystem } from '@/context/DesignSystemContext';

const INDUSTRY_OPTIONS = [
  'Technology', 'Healthcare', 'Finance', 'Retail', 'Education',
  'Media & Entertainment', 'Professional Services', 'Non-profit',
  'Real Estate', 'Food & Beverage', 'Other',
];

const VOICE_OPTIONS = [
  'Professional', 'Playful', 'Bold', 'Authoritative',
  'Warm', 'Minimal', 'Technical', 'Innovative',
  'Approachable', 'Inspiring', 'Educational', 'Conversational',
];

export default function BrandPanel() {
  const { brandSettings, setBrandSetting, isDarkMode, neutralColorScale } = useDesignSystem();

  const [valueInput, setValueInput] = useState('');

  const borderClr   = isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)';
  const bgInput     = isDarkMode ? neutralColorScale['800'] : '#fff';
  const textPrimary = isDarkMode ? neutralColorScale['100'] : neutralColorScale['900'];
  const textMuted   = isDarkMode ? neutralColorScale['500'] : neutralColorScale['400'];
  const labelColor  = isDarkMode ? neutralColorScale['400'] : neutralColorScale['500'];
  const tagBg       = isDarkMode ? neutralColorScale['700'] : neutralColorScale['100'];

  const inputStyle: React.CSSProperties = {
    backgroundColor: bgInput,
    borderColor: borderClr,
    color: textPrimary,
    outline: 'none',
    width: '100%',
    padding: '6px 10px',
    borderRadius: '6px',
    border: `1px solid ${borderClr}`,
    fontSize: '13px',
    fontFamily: 'inherit',
    resize: 'none' as const,
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color: labelColor,
    display: 'block',
    marginBottom: '6px',
  };

  const addValue = () => {
    const trimmed = valueInput.trim().replace(/,$/, '');
    if (!trimmed || brandSettings.values.includes(trimmed)) {
      setValueInput('');
      return;
    }
    setBrandSetting('values', [...brandSettings.values, trimmed]);
    setValueInput('');
  };

  const handleValueKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addValue();
    }
    if (e.key === 'Backspace' && valueInput === '' && brandSettings.values.length > 0) {
      setBrandSetting('values', brandSettings.values.slice(0, -1));
    }
  };

  const removeValue = (v: string) => {
    setBrandSetting('values', brandSettings.values.filter((x) => x !== v));
  };

  const toggleVoice = (v: string) => {
    const next = brandSettings.voice.includes(v)
      ? brandSettings.voice.filter((x) => x !== v)
      : [...brandSettings.voice, v];
    setBrandSetting('voice', next);
  };

  return (
    <div className="flex flex-col gap-5">

      {/* Brand name */}
      <div>
        <label style={labelStyle}>Brand Name</label>
        <input
          type="text"
          value={brandSettings.name}
          onChange={(e) => setBrandSetting('name', e.target.value)}
          placeholder="Acme Inc."
          style={inputStyle}
        />
      </div>

      {/* Industry */}
      <div>
        <label style={labelStyle}>Industry</label>
        <select
          value={brandSettings.industry}
          onChange={(e) => setBrandSetting('industry', e.target.value)}
          style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}
        >
          <option value="">Select industry…</option>
          {INDUSTRY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Mission */}
      <div>
        <label style={labelStyle}>Mission</label>
        <textarea
          rows={3}
          value={brandSettings.mission}
          onChange={(e) => setBrandSetting('mission', e.target.value)}
          placeholder="We exist to…"
          style={inputStyle}
        />
      </div>

      {/* Positioning */}
      <div>
        <label style={labelStyle}>Positioning</label>
        <textarea
          rows={3}
          value={brandSettings.positioning}
          onChange={(e) => setBrandSetting('positioning', e.target.value)}
          placeholder="For [audience] who [need], we are the [category] that [benefit]…"
          style={inputStyle}
        />
      </div>

      {/* Values */}
      <div>
        <label style={labelStyle}>Brand Values</label>
        <div
          className="flex flex-wrap gap-1.5 p-2 rounded-md border min-h-[40px]"
          style={{ backgroundColor: bgInput, borderColor: borderClr }}
        >
          {brandSettings.values.map((v) => (
            <span
              key={v}
              className="flex items-center gap-1 pl-2 pr-1 py-0.5 rounded text-xs"
              style={{ backgroundColor: tagBg, color: textPrimary }}
            >
              {v}
              <button
                onClick={() => removeValue(v)}
                className="opacity-40 hover:opacity-80 transition-opacity"
                style={{ color: textPrimary, lineHeight: 1 }}
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            value={valueInput}
            onChange={(e) => setValueInput(e.target.value)}
            onKeyDown={handleValueKeyDown}
            onBlur={addValue}
            placeholder={brandSettings.values.length === 0 ? 'Type a value, press Enter…' : ''}
            style={{
              flex: '1 1 80px',
              minWidth: '80px',
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              color: textPrimary,
              fontSize: '13px',
              fontFamily: 'inherit',
              padding: '2px 4px',
            }}
          />
        </div>
        <p style={{ fontSize: '11px', color: textMuted, marginTop: '4px' }}>
          Press Enter or comma to add
        </p>
      </div>

      {/* Voice & tone */}
      <div>
        <label style={labelStyle}>Voice & Tone</label>
        <div className="flex flex-wrap gap-1.5">
          {VOICE_OPTIONS.map((v) => {
            const active = brandSettings.voice.includes(v);
            return (
              <button
                key={v}
                onClick={() => toggleVoice(v)}
                className="px-2.5 py-1 rounded-md text-xs border transition-colors"
                style={{
                  backgroundColor: active ? (isDarkMode ? neutralColorScale['600'] : neutralColorScale['800']) : bgInput,
                  borderColor: active ? (isDarkMode ? neutralColorScale['500'] : neutralColorScale['700']) : borderClr,
                  color: active ? '#fff' : textMuted,
                  fontWeight: active ? 500 : 400,
                }}
              >
                {v}
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
