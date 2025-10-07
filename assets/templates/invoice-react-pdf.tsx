import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';
import { InvoiceData } from '../../src/common/invoice.dto';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontSize: 12,
    color: '#333333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  logoSection: {
    flex: 1,
  },
  logo: {
    width: 60,
    height: 20,
    marginBottom: 20,
  },
  companyInfo: {
    color: '#666666',
  },
  companyName: {
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  invoiceInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  invoiceInfoRow: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  invoiceLabel: {
    fontWeight: 'medium',
    color: '#666666',
    width: 100,
    textAlign: 'right',
    marginRight: 8,
  },
  invoiceValue: {
    fontWeight: 'bold',
    color: '#333333',
    width: 80,
  },
  summarySection: {
    backgroundColor: '#f8fafc',
    padding: 20,
    marginBottom: 30,
  },
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontSize: 10,
    color: '#666666',
    fontWeight: 'medium',
    marginBottom: 5,
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e3a8a',
    textAlign: 'center',
  },
  tableSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  table: {
    width: '100%',
    border: '1px solid #e5e7eb',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1e3a8a',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 11,
  },
  tableHeaderCell: {
    padding: 12,
    borderRight: '1px solid #ffffff',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #e5e7eb',
  },
  tableRowEven: {
    backgroundColor: '#f9fafb',
  },
  tableCell: {
    padding: 10,
    borderRight: '1px solid #e5e7eb',
  },
  tableCellCenter: {
    textAlign: 'center',
  },
  tableCellRight: {
    textAlign: 'right',
  },
  totalsSection: {
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  totalsTable: {
    width: 300,
    border: '1px solid #e5e7eb',
  },
  totalsRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #e5e7eb',
  },
  totalsLabel: {
    padding: 8,
    fontWeight: 'medium',
    color: '#666666',
    flex: 1,
  },
  totalsValue: {
    padding: 8,
    textAlign: 'right',
    fontWeight: 'bold',
    width: 80,
  },
  totalRowFinal: {
    backgroundColor: '#1e3a8a',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  currencyConversion: {
    backgroundColor: '#f1f5f9',
    padding: 20,
    marginBottom: 30,
  },
  currencyTitle: {
    fontWeight: 'bold',
    color: '#1e3a8a',
    marginBottom: 10,
  },
  currencyText: {
    color: '#475569',
    marginBottom: 5,
  },
  currencyRate: {
    fontSize: 10,
    color: '#64748b',
  },
  footer: {
    borderTop: '2px solid #e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#666666',
    fontSize: 11,
  },
  contactInfo: {
    flexDirection: 'row',
  },
  contactItem: {
    marginRight: 30,
  },
  hstNumber: {
    fontWeight: 'bold',
    color: '#333333',
  },
});

interface InvoiceTemplateProps {
  data: InvoiceData;
  logoBase64?: string;
}

