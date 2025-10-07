import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PdfKitInvoiceGenerator } from 'src/pdfkit/pdfkit-base-generator';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PdfKitInvoiceGenerator],
})
export class AppModule {}
