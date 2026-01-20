import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>PDF Tools</h3>
            <p>Free online PDF processing tools. No registration required.</p>
          </div>
          <div className="footer-section">
            <h4>Tools</h4>
            <ul>
              <li><a href="/merge">Merge PDF</a></li>
              <li><a href="/split">Split PDF</a></li>
              <li><a href="/compress">Compress PDF</a></li>
              <li><a href="/convert">Convert PDF</a></li>
              <li><a href="/edit">Edit PDF</a></li>
              <li><a href="/security">Security</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Why Choose Us</h4>
            <ul>
              <li>100% Free</li>
              <li>No Watermarks</li>
              <li>No Registration</li>
              <li>Fast Processing</li>
              <li>Secure & Private</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 PDF Tools. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