export const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({
  data,
  logoBase64,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoSection}>
          {logoBase64 && <Image style={styles.logo} src={logoBase64} />}
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{data.customInfo.legalName}</Text>
            <Text>{data.customInfo.tradeName}</Text>
            <Text>{data.customInfo.phone}</Text>
            <Text>{data.customInfo.email}</Text>
            <Text>{data.customInfo.address}</Text>
          </View>
        </View>

        <View style={styles.invoiceInfo}>
          <View style={styles.invoiceInfoRow}>
            <Text style={styles.invoiceLabel}>Invoice Number</Text>
            <Text style={styles.invoiceValue}>{data.info.invoiceNo}</Text>
          </View>
          <View style={styles.invoiceInfoRow}>
            <Text style={styles.invoiceLabel}>Invoice Date</Text>
            <Text style={styles.invoiceValue}>{data.info.invoiceDate}</Text>
          </View>
          <View style={styles.invoiceInfoRow}>
            <Text style={styles.invoiceLabel}>Due Date</Text>
            <Text style={styles.invoiceValue}>{data.info.dueDate}</Text>
          </View>
          <View style={styles.invoiceInfoRow}>
            <Text style={styles.invoiceLabel}>Payment Method</Text>
            <Text style={styles.invoiceValue}>{data.info.paymentMethod}</Text>
          </View>
          <View style={styles.invoiceInfoRow}>
            <Text style={styles.invoiceLabel}>Currency</Text>
            <Text style={styles.invoiceValue}>{data.info.currency}</Text>
          </View>
        </View>
      </View>

      {/* Summary Section */}
      <View style={styles.summarySection}>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Invoice Amount (USD)</Text>
            <Text style={styles.summaryValue}>
              ${data.summary.totalInvoiceAmount.toFixed(2)}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Number of Transactions</Text>
            <Text style={styles.summaryValue}>
              {data.summary.nofOfTransactions}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Fuel Volume</Text>
            <Text style={styles.summaryValue}>{data.summary.fuelVolume} G</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Number of Cards Used</Text>
            <Text style={styles.summaryValue}>
              {data.summary.nofOfCardsUsed}
            </Text>
          </View>
        </View>
      </View>

      {/* Items Table */}
      <View style={styles.tableSection}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <View style={styles.table}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, { flex: 2 }]}>
              Description
            </Text>
            <Text
              style={[
                styles.tableHeaderCell,
                { flex: 1 },
                styles.tableCellCenter,
              ]}
            >
              Volume
            </Text>
            <Text
              style={[
                styles.tableHeaderCell,
                { flex: 1 },
                styles.tableCellCenter,
              ]}
            >
              UOM
            </Text>
            <Text
              style={[
                styles.tableHeaderCell,
                { flex: 1 },
                styles.tableCellCenter,
              ]}
            >
              Tax
            </Text>
            <Text
              style={[
                styles.tableHeaderCell,
                { flex: 1 },
                styles.tableCellCenter,
              ]}
            >
              HST
            </Text>
            <Text
              style={[
                styles.tableHeaderCell,
                { flex: 1 },
                styles.tableCellRight,
              ]}
            >
              Amount
            </Text>
          </View>

          {/* Table Rows */}
          {data.items.map((item, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                index % 2 === 1 ? styles.tableRowEven : {},
              ]}
            >
              <Text style={[styles.tableCell, { flex: 2 }]}>
                {item.description}
              </Text>
              <Text
                style={[styles.tableCell, { flex: 1 }, styles.tableCellCenter]}
              >
                {item.volume || ''}
              </Text>
              <Text
                style={[styles.tableCell, { flex: 1 }, styles.tableCellCenter]}
              >
                {item.uom || ''}
              </Text>
              <Text
                style={[styles.tableCell, { flex: 1 }, styles.tableCellCenter]}
              >
                {item.tax || ''}
              </Text>
              <Text
                style={[styles.tableCell, { flex: 1 }, styles.tableCellCenter]}
              >
                {item.hst || ''}
              </Text>
              <Text
                style={[styles.tableCell, { flex: 1 }, styles.tableCellRight]}
              >
                {item.amount || ''}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Totals Section */}
      <View style={styles.totalsSection}>
        <View style={styles.totalsTable}>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Subtotal</Text>
            <Text style={styles.totalsValue}>$1,296.30</Text>
          </View>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Transaction Fees</Text>
            <Text style={styles.totalsValue}>$0.00</Text>
          </View>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Rebate</Text>
            <Text style={styles.totalsValue}>-$50.00</Text>
          </View>
          <View style={[styles.totalsRow, styles.totalRowFinal]}>
            <Text style={styles.totalsLabel}>Total</Text>
            <Text style={styles.totalsValue}>
              ${data.summary.totalInvoiceAmount.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* Currency Conversion */}
      <View style={styles.currencyConversion}>
        <Text style={styles.currencyTitle}>AMOUNT PAYABLE IN CAD</Text>
        <Text style={styles.currencyText}>
          USD ${data.currencyConversion.fromAmount} converts to CAD $
          {data.currencyConversion.toAmount}
        </Text>
        <Text style={styles.currencyRate}>
          USD $1.00 = CAD ${data.currencyConversion.usdToCadRate} Conversion XE
          Rate {data.currencyConversion.date}
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer} fixed>
        <View style={styles.contactInfo}>
          <Text style={styles.contactItem}>1-844-41-NOMAD</Text>
          <Text style={styles.contactItem}>billing@nomad.io</Text>
          <Text style={styles.contactItem}>www.nomad.io</Text>
        </View>
        <Text style={styles.hstNumber}>HST 78272 141- RT0001</Text>
      </View>
    </Page>
  </Document>
);

export const createInvoiceDocument = (
  data: InvoiceData,
  logoBase64?: string,
) => <InvoiceTemplate data={data} logoBase64={logoBase64} />;
