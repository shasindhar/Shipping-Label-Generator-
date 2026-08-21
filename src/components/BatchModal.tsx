import React, { useState } from 'react';
import { LabelData, BatchRecipientItem } from '../types';
import { LabelPreview } from './LabelPreview';
import { Users, Plus, Trash2, Printer, X, Copy, Sparkles } from 'lucide-react';

interface BatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseLabel: LabelData;
}

export const BatchModal: React.FC<BatchModalProps> = ({
  isOpen,
  onClose,
  baseLabel,
}) => {
  const [recipients, setRecipients] = useState<BatchRecipientItem[]>([
    {
      id: 'batch-1',
      name: 'JOHN DOE',
      address1: '100 Logistics Way, Suite 400',
      city: 'San Francisco',
      state: 'CA',
      zip: '94107',
      phone: '+1 (555) 123-4567',
      trackingNumber: 'TRK-LUM-43934-EXPRESS',
      weight: '1.2 KG',
    },
    {
      id: 'batch-2',
      name: 'ALEXANDER WONG',
      address1: '742 Evergreen Terrace, Suite 12',
      city: 'Springfield',
      state: 'OR',
      zip: '97477',
      phone: '+1 (555) 321-9876',
      trackingNumber: 'TRK-LUM-43935-EXPRESS',
      weight: '0.8 KG',
    },
    {
      id: 'batch-3',
      name: 'PRIYA SUNDARAM',
      address1: '14 MG Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      zip: '560038',
      phone: '9845012345',
      trackingNumber: 'TRK-LUM-43936-EXPRESS',
      weight: '2.5 KG',
    },
  ]);

  if (!isOpen) return null;

  const addRecipientRow = () => {
    const nextNum = Math.floor(10000 + Math.random() * 90000);
    const newRow: BatchRecipientItem = {
      id: `batch-${Date.now()}`,
      name: '',
      address1: '',
      city: '',
      state: '',
      zip: '',
      phone: '',
      trackingNumber: `TRK-LUM-${nextNum}-EXPRESS`,
      weight: baseLabel.order.weight || '1.0 KG',
    };
    setRecipients([...recipients, newRow]);
  };

  const updateRow = (id: string, field: keyof BatchRecipientItem, value: string) => {
    setRecipients(
      recipients.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const deleteRow = (id: string) => {
    if (recipients.length <= 1) {
      alert('At least one recipient is required for batch printing.');
      return;
    }
    setRecipients(recipients.filter((item) => item.id !== id));
  };

  const duplicateRow = (item: BatchRecipientItem) => {
    const nextNum = Math.floor(10000 + Math.random() * 90000);
    const dup: BatchRecipientItem = {
      ...item,
      id: `batch-${Date.now()}`,
      trackingNumber: `TRK-LUM-${nextNum}-EXPRESS`,
    };
    setRecipients([...recipients, dup]);
  };

  const handlePrintBatch = () => {
    window.print();
  };

  // Generate complete label data array for each batch item
  const batchLabels: LabelData[] = recipients.map((r, index) => ({
    ...baseLabel,
    id: `batch-label-${r.id}`,
    recipient: {
      ...baseLabel.recipient,
      name: r.name || `RECIPIENT ${index + 1}`,
      address1: r.address1 || 'Address Line',
      city: r.city,
      state: r.state,
      zip: r.zip,
      phone: r.phone,
    },
    order: {
      ...baseLabel.order,
      weight: r.weight || baseLabel.order.weight,
    },
    tracking: {
      ...baseLabel.tracking,
      trackingNumber: r.trackingNumber || `TRK-BATCH-${index + 1}`,
      subBarcodeText: `*${r.trackingNumber.replace(/[^0-9]/g, '').slice(-8) || '000000'}*`,
    },
  }));

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      {/* Hidden batch print container that activates on window.print() */}
      <div className="hidden print:block print:w-full">
        {batchLabels.map((lbl) => (
          <div key={lbl.id} className="single-label-print-page">
            <LabelPreview label={lbl} isPrintMode={true} />
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden no-print">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-100">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span>Batch Shipping Label Generator</span>
                <span className="text-xs bg-blue-100 text-blue-700 font-mono px-2 py-0.5 rounded-full border border-blue-200">
                  {recipients.length} Labels
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Generate and print multiple labels with unique recipients and tracking numbers in one click.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrintBatch}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-all shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT ALL ({recipients.length}) LABELS</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Table / Form area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
          <div className="flex justify-between items-center pb-1">
            <span className="text-xs font-bold text-slate-800">Recipient Dispatch Manifest</span>
            <button
              type="button"
              onClick={addRecipientRow}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Recipient</span>
            </button>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase text-[10px] font-bold tracking-wider">
                  <tr>
                    <th className="p-2.5">#</th>
                    <th className="p-2.5 min-w-[160px]">Recipient Name</th>
                    <th className="p-2.5 min-w-[180px]">Address</th>
                    <th className="p-2.5 min-w-[110px]">City</th>
                    <th className="p-2.5 min-w-[80px]">State</th>
                    <th className="p-2.5 min-w-[90px]">ZIP / PIN</th>
                    <th className="p-2.5 min-w-[110px]">Phone</th>
                    <th className="p-2.5 min-w-[180px]">Tracking Number</th>
                    <th className="p-2.5 min-w-[80px]">Weight</th>
                    <th className="p-2.5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recipients.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-2.5 font-mono text-slate-400 font-bold">{idx + 1}</td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateRow(item.id, 'name', e.target.value)}
                          placeholder="Full Name"
                          className="w-full bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 font-bold uppercase focus:outline-none focus:border-blue-500 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.address1}
                          onChange={(e) => updateRow(item.id, 'address1', e.target.value)}
                          placeholder="Street Address"
                          className="w-full bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 focus:outline-none focus:border-blue-500 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.city}
                          onChange={(e) => updateRow(item.id, 'city', e.target.value)}
                          placeholder="City"
                          className="w-full bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 focus:outline-none focus:border-blue-500 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.state}
                          onChange={(e) => updateRow(item.id, 'state', e.target.value)}
                          placeholder="State"
                          className="w-full bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 focus:outline-none focus:border-blue-500 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.zip}
                          onChange={(e) => updateRow(item.id, 'zip', e.target.value)}
                          placeholder="ZIP"
                          className="w-full bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 font-mono font-bold focus:outline-none focus:border-blue-500 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.phone}
                          onChange={(e) => updateRow(item.id, 'phone', e.target.value)}
                          placeholder="Phone"
                          className="w-full bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 font-mono focus:outline-none focus:border-blue-500 text-xs"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.trackingNumber}
                          onChange={(e) => updateRow(item.id, 'trackingNumber', e.target.value)}
                          placeholder="TRK-..."
                          className="w-full bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 font-mono text-[11px] font-bold text-blue-600 focus:outline-none focus:border-blue-500"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={item.weight}
                          onChange={(e) => updateRow(item.id, 'weight', e.target.value)}
                          placeholder="1.2 KG"
                          className="w-full bg-white border border-slate-200 rounded-md px-2 py-1 text-slate-800 font-mono text-xs focus:outline-none focus:border-blue-500"
                        />
                      </td>
                      <td className="p-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => duplicateRow(item)}
                            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                            title="Duplicate row"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteRow(item.id)}
                            className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                            title="Delete row"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50/80 border-t border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Each label will print cleanly on its own page using default page-break CSS.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors shadow-2xs"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePrintBatch}
              className="flex items-center gap-1.5 px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print {recipients.length} Labels</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
