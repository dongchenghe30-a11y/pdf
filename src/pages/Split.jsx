import React, { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import UploadZone from '../components/UploadZone'
import ProcessingStatus from '../components/ProcessingStatus'

const Split = () => {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')
  const [splitType, setSplitType] = useState('range')
  const [pageRange, setPageRange] = useState('')
  const [extractType, setExtractType] = useState('all')

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile)
    setStatus('idle')
    setMessage('')
  }

  const splitPDF = async () => {
    if (!file) {
      setStatus('error')
      setMessage('Please select a PDF file')
      return
    }

    setStatus('processing')
    setProgress(0)
    setMessage('')

    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const totalPages = pdfDoc.getPageCount()

      if (splitType === 'range' && extractType === 'range') {
        if (!pageRange) {
          setStatus('error')
          setMessage('Please enter a page range')
          return
        }

        const pages = parsePageRange(pageRange, totalPages)
        const newPdf = await PDFDocument.create()
        const copiedPages = await newPdf.copyPages(pdfDoc, pages)
        copiedPages.forEach(page => newPdf.addPage(page))
        const pdfBytes = await newPdf.save()
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        saveAs(blob, 'split-pages.pdf')
      } else if (extractType === 'all') {
        for (let i = 0; i < totalPages; i++) {
          const newPdf = await PDFDocument.create()
          const [page] = await newPdf.copyPages(pdfDoc, [i])
          newPdf.addPage(page)
          const pdfBytes = await newPdf.save()
          const blob = new Blob([pdfBytes], { type: 'application/pdf' })
          saveAs(blob, `page-${i + 1}.pdf`)
          setProgress(Math.round(((i + 1) / totalPages) * 100))
        }
      } else if (extractType === 'first') {
        const newPdf = await PDFDocument.create()
        const [page] = await newPdf.copyPages(pdfDoc, [0])
        newPdf.addPage(page)
        const pdfBytes = await newPdf.save()
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        saveAs(blob, 'first-page.pdf')
      } else if (extractType === 'last') {
        const newPdf = await PDFDocument.create()
        const [page] = await newPdf.copyPages(pdfDoc, [totalPages - 1])
        newPdf.addPage(page)
        const pdfBytes = await newPdf.save()
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        saveAs(blob, 'last-page.pdf')
      }

      setStatus('success')
      setMessage('PDF split successfully!')
    } catch (error) {
      setStatus('error')
      setMessage('Error splitting PDF. Please check your page range.')
      console.error(error)
    }
  }

  const parsePageRange = (range, totalPages) => {
    const pages = new Set()
    const parts = range.split(',')

    for (const part of parts) {
      const trimmed = part.trim()
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(n => parseInt(n.trim()))
        for (let i = start; i <= end; i++) {
          if (i >= 1 && i <= totalPages) {
            pages.add(i - 1)
          }
        }
      } else {
        const pageNum = parseInt(trimmed)
        if (pageNum >= 1 && pageNum <= totalPages) {
          pages.add(pageNum - 1)
        }
      }
    }

    return Array.from(pages).sort((a, b) => a - b)
  }

  return (
    <div className="tool-page">
      <div className="container">
        <div className="tool-header">
          <h1>Split PDF Files</h1>
          <p>Extract pages from your PDF file by range or extract specific pages. Useful for separating contracts, reports, or any multi-page documents.</p>
        </div>

        <div className="tool-content">
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
            <div className="split-options">
              <h3>Split Options</h3>
              
              <div className="form-group">
                <label>Extract Type</label>
                <select
                  value={extractType}
                  onChange={(e) => setExtractType(e.target.value)}
                >
                  <option value="all">All Pages as Separate Files</option>
                  <option value="range">Specific Page Range</option>
                  <option value="first">First Page Only</option>
                  <option value="last">Last Page Only</option>
                </select>
              </div>

              {extractType === 'range' && (
                <div className="form-group">
                  <label>Page Range (e.g., 1-3, 5, 7-9)</label>
                  <input
                    type="text"
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    placeholder="Enter page range"
                  />
                  <p className="help-text">Enter pages separated by commas or ranges (e.g., 1-3, 5, 7-9)</p>
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
            <button className="btn btn-primary" onClick={splitPDF}>
              Split PDF
            </button>
          )}

          {file && (
            <button
              className="btn btn-secondary"
              onClick={() => {
                setFile(null)
                setStatus('idle')
                setMessage('')
                setPageRange('')
              }}
            >
              Clear
            </button>
          )}
        </div>

        <div className="tool-features">
          <h2>Why Use Our PDF Split Tool?</h2>
          <ul>
            <li>✓ Extract single or multiple pages</li>
            <li>✓ Split by custom page ranges</li>
            <li>✓ Extract all pages at once</li>
            <li>✓ Fast and secure processing</li>
            <li>✓ No watermarks added</li>
            <li>✓ Works on all devices</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Split
