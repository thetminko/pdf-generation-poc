import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import { InvoiceData } from '../common/invoice.dto';

@Injectable()
export class ReactPdfInvoiceTemplateService {
  protected readonly assetsPath = path.join(__dirname, '..', '..', 'assets');

  private getBase64Image(imagePath: string): string {
    try {
      const fullPath = path.join(this.assetsPath, 'vectors', imagePath);
      const imageBuffer = fs.readFileSync(fullPath);
      const base64 = imageBuffer.toString('base64');
      const mimeType = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg';
      return `data:${mimeType};base64,${base64}`;
    } catch (error) {
      console.warn(`Could not load image: ${imagePath}`, error);
      return ''; // Return empty string if image not found
    }
  }

  getInvoiceData(invoiceData: InvoiceData) {
    return {
      ...invoiceData,
      logoBase64: this.getBase64Image('logo.png'),
    };
  }
}
