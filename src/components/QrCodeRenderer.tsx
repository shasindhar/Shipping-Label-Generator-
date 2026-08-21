import React, { useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { LabelData } from '../types';

interface QrCodeRendererProps {
  label: LabelData;
  size?: number;
  fgColor?: string;
  bgColor?: string;
  className?: string;
}

const QrCodeRendererComponent: React.FC<QrCodeRendererProps> = ({
  label,
  size = 64,
  fgColor = '#000000',
  bgColor = '#ffffff',
  className = '',
}) => {
  const qrValue = useMemo(() => {
    const { qr, tracking, order, recipient } = label;
    if (qr.customData && qr.sourceType === 'custom') {
      return qr.customData;
    }

    switch (qr.sourceType) {
      case 'tracking':
        return tracking.trackingNumber || 'NO-TRACKING';
      case 'order':
        return `ORDER:${order.reference || order.orderId}\nDATE:${order.orderDate}\nITEMS:${order.totalItems}\nWEIGHT:${order.weight}`;
      case 'recipient':
        return `SHIP_TO:${recipient.name}\nADDR:${recipient.address1} ${recipient.city} ${recipient.state} ${recipient.zip}\nPH:${recipient.phone}`;
      case 'url':
        return tracking.trackingUrl || `https://track.nomadlogistics.com/${tracking.trackingNumber}`;
      case 'manifest':
      default:
        return `MANIFEST:OK\nTRK:${tracking.trackingNumber}\nORD:${order.reference}\nREC:${recipient.name}\nZIP:${recipient.zip}\nWT:${order.weight}`;
    }
  }, [label.qr, label.tracking, label.order, label.recipient]);

  if (!qrValue) {
    return (
      <div
        style={{ width: size, height: size }}
        className="flex items-center justify-center bg-slate-100 border border-dashed border-slate-300 text-[9px] text-slate-400 text-center p-1"
      >
        No QR Data
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <QRCodeSVG
        value={qrValue}
        size={size}
        level="M"
        fgColor={fgColor}
        bgColor={bgColor}
        includeMargin={false}
        className="max-w-full h-auto print:block"
      />
    </div>
  );
};

export const QrCodeRenderer = React.memo(QrCodeRendererComponent);

