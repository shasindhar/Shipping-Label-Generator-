import React from 'react';
import { LabelData } from '../types';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { CompactTemplate } from './templates/CompactTemplate';
import { BoldFreightTemplate } from './templates/BoldFreightTemplate';

interface LabelPreviewProps {
  label: LabelData;
  scale?: number;
  isPrintMode?: boolean;
}

export const getDimensions = (label: LabelData): { widthInches: number; heightInches: number } => {
  const { sizePreset, customWidthInches, customHeightInches, orientation } = label.appearance;
  let w = 4;
  let h = 6;

  switch (sizePreset) {
    case '4x6':
      w = 4;
      h = 6;
      break;
    case '4x8':
      w = 4;
      h = 8;
      break;
    case 'a6':
      w = 4.13;
      h = 5.83;
      break;
    case 'a5':
      w = 5.83;
      h = 8.27;
      break;
    case 'a4':
      w = 8.27;
      h = 11.69;
      break;
    case 'custom':
      w = Math.max(2, customWidthInches || 4);
      h = Math.max(2, customHeightInches || 6);
      break;
  }

  if (orientation === 'landscape') {
    return { widthInches: Math.max(w, h), heightInches: Math.min(w, h) };
  }
  return { widthInches: Math.min(w, h), heightInches: Math.max(w, h) };
};

const LabelPreviewComponent: React.FC<LabelPreviewProps> = ({
  label,
  scale = 1,
  isPrintMode = false,
}) => {
  const { widthInches, heightInches } = getDimensions(label);
  const baseDpi = 96;
  const pixelWidth = widthInches * baseDpi;
  const pixelHeight = heightInches * baseDpi;

  const renderTemplate = () => {
    switch (label.appearance.template) {
      case 'minimal':
        return <MinimalTemplate label={label} />;
      case 'compact':
        return <CompactTemplate label={label} />;
      case 'bold-freight':
        return <BoldFreightTemplate label={label} />;
      case 'professional':
      default:
        return <ProfessionalTemplate label={label} />;
    }
  };

  if (isPrintMode) {
    return (
      <div
        className="single-label-print-page"
        style={{
          width: `${widthInches}in`,
          height: `${heightInches}in`,
          maxWidth: `${widthInches}in`,
          maxHeight: `${heightInches}in`,
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          pageBreakAfter: 'always',
          pageBreakInside: 'avoid',
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        }}
      >
        {renderTemplate()}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center transition-all duration-200">
      {/* Label Container Scaled for UI */}
      <div
        id="live-shipping-label-container"
        style={{
          width: `${pixelWidth * scale}px`,
          height: `${pixelHeight * scale}px`,
        }}
        className="relative bg-white shadow-xl rounded-xl transition-all duration-150 origin-top overflow-hidden border border-slate-200 transform-gpu"
      >
        <div
          style={{
            width: `${pixelWidth}px`,
            height: `${pixelHeight}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            willChange: scale !== 1 ? 'transform' : 'auto',
          }}
          className="absolute top-0 left-0 transform-gpu"
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};

export const LabelPreview = React.memo(LabelPreviewComponent);

