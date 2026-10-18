import React from 'react';
import { LabelData } from '../../types';
import { Phone, Plane } from 'lucide-react';

interface TemplateProps {
  label: LabelData;
}

const BoldFreightTemplateComponent: React.FC<TemplateProps> = ({ label }) => {

  const { company, sender, recipient, order, tracking, qr, footer, visibility, appearance, customBadges } = label;

  return (
    <div
      id="shipping-label-freight"
      style={{
        borderColor: '#0f172a',
        borderWidth: `${Math.max(2, appearance.borderThickness)}px`,
        borderRadius: '8px',
        padding: '14px',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
      }}
      className="w-full h-full flex flex-col justify-between select-none box-border overflow-hidden bg-white text-slate-900 border-2"
    >
      {/* Top Banner with Dark Background */}
      <div className="bg-slate-950 text-white p-2.5 -m-3.5 mb-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Plane className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <h1 className="text-lg font-black tracking-wider uppercase leading-none">
              {company.name}
            </h1>
            {visibility.companySubtitle && (
              <p className="text-[9px] font-mono text-slate-300 uppercase tracking-widest mt-0.5">
                {company.subtitle || 'PRIORITY FREIGHT CARGO'}
              </p>
            )}
          </div>
        </div>
        <div className="bg-amber-400 text-slate-950 font-black text-xs px-2.5 py-1 rounded tracking-widest uppercase">
          {company.badge || 'EXP'}
        </div>
      </div>

      {/* Badges */}
      {visibility.customBadges && customBadges && customBadges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pb-1">
          {customBadges.map((b) => (
            <span
              key={b.id}
              className="text-[10px] font-black uppercase px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded"
            >
              {b.text}
            </span>
          ))}
        </div>
      )}

      {/* Sender / Order Info Strip */}
      <div className="grid grid-cols-2 gap-2 text-[10px] py-1 border-b border-slate-300">
        {visibility.senderSection && (
          <div>
            <span className="font-bold text-slate-500 uppercase text-[9px] block">ORIGIN HUB:</span>
            <p className="font-extrabold text-slate-900 uppercase">{sender.name}</p>
            <p className="text-slate-600 text-[9px] leading-tight">
              {sender.city}, {sender.state} {sender.zip}
            </p>
          </div>
        )}
        {visibility.orderSection && (
          <div className="text-right">
            <span className="font-bold text-slate-500 uppercase text-[9px] block">REF & WEIGHT:</span>
            <p className="font-mono font-bold text-xs">{order.reference}</p>
            <p className="font-black text-slate-900 text-[10px] uppercase">{order.weight} • {order.paymentType}</p>
          </div>
        )}
      </div>

      {/* Ship To Recipient Card */}
      {visibility.recipientSection && (
        <div className="my-1.5 p-3 rounded-lg border-2 border-slate-900 bg-amber-50/30">
          <div className="flex justify-between items-center mb-1">
            <span className="bg-slate-900 text-amber-300 text-[9px] font-black uppercase px-2 py-0.5 rounded">
              DESTINATION RECIPIENT
            </span>
            <span className="font-mono text-[9px] font-bold text-slate-700">{recipient.zip}</span>
          </div>
          <h2 className="text-base font-black uppercase text-slate-950 leading-tight">
            {recipient.name}
          </h2>
          <div className="text-xs font-semibold text-slate-800 leading-snug mt-1">
            <p>{recipient.address1} {recipient.address2}</p>
            <p className="font-bold text-slate-950 mt-0.5">
              {recipient.city}, {recipient.state} — {recipient.zip}
            </p>
          </div>
          {visibility.recipientPhone && recipient.phone && (
            <div className="flex items-center gap-1 mt-1 text-[11px] font-bold text-slate-900">
              <Phone className="w-3 h-3 text-slate-700" />
              <span>{recipient.phone}</span>
            </div>
          )}
        </div>
      )}

      {/* Tracking Strip */}
      {visibility.trackingSection && (
        <div className="my-1 bg-slate-100 p-2 rounded border border-slate-300 flex flex-col items-center justify-center">
          <span className="font-mono text-xs font-black tracking-widest text-slate-900">
            {tracking.trackingNumber}
          </span>
        </div>
      )}

      {/* Bottom Hub Routing Footer */}
      {visibility.footer && (
        <div className="pt-1.5 border-t-2 border-slate-900 flex justify-between items-center text-[10px]">
          <div className="flex items-center gap-2">
            <div>
              <p className="font-black text-slate-950 uppercase">{qr.verifiedTitle || 'MANIFEST OK'}</p>
              <p className="text-[9px] text-slate-600 font-medium">{qr.paymentStatus || 'PREPAID'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const BoldFreightTemplate = React.memo(BoldFreightTemplateComponent);

