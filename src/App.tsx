import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { LabelData } from './types';
import { DEFAULT_LABEL_DATA, createBlankLabel } from './utils/defaults';
import {
  loadAutosavedLabel,
  saveAutosaveLabel,
  getSavedLabelsList,
  saveLabelToList,
  exportLabelAsJson,
  parseImportedJson,
} from './utils/storage';

import { Navbar } from './components/Navbar';
import { LabelPreview, getDimensions } from './components/LabelPreview';
import { SenderSection } from './components/editor/SenderSection';
import { RecipientSection } from './components/editor/RecipientSection';
import { OrderSection } from './components/editor/OrderSection';
import { TrackingSection } from './components/editor/TrackingSection';
import { QrSection } from './components/editor/QrSection';
import { AppearanceSection } from './components/editor/AppearanceSection';
import { VisibilitySection } from './components/editor/VisibilitySection';
import { CustomBadgesSection } from './components/editor/CustomBadgesSection';

const SavedLabelsModal = lazy(() =>
  import('./components/SavedLabelsModal').then((m) => ({ default: m.SavedLabelsModal }))
);
const BatchModal = lazy(() =>
  import('./components/BatchModal').then((m) => ({ default: m.BatchModal }))
);

import {
  Building2,
  UserCheck,
  Package,
  Barcode,
  QrCode,
  Palette,
  Eye,
  Tag,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Printer,
  FileCheck,
  Sparkles,
} from 'lucide-react';

type EditorTab =
  | 'sender'
  | 'recipient'
  | 'order'
  | 'tracking'
  | 'qr'
  | 'appearance'
  | 'visibility'
  | 'badges';

