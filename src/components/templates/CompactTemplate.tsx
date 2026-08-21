import React from 'react';
import { LabelData } from '../../types';
import { BarcodeRenderer } from '../BarcodeRenderer';
import { QrCodeRenderer } from '../QrCodeRenderer';

interface TemplateProps {
  label: LabelData;
}

const CompactTemplateComponent: React.FC<TemplateProps> = ({ label }) => {

  const { company, sender, recipient, order, tracking, qr, footer, visibility, appearance } = label;

  return (
    <div
      id="shipping-label-compact"
      style={{
        borderColor: appearance.borderColor || '#0f172a',
        borderWidth: `${Math.max(1, appearance.borderThickness)}px`,
        borderRadius: '6px',
        padding: '10px',
        fontSize: '11px',
      }}
      className="w-full h-full flex flex-col justify-between select-none box-border overflow-hidden bg-white text-slate-900 border"
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-400 pb-1">
        <div className="flex items-center gap-1.5">
          {visibility.logo && company.logoUrl && (
            <img
              src={company.logoUrl}
              alt="Logo"
              referrerPolicy="no-referrer"
              style={{ height: '32px' }}
              className="object-contain"
            />
          )}
          <span className="font-extrabold text-sm uppercase tracking-tight">{company.name}</span>
        </div>
        {visibility.badgeTag && (
          <span className="bg-slate-900 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
            {company.badge}
          </span>
        )}
      </div>

      {/* Recipient High Priority */}
      {visibility.recipientSection && (
        <div className="my-1 p-1.5 bg-slate-100/80 rounded border border-slate-300">
          <span className="text-[8px] font-bold text-slate-500 uppercase block">DELIVER TO:</span>
          <p className="font-black text-sm uppercase text-slate-950 leading-tight">{recipient.name}</p>
          <p className="text-[10px] leading-tight text-slate-800 mt-0.5">
            {recipient.address1} {recipient.address2}
            <br />
            <span className="font-bold">{recipient.city}, {recipient.state} {recipient.zip}</span>
          </p>
          {visibility.recipientPhone && recipient.phone && (
            <p className="text-[9px] font-mono font-bold text-slate-700 mt-0.5">Ph: {recipient.phone}</p>
          )}
        </div>
      )}

      {/* Sender & Order Tiny Grid */}
      <div className="grid grid-cols-2 gap-1 text-[9px] py-0.5 border-t border-b border-slate-200">
        <div>
          <span className="font-bold text-slate-600 uppercase">From: </span>
          <span className="truncate">{sender.city}, {sender.state} {sender.zip}</span>
        </div>
        <div className="text-right">
          <span className="font-bold text-slate-600 uppercase">Ref: </span>
          <span className="font-mono">{order.reference} ({order.weight})</span>
        </div>
      </div>

      {/* Barcode */}
      {visibility.trackingSection && (
        <div className="my-1 flex flex-col items-center justify-center">
          <span className="font-mono text-[9px] font-bold text-slate-700">{tracking.trackingNumber}</span>
          {visibility.barcode && (
            <BarcodeRenderer
              value={tracking.trackingNumber}
              format={tracking.barcodeFormat}
              width={1.4}
              height={38}
              displayValue={false}
            />
          )}
        </div>
      )}

      {/* Footer / QR */}
      {visibility.footer && (
        <div className="flex justify-between items-center pt-1 border-t border-slate-300 text-[8px]">
          {visibility.qrCode && qr.enabled && (
            <QrCodeRenderer label={label} size={36} />
          )}
          <div className="text-right font-mono font-bold">
            <p className="text-slate-800">{footer.deliveryHub}</p>
            <p className="text-emerald-700">{footer.statusText}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export const CompactTemplate = React.memo(CompactTemplateComponent);

