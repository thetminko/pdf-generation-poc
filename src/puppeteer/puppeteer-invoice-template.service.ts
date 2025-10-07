import { Injectable } from '@nestjs/common';
import { renderFile } from 'ejs';
import * as path from 'path';
import * as fs from 'fs';
import { InvoiceData } from '../common/invoice.dto';

@Injectable()
export class PuppeteerInvoiceTemplateService {
  protected readonly assetsPath = path.join(__dirname, '..', '..', 'assets');

  private readonly templatePath = path.resolve(
    path.join(this.assetsPath, 'templates', 'invoice.ejs'),
  );

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

  async generateInvoiceHtml(invoiceData: InvoiceData): Promise<string> {
    return renderFile(this.templatePath, {
      ...invoiceData,
      logoBase64: this.getBase64Image('logo.png'),
    });
  }
}
