import React from 'react';
import { Layout } from 'antd';
import Link from 'next/link';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div>© 2024 Patient Management System</div>
        <div className="footer-links">
          <Link href="/support" className="footer-link">Support</Link>
          <Link href="/privacy" className="footer-link">Privacy</Link>
          <Link href="/terms" className="footer-link">Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 