import { LabelData } from '../types';
import { DEFAULT_LABEL_DATA } from './defaults';

const STORAGE_KEY_AUTOSAVE = 'shipping_label_autosave_v3';
const STORAGE_KEY_SAVED_LIST = 'shipping_label_saved_list_v2';

export const loadAutosavedLabel = (): LabelData => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_AUTOSAVE) || localStorage.getItem('shipping_label_autosave_v2');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.company?.name === 'NOMAD LOGISTICS') {
        parsed.company.name = 'DELULU STORE';
      }
      if (parsed.company) {
        parsed.company.estDate = '';
      }
      return {
        ...DEFAULT_LABEL_DATA,
        ...parsed,
        company: { ...DEFAULT_LABEL_DATA.company, ...parsed.company },
        appearance: { ...DEFAULT_LABEL_DATA.appearance, ...parsed.appearance },
        visibility: { ...DEFAULT_LABEL_DATA.visibility, ...parsed.visibility, estDate: false, barcode: false, qrCode: false },
      };
    }
  } catch (err) {
    console.error('Failed to load autosaved label:', err);
  }
  return DEFAULT_LABEL_DATA;
};

export const saveAutosaveLabel = (label: LabelData): void => {
  try {
    localStorage.setItem(STORAGE_KEY_AUTOSAVE, JSON.stringify(label));
  } catch (err) {
    console.error('Failed to save autosaved label:', err);
  }
};

export const getSavedLabelsList = (): LabelData[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SAVED_LIST);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to fetch saved labels list:', err);
  }
  return [];
};

export const saveLabelToList = (label: LabelData): LabelData[] => {
  const currentList = getSavedLabelsList();
  const existingIndex = currentList.findIndex((item) => item.id === label.id);
  const updatedLabel = { ...label, updatedAt: new Date().toISOString() };

  let updatedList: LabelData[];
  if (existingIndex >= 0) {
    updatedList = [...currentList];
    updatedList[existingIndex] = updatedLabel;
  } else {
    updatedList = [updatedLabel, ...currentList];
  }

  try {
    localStorage.setItem(STORAGE_KEY_SAVED_LIST, JSON.stringify(updatedList));
  } catch (err) {
    console.error('Failed to store saved labels list:', err);
  }
  return updatedList;
};

export const deleteSavedLabel = (id: string): LabelData[] => {
  const currentList = getSavedLabelsList();
  const updatedList = currentList.filter((item) => item.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY_SAVED_LIST, JSON.stringify(updatedList));
  } catch (err) {
    console.error('Failed to delete label:', err);
  }
  return updatedList;
};

export const duplicateSavedLabel = (id: string): { list: LabelData[]; duplicated: LabelData | null } => {
  const currentList = getSavedLabelsList();
  const target = currentList.find((item) => item.id === id);
  if (!target) return { list: currentList, duplicated: null };

  const duplicated: LabelData = {
    ...target,
    id: `label-${Date.now()}`,
    name: `${target.name} (Copy)`,
    updatedAt: new Date().toISOString(),
  };

  const updatedList = [duplicated, ...currentList];
  try {
    localStorage.setItem(STORAGE_KEY_SAVED_LIST, JSON.stringify(updatedList));
  } catch (err) {
    console.error('Failed to duplicate label:', err);
  }
  return { list: updatedList, duplicated };
};

export const exportLabelAsJson = (label: LabelData): void => {
  const jsonStr = JSON.stringify(label, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const sanitizedName = (label.name || 'shipping-label').toLowerCase().replace(/[^a-z0-9]/g, '-');
  link.href = url;
  link.download = `${sanitizedName}-${label.tracking.trackingNumber || 'label'}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const parseImportedJson = (file: File): Promise<LabelData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        if (!parsed.tracking || !parsed.recipient || !parsed.sender) {
          throw new Error('Invalid shipping label JSON file format.');
        }
        resolve({
          ...DEFAULT_LABEL_DATA,
          ...parsed,
          id: `label-${Date.now()}`,
          updatedAt: new Date().toISOString(),
        });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file.'));
    reader.readAsText(file);
  });
};
