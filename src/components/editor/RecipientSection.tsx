import React from 'react';
import { LabelData } from '../../types';
import { UserCheck } from 'lucide-react';

interface RecipientSectionProps {
  label: LabelData;
  onChange: (updated: Partial<LabelData>) => void;
}

const RecipientSectionComponent: React.FC<RecipientSectionProps> = ({ label, onChange }) => {

  const handleRecipientChange = (field: string, value: any) => {
    onChange({
      recipient: { ...label.recipient, [field]: value },
    });
  };

  return (
    <div className="space-y-3 text-xs">
      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/90 space-y-3">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
          <UserCheck className="w-4 h-4 text-emerald-600" />
          <span>Ship To / Recipient Details</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-slate-800 mb-1">
              Recipient Full Name *
            </label>
            <input
              type="text"
              value={label.recipient.name}
              onChange={(e) => handleRecipientChange('name', e.target.value)}
              placeholder="e.g. SREEBHARANIDHARAN RAMESH"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-bold uppercase text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Recipient Company / Department (Optional)
            </label>
            <input
              type="text"
              value={label.recipient.company}
              onChange={(e) => handleRecipientChange('company', e.target.value)}
              placeholder="Acme Global Logistics"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Address Line 1 (Street / House / Building) *
            </label>
            <input
              type="text"
              value={label.recipient.address1}
              onChange={(e) => handleRecipientChange('address1', e.target.value)}
              placeholder="e.g. #58, B Ramachandra Adithanar Rd"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Address Line 2 (Apartment, Suite, Unit, Landmark)
            </label>
            <input
              type="text"
              value={label.recipient.address2}
              onChange={(e) => handleRecipientChange('address2', e.target.value)}
              placeholder="Suite 400 / Near Central Mall"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              City *
            </label>
            <input
              type="text"
              value={label.recipient.city}
              onChange={(e) => handleRecipientChange('city', e.target.value)}
              placeholder="Chennai"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-semibold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              State / Province
            </label>
            <input
              type="text"
              value={label.recipient.state}
              onChange={(e) => handleRecipientChange('state', e.target.value)}
              placeholder="Tamil Nadu"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-semibold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              ZIP / PIN / Postal Code *
            </label>
            <input
              type="text"
              value={label.recipient.zip}
              onChange={(e) => handleRecipientChange('zip', e.target.value)}
              placeholder="600020"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Country
            </label>
            <input
              type="text"
              value={label.recipient.country}
              onChange={(e) => handleRecipientChange('country', e.target.value)}
              placeholder="India or USA"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-800 mb-1">
              Recipient Phone Number
            </label>
            <input
              type="text"
              value={label.recipient.phone}
              onChange={(e) => handleRecipientChange('phone', e.target.value)}
              placeholder="9498091513"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Recipient Email (Optional)
            </label>
            <input
              type="email"
              value={label.recipient.email}
              onChange={(e) => handleRecipientChange('email', e.target.value)}
              placeholder="recipient@domain.com"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Delivery Notes / Instructions
            </label>
            <input
              type="text"
              value={label.recipient.deliveryInstructions || ''}
              onChange={(e) => handleRecipientChange('deliveryInstructions', e.target.value)}
              placeholder="Leave at front porch / Call before arriving"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-[11px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const RecipientSection = React.memo(RecipientSectionComponent);

