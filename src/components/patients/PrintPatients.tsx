"use client";

import { useRef } from 'react';
import { Button } from 'antd';
import { PrinterOutlined } from '@ant-design/icons';
import Image from 'next/image';

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: string;
  createdAt: string;
}

interface PrintPatientsProps {
  patients: Patient[];
}

const PrintPatients = ({ patients }: PrintPatientsProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const printContent = document.createElement('div');
    printContent.innerHTML = `
      <style>
        @media print {
          @page {
            size: A4;
            margin: 20mm;
          }
          
          body {
            font-family: Arial, sans-serif;
          }

          .print-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 2px solid #333;
          }

          .print-logo {
            width: 150px;
            height: auto;
          }

          .print-title {
            font-size: 24px;
            font-weight: bold;
            text-align: right;
          }

          .print-date {
            text-align: right;
            font-size: 14px;
            color: #666;
            margin-top: 5px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }

          th {
            background-color: #f5f5f5;
            font-weight: bold;
          }

          tr:nth-child(even) {
            background-color: #fafafa;
          }

          .print-footer {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            font-size: 12px;
            color: #666;
            text-align: center;
          }
        }
      </style>
      <div class="print-header">
        <img src="/logo.png" alt="Logo" class="print-logo" />
        <div>
          <div class="print-title">Patient List</div>
          <div class="print-date">Generated on: ${new Date().toLocaleDateString()}</div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          ${patients.map(patient => `
            <tr>
              <td>${patient.id.slice(0, 8)}</td>
              <td>${patient.firstName} ${patient.lastName}</td>
              <td>${patient.gender}</td>
              <td>${patient.email}</td>
              <td>${patient.phone}</td>
              <td>${new Date(patient.createdAt).toLocaleDateString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="print-footer">
        © ${new Date().getFullYear()} Patient Management System. All rights reserved.
      </div>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent.innerHTML);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 250);
    }
  };

  return (
    <Button 
      icon={<PrinterOutlined />} 
      onClick={handlePrint}
    >
      Print List
    </Button>
  );
};

export default PrintPatients; 