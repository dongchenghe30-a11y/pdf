import React, { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import UploadZone from '../components/UploadZone'
import ProcessingStatus from '../components/ProcessingStatus'

const Security = () => {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')
  const [securityType, setSecurityType] = useState('protect')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile)
    setStatus('idle')
    setMessage('')
  }

  const processPDF = async () => {
    if (!file) {
      setStatus('error')
      setMessage('Please select a PDF file')
      return
    }

    if (securityType === 'protect' && !password) {
      setStatus('error')
      setMessage('Please enter a password')
      return
    }

    if (securityType === 'protect' && password !== confirmPassword) {
      setStatus('error')
      setMessage('Passwords do not match')
      return
    }

    setStatus('processing')
    setProgress(0)
    setMessage('')

    try {
      const arrayBuffer = await file.arrayBuffer

      if (securityType === 'protect') {
        const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })
        const userPassword = password
        const ownerPassword = password

        pdfDoc.encrypt({
          userPassword,
          ownerPassword,
          permissions: {
            copying: false,
            modifying: false,
            printing: true,
          },
        })

        const pdfBytes = await pdfDoc.save()
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        const fileName = file.name.replace('.pdf', '-protected.pdf')
        saveAs(blob, fileName)
        setProgress(100)
      } else if (securityType === 'unlock') {
        try {
          const pdfDoc = await PDFDocument.load(arrayBuffer, { password: password })
          const pdfBytes = await pdfDoc.save()
          const blob = new Blob([pdfBytes], { type: 'application/pdf' })
          const fileName = file.name.replace('.pdf', '-unlocked.pdf')
          saveAs(blob, fileName)
          setProgress(100)
        } catch (error) {
          setStatus('error')
          setMessage('Incorrect password. Unable to unlock PDF.')
          return
        }
      }

      setStatus('success')
      setMessage(`PDF ${securityType === 'protect' ? 'protected' : 'unlocked'} successfully!`)
    } catch (error) {
      setStatus('error')
      setMessage(`Error ${securityType === 'protect' ? 'protecting' : 'unlocking'} PDF. Please try again.`)
      console.error(error)
    }
  }

  return (
    <div className="tool-page">
      <div className="container">
        <div className="tool-header">
          <h1>PDF Security Tools</h1>
          <p>Protect your PDF with a password or unlock password-protected PDFs. Secure your sensitive documents with ease.</p>
        </div>

        <div className="tool-content">
          <div className="security-options">
            <h3>Select Action</h3>
            <div className="security-type-buttons">
              <button
                className={`security-type-btn ${securityType === 'protect' ? 'active' : ''}`}
                onClick={() => setSecurityType('protect')}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Protect PDF</span>
              </button>
              <button
                className={`security-type-btn ${securityType === 'unlock' ? 'active' : ''}`}
                onClick={() => setSecurityType('unlock')}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M8 11V7C8 5.93913 8.42143 4.92172 9.17157 4.17157C9.92172 3.42143 10.9391 3 12 3C13.0609 3 14.0783 3.42143 14.8284 4.17157C15.5786 4.92172 16 5.93913 16 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="17" r="1" fill="currentColor"/>
                </svg>
                <span>Unlock PDF</span>
              </button>
            </div>
          </div>

          <UploadZone
            onFileSelect={handleFileSelect}
            multiple={false}
          />

          {file && (
            <div className="file-info">
              <h3>Selected File</h3>
              <div className="file-item">
                <span className="file-name">{file.name}</span>
              </div>
            </div>
          )}

          {file && (
            <div className="password-inputs">
              <h3>Password</h3>
              
              {securityType === 'protect' ? (
                <>
                  <div className="form-group">
                    <label>Enter Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password to protect PDF"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                    />
                  </div>

                  <div className="password-requirements">
                    <h4>Password Requirements:</h4>
                    <ul>
                      <li>Minimum 4 characters</li>
                      <li>Recommended: Use a strong password</li>
                      <li>Remember this password to unlock the file</li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="form-group">
                  <label>Enter Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password to unlock PDF"
                  />
                  <p className="help-text">Enter the correct password to remove protection from the PDF</p>
                </div>
              )}
            </div>
          )}

          <ProcessingStatus
            status={status}
            progress={progress}
            message={message}
          />

          {file && status !== 'processing' && (
            <button className="btn btn-primary" onClick={processPDF}>
              {securityType === 'protect' ? 'Protect PDF' : 'Unlock PDF'}
            </button>
          )}

          {file && (
            <button
              className="btn btn-secondary"
              onClick={() => {
                setFile(null)
                setStatus('idle')
                setMessage('')
                setPassword('')
                setConfirmPassword('')
              }}
            >
              Clear
            </button>
          )}
        </div>

        <div className="tool-features">
          <h2>Why Use Our PDF Security Tools?</h2>
          <ul>
            <li>✓ Protect sensitive documents</li>
            <li>✓ Unlock password-protected PDFs</li>
            <li>✓ Set custom permissions</li>
            <li>✓ Fast and secure processing</li>
            <li>✓ No watermarks added</li>
            <li>✓ Works on all devices</li>
          </ul>
        </div>

        <div className="tool-info">
          <h3>Security Tips</h3>
          <p>• Use a strong password with at least 8 characters</p>
          <p>• Include numbers, letters, and special characters</p>
          <p>• Keep your password in a secure place</p>
          <p>• Remember that removing password protection allows anyone to access the PDF</p>
        </div>
      </div>
    </div>
  )
}

export default Security
