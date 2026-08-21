import React from 'react';
import { LabelData, BarcodeFormat } from '../../types';
import { Barcode, RefreshCw } from 'lucide-react';

interface TrackingSectionProps {
  label: LabelData;
  onChange: (updated: Partial<LabelData>) => void;
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({ label, onChange }) => {
  const handleTrackingChange = (field: string, value: any) => {
    onChange({
      tracking: { ...label.tracking, [field]: value },
    });
  };

  const generateRandomTracking = () => {
    const prefixes = ['TRK-LUM', 'EXP-BAY', 'AIR-IND', 'GLB-US', 'NMD-PRI'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const trackingNum = `${randomPrefix}-${randomDigits}-EXPRESS`;
    const subText = `*${randomDigits}-${label.recipient.zip || '600020'}*`;

    onChange({
      tracking: {
        ...label.tracking,
        trackingNumber: trackingNum,
        subBarcodeText: subText,
      },
    });
  };

  return (
    <div className="space-y-3 text-xs">
      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/90 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
            <Barcode className="w-4 h-4 text-slate-700" />
            <span>Tracking Number & Barcode Engine</span>
          </div>

          <button
            type="button"
            onClick={generateRandomTracking}
            className="flex items-center gap-1 text-[11px] font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200 shadow-2xs transition-colors"
          >
            <RefreshCw className="w-3 h-3 text-slate-500" />
            <span>Generate Random</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-slate-800 mb-1">
              Tracking Number * (Used to generate Barcode)
            </label>
            <input
              type="text"
              value={label.tracking.trackingNumber}
              onChange={(e) => handleTrackingChange('trackingNumber', e.target.value)}
              placeholder="e.g. TRK-LUM-43934-EXPRESS"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono font-bold text-sm tracking-wider"
            />
            {!label.tracking.trackingNumber && (
              <p className="text-[10px] text-amber-600 mt-1 font-medium">
                Enter a tracking number to generate the barcode.
              </p>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Barcode Symbology / Format
            </label>
            <select
              value={label.tracking.barcodeFormat}
              onChange={(e) => handleTrackingChange('barcodeFormat', e.target.value as BarcodeFormat)}
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono"
            >
              <option value="CODE128">Code 128 (Recommended Alphanumeric)</option>
              <option value="CODE39">Code 39 (Standard Alphanumeric)</option>
              <option value="EAN13">EAN-13 (13-Digit Numerical)</option>
              <option value="UPC">UPC-A (12-Digit Numerical)</option>
              <option value="ITF14">ITF-14 (Interleaved 2 of 5)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Sub-Barcode Text (Human-Readable Routing)
            </label>
            <input
              type="text"
              value={label.tracking.subBarcodeText}
              onChange={(e) => handleTrackingChange('subBarcodeText', e.target.value)}
              placeholder="e.g. *LUM-43934-600020*"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-semibold text-slate-600">Barcode Height</label>
              <span className="text-[10px] font-mono text-slate-700 font-semibold">{label.tracking.barcodeHeight}px</span>
            </div>
            <input
              type="range"
              min="30"
              max="90"
              value={label.tracking.barcodeHeight}
              onChange={(e) => handleTrackingChange('barcodeHeight', Number(e.target.value))}
              className="w-full accent-slate-800"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[11px] font-semibold text-slate-600">Bar Width Scale</label>
              <span className="text-[10px] font-mono text-slate-700 font-semibold">{label.tracking.barcodeWidth}x</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="3.0"
              step="0.1"
              value={label.tracking.barcodeWidth}
              onChange={(e) => handleTrackingChange('barcodeWidth', Number(e.target.value))}
              className="w-full accent-slate-800"
            />
          </div>

          <div className="sm:col-span-2 flex flex-wrap gap-4 pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={label.tracking.barcodeVisible}
                onChange={(e) => handleTrackingChange('barcodeVisible', e.target.checked)}
                className="rounded accent-slate-900 w-3.5 h-3.5"
              />
              <span className="text-[11px] font-medium">Show Barcode on Label</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={label.tracking.showBarcodeText}
                onChange={(e) => handleTrackingChange('showBarcodeText', e.target.checked)}
                className="rounded accent-slate-900 w-3.5 h-3.5"
              />
              <span className="text-[11px] font-medium">Include Embedded Text In Barcode</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
