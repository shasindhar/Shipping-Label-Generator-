import React, { useState } from 'react';
import { LabelData } from '../types';
import {
  getSavedLabelsList,
  saveLabelToList,
  deleteSavedLabel,
  duplicateSavedLabel,
  exportLabelAsJson,
} from '../utils/storage';
import { X, Trash2, Copy, Download, FolderOpen, Edit2, Check, Clock } from 'lucide-react';

interface SavedLabelsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLabel: (label: LabelData) => void;
  currentLabel: LabelData;
}

export const SavedLabelsModal: React.FC<SavedLabelsModalProps> = ({
  isOpen,
  onClose,
  onSelectLabel,
  currentLabel,
}) => {
  const [savedList, setSavedList] = useState<LabelData[]>(() => getSavedLabelsList());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  if (!isOpen) return null;

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this saved label?')) {
      const updated = deleteSavedLabel(id);
      setSavedList(updated);
    }
  };

  const handleDuplicate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const { list } = duplicateSavedLabel(id);
    setSavedList(list);
  };

  const handleExport = (label: LabelData, e: React.MouseEvent) => {
    e.stopPropagation();
    exportLabelAsJson(label);
  };

  const handleStartRename = (label: LabelData, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(label.id);
    setEditName(label.name);
  };

  const handleSaveRename = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const target = savedList.find((l) => l.id === id);
    if (target && editName.trim()) {
      const updated = saveLabelToList({ ...target, name: editName.trim() });
      setSavedList(updated);
    }
    setEditingId(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-bold text-slate-800">Saved Shipping Labels</h2>
            <span className="text-xs bg-slate-100 text-slate-700 font-mono px-2 py-0.5 rounded-full border border-slate-200">
              {savedList.length} stored
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Content */}
        <div className="p-4 flex-1 overflow-y-auto space-y-2.5 bg-white">
          {savedList.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <FolderOpen className="w-12 h-12 text-slate-300 mx-auto stroke-1" />
              <p className="font-semibold text-slate-600">No saved labels found in browser storage.</p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Save your current working label using the "Save Label" button in the top navigation bar.
              </p>
            </div>
          ) : (
            savedList.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectLabel(item);
                  onClose();
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                  currentLabel.id === item.id
                    ? 'bg-blue-50/60 border-blue-500/80 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex-1 min-w-0">
                  {editingId === item.id ? (
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="bg-white border border-blue-500 rounded-md px-2 py-1 text-sm font-bold text-slate-900 focus:outline-none flex-1"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={(e) => handleSaveRename(item.id, e)}
                        className="p-1 text-emerald-600 hover:text-emerald-700 bg-emerald-50 rounded"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-800 text-sm truncate">{item.name}</h3>
                      {currentLabel.id === item.id && (
                        <span className="text-[10px] bg-blue-600 text-white font-bold px-1.5 py-0.2 rounded uppercase">
                          Active
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
                    <span className="font-mono text-blue-600 font-semibold">
                      TRK: {item.tracking?.trackingNumber || 'N/A'}
                    </span>
                    <span>•</span>
                    <span className="text-slate-700">To: {item.recipient?.name || 'Unknown'}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock className="w-3 h-3" />
                      {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={(e) => handleStartRename(item, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Rename"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDuplicate(item.id, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleExport(item, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Export JSON"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleDelete(item.id, e)}
                    className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50/80 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>Storage: Local Browser (Zero Cloud Dependency)</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold transition-colors shadow-2xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
