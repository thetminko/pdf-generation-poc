import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'node:fs';
import { InvoiceData } from 'src/common/invoice.dto';
import { PdfKitInvoiceTemplateService } from 'src/pdfkit/pdfkit-invoice-template.service';

@Injectable()
export class PdfKitInvoicePdfRenderer extends PdfKitInvoiceTemplateService {
  async generate(data: InvoiceData) {
    const doc = this.createDocument({
      size: 'A4',
      margin: 24,
      layout: 'portrait',
    });
    const stream = createWriteStream('outputs/pdfkit/invoice.pdf');
    const streamFinished = new Promise<void>((resolve, reject) => {
      doc
        .pipe(stream)
        .on('finish', () => {
          resolve();
        })
        .on('error', (err) => {
          reject(err);
        });
    });

    this.addFooter(doc, true);
    this.addLogo(doc);
    this.addCustomInfo(doc, data.customInfo);
    this.addInvoiceInfo(doc, data.info);
    this.addSummary(doc, data.summary);
    doc.moveDown();
    doc.moveDown();

    doc.end();
    await streamFinished;
  }
}