export default function App() {
  const [label, setLabel] = useState<LabelData>(() => loadAutosavedLabel());
  const [activeTab, setActiveTab] = useState<EditorTab>('recipient');
  const [zoomScale, setZoomScale] = useState<number>(1.0);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isSavePromptOpen, setIsSavePromptOpen] = useState(false);
  const [saveLabelName, setSaveLabelName] = useState('');
  const [savedCount, setSavedCount] = useState<number>(() => getSavedLabelsList().length);
  const [lastSavedStatus, setLastSavedStatus] = useState<string>('Autosaved');

  // Debounced autosave (500ms delay) to prevent localStorage main-thread thrashing on every keystroke
  useEffect(() => {
    setLastSavedStatus('Saving...');
    const timer = setTimeout(() => {
      saveAutosaveLabel(label);
      setLastSavedStatus('Saved locally');
    }, 500);
    return () => clearTimeout(timer);
  }, [label]);

  const handleLabelChange = useCallback((updatedPartial: Partial<LabelData>) => {
    setLabel((prev) => ({
      ...prev,
      ...updatedPartial,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const handleNewLabel = useCallback(() => {
    if (confirm('Start a new label? Unsaved changes will be cleared.')) {
      const blank = createBlankLabel();
      setLabel(blank);
      setActiveTab('recipient');
    }
  }, []);

  const handleResetDefault = useCallback(() => {
    if (confirm('Reset label to demo defaults? (Nomad Logistics template data will be restored)')) {
      setLabel({ ...DEFAULT_LABEL_DATA, id: `label-${Date.now()}` });
    }
  }, []);

  const handleOpenSaveDialog = useCallback(() => {
    setSaveLabelName((prevName) => label.name || `${label.recipient.name || 'Shipment'} Label`);
    setIsSavePromptOpen(true);
  }, [label.name, label.recipient.name]);

  const handleConfirmSave = useCallback(() => {
    if (!saveLabelName.trim()) return;
    const updated = { ...label, name: saveLabelName.trim() };
    setLabel(updated);
    const list = saveLabelToList(updated);
    setSavedCount(list.length);
    setIsSavePromptOpen(false);
  }, [saveLabelName, label]);

  const handleSelectSavedLabel = useCallback((selected: LabelData) => {
    setLabel(selected);
  }, []);

  const handleExport = useCallback(() => {
    exportLabelAsJson(label);
  }, [label]);

  const handleImport = useCallback(async (file: File) => {
    try {
      const imported = await parseImportedJson(file);
      setLabel(imported);
      alert('Label configuration imported successfully!');
    } catch (err: any) {
      alert(`Import failed: ${err.message || 'Invalid file format.'}`);
    }
  }, []);

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleOpenSavedModal = useCallback(() => setIsSavedModalOpen(true), []);
  const handleCloseSavedModal = useCallback(() => {
    setIsSavedModalOpen(false);
    setSavedCount(getSavedLabelsList().length);
  }, []);
  const handleOpenBatchModal = useCallback(() => setIsBatchModalOpen(true), []);
  const handleCloseBatchModal = useCallback(() => setIsBatchModalOpen(false), []);

  const tabs: { id: EditorTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'recipient', label: 'Recipient', icon: <UserCheck className="w-4 h-4 text-emerald-400" /> },
    { id: 'sender', label: 'Sender / Company', icon: <Building2 className="w-4 h-4 text-indigo-400" /> },
    { id: 'order', label: 'Order Info', icon: <Package className="w-4 h-4 text-amber-400" /> },
    { id: 'tracking', label: 'Barcode', icon: <Barcode className="w-4 h-4 text-cyan-400" /> },
    { id: 'qr', label: 'QR Code', icon: <QrCode className="w-4 h-4 text-purple-400" /> },
    { id: 'appearance', label: 'Appearance & Size', icon: <Palette className="w-4 h-4 text-pink-400" /> },
    { id: 'visibility', label: 'Visible Elements', icon: <Eye className="w-4 h-4 text-teal-400" /> },
    { id: 'badges', label: 'Custom Badges', icon: <Tag className="w-4 h-4 text-amber-500" />, badge: label.customBadges?.length ? `${label.customBadges.length}` : undefined },
  ];

  const dimensions = getDimensions(label);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 antialiased selection:bg-slate-900 selection:text-white">
      {/* 1. PRINT ONLY CONTAINER: Activated when printing */}
      <div className="print-only">
        <LabelPreview label={label} isPrintMode={true} />
      </div>

      {/* 2. APPLICATION SHELL (Screen Mode) */}
      <div className="flex-1 flex flex-col no-print">
        {/* Navigation Bar */}
        <Navbar
          label={label}
          onNewLabel={handleNewLabel}
          onSaveLabel={handleOpenSaveDialog}
          onOpenSavedModal={handleOpenSavedModal}
          onOpenBatchModal={handleOpenBatchModal}
          onExportJson={handleExport}
          onImportJson={handleImport}
          onResetDefault={handleResetDefault}
          onPrint={handlePrint}
          savedLabelsCount={savedCount}
          lastSavedText={lastSavedStatus}
        />


        {/* Main Workspace Layout */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT PANEL: Label Editor */}
          <section className="lg:col-span-6 xl:col-span-6 bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col gap-4">
            {/* Tab Header Navigation */}
            <div className="flex flex-wrap gap-1 p-1 bg-slate-100/80 rounded-xl border border-slate-200/80">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-slate-900 shadow-2xs font-bold border border-slate-200/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-amber-300">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Active Tab Form Content */}
            <div className="min-h-[420px]">
              {activeTab === 'sender' && (
                <SenderSection label={label} onChange={handleLabelChange} />
              )}
              {activeTab === 'recipient' && (
                <RecipientSection label={label} onChange={handleLabelChange} />
              )}
              {activeTab === 'order' && (
                <OrderSection label={label} onChange={handleLabelChange} />
              )}
              {activeTab === 'tracking' && (
                <TrackingSection label={label} onChange={handleLabelChange} />
              )}
              {activeTab === 'qr' && (
                <QrSection label={label} onChange={handleLabelChange} />
              )}
              {activeTab === 'appearance' && (
                <AppearanceSection label={label} onChange={handleLabelChange} />
              )}
              {activeTab === 'visibility' && (
                <VisibilitySection label={label} onChange={handleLabelChange} />
              )}
              {activeTab === 'badges' && (
                <CustomBadgesSection label={label} onChange={handleLabelChange} />
              )}
            </div>
          </section>

          {/* RIGHT PANEL: Live Interactive Preview */}
          <section className="lg:col-span-6 xl:col-span-6 flex flex-col gap-3 sticky top-20">
            {/* Preview Toolbar */}
            <div className="bg-white border border-slate-200 rounded-xl p-2.5 px-3 flex flex-wrap items-center justify-between gap-2 text-xs shadow-2xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-800">Live Preview</span>
                <span className="bg-slate-100 text-slate-700 font-mono text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200 uppercase">
                  {dimensions.widthInches}" × {dimensions.heightInches}" ({label.appearance.orientation})
                </span>
                <span className="text-[10px] text-slate-400 capitalize hidden sm:inline">
                  • {label.appearance.template} template
                </span>
              </div>

              {/* Zoom Scale Controls */}
              <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.max(0.6, Number((prev - 0.1).toFixed(1))))}
                  className="p-1 text-slate-500 hover:text-slate-800 rounded hover:bg-white transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[11px] text-slate-600 w-10 text-center font-medium">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoomScale((prev) => Math.min(1.4, Number((prev + 0.1).toFixed(1))))}
                  className="p-1 text-slate-500 hover:text-slate-800 rounded hover:bg-white transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomScale(1.0)}
                  className="p-1 text-slate-500 hover:text-slate-800 rounded hover:bg-white text-[10px] font-semibold px-1.5 transition-colors"
                  title="Reset 100%"
                >
                  100%
                </button>
              </div>
            </div>

            {/* Stage / Canvas Container */}
            <div className="bg-[#f1f5f9] border border-slate-200 rounded-2xl p-4 sm:p-8 flex flex-col items-center justify-center min-h-[580px] overflow-auto shadow-inner relative">
              <div className="mb-3 text-[11px] font-medium text-slate-400 uppercase tracking-[0.2em]">
                Live Thermal & Courier Sheet ({dimensions.widthInches}x{dimensions.heightInches})
              </div>
              <LabelPreview label={label} scale={zoomScale} />
            </div>

            {/* Quick Helper Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 px-1">
              <div className="flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero crop guarantee: fits standard 4x6" thermal rolls & standard A4/A5 printers</span>
              </div>
              <button
                type="button"
                onClick={handlePrint}
                className="font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Test Print / PDF</span>
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* SAVE PROMPT MODAL */}
      {isSavePromptOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-slate-900">Save Label to Browser Storage</h3>
            <div>
              <label className="block text-xs text-slate-600 mb-1 font-semibold">Label Name / Title</label>
              <input
                type="text"
                value={saveLabelName}
                onChange={(e) => setSaveLabelName(e.target.value)}
                placeholder="e.g. My Chennai Shipment"
                className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 font-semibold text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsSavePromptOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmSave}
                className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
              >
                Save Label
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SAVED LABELS & BATCH MODE MODALS (LAZY LOADED) */}
      <Suspense fallback={null}>
        {isSavedModalOpen && (
          <SavedLabelsModal
            isOpen={isSavedModalOpen}
            onClose={handleCloseSavedModal}
            onSelectLabel={handleSelectSavedLabel}
            currentLabel={label}
          />
        )}
        {isBatchModalOpen && (
          <BatchModal
            isOpen={isBatchModalOpen}
            onClose={handleCloseBatchModal}
            baseLabel={label}
          />
        )}
      </Suspense>
    </div>
  );
}

