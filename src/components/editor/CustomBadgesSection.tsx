import React, { useState } from 'react';
import { LabelData, CustomBadge } from '../../types';
import { Tag, Plus, Trash2 } from 'lucide-react';

interface CustomBadgesSectionProps {
  label: LabelData;
  onChange: (updated: Partial<LabelData>) => void;
}

const PRESET_BADGES = [
  { text: 'FRAGILE', color: '#dc2626', bgColor: '#fee2e2', borderColor: '#fca5a5' },
  { text: 'HANDLE WITH CARE', color: '#ea580c', bgColor: '#ffedd5', borderColor: '#fed7aa' },
  { text: 'THIS SIDE UP ↑', color: '#2563eb', bgColor: '#dbeafe', borderColor: '#bfdbfe' },
  { text: 'PRIORITY AIR', color: '#7c3aed', bgColor: '#f3e8ff', borderColor: '#e9d5ff' },
  { text: 'COD (CASH ON DELIVERY)', color: '#059669', bgColor: '#d1fae5', borderColor: '#a7f3d0' },
  { text: 'DO NOT BEND', color: '#be123c', bgColor: '#ffe4e6', borderColor: '#fecdd3' },
];

export const CustomBadgesSection: React.FC<CustomBadgesSectionProps> = ({ label, onChange }) => {
  const [customInput, setCustomInput] = useState('');

  const addBadge = (badge: { text: string; color?: string; bgColor?: string; borderColor?: string }) => {
    if (!badge.text.trim()) return;
    const newBadge: CustomBadge = {
      id: `badge-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      text: badge.text.trim().toUpperCase(),
      color: badge.color || '#dc2626',
      bgColor: badge.bgColor || '#fee2e2',
      borderColor: badge.borderColor || '#fca5a5',
      isBold: true,
    };

    onChange({
      customBadges: [...(label.customBadges || []), newBadge],
      visibility: { ...label.visibility, customBadges: true },
    });
    setCustomInput('');
  };

  const removeBadge = (id: string) => {
    onChange({
      customBadges: (label.customBadges || []).filter((b) => b.id !== id),
    });
  };

  return (
    <div className="space-y-3 text-xs">
      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/90 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
            <Tag className="w-4 h-4 text-amber-600" />
            <span>Custom Badges & Warning Tags</span>
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
            <input
              type="checkbox"
              checked={label.visibility.customBadges}
              onChange={(e) =>
                onChange({
                  visibility: { ...label.visibility, customBadges: e.target.checked },
                })
              }
              className="rounded accent-slate-900 w-3.5 h-3.5"
            />
            <span className="text-[11px] font-semibold text-slate-800">Show on Label</span>
          </label>
        </div>

        {/* Quick Add Presets */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
            Quick Add Standard Badges:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {PRESET_BADGES.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => addBadge(preset)}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-md text-[10px] font-bold uppercase transition-colors flex items-center gap-1 shadow-2xs"
              >
                <Plus className="w-3 h-3 text-slate-500" />
                <span>{preset.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <div className="pt-2 border-t border-slate-200">
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
            Custom Message / Badge Text
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addBadge({ text: customInput });
                }
              }}
              placeholder="e.g. PERISHABLE / KEEP REFRIGERATED"
              className="flex-1 bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-bold uppercase text-xs"
            />
            <button
              type="button"
              onClick={() => addBadge({ text: customInput })}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-md flex items-center gap-1 transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Active Badges List */}
        {label.customBadges && label.customBadges.length > 0 && (
          <div className="space-y-1.5 pt-2 border-t border-slate-200">
            <label className="block text-[11px] font-semibold text-slate-600">
              Active Badges ({label.customBadges.length}):
            </label>
            <div className="flex flex-wrap gap-2">
              {label.customBadges.map((badge) => (
                <div
                  key={badge.id}
                  style={{
                    backgroundColor: badge.bgColor,
                    color: badge.color,
                    borderColor: badge.borderColor,
                  }}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-md border text-xs font-black uppercase shadow-2xs"
                >
                  <span>{badge.text}</span>
                  <button
                    type="button"
                    onClick={() => removeBadge(badge.id)}
                    className="hover:opacity-75 transition-opacity"
                    title="Remove Badge"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
