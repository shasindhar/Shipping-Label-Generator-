import React from 'react';
import { LabelData } from '../../types';
import { Phone } from 'lucide-react';

interface TemplateProps {
  label: LabelData;
  scale?: number;
}

const ProfessionalTemplateComponent: React.FC<TemplateProps> = ({ label }) => {

  const { company, sender, recipient, order, tracking, qr, footer, visibility, appearance, customBadges } = label;

  const textStyle = {
    color: appearance.textColor || '#0f172a',
    fontFamily:
      appearance.fontFamily === 'mono'
        ? '"JetBrains Mono", monospace'
        : appearance.fontFamily === 'condensed'
        ? '"Barlow Condensed", sans-serif'
        : '"Plus Jakarta Sans", sans-serif',
  };

  const borderStyleObj = {
    borderColor: appearance.borderColor || '#0f172a',
    borderWidth: `${appearance.borderThickness}px`,
    borderRadius: `${appearance.borderRadius}px`,
    borderStyle: appearance.borderStyle || 'solid',
  };

  const headerBgStyle = {
    backgroundColor: appearance.headerBg || '#0f172a',
    color: appearance.headerTextColor || '#ffffff',
  };

  return (
    <div
      id="shipping-label-professional"
      style={{
        ...textStyle,
        ...borderStyleObj,
        backgroundColor: appearance.sectionBg || '#ffffff',
        padding: `${appearance.padding}px`,
      }}
      className="relative w-full h-full flex flex-col justify-between select-none box-border overflow-hidden bg-white text-slate-900 print:text-black print:bg-white"
    >
      {/* Top Header Section */}
      <div className="w-full flex flex-col gap-1 pb-2">
        <div className="flex items-start justify-between gap-2">
          {/* Logo & Company Name */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {visibility.logo && company.logoUrl && (
              <img
                src={company.logoUrl}
                alt="Logo"
                referrerPolicy="no-referrer"
                style={{ height: `${company.logoSize}px`, maxHeight: '60px' }}
                className="object-contain shrink-0"
              />
            )}
            <div className="flex flex-col min-w-0">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-none uppercase truncate text-slate-900">
                {company.name || 'DELULU STORE'}
              </h1>
              {visibility.companySubtitle && company.subtitle && (
                <p className="text-[10px] sm:text-[11px] font-bold tracking-wider text-slate-600 uppercase mt-0.5">
                  {company.subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right Badge */}
          <div className="flex flex-col items-end shrink-0">
            {visibility.badgeTag && company.badge && (
              <div
                style={headerBgStyle}
                className="px-3 py-1 rounded-lg text-sm sm:text-base font-black tracking-widest uppercase shadow-sm"
              >
                {company.badge}
              </div>
            )}
          </div>
        </div>

        {/* Custom Badges if enabled */}
        {visibility.customBadges && customBadges && customBadges.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {customBadges.map((badge) => (
              <span
                key={badge.id}
                style={{
                  color: badge.color || '#dc2626',
                  backgroundColor: badge.bgColor || '#fee2e2',
                  borderColor: badge.borderColor || '#fca5a5',
                }}
                className={`text-[10px] uppercase px-2 py-0.5 rounded border ${
                  badge.isBold ? 'font-black' : 'font-semibold'
                }`}
              >
                {badge.text}
              </span>
            ))}
          </div>
        )}

        {/* Horizontal Divider */}
        <div
          style={{ borderColor: appearance.borderColor }}
          className="w-full border-b-2 mt-1"
        />
      </div>

      {/* Sender & Order Info (Two-Column Section) */}
      {(visibility.senderSection || visibility.orderSection) && (
        <div className="grid grid-cols-2 gap-3 py-1.5 text-[11px] leading-tight">
          {/* Left Column: Ship From */}
          {visibility.senderSection ? (
            <div className="flex flex-col min-w-0 pr-2 border-r border-slate-300">
              <span className="text-[9px] font-extrabold uppercase text-slate-700 tracking-wider">
                SHIP FROM (SENDER):
              </span>
              <span className="font-bold text-slate-900 uppercase mt-0.5 truncate text-[11px]">
                {sender.name || sender.companyHub || 'NOMAD FULFILLMENT HUB #04'}
              </span>
              <p className="text-slate-700 text-[10px] leading-normal mt-0.5 break-words">
                {sender.address1}
                {sender.address2 && <span className="block">{sender.address2}</span>}
                <span className="block">
                  {[sender.city, sender.state].filter(Boolean).join(', ')}{' '}
                  {sender.zip}{' '}
                  {sender.country}
                </span>
              </p>
              {visibility.phone && sender.phone && (
                <span className="text-[10px] font-semibold text-slate-800 mt-1">
                  Ph: {sender.phone}
                </span>
              )}
            </div>
          ) : (
            <div className="border-r border-slate-300" />
          )}

          {/* Right Column: Order Reference */}
          {visibility.orderSection ? (
            <div className="flex flex-col min-w-0 pl-1 text-[10px] space-y-0.5">
              {order.reference && (
                <div>
                  <span className="text-[9px] font-extrabold uppercase text-slate-700 tracking-wider block">
                    ORDER REFERENCE:
                  </span>
                  <span className="font-bold text-slate-900 text-xs uppercase tracking-tight block">
                    {order.reference}
                  </span>
                </div>
              )}
              {visibility.orderDate && order.orderDate && (
                <p className="text-slate-600 truncate text-[9px] font-mono">
                  Date: {order.orderDate}
                </p>
              )}
              {visibility.itemsCount && order.totalItems && (
                <p className="text-slate-700 font-semibold text-[10px]">
                  Total Items: {order.totalItems}
                </p>
              )}
              {visibility.weight && order.weight && (
                <p className="text-slate-900 font-extrabold text-[11px] uppercase tracking-wide">
                  WEIGHT: {order.weight}
                </p>
              )}
              {order.paymentType && (
                <p className="text-slate-700 font-bold text-[9px] uppercase">
                  TYPE: {order.paymentType}
                </p>
              )}
            </div>
          ) : (
            <div />
          )}
        </div>
      )}

      {/* Recipient Card */}
      {visibility.recipientSection && (
        <div className="my-1.5">
          <div
            style={{
              borderColor: appearance.borderColor || '#0f172a',
              borderWidth: `${Math.max(1.5, appearance.borderThickness)}px`,
              borderRadius: '10px',
            }}
            className="p-2.5 sm:p-3 bg-white border-2 flex flex-col gap-1 shadow-xs"
          >
            {/* Pill Tag */}
            <div className="inline-flex self-start">
              <span className="bg-slate-200/80 text-slate-800 text-[9px] font-black uppercase px-2 py-0.5 rounded tracking-wide">
                SHIP TO (RECIPIENT):
              </span>
            </div>

            {/* Recipient Name */}
            <h2 className="text-sm sm:text-base font-black tracking-tight text-slate-950 uppercase leading-snug break-words">
              {recipient.name || 'RECIPIENT NAME'}
            </h2>

            {recipient.company && (
              <span className="text-[11px] font-bold text-slate-700 uppercase -mt-0.5">
                {recipient.company}
              </span>
            )}

            {/* Address */}
            <div className="text-[11px] sm:text-xs text-slate-800 font-medium leading-relaxed break-words">
              <p>{recipient.address1}</p>
              {recipient.address2 && <p>{recipient.address2}</p>}
              <p className="font-semibold text-slate-950">
                {[recipient.city, recipient.state].filter(Boolean).join(', ')}
                {recipient.zip ? ` — ${recipient.zip}` : ''}
              </p>
              {recipient.country && recipient.country !== 'USA' && (
                <p className="text-[10px] font-bold text-slate-600 uppercase">
                  {recipient.country}
                </p>
              )}
            </div>

            {/* Recipient Phone */}
            {visibility.recipientPhone && recipient.phone && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 mt-1 pt-1 border-t border-slate-200">
                <Phone className="w-3.5 h-3.5 stroke-[2.5] text-slate-700 shrink-0" />
                <span className="tracking-wide">PHONE : {recipient.phone}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tracking Banner */}
      {visibility.trackingSection && (
        <div className="my-1.5 flex flex-col gap-1">
          {/* Dark Tracking Banner */}
          <div
            style={headerBgStyle}
            className="w-full py-1 px-2 rounded text-center text-xs font-black tracking-wider uppercase font-mono shadow-xs truncate"
          >
            TRACKING: {tracking.trackingNumber || 'TRK-LUM-43934-EXPRESS'}
          </div>
        </div>
      )}

      {/* Bottom Footer Section: Verification Status + Hub */}
      {visibility.footer && (
        <div className="pt-1.5 mt-auto border-t border-slate-300 flex items-center justify-between gap-2">
          {/* Left: Verification Tag */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col text-[9px] leading-tight font-sans">
              <span className="font-black text-slate-950 uppercase tracking-tight text-[10px]">
                {qr.verifiedTitle || 'VERIFIED PACKAGE'}
              </span>
              <span className="text-slate-600 font-medium">
                {qr.verifiedSubtext || 'Digital Manifest OK'}
              </span>
              <span className="text-slate-800 font-bold uppercase">
                {qr.paymentStatus || 'Paid'}
              </span>
            </div>
          </div>

          {/* Right: Delivery Hub & Scanner Status */}
          <div className="flex flex-col items-end text-right">
            {visibility.deliveryHub && footer.deliveryHub && (
              <span className="text-[10px] font-bold font-mono text-slate-900 uppercase tracking-tight">
                {footer.deliveryHub}
              </span>
            )}
            {footer.statusText && (
              <span
                style={{ color: appearance.accentColor || '#15803d' }}
                className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider"
              >
                {footer.statusText}
              </span>
            )}
            {footer.routingCode && (
              <span className="text-[8px] font-mono text-slate-500 uppercase">
                {footer.routingCode}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const ProfessionalTemplate = React.memo(ProfessionalTemplateComponent);

