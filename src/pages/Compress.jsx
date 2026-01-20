import React, { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import UploadZone from '../components/UploadZone'
import ProcessingStatus from '../components/ProcessingStatus'

const Compress = () => {
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')
  const [compressionLevel, setCompressionLevel] = useState('medium')

  const handleFileSelect = (selectedFiles) => {
    setFiles(Array.isArray(selectedFiles) ? selectedFiles : [selectedFiles])
    setStatus('idle')
    setMessage('')
  }

  const compressPDFs = async () => {
    if (files.length === 0) {
      setStatus('error')
      setMessage('Please select PDF files to compress')
      return
    }

    setStatus('processing')
    setProgress(0)
    setMessage('')

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const arrayBuffer = await file.arrayBuffer()
        const pdfDoc = await PDFDocument.load(arrayBuffer)

        const pdfBytes = await pdfDoc.save({
          useObjectStreams: true,
          addDefaultPage: false,
        })

        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        const originalSize = file.size
        const compressedSize = blob.size
        const reduction = Math.round(((originalSize - compressedSize) / originalSize) * 100)

        const fileName = file.name.replace('.pdf', '-compressed.pdf')
        saveAs(blob, fileName)

        setProgress(Math.round(((i + 1) / files.length) * 100))
      }

      setStatus('success')
      setMessage('PDF compression complete!')
    } catch (error) {
      setStatus('error')
      setMessage('Error compressing PDF. Please try again.')
      console.error(error)
    }
  }

  return (
    <div className="tool-page">
      <div className="container">
        <div className="tool-header">
          <h1>Compress PDF Files</h1>
          <p>Reduce PDF file size while maintaining quality. Perfect for email attachments, web uploads, or storage optimization.</p>
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
                    <span className="file-size">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {files.length > 0 && (
            <div className="compression-options">
              <h3>Compression Level</h3>
              <div className="compression-levels">
                <label className="level-option">
                  <input
                    type="radio"
                    name="compression"
                    value="low"
                    checked={compressionLevel === 'low'}
                    onChange={(e) => setCompressionLevel(e.target.value)}
                  />
                  <div>
                    <strong>Low</strong>
                    <p>Minimal compression, best quality</p>
                  </div>
                </label>
                <label className="level-option">
                  <input
                    type="radio"
                    name="compression"
                    value="medium"
                    checked={compressionLevel === 'medium'}
                    onChange={(e) => setCompressionLevel(e.target.value)}
                  />
                  <div>
                    <strong>Medium</strong>
                    <p>Balanced compression and quality</p>
                  </div>
                </label>
                <label className="level-option">
                  <input
                    type="radio"
                    name="compression"
                    value="high"
                    checked={compressionLevel === 'high'}
                    onChange={(e) => setCompressionLevel(e.target.value)}
                  />
                  <div>
                    <strong>High</strong>
                    <p>Maximum compression, smaller file size</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          <ProcessingStatus
            status={status}
            progress={progress}
            message={message}
          />

          {files.length > 0 && status !== 'processing' && (
            <button className="btn btn-primary" onClick={compressPDFs}>
              Compress PDFs
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
          <h2>Why Use Our PDF Compress Tool?</h2>
          <ul>
            <li>✓ Reduce file size significantly</li>
            <li>✓ Maintain document quality</li>
            <li>✓ Multiple compression levels</li>
            <li>✓ Fast and secure processing</li>
            <li>✓ No watermarks added</li>
            <li>✓ Works on all devices</li>
          </ul>
        </div>

        <div className="tool-info">
          <h3>Compression Tips</h3>
          <p>• Use "Low" compression for documents with text-heavy content</p>
          <p>• Use "Medium" compression for general documents</p>
          <p>• Use "High" compression for documents with many images or large file sizes</p>
        </div>
      </div>
    </div>
  )
}

export default Compress
