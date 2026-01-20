import React, { useState } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'
import UploadZone from '../components/UploadZone'
import ProcessingStatus from '../components/ProcessingStatus'

const Edit = () => {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle')
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState('')
  const [editType, setEditType] = useState('rotate')
  const [rotation, setRotation] = useState(90)
  const [textToAdd, setTextToAdd] = useState('')
  const [watermarkText, setWatermarkText] = useState('')
  const [pagesToDelete, setPagesToDelete] = useState('')

  const handleFileSelect = (selectedFile) => {
    setFile(selectedFile)
    setStatus('idle')
    setMessage('')
  }

  const editPDF = async () => {
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
      const pages = pdfDoc.getPages()

      if (editType === 'rotate') {
        pages.forEach(page => {
          const currentRotation = page.getRotation().angle
          page.setRotation(currentRotation + rotation)
        })
        setProgress(100)
      } else if (editType === 'delete') {
        if (!pagesToDelete) {
          setStatus('error')
          setMessage('Please enter page numbers to delete')
          return
        }
        
        const pagesArray = parsePageNumbers(pagesToDelete, pages.length)
        await pdfDoc.deletePage(pagesArray[pagesArray.length - 1])
        for (let i = pagesArray.length - 2; i >= 0; i--) {
          await pdfDoc.deletePage(pagesArray[i])
        }
        setProgress(100)
      } else if (editType === 'text') {
        if (!textToAdd) {
          setStatus('error')
          setMessage('Please enter text to add')
          return
        }

        const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
        const fontSize = 24

        pages.forEach((page, index) => {
          const { width, height } = page.getSize()
          page.drawText(textToAdd, {
            x: 50,
            y: height - 50,
            size: fontSize,
            font: font,
            color: rgb(0, 0, 0),
          })
        })
        setProgress(100)
      } else if (editType === 'watermark') {
        if (!watermarkText) {
          setStatus('error')
          setMessage('Please enter watermark text')
          return
        }

        const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
        const fontSize = 48

        pages.forEach((page) => {
          const { width, height } = page.getSize()
          page.drawText(watermarkText, {
            x: width / 2 - (watermarkText.length * fontSize) / 4,
            y: height / 2,
            size: fontSize,
            font: font,
            color: rgb(0.95, 0.95, 0.95),
            opacity: 0.3,
            rotate: { type: 'degrees', angle: 45 }
          })
        })
        setProgress(100)
      }

      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const fileName = file.name.replace('.pdf', '-edited.pdf')
      saveAs(blob, fileName)

      setStatus('success')
      setMessage('PDF edited successfully!')
    } catch (error) {
      setStatus('error')
      setMessage('Error editing PDF. Please try again.')
      console.error(error)
    }
  }

  const parsePageNumbers = (input, totalPages) => {
    const pages = new Set()
    const parts = input.split(',')

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
          <h1>Edit PDF Files</h1>
          <p>Rotate pages, delete pages, add text, or add watermarks to your PDF documents. Simple and intuitive editing tools.</p>
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
            <div className="edit-options">
              <h3>Edit Options</h3>
              
              <div className="form-group">
                <label>Edit Type</label>
                <select
                  value={editType}
                  onChange={(e) => setEditType(e.target.value)}
                >
                  <option value="rotate">Rotate Pages</option>
                  <option value="delete">Delete Pages</option>
                  <option value="text">Add Text</option>
                  <option value="watermark">Add Watermark</option>
                </select>
              </div>

              {editType === 'rotate' && (
                <div className="form-group">
                  <label>Rotation Angle</label>
                  <div className="rotation-buttons">
                    <button
                      className={`rotation-btn ${rotation === 90 ? 'active' : ''}`}
                      onClick={() => setRotation(90)}
                    >
                      90° Right
                    </button>
                    <button
                      className={`rotation-btn ${rotation === 180 ? 'active' : ''}`}
                      onClick={() => setRotation(180)}
                    >
                      180°
                    </button>
                    <button
                      className={`rotation-btn ${rotation === 270 ? 'active' : ''}`}
                      onClick={() => setRotation(270)}
                    >
                      90° Left
                    </button>
                  </div>
                </div>
              )}

              {editType === 'delete' && (
                <div className="form-group">
                  <label>Pages to Delete (e.g., 1, 3-5)</label>
                  <input
                    type="text"
                    value={pagesToDelete}
                    onChange={(e) => setPagesToDelete(e.target.value)}
                    placeholder="Enter page numbers to delete"
                  />
                  <p className="help-text">Enter pages separated by commas or ranges (e.g., 1, 3-5)</p>
                </div>
              )}

              {editType === 'text' && (
                <div className="form-group">
                  <label>Text to Add</label>
                  <input
                    type="text"
                    value={textToAdd}
                    onChange={(e) => setTextToAdd(e.target.value)}
                    placeholder="Enter text to add to each page"
                  />
                  <p className="help-text">Text will be added to the top-left corner of each page</p>
                </div>
              )}

              {editType === 'watermark' && (
                <div className="form-group">
                  <label>Watermark Text</label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="Enter watermark text"
                  />
                  <p className="help-text">Watermark will be added diagonally across each page</p>
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
            <button className="btn btn-primary" onClick={editPDF}>
              Edit PDF
            </button>
          )}

          {file && (
            <button
              className="btn btn-secondary"
              onClick={() => {
                setFile(null)
                setStatus('idle')
                setMessage('')
                setTextToAdd('')
                setWatermarkText('')
                setPagesToDelete('')
              }}
            >
              Clear
            </button>
          )}
        </div>

        <div className="tool-features">
          <h2>Why Use Our PDF Edit Tool?</h2>
          <ul>
            <li>✓ Rotate pages easily</li>
            <li>✓ Delete unwanted pages</li>
            <li>✓ Add custom text</li>
            <li>✓ Apply watermarks</li>
            <li>✓ Fast and secure processing</li>
            <li>✓ No watermarks added</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Edit
