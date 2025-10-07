export interface InvoiceCustomInfo {
  legalName: string;
  tradeName: string;
  phone: string;
  email: string;
  address: string;
}

export interface InvoiceInfo {
  invoiceNo: string;
  invoiceDate: string;
  dueDate: string;
  paymentMethod: string;
  currency: string;
}

export interface InvoiceSummary {
  totalInvoiceAmount: number;
  nofOfTransactions: number;
  fuelVolume: string;
  nofOfCardsUsed: number;
}

export interface InvoiceItem {
  description: string;
  volume?: string;
  uom?: string;
  tax?: string;
  hst?: string;
  amount?: string;
}

export interface InvoiceCurrencyConversion {
  fromAmount: string;
  toAmount: string;
  usdToCadRate: string;
  date: string;
}

export interface InvoiceData {
  customInfo: InvoiceCustomInfo;
  info: InvoiceInfo;
  summary: InvoiceSummary;
  items: InvoiceItem[];
  currencyConversion: InvoiceCurrencyConversion;
}
