import React, { useRef } from 'react';
import { LabelData } from '../types';
import {
  Printer,
  PlusCircle,
  Save,
  FolderOpen,
  Users,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  PackageCheck,
} from 'lucide-react';

interface NavbarProps {
  label: LabelData;
  onNewLabel: () => void;
  onSaveLabel: () => void;
  onOpenSavedModal: () => void;
  onOpenBatchModal: () => void;
  onExportJson: () => void;
  onImportJson: (file: File) => void;
  onResetDefault: () => void;
  onPrint: () => void;
  savedLabelsCount: number;
  lastSavedText: string;
}

const NavbarComponent: React.FC<NavbarProps> = ({
  label,
  onNewLabel,
  onSaveLabel,
  onOpenSavedModal,
  onOpenBatchModal,
  onExportJson,
  onImportJson,
  onResetDefault,
  onPrint,
  savedLabelsCount,
  lastSavedText,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportJson(file);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 text-slate-800 sticky top-0 z-40 no-print">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Autosave Indicator */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-md flex items-center justify-center text-white font-bold text-sm shadow-xs">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-semibold text-sm sm:text-base tracking-tight text-slate-900">
                ShipGen Studio
              </h1>
              <span className="text-[11px] font-normal text-slate-400">
                v2.4.0
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div>
              <span>{lastSavedText || 'Saved locally'}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-400 text-[10px]">Private / Client-side</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {/* New Label */}
          <button
            type="button"
            onClick={onNewLabel}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 bg-white border border-slate-200 rounded-md transition-colors shadow-2xs"
            title="Create New Blank Label"
          >
            <PlusCircle className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">New</span>
          </button>

          {/* Save Current */}
          <button
            type="button"
            onClick={onSaveLabel}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 bg-white border border-slate-200 rounded-md transition-colors shadow-2xs"
            title="Save Label in Browser Storage"
          >
            <Save className="w-3.5 h-3.5 text-slate-500" />
            <span>Save</span>
          </button>

          {/* Saved Labels Modal Trigger */}
          <button
            type="button"
            onClick={onOpenSavedModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 bg-white border border-slate-200 rounded-md transition-colors shadow-2xs"
            title="View Saved Labels"
          >
            <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden md:inline">Saved</span>
            {savedLabelsCount > 0 && (
              <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-slate-300">
                {savedLabelsCount}
              </span>
            )}
          </button>

          {/* Batch Mode Trigger */}
          <button
            type="button"
            onClick={onOpenBatchModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-50 bg-blue-50/50 border border-blue-200 rounded-md transition-colors"
            title="Batch Mode: Multi-recipient label printing"
          >
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Batch Manifest</span>
          </button>

          <div className="h-4 w-px bg-slate-200 mx-1 hidden sm:block"></div>

          {/* Import JSON */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json,application/json"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-white border border-slate-200 rounded-md transition-colors shadow-2xs"
            title="Import Label JSON"
          >
            <Upload className="w-4 h-4" />
          </button>

          {/* Export JSON */}
          <button
            type="button"
            onClick={onExportJson}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 bg-white border border-slate-200 rounded-md transition-colors shadow-2xs"
            title="Export Label as JSON"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Reset to Default */}
          <button
            type="button"
            onClick={onResetDefault}
            className="p-1.5 text-slate-600 hover:text-amber-600 hover:bg-slate-100 bg-white border border-slate-200 rounded-md transition-colors shadow-2xs"
            title="Reset to Demo Defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* PROMINENT PRINT BUTTON */}
          <button
            type="button"
            onClick={onPrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-black text-white font-semibold text-xs sm:text-sm rounded-md shadow-sm active:scale-98 transition-all cursor-pointer ml-1"
          >
            <Printer className="w-4 h-4" />
            <span>Print Label</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export const Navbar = React.memo(NavbarComponent);

