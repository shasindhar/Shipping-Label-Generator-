import React from 'react';
import { LabelData, LabelSizePreset, OrientationType, TemplateType } from '../../types';
import { Palette, LayoutTemplate, Maximize2 } from 'lucide-react';

interface AppearanceSectionProps {
  label: LabelData;
  onChange: (updated: Partial<LabelData>) => void;
}

export const AppearanceSection: React.FC<AppearanceSectionProps> = ({ label, onChange }) => {
  const handleAppearanceChange = (field: string, value: any) => {
    onChange({
      appearance: { ...label.appearance, [field]: value },
    });
  };

  const templates: { id: TemplateType; name: string; desc: string }[] = [
    { id: 'professional', name: 'Professional Courier', desc: 'Reference courier design with P-badge and rounded cards' },
    { id: 'minimal', name: 'Clean Minimalist', desc: 'High contrast B&W grid lines for thermal 203 DPI' },
    { id: 'compact', name: 'Compact Density', desc: 'Optimized for small 3x5 or 4x4 parcel boxes' },
    { id: 'bold-freight', name: 'Industrial Freight', desc: 'Heavy dark headers and high-visibility badges' },
  ];

  const sizePresets: { id: LabelSizePreset; name: string; dimensions: string }[] = [
    { id: '4x6', name: '4 × 6 inch', dimensions: 'Standard Shipping (Default)' },
    { id: '4x8', name: '4 × 8 inch', dimensions: 'Extended Freight / Return' },
    { id: 'a6', name: 'A6 Sheet', dimensions: '105 × 148 mm' },
    { id: 'a5', name: 'A5 Sheet', dimensions: '148 × 210 mm' },
    { id: 'a4', name: 'A4 Sheet', dimensions: '210 × 297 mm' },
    { id: 'custom', name: 'Custom Size', dimensions: 'Manual dimensions' },
  ];

  return (
    <div className="space-y-3 text-xs">
      {/* Template Selection */}
      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/90 space-y-2.5">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
          <LayoutTemplate className="w-4 h-4 text-blue-600" />
          <span>Label Layout Template</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {templates.map((tpl) => (
            <button
              key={tpl.id}
              type="button"
              onClick={() => handleAppearanceChange('template', tpl.id)}
              className={`p-2.5 rounded-xl text-left border transition-all ${
                label.appearance.template === tpl.id
                  ? 'bg-blue-50/80 border-blue-500 text-slate-900 shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="font-bold text-xs flex items-center justify-between">
                <span>{tpl.name}</span>
                {label.appearance.template === tpl.id && (
                  <span className="w-2 h-2 rounded-full bg-blue-600" />
                )}
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">{tpl.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Label Dimensions & Orientation */}
      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/90 space-y-2.5">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
          <Maximize2 className="w-4 h-4 text-emerald-600" />
          <span>Label Size & Print Preset</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {sizePresets.map((sp) => (
            <button
              key={sp.id}
              type="button"
              onClick={() => handleAppearanceChange('sizePreset', sp.id)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                label.appearance.sizePreset === sp.id
                  ? 'bg-emerald-50/80 border-emerald-500 text-slate-900 shadow-2xs font-semibold'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <span className="font-bold text-[11px] block text-slate-900">{sp.name}</span>
              <span className="text-[9px] text-slate-500 block truncate">{sp.dimensions}</span>
            </button>
          ))}
        </div>

        {label.appearance.sizePreset === 'custom' && (
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
            <div>
              <label className="block text-[10px] font-semibold text-slate-600 mb-1">Width (Inches)</label>
              <input
                type="number"
                min="2"
                max="12"
                step="0.5"
                value={label.appearance.customWidthInches}
                onChange={(e) => handleAppearanceChange('customWidthInches', Number(e.target.value))}
                className="w-full bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-semibold text-slate-600 mb-1">Height (Inches)</label>
              <input
                type="number"
                min="2"
                max="16"
                step="0.5"
                value={label.appearance.customHeightInches}
                onChange={(e) => handleAppearanceChange('customHeightInches', Number(e.target.value))}
                className="w-full bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 font-mono"
              />
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 pt-1">
          <span className="text-[11px] font-semibold text-slate-600">Orientation:</span>
          <div className="flex gap-2">
            {(['portrait', 'landscape'] as OrientationType[]).map((orient) => (
              <button
                key={orient}
                type="button"
                onClick={() => handleAppearanceChange('orientation', orient)}
                className={`px-3 py-1 rounded-md text-[11px] font-semibold capitalize border transition-colors ${
                  label.appearance.orientation === orient
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {orient}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Typography & Colors */}
      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/90 space-y-3">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
          <Palette className="w-4 h-4 text-slate-700" />
          <span>Styling & Typography</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Typography Font Family
            </label>
            <select
              value={label.appearance.fontFamily}
              onChange={(e) => handleAppearanceChange('fontFamily', e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="sans">Plus Jakarta Sans (Modern Courier)</option>
              <option value="mono">JetBrains Mono (Technical / Scanner)</option>
              <option value="condensed">Barlow Condensed (High Density)</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-semibold text-slate-600">Outer Border Radius</label>
              <span className="text-[10px] font-mono text-slate-700 font-semibold">{label.appearance.borderRadius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              value={label.appearance.borderRadius}
              onChange={(e) => handleAppearanceChange('borderRadius', Number(e.target.value))}
              className="w-full accent-slate-800"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-semibold text-slate-600">Border Thickness</label>
              <span className="text-[10px] font-mono text-slate-700 font-semibold">{label.appearance.borderThickness}px</span>
            </div>
            <input
              type="range"
              min="1"
              max="4"
              value={label.appearance.borderThickness}
              onChange={(e) => handleAppearanceChange('borderThickness', Number(e.target.value))}
              className="w-full accent-slate-800"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-semibold text-slate-600">Inner Padding</label>
              <span className="text-[10px] font-mono text-slate-700 font-semibold">{label.appearance.padding}px</span>
            </div>
            <input
              type="range"
              min="8"
              max="24"
              value={label.appearance.padding}
              onChange={(e) => handleAppearanceChange('padding', Number(e.target.value))}
              className="w-full accent-slate-800"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
