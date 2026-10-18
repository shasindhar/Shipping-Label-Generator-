import React, { useRef } from 'react';
import { LabelData } from '../../types';
import { Building2, Upload, Trash2, Image as ImageIcon } from 'lucide-react';

interface SenderSectionProps {
  label: LabelData;
  onChange: (updated: Partial<LabelData>) => void;
}

const SenderSectionComponent: React.FC<SenderSectionProps> = ({ label, onChange }) => {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCompanyChange = (field: string, value: any) => {
    onChange({
      company: { ...label.company, [field]: value },
    });
  };

  const handleSenderChange = (field: string, value: any) => {
    onChange({
      sender: { ...label.sender, [field]: value },
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (under 4MB)
    if (file.size > 4 * 1024 * 1024) {
      alert('Please upload an image smaller than 4MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      handleCompanyChange('logoUrl', dataUrl);
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    handleCompanyChange('logoUrl', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4 text-xs">
      {/* Company Header Info */}
      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/90 space-y-3">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
          <Building2 className="w-4 h-4 text-slate-700" />
          <span>Company & Brand Information</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Company Name</label>
            <input
              type="text"
              value={label.company.name}
              onChange={(e) => handleCompanyChange('name', e.target.value)}
              placeholder="e.g. DELULU STORE"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-bold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Company Subtitle / Service</label>
            <input
              type="text"
              value={label.company.subtitle}
              onChange={(e) => handleCompanyChange('subtitle', e.target.value)}
              placeholder="e.g. PRIORITY EXPRESS AIRWAY"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Header Badge / Tag</label>
            <input
              type="text"
              value={label.company.badge}
              onChange={(e) => handleCompanyChange('badge', e.target.value)}
              placeholder="e.g. P-01 or EXP"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono font-bold"
            />
          </div>
        </div>

        {/* Logo Upload Section */}
        <div className="pt-2.5 border-t border-slate-200">
          <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">Company Logo</label>
          <div className="flex flex-wrap items-center gap-3">
            {label.company.logoUrl ? (
              <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                <img
                  src={label.company.logoUrl}
                  alt="Company Logo Preview"
                  className="h-10 w-auto max-w-[80px] object-contain bg-slate-50 rounded p-1 border border-slate-100"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <label className="text-[10px] text-slate-500">Size (px):</label>
                    <input
                      type="range"
                      min="24"
                      max="72"
                      value={label.company.logoSize}
                      onChange={(e) => handleCompanyChange('logoSize', Number(e.target.value))}
                      className="w-20 accent-slate-800"
                    />
                    <span className="text-[10px] font-mono text-slate-700">{label.company.logoSize}px</span>
                  </div>
                  <button
                    type="button"
                    onClick={removeLogo}
                    className="flex items-center gap-1 text-[11px] text-rose-600 hover:text-rose-700 font-medium transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Remove Logo</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoUpload}
                  accept="image/png, image/jpeg, image/webp, image/svg+xml"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 border border-dashed border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50/80 p-3 rounded-lg text-slate-600 hover:text-slate-900 transition-all cursor-pointer shadow-2xs"
                >
                  <Upload className="w-4 h-4 text-slate-500" />
                  <span className="font-semibold text-xs">Upload Brand Logo (PNG, JPG, SVG)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sender Address Details */}
      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/90 space-y-2.5">
        <div className="font-bold text-slate-800 text-sm">Ship From (Sender Hub / Warehouse)</div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Sender Name / Hub</label>
            <input
              type="text"
              value={label.sender.name}
              onChange={(e) => handleSenderChange('name', e.target.value)}
              placeholder="e.g. NOMAD FULFILLMENT HUB #04"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-bold"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Address Line 1</label>
            <input
              type="text"
              value={label.sender.address1}
              onChange={(e) => handleSenderChange('address1', e.target.value)}
              placeholder="e.g. 100 Logistics Parkway, Dock 12"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Address Line 2 (Optional)</label>
            <input
              type="text"
              value={label.sender.address2}
              onChange={(e) => handleSenderChange('address2', e.target.value)}
              placeholder="Building B, Bay 4"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">City</label>
            <input
              type="text"
              value={label.sender.city}
              onChange={(e) => handleSenderChange('city', e.target.value)}
              placeholder="San Francisco"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">State / Province</label>
            <input
              type="text"
              value={label.sender.state}
              onChange={(e) => handleSenderChange('state', e.target.value)}
              placeholder="CA"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">ZIP / Postal Code</label>
            <input
              type="text"
              value={label.sender.zip}
              onChange={(e) => handleSenderChange('zip', e.target.value)}
              placeholder="94107"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Country</label>
            <input
              type="text"
              value={label.sender.country}
              onChange={(e) => handleSenderChange('country', e.target.value)}
              placeholder="USA"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Sender Phone</label>
            <input
              type="text"
              value={label.sender.phone}
              onChange={(e) => handleSenderChange('phone', e.target.value)}
              placeholder="+1 (800) 555-NOMAD"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Sender Email</label>
            <input
              type="email"
              value={label.sender.email}
              onChange={(e) => handleSenderChange('email', e.target.value)}
              placeholder="dispatch@company.com"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const SenderSection = React.memo(SenderSectionComponent);

