import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfKitInvoicePdfRenderer } from 'src/pdfkit/pdfkit-invoice-pdf-renderer';
import { PuppeteerInvoicePdfRendererService } from './puppeteer/puppeteer-invoice-pdf-renderer.service';
import { PuppeteerInvoiceTemplateService } from './puppeteer/puppeteer-invoice-template.service';
import { ReactPdfInvoiceRendererService } from './react-pdf/react-pdf-invoice-renderer.servce';
import { ReactPdfInvoiceTemplateService } from './react-pdf/react-pdf-invoice-template.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    PdfKitInvoicePdfRenderer,
    PuppeteerInvoicePdfRendererService,
    PuppeteerInvoiceTemplateService,
    ReactPdfInvoiceRendererService,
    ReactPdfInvoiceTemplateService,
  ],
})
export class AppModule {}
