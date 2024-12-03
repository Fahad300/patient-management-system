"use client";

import React from 'react';
import { Modal, Button, Space } from 'antd';
import { PrinterOutlined, DownloadOutlined } from '@ant-design/icons';
import { formatCurrency, formatDate } from '@/lib/utils';

interface InvoiceViewerProps {
  visible: boolean;
  onClose: () => void;
  bill: any;
}

const InvoiceViewer = ({ visible, onClose, bill }: InvoiceViewerProps) => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Create a blob from the content
    const content = document.getElementById('invoice-content');
    if (!content) return;

    window.print();
  };

  if (!bill) return null;

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      width={800}
      title="Invoice"
      footer={[
        <Space key="actions">
          <Button 
            icon={<PrinterOutlined />} 
            onClick={handlePrint}
            className="no-print"
          >
            Print
          </Button>
          <Button 
            icon={<DownloadOutlined />} 
            onClick={handleDownload}
            type="primary"
            className="no-print"
          >
            Download
          </Button>
        </Space>
      ]}
    >
      <div id="invoice-content" className="invoice-container">
        <div className="invoice-header">
          <div className="company-info">
            <h1>Healthcare PMS</h1>
            <p>123 Medical Center Drive</p>
            <p>Healthcare City, HC 12345</p>
            <p>Phone: (555) 123-4567</p>
          </div>
          <div className="invoice-details">
            <h2>INVOICE</h2>
            <table>
              <tbody>
                <tr>
                  <td>Invoice No:</td>
                  <td>{bill.id}</td>
                </tr>
                <tr>
                  <td>Date:</td>
                  <td>{formatDate(bill.createdAt, 'MMM DD, YYYY')}</td>
                </tr>
                <tr>
                  <td>Due Date:</td>
                  <td>{formatDate(bill.dueDate, 'MMM DD, YYYY')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="patient-info">
          <h3>Bill To:</h3>
          <p>{bill.patient.firstName} {bill.patient.lastName}</p>
          {bill.patient.address && (
            <>
              <p>{bill.patient.address.street}</p>
              <p>{bill.patient.address.city}, {bill.patient.address.state} {bill.patient.address.zipCode}</p>
            </>
          )}
        </div>

        <div className="invoice-items">
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {bill.items.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{formatCurrency(item.unitPrice)}</td>
                  <td>{formatCurrency(item.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="invoice-summary">
          <table>
            <tbody>
              <tr>
                <td>Subtotal:</td>
                <td>{formatCurrency(bill.subtotal)}</td>
              </tr>
              <tr>
                <td>Tax ({(bill.tax / bill.subtotal * 100).toFixed(1)}%):</td>
                <td>{formatCurrency(bill.tax)}</td>
              </tr>
              {bill.insurance && (
                <>
                  <tr>
                    <td>Insurance Coverage:</td>
                    <td>-{formatCurrency(bill.insurance.coverage)}</td>
                  </tr>
                  <tr>
                    <td>Copayment:</td>
                    <td>{formatCurrency(bill.insurance.copayment)}</td>
                  </tr>
                </>
              )}
              <tr className="total-row">
                <td>Total Due:</td>
                <td>{formatCurrency(bill.total)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {bill.notes && (
          <div className="invoice-notes">
            <h4>Notes:</h4>
            <p>{bill.notes}</p>
          </div>
        )}

        <div className="invoice-footer">
          <p>Thank you for choosing Healthcare PMS</p>
          <p>Please make payment by the due date</p>
          {bill.status === 'OVERDUE' && (
            <p className="overdue-notice">This invoice is overdue. Please make payment as soon as possible.</p>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default InvoiceViewer; 