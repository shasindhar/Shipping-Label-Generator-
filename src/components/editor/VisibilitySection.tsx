import React from 'react';
import { LabelData, VisibilitySettings } from '../../types';
import { Eye } from 'lucide-react';

interface VisibilitySectionProps {
  label: LabelData;
  onChange: (updated: Partial<LabelData>) => void;
}

export const VisibilitySection: React.FC<VisibilitySectionProps> = ({ label, onChange }) => {
  const toggleVisibility = (key: keyof VisibilitySettings) => {
    onChange({
      visibility: {
        ...label.visibility,
        [key]: !label.visibility[key],
      },
    });
  };

  const visibilityOptions: { key: keyof VisibilitySettings; label: string; desc: string }[] = [
    { key: 'logo', label: 'Company Logo', desc: 'Brand logo image' },
    { key: 'companySubtitle', label: 'Company Subtitle', desc: 'Service title below company' },
    { key: 'badgeTag', label: 'Priority / P-01 Badge', desc: 'Top right dark tag' },
    { key: 'senderSection', label: 'Sender / Ship From', desc: 'Origin hub and address' },
    { key: 'orderSection', label: 'Order Details Column', desc: 'Reference, weight, items' },
    { key: 'recipientSection', label: 'Ship To / Recipient Card', desc: 'Main recipient address card' },
    { key: 'recipientPhone', label: 'Recipient Phone', desc: 'Phone line with icon' },
    { key: 'trackingSection', label: 'Tracking Header Banner', desc: 'Tracking number top bar' },
    { key: 'deliveryHub', label: 'Delivery Hub Routing', desc: 'SF-BAY-02 / Hub code' },
    { key: 'footer', label: 'Verification Footer', desc: 'Bottom status bar' },
    { key: 'weight', label: 'Package Weight', desc: 'Weight in order section' },
    { key: 'orderDate', label: 'Order Date', desc: 'Timestamp date' },
    { key: 'itemsCount', label: 'Total Items Count', desc: 'Pieces / quantity' },
    { key: 'customBadges', label: 'Custom Badges', desc: 'FRAGILE / Warning badges' },
  ];

  return (
    <div className="space-y-3 text-xs">
      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/90 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
            <Eye className="w-4 h-4 text-teal-600" />
            <span>Element Visibility Toggles</span>
          </div>

          <button
            type="button"
            onClick={() => {
              const allTrue = Object.keys(label.visibility).reduce(
                (acc, k) => ({ ...acc, [k]: true }),
                {} as VisibilitySettings
              );
              onChange({ visibility: allTrue });
            }}
            className="text-[11px] font-semibold text-blue-600 hover:text-blue-700"
          >
            Show All
          </button>
        </div>

        <p className="text-[11px] text-slate-500">
          Disabled elements will automatically be hidden from both the live preview and the printed label.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {visibilityOptions.map((item) => {
            const isChecked = label.visibility[item.key];
            return (
              <label
                key={item.key}
                className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer select-none transition-all ${
                  isChecked
                    ? 'bg-white border-slate-200 text-slate-800 shadow-2xs'
                    : 'bg-slate-100/50 border-slate-200/50 text-slate-400'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleVisibility(item.key)}
                  className="mt-0.5 rounded accent-slate-900 w-3.5 h-3.5"
                />
                <div className="flex flex-col">
                  <span className={`font-semibold text-xs ${isChecked ? 'text-slate-800' : 'text-slate-400'}`}>{item.label}</span>
                  <span className="text-[10px] text-slate-500">{item.desc}</span>
                </div>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
};
