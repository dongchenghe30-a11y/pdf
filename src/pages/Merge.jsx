import React, { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import UploadZone from '../components/UploadZone'
import ProcessingStatus from '../components/ProcessingStatus'

const Merge = () => {
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')

  const handleFileSelect = (selectedFiles) => {
    setFiles(prevFiles => [...prevFiles, ...selectedFiles])
  }

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
  }

  const mergePDFs = async () => {
    if (files.length < 2) {
      setStatus('error')
      setMessage('Please select at least 2 PDF files to merge')
      return
    }

    setStatus('processing')
    setProgress(0)
    setMessage('')

    try {
      const mergedPdf = await PDFDocument.create()

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        copiedPages.forEach((page) => mergedPdf.addPage(page))
        setProgress(Math.round(((i + 1) / files.length) * 100))
      }

      const mergedPdfBytes = await mergedPdf.save()
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' })
      saveAs(blob, 'merged.pdf')

      setStatus('success')
      setMessage('PDF files merged successfully!')
      setFiles([])
    } catch (error) {
      setStatus('error')
      setMessage('Error merging PDFs. Please try again.')
      console.error(error)
    }
  }

  return (
    <div className="tool-page">
      <div className="container">
        <div className="tool-header">
          <h1>Merge PDF Files</h1>
          <p>Combine multiple PDF files into one document. Perfect for combining reports, contracts, or any multi-page documents.</p>
        </div>

        <div className="tool-content">
          <UploadZone
            onFileSelect={handleFileSelect}
            multiple={true}
          />

          {files.length > 0 && (
            <div className="files-list">
              <h3>Selected Files ({files.length})</h3>
              <div className="file-items">
                {files.map((file, index) => (
                  <div key={index} className="file-item">
                    <span className="file-name">{file.name}</span>
                    <button
                      className="remove-btn"
                      onClick={() => removeFile(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className="file-order-info">
                <p>Files will be merged in the order shown above. Drag to reorder.</p>
              </div>
            </div>
          )}

          <ProcessingStatus
            status={status}
            progress={progress}
            message={message}
          />

          {files.length >= 2 && status !== 'processing' && (
            <button className="btn btn-primary" onClick={mergePDFs}>
              Merge PDFs
            </button>
          )}

          {files.length > 0 && (
            <button
              className="btn btn-secondary"
              onClick={() => setFiles([])}
            >
              Clear All
            </button>
          )}
        </div>

        <div className="tool-features">
          <h2>Why Use Our PDF Merge Tool?</h2>
          <ul>
            <li>✓ Merge unlimited PDF files</li>
            <li>✓ No file size limit</li>
            <li>✓ Preserve original quality</li>
            <li>✓ Fast and secure processing</li>
            <li>✓ No watermarks added</li>
            <li>✓ Works on all devices</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Merge
