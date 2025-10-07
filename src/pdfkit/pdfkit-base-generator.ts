import { Injectable } from '@nestjs/common';
import { createWriteStream } from 'node:fs';
import PDFDocument from 'pdfkit';

@Injectable()
export class PdfKitInvoiceGenerator {
  async generate(data: string[][]) {
    const doc = new PDFDocument({
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

    // doc.on('pageAdded', () => this.addFooter(doc));
    this.addFooter(doc, true);

    this.addHeader(doc);
    doc.moveDown();
    doc.moveDown();

    doc.table({
      columnStyles: [50, 200, 100, 100, 100],
      rowStyles: (i) => {
        return i < 1
          ? {
              border: [0, 0, 1, 0],
              borderColor: '#0F1112',
              padding: [8, 4, 8, 4],
            }
          : {
              border: [0, 0, 0.5, 0],
              borderColor: '#DAE1E4',
              padding: [8, 4, 8, 4],
            };
      },
      data: [
        ['Item', 'Description', 'Unit Cost', 'Quantity', 'Line Total'],
        ...data,
      ],
    });

    doc.end();
    await streamFinished;
  }

  private addHeader(doc: PDFKit.PDFDocument) {
    doc.fontSize(20).text('Invoice', { align: 'center' }).moveDown();
  }

  private addFooter(doc: PDFKit.PDFDocument, isFirstPage = false) {
    if (isFirstPage) {
      doc.on('pageAdded', () => this.addFooter(doc));
    }
    const marginBottom = doc.page.margins.bottom;
    doc
      .fontSize(10)
      .text('This is a footer', 50, doc.page.height - marginBottom - 24, {
        align: 'center',
      });

    if (isFirstPage) {
      doc.text('', 24, 24, { continued: true });
    }
  }
}
