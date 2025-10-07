import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { InvoiceData } from '../common/invoice.dto';
import { PuppeteerInvoiceTemplateService } from './puppeteer-invoice-template.service';
import { writeFileSync } from 'fs';

@Injectable()
export class PuppeteerInvoicePdfRendererService {
  constructor(
    private readonly templateService: PuppeteerInvoiceTemplateService,
  ) {}

  async generateInvoice(invoiceData: InvoiceData) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();

      // Generate HTML from EJS template
      const html = await this.templateService.generateInvoiceHtml(invoiceData);

      // Set content and generate PDF
      await page.setContent(html, {
        waitUntil: 'networkidle0',
      });

      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px',
        },
      });

      writeFileSync('outputs/puppeteer/invoice.pdf', pdf);
    } finally {
      await browser.close();
    }
  }
}
