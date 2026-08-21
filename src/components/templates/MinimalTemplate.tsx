import React from 'react';
import { LabelData } from '../../types';
import { BarcodeRenderer } from '../BarcodeRenderer';
import { QrCodeRenderer } from '../QrCodeRenderer';

interface TemplateProps {
  label: LabelData;
}

const MinimalTemplateComponent: React.FC<TemplateProps> = ({ label }) => {

  const { company, sender, recipient, order, tracking, qr, footer, visibility, appearance, customBadges } = label;

  return (
    <div
      id="shipping-label-minimal"
      style={{
        borderColor: '#000000',
        borderWidth: `${appearance.borderThickness}px`,
        borderRadius: '0px',
        padding: `${appearance.padding}px`,
        fontFamily: appearance.fontFamily === 'mono' ? 'monospace' : 'system-ui, sans-serif',
      }}
      className="w-full h-full flex flex-col justify-between select-none box-border overflow-hidden bg-white text-black border-2 border-black"
    >
      {/* Top Company & Badge */}
      <div className="border-b-2 border-black pb-2 flex justify-between items-start">
        <div className="flex items-center gap-2">
          {visibility.logo && company.logoUrl && (
            <img
              src={company.logoUrl}
              alt="Logo"
              referrerPolicy="no-referrer"
              style={{ height: `${company.logoSize}px` }}
              className="object-contain"
            />
          )}
          <div>
            <h1 className="text-xl font-bold tracking-tight uppercase leading-none">
              {company.name || 'STANDARD SHIPPING'}
            </h1>
            {visibility.companySubtitle && company.subtitle && (
              <p className="text-[10px] uppercase font-mono tracking-widest text-slate-700 mt-0.5">
                {company.subtitle}
              </p>
            )}
          </div>
        </div>
        {visibility.badgeTag && company.badge && (
          <div className="border-2 border-black px-2 py-0.5 text-xs font-black uppercase">
            {company.badge}
          </div>
        )}
      </div>

      {/* Badges */}
      {visibility.customBadges && customBadges && customBadges.length > 0 && (
        <div className="flex flex-wrap gap-1 py-1 border-b border-black">
          {customBadges.map((badge) => (
            <span
              key={badge.id}
              className="text-[9px] uppercase px-1.5 py-0.2 border border-black font-mono font-bold"
            >
              [{badge.text}]
            </span>
          ))}
        </div>
      )}

      {/* Sender & Order Grid */}
      <div className="grid grid-cols-2 border-b-2 border-black text-[10px] divide-x-2 divide-black">
        {visibility.senderSection && (
          <div className="p-1.5">
            <span className="font-bold uppercase text-[9px] block text-slate-700">FROM:</span>
            <p className="font-bold text-[11px] uppercase">{sender.name || sender.companyHub}</p>
            <p className="text-[10px] leading-tight mt-0.5">
              {sender.address1} {sender.address2}
              <br />
              {sender.city}, {sender.state} {sender.zip}
            </p>
            {visibility.phone && sender.phone && (
              <p className="text-[9px] font-mono mt-0.5">TEL: {sender.phone}</p>
            )}
          </div>
        )}
        {visibility.orderSection && (
          <div className="p-1.5 text-right flex flex-col justify-between">
            <div>
              <span className="font-bold uppercase text-[9px] block text-slate-700">REF:</span>
              <p className="font-bold text-xs uppercase font-mono">{order.reference}</p>
            </div>
            <div className="text-[9px] font-mono mt-1">
              {visibility.weight && order.weight && <p>WT: {order.weight}</p>}
              {visibility.itemsCount && <p>PCS: {order.totalItems}</p>}
            </div>
          </div>
        )}
      </div>

      {/* Ship To Recipient */}
      {visibility.recipientSection && (
        <div className="p-2 border-b-2 border-black bg-slate-50/50">
          <span className="text-[10px] font-black uppercase tracking-wider block">
            TO / RECIPIENT:
          </span>
          <h2 className="text-base font-extrabold uppercase mt-0.5 leading-snug">
            {recipient.name}
          </h2>
          <p className="text-xs font-semibold leading-relaxed mt-0.5">
            {recipient.address1} {recipient.address2}
            <br />
            {recipient.city}, {recipient.state} {recipient.zip} {recipient.country}
          </p>
          {visibility.recipientPhone && recipient.phone && (
            <p className="text-xs font-mono font-bold mt-1">TEL: {recipient.phone}</p>
          )}
        </div>
      )}

      {/* Barcode & Tracking */}
      {visibility.trackingSection && (
        <div className="py-2 px-1 border-b-2 border-black flex flex-col items-center justify-center">
          <span className="font-mono text-xs font-bold uppercase mb-1">
            TRACKING #: {tracking.trackingNumber}
          </span>
          {visibility.barcode && (
            <BarcodeRenderer
              value={tracking.trackingNumber || 'TRK-000000'}
              format={tracking.barcodeFormat}
              width={tracking.barcodeWidth || 1.8}
              height={tracking.barcodeHeight || 48}
              displayValue={false}
            />
          )}
          {visibility.subBarcodeText && tracking.subBarcodeText && (
            <span className="font-mono text-[10px] tracking-widest mt-1">
              {tracking.subBarcodeText}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      {visibility.footer && (
        <div className="pt-2 flex justify-between items-center text-[10px]">
          <div className="flex items-center gap-2">
            {visibility.qrCode && qr.enabled && (
              <QrCodeRenderer label={label} size={qr.size ? qr.size - 10 : 48} />
            )}
            <div className="font-mono text-[9px]">
              <p className="font-bold">{qr.verifiedTitle || 'PARCEL VERIFIED'}</p>
              <p>{qr.paymentStatus || 'PREPAID'}</p>
            </div>
          </div>
          <div className="text-right font-mono">
            {visibility.deliveryHub && (
              <p className="font-bold text-[10px]">{footer.deliveryHub}</p>
            )}
            <p className="font-bold uppercase">{footer.statusText || 'STANDARD'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export const MinimalTemplate = React.memo(MinimalTemplateComponent);

