import React from 'react';
import { LabelData, QrSourceType } from '../../types';
import { QrCode } from 'lucide-react';

interface QrSectionProps {
  label: LabelData;
  onChange: (updated: Partial<LabelData>) => void;
}

export const QrSection: React.FC<QrSectionProps> = ({ label, onChange }) => {
  const handleQrChange = (field: string, value: any) => {
    onChange({
      qr: { ...label.qr, [field]: value },
    });
  };

  const handleFooterChange = (field: string, value: any) => {
    onChange({
      footer: { ...label.footer, [field]: value },
    });
  };

  return (
    <div className="space-y-3 text-xs">
      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/90 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
            <QrCode className="w-4 h-4 text-purple-600" />
            <span>2D QR Code & Scanner Verification</span>
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-700">
            <input
              type="checkbox"
              checked={label.qr.enabled}
              onChange={(e) => handleQrChange('enabled', e.target.checked)}
              className="rounded accent-slate-900 w-3.5 h-3.5"
            />
            <span className="text-[11px] font-semibold text-slate-800">Enable QR</span>
          </label>
        </div>

        {label.qr.enabled && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                QR Code Data Content Source
              </label>
              <select
                value={label.qr.sourceType}
                onChange={(e) => handleQrChange('sourceType', e.target.value as QrSourceType)}
                className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="manifest">Digital Shipping Manifest (Tracking + Order + Recipient)</option>
                <option value="tracking">Tracking Number Only</option>
                <option value="order">Order Reference & Weight Details</option>
                <option value="recipient">Recipient Full Address & Contact</option>
                <option value="url">Direct Tracking Web URL</option>
                <option value="custom">Custom Text / Payload</option>
              </select>
            </div>

            {label.qr.sourceType === 'custom' && (
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-800 mb-1">
                  Custom QR Text / URL Data *
                </label>
                <textarea
                  rows={3}
                  value={label.qr.customData}
                  onChange={(e) => handleQrChange('customData', e.target.value)}
                  placeholder="Enter custom JSON, URL, or tracking manifest data here..."
                  className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono text-[11px]"
                />
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[11px] font-semibold text-slate-600">QR Code Size</label>
                <span className="text-[10px] font-mono text-slate-700 font-semibold">{label.qr.size}px</span>
              </div>
              <input
                type="range"
                min="40"
                max="90"
                value={label.qr.size}
                onChange={(e) => handleQrChange('size', Number(e.target.value))}
                className="w-full accent-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Verification Header Text
              </label>
              <input
                type="text"
                value={label.qr.verifiedTitle}
                onChange={(e) => handleQrChange('verifiedTitle', e.target.value)}
                placeholder="VERIFIED PACKAGE"
                className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Verification Subtext
              </label>
              <input
                type="text"
                value={label.qr.verifiedSubtext}
                onChange={(e) => handleQrChange('verifiedSubtext', e.target.value)}
                placeholder="Digital Manifest OK"
                className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Delivery Hub Route ID
              </label>
              <input
                type="text"
                value={label.footer.deliveryHub}
                onChange={(e) => handleFooterChange('deliveryHub', e.target.value)}
                placeholder="DELIVERY HUB: SF-BAY-02"
                className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Scanner Ready Status Text
              </label>
              <input
                type="text"
                value={label.footer.statusText}
                onChange={(e) => handleFooterChange('statusText', e.target.value)}
                placeholder="READY FOR SCANNERS"
                className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-bold text-emerald-700"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
