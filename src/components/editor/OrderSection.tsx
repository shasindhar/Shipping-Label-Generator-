import React from 'react';
import { LabelData } from '../../types';
import { Package } from 'lucide-react';

interface OrderSectionProps {
  label: LabelData;
  onChange: (updated: Partial<LabelData>) => void;
}

export const OrderSection: React.FC<OrderSectionProps> = ({ label, onChange }) => {
  const handleOrderChange = (field: string, value: any) => {
    onChange({
      order: { ...label.order, [field]: value },
    });
  };

  return (
    <div className="space-y-3 text-xs">
      <div className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/90 space-y-3">
        <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
          <Package className="w-4 h-4 text-amber-600" />
          <span>Package & Order Specifications</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Order Reference (Printed on Label)
            </label>
            <input
              type="text"
              value={label.order.reference}
              onChange={(e) => handleOrderChange('reference', e.target.value)}
              placeholder="e.g. LUM-43934"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Package Weight *
            </label>
            <input
              type="text"
              value={label.order.weight}
              onChange={(e) => handleOrderChange('weight', e.target.value)}
              placeholder="e.g. 1.2 KG or 2.6 LBS"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono font-bold"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Total Items (Pieces / Qty)
            </label>
            <input
              type="text"
              value={label.order.totalItems}
              onChange={(e) => handleOrderChange('totalItems', e.target.value)}
              placeholder="1"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Payment Status / Type
            </label>
            <select
              value={label.order.paymentType}
              onChange={(e) => handleOrderChange('paymentType', e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Paid">Paid (Prepaid)</option>
              <option value="COD">Cash on Delivery (COD)</option>
              <option value="Bill Shipper">Bill Shipper</option>
              <option value="Bill Recipient">Bill Recipient</option>
              <option value="Complimentary">Complimentary / Free</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Order Date (ISO / Formatted)
            </label>
            <input
              type="text"
              value={label.order.orderDate}
              onChange={(e) => handleOrderChange('orderDate', e.target.value)}
              placeholder="2026-08-20T00:00:00.000Z"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Shipping Date
            </label>
            <input
              type="date"
              value={label.order.shippingDate || ''}
              onChange={(e) => handleOrderChange('shippingDate', e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Package Dimensions (LxWxH)
            </label>
            <input
              type="text"
              value={label.order.dimensions}
              onChange={(e) => handleOrderChange('dimensions', e.target.value)}
              placeholder="e.g. 25x18x10 CM"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Package Type
            </label>
            <input
              type="text"
              value={label.order.packageType}
              onChange={(e) => handleOrderChange('packageType', e.target.value)}
              placeholder="Parcel Box / Envelope / Polybag"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Invoice Number
            </label>
            <input
              type="text"
              value={label.order.invoiceNumber}
              onChange={(e) => handleOrderChange('invoiceNumber', e.target.value)}
              placeholder="INV-2026-883"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Shipping Service Method
            </label>
            <input
              type="text"
              value={label.order.shippingMethod}
              onChange={(e) => handleOrderChange('shippingMethod', e.target.value)}
              placeholder="Priority Air Cargo / Ground"
              className="w-full bg-white border border-slate-200 rounded-md px-2.5 py-1.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
