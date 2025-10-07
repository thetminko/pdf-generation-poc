import path from 'node:path';
import PDFDocument from 'pdfkit';
import {
  InvoiceCustomInfo,
  InvoiceInfo,
  InvoiceSummary,
} from 'src/common/invoice.dto';

export class PdfKitInvoiceTemplateService {
  protected readonly assetsPath = path.join(__dirname, '..', '..', 'assets');
  protected readonly fontPaths = {
    inter: path.resolve(
      path.join(this.assetsPath, 'fonts', 'inter', 'Inter-Light.ttf'),
    ),
    interSemiBold: path.resolve(
      path.join(this.assetsPath, 'fonts', 'inter', 'Inter-SemiBold.ttf'),
    ),
  };
  protected readonly fonts = {
    normal: 'Inter',
    semiBold: 'Inter-SemiBold',
  };
  protected readonly logos = {
    logo: path.resolve(path.join(this.assetsPath, 'vectors', 'logo.png')),
    phone: path.resolve(path.join(this.assetsPath, 'vectors', 'phone.png')),
    email: path.resolve(path.join(this.assetsPath, 'vectors', 'mail.png')),
    web: path.resolve(path.join(this.assetsPath, 'vectors', 'globe.png')),
  };

  constructor() {}

  protected createDocument(
    options?: PDFKit.PDFDocumentOptions,
  ): PDFKit.PDFDocument {
    const document = new PDFDocument(options);
    document.registerFont(this.fonts.normal, this.fontPaths.inter);
    document.registerFont(this.fonts.semiBold, this.fontPaths.interSemiBold);
    return document;
  }

  protected addLogo(doc: PDFKit.PDFDocument) {
    doc.image(this.logos.logo, {
      width: 40,
    });
    doc.moveDown();
    doc.moveDown();
  }

  protected addCustomInfo(doc: PDFKit.PDFDocument, data: InvoiceCustomInfo) {
    doc.font(this.fonts.semiBold).fontSize(16).text(data.legalName);
    doc.font(this.fonts.semiBold).fontSize(12).text(data.tradeName);
    doc.moveDown(0.5);
    doc.font(this.fonts.normal).fontSize(10).text(data.phone);
    doc.moveDown(0.5);
    doc.font(this.fonts.normal).fontSize(10).text(data.email);
    doc.moveDown(0.5);
    doc.font(this.fonts.normal).fontSize(10).text(data.address);
  }

  protected addInvoiceInfo(doc: PDFKit.PDFDocument, data: InvoiceInfo) {
    const pageWidth = doc.page.width;
    const margin = doc.page.margins.right;
    const rightX = pageWidth - margin - 150;

    // Position for invoice details on the right
    const currentY = doc.y;
    doc.y = currentY - 100; // Align with company info

    // Invoice details
    const details = [
      { label: 'Invoice Number', value: data.invoiceNo },
      { label: 'Invoice Date', value: data.invoiceDate },
      { label: 'Due Date', value: data.dueDate },
      { label: 'Payment Method', value: data.paymentMethod },
      { label: 'Currency', value: data.currency },
    ];

    details.forEach((detail) => {
      const y = doc.y + 10;
      doc
        .font(this.fonts.normal)
        .fontSize(10)
        .text(detail.label, rightX, y, { width: 90, align: 'left' });

      doc
        .font(this.fonts.semiBold)
        .fontSize(10)
        .text(detail.value, rightX + 85, y, { width: 70, align: 'right' });
    });

    // Reset Y position
    doc.y = Math.max(currentY, doc.y);
  }

  protected addSummary(doc: PDFKit.PDFDocument, data: InvoiceSummary) {
    doc.moveDown();
    doc.moveDown();

    // Create a table-like layout for summary items
    const startX = doc.page.margins.left;
    const currentY = doc.y;

    // Summary headers
    const summaryItems = [
      {
        label: 'TOTAL INVOICE AMOUNT (USD)',
        value: `$${data.totalInvoiceAmount.toFixed(2)}`,
      },
      {
        label: 'NUMBER OF TRANSACTIONS',
        value: data.nofOfTransactions.toString(),
      },
      { label: 'FUEL VOLUME', value: data.fuelVolume },
      {
        label: 'NUMBER OF CARDS USED',
        value: data.nofOfCardsUsed.toString(),
      },
    ];

    const width = [150, 150, 160, 140];
    // Draw summary items in a row
    summaryItems.forEach((item, index) => {
      const x = startX + index * width[index];

      // Header text
      doc.font(this.fonts.normal).fontSize(8).text(item.label, x, currentY, {
        width: width[index],
        align: 'left',
      });

      // Value text (larger and bold)
      doc
        .font(this.fonts.semiBold)
        .fontSize(12)
        .text(item.value, x, currentY + 15, {
          width: width[index],
          align: 'left',
        });
    });

    // Move cursor down after the summary
    doc.y = currentY + 50;
    doc.moveDown();
  }

  protected addFooter(
    doc: PDFKit.PDFDocument,
    showConfidentialDisclaimer = true,
    isFirstPage = true,
  ) {
    if (isFirstPage) {
      doc.on('pageAdded', () =>
        this.addFooter(doc, showConfidentialDisclaimer, false),
      );
    }

    const marginBottom = doc.page.margins.bottom;
    const marginLeft = doc.page.margins.left;
    const marginRight = doc.page.margins.right;

    // Temporarily reset bottom margin
    doc.page.margins.bottom = 0;

    const footerY = doc.page.height - marginBottom;

    // Draw the top border line
    doc
      .moveTo(marginLeft, footerY)
      .lineTo(doc.page.width - marginRight, footerY)
      .strokeColor('#0F1112')
      .lineWidth(1)
      .stroke();

    // Reset stroke color for text
    doc.strokeColor('#0F1112');

    // Left-aligned contact info
    doc
      .image(this.logos.phone, marginLeft, footerY + 10, {
        width: 6,
        valign: 'center',
      })
      .font(this.fonts.normal)
      .fontSize(6)
      .text('1-844-41-NOMAD', marginLeft + 10, footerY + 9, {
        continued: true,
      });

    doc
      .image(this.logos.email, marginLeft + 80, footerY + 10, {
        width: 6,
        valign: 'center',
      })
      .font(this.fonts.normal)
      .fontSize(6)
      .text('support@nomad.io', marginLeft + 40, footerY + 9, {
        continued: true,
      });

    doc
      .image(this.logos.web, marginLeft + 160, footerY + 10, {
        width: 6,
        valign: 'center',
      })
      .font(this.fonts.normal)
      .fontSize(6)
      .text('www.nomad.io', marginLeft + 66, footerY + 9, {
        continued: true,
      });

    // Right-aligned footer
    const str = 'HST 123456 123- RT1234';

    doc
      .font(this.fonts.normal)
      .fontSize(6)
      .text(
        str,
        marginLeft + 10, // Adjust x-position for right alignment
        footerY + 9,
        { align: 'right' },
      );

    doc.page.margins.bottom = marginBottom;
    if (isFirstPage) {
      doc.text('', 36, 36, { continued: true });
    }
  }
}
