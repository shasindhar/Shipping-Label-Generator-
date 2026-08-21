export type BarcodeFormat = 'CODE128' | 'CODE39' | 'EAN13' | 'UPC' | 'ITF14';

export type TemplateType = 'professional' | 'minimal' | 'compact' | 'bold-freight';

export type LabelSizePreset = '4x6' | '4x8' | 'a6' | 'a5' | 'a4' | 'custom';

export type OrientationType = 'portrait' | 'landscape';

export type QrSourceType = 'manifest' | 'tracking' | 'order' | 'recipient' | 'url' | 'custom';

export interface CustomBadge {
  id: string;
  text: string;
  color?: string;
  bgColor?: string;
  borderColor?: string;
  isBold?: boolean;
}

export interface CompanyInfo {
  name: string;
  subtitle: string;
  badge: string; // e.g. "P-01"
  logoUrl?: string;
  logoSize: number; // in px
  logoPosition: 'left' | 'center' | 'right';
  estDate: string; // e.g. "Thursday, Aug 13, 2026"
}

export interface SenderInfo {
  name: string;
  companyHub: string; // e.g. "NOMAD FULFILLMENT HUB #04"
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
}

export interface RecipientInfo {
  name: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  email: string;
  deliveryInstructions?: string;
}

export interface OrderInfo {
  reference: string; // e.g. "LUM-43934"
  orderId: string;
  invoiceNumber: string;
  orderDate: string; // e.g. "2026-08-20T00:00:00.000Z"
  shippingDate: string;
  expectedDeliveryDate: string;
  totalItems: string; // e.g. "1"
  weight: string; // e.g. "1.2 KG"
  dimensions: string;
  packageType: string;
  paymentType: string; // e.g. "Paid", "COD", "Prepaid"
  shippingMethod: string;
}

export interface TrackingInfo {
  trackingNumber: string; // e.g. "TRK-LUM-43934-EXPRESS"
  prefix: string;
  serviceName: string;
  trackingUrl: string;
  subBarcodeText: string; // e.g. "*LUM-43934-600020*"
  barcodeFormat: BarcodeFormat;
  barcodeHeight: number;
  barcodeWidth: number;
  showBarcodeText: boolean;
  barcodeVisible: boolean;
}

export interface QrInfo {
  enabled: boolean;
  sourceType: QrSourceType;
  customData: string;
  size: number;
  position: 'bottom-left' | 'bottom-right' | 'top-right';
  verifiedTitle: string; // e.g. "VERIFIED PACKAGE"
  verifiedSubtext: string; // e.g. "Digital Manifest OK"
  paymentStatus: string; // e.g. "Paid"
}

export interface FooterInfo {
  deliveryHub: string; // e.g. "DELIVERY HUB: SF-BAY-02"
  statusText: string; // e.g. "READY FOR SCANNERS"
  customNote: string;
  routingCode: string;
}

export interface AppearanceSettings {
  template: TemplateType;
  sizePreset: LabelSizePreset;
  customWidthInches: number;
  customHeightInches: number;
  orientation: OrientationType;
  textColor: string;
  secondaryTextColor: string;
  borderColor: string;
  headerBg: string;
  headerTextColor: string;
  accentColor: string;
  sectionBg: string;
  borderThickness: number; // 1-6 px
  borderRadius: number; // 0-24 px
  borderStyle: 'solid' | 'dashed' | 'double';
  fontFamily: 'sans' | 'mono' | 'condensed';
  padding: number; // in rem or px
  fontSizeScale: number; // 0.8 - 1.2
}

export interface VisibilitySettings {
  logo: boolean;
  companySubtitle: boolean;
  badgeTag: boolean;
  estDate: boolean;
  senderSection: boolean;
  orderSection: boolean;
  recipientSection: boolean;
  phone: boolean;
  recipientPhone: boolean;
  trackingSection: boolean;
  barcode: boolean;
  subBarcodeText: boolean;
  qrCode: boolean;
  deliveryHub: boolean;
  footer: boolean;
  weight: boolean;
  orderDate: boolean;
  itemsCount: boolean;
  customBadges: boolean;
}

export interface LabelData {
  id: string;
  name: string;
  updatedAt: string;
  company: CompanyInfo;
  sender: SenderInfo;
  recipient: RecipientInfo;
  order: OrderInfo;
  tracking: TrackingInfo;
  qr: QrInfo;
  footer: FooterInfo;
  customBadges: CustomBadge[];
  appearance: AppearanceSettings;
  visibility: VisibilitySettings;
}

export interface BatchRecipientItem {
  id: string;
  name: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
  phone: string;
  trackingNumber: string;
  orderReference?: string;
  weight?: string;
}
