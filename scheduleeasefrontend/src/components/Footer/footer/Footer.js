import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© {new Date().getFullYear()} Your Website Name. All rights reserved.</p>
        <p>Contact: contact@example.com</p>
      </div>
    </footer>
  );
};

export default Footer;
