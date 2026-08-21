import React, { useEffect, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
import { BarcodeFormat } from '../types';

interface BarcodeRendererProps {
  value: string;
  format?: BarcodeFormat;
  width?: number;
  height?: number;
  displayValue?: boolean;
  lineColor?: string;
  background?: string;
  className?: string;
}

const BarcodeRendererComponent: React.FC<BarcodeRendererProps> = ({
  value,
  format = 'CODE128',
  width = 1.8,
  height = 52,
  displayValue = false,
  lineColor = '#000000',
  background = 'transparent',
  className = '',
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const cleanValue = value ? value.trim() : '';

    if (!cleanValue) {
      setError('Enter a tracking number to generate barcode');
      return;
    }

    try {
      JsBarcode(svgRef.current, cleanValue, {
        format: format,
        width: Math.max(1, width),
        height: Math.max(25, height),
        displayValue: displayValue,
        fontSize: 12,
        font: 'JetBrains Mono, monospace',
        fontOptions: 'bold',
        textMargin: 3,
        margin: 0,
        lineColor: lineColor,
        background: background,
        valid: (valid) => {
          if (!valid) {
            setError(`Invalid code for ${format}`);
          } else {
            setError(null);
          }
        },
      });
      setError(null);
    } catch (err: unknown) {
      console.warn('Barcode generation warning:', err);
      // Fallback to Code 128 if format failed
      try {
        JsBarcode(svgRef.current, cleanValue, {
          format: 'CODE128',
          width: Math.max(1, width),
          height: Math.max(25, height),
          displayValue: displayValue,
          margin: 0,
          lineColor: lineColor,
          background: background,
        });
        setError(null);
      } catch (fallbackErr) {
        setError('Cannot encode tracking string with current format');
      }
    }
  }, [value, format, width, height, displayValue, lineColor, background]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-2 text-center text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded min-h-[48px]">
        <span className="font-semibold text-[11px]">{error}</span>
        <span className="text-[10px] text-slate-500 font-mono mt-0.5 max-w-[220px] truncate">{value || 'No value'}</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center overflow-hidden max-w-full ${className}`}>
      <svg
        ref={svgRef}
        className="max-w-full h-auto select-none print:max-w-full"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export const BarcodeRenderer = React.memo(BarcodeRendererComponent);

