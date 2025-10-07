import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PdfKitInvoiceGenerator } from 'src/pdfkit/pdfkit-base-generator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly pdfkitInvoiceGenerator: PdfKitInvoiceGenerator,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('pdfkit')
  async generatePdf(): Promise<void> {
    const data = [
      ['1', 'Item 1 Description', '$10.00', '2', '$20.00'],
      ['2', 'Item 2 Description', '$15.00', '1', '$15.00'],
      ['3', 'Item 3 Description', '$7.50', '3', '$22.50'],
    ];

    await this.pdfkitInvoiceGenerator.generate(data);
  }
}
