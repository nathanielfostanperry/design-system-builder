import React, { useState } from 'react';

interface ColorChipProps {
  color: string;
  shade: string;
}

const ColorChip: React.FC<ColorChipProps> = ({ color, shade }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Determine if the color is dark to use white text
  const isDark = () => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate luminance - if luminance is low, use white text
    return 0.299 * r + 0.587 * g + 0.114 * b < 128;
  };

  const textColor = isDark() ? 'text-white' : 'text-black';

  return (
    <div
      className="flex flex-col items-center justify-center p-4 rounded-md shadow-sm cursor-pointer transition-all hover:shadow-md"
      style={{ backgroundColor: color }}
      onClick={copyToClipboard}
    >
      <div className={`text-lg font-semibold ${textColor}`}>{shade}</div>
      <div className={`text-sm ${textColor}`}>{color}</div>
      {copied && (
        <div
          className={`mt-1 text-xs font-medium ${textColor} bg-opacity-80 rounded px-2 py-1`}
        >
          Copied!
        </div>
      )}
    </div>
  );
};

export default ColorChip;
