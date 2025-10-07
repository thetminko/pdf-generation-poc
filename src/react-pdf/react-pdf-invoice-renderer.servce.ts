import { Injectable } from '@nestjs/common';
import { pdf } from '@react-pdf/renderer';
import { writeFileSync } from 'fs';
import { InvoiceData } from '../common/invoice.dto';
import { ReactPdfInvoiceTemplateService } from './react-pdf-invoice-template.service';
import { createInvoiceDocument } from '../../assets/templates/invoice-react-pdf';

@Injectable()
export class ReactPdfInvoiceRendererService {
  constructor(
    private readonly templateService: ReactPdfInvoiceTemplateService,
  ) {}

  async generateInvoice(invoiceData: InvoiceData): Promise<void> {
    try {
      // Get invoice data with logo
      const templateData = this.templateService.getInvoiceData(invoiceData);

      // Create React PDF document
      const document = createInvoiceDocument(
        templateData,
        templateData.logoBase64,
      ); // Ensure this returns a <Document /> element

      // Generate PDF

      const pdfInstance = pdf(document);
      const pdfBlob = await pdfInstance.toBlob();

      // Convert blob to buffer
      const arrayBuffer = await pdfBlob.arrayBuffer();
      const pdfBuffer = Buffer.from(arrayBuffer);

      // Save to file
      writeFileSync('outputs/react-pdf/invoice.pdf', pdfBuffer);

      console.log('React PDF invoice generated successfully');
    } catch (error) {
      console.error('Error generating React PDF invoice:', error);
      throw error;
    }
  }
}
