import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PdfKitInvoicePdfRenderer } from 'src/pdfkit/pdfkit-invoice-pdf-renderer';
import { PuppeteerInvoicePdfRendererService } from './puppeteer/puppeteer-invoice-pdf-renderer.service';
import { ReactPdfInvoiceRendererService } from './react-pdf/react-pdf-invoice-renderer.servce';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly pdfkit: PdfKitInvoicePdfRenderer,
    private readonly puppeteer: PuppeteerInvoicePdfRendererService,
    private readonly reactPdf: ReactPdfInvoiceRendererService,
  ) {}

  private readonly invoiceData = {
    customInfo: {
      legalName: 'ABC Logistics Inc.',
      tradeName: 'ABC Logistics',
      phone: '(416) 5555-123',
      email: 'billing@abc.com',
      address: '123 ABC Way, Houston, TX, 90212',
    },
    info: {
      invoiceNo: 'INV-2024-001',
      invoiceDate: '2024-01-15',
      dueDate: '2024-02-14',
      paymentMethod: 'Electronic Transfer',
      currency: 'CAD',
    },
    summary: {
      totalInvoiceAmount: 552.45,
      nofOfTransactions: 3,
      fuelVolume: '430.5L',
      nofOfCardsUsed: 2,
    },
    items: [
      {
        description: 'Fuel Purchase - Station #12345',
        volume: '250.5',
        uom: 'L',
        tax: '25.05',
        hst: '3.26',
        amount: '$278.81',
      },
      {
        description: 'Fuel Purchase - Station #67890',
        volume: '180.0',
        uom: 'L',
        tax: '18.00',
        hst: '2.34',
        amount: '$200.34',
      },
      {
        description: 'Monthly Service Fee',
        volume: '',
        uom: '',
        tax: '7.00',
        hst: '0.91',
        amount: '$77.91',
      },
    ],
    currencyConversion: {
      fromAmount: '$425.32 USD',
      toAmount: '$552.45 CAD',
      usdToCadRate: '1.2994',
      date: '2024-01-15',
    },
  };

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('pdfkit')
  async generatePdf(): Promise<void> {
    await this.pdfkit.generate(this.invoiceData);
  }

  @Get('puppeteer')
  async generatePuppeteerPdf(): Promise<void> {
    await this.puppeteer.generateInvoice(this.invoiceData);
  }

  @Get('react-pdf')
  async generateReactPdf(): Promise<void> {
    await this.reactPdf.generateInvoice(this.invoiceData);
  }
}
