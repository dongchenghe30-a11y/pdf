import React from 'react'

const ProcessingStatus = ({ status, progress = 0, message }) => {
  if (status === 'idle') return null

  return (
    <div className="processing-status">
      <div className="status-content">
        {status === 'processing' && (
          <>
            <div className="spinner"></div>
            <p>Processing... {progress}%</p>
          </>
        )}
        {status === 'success' && (
          <div className="success-message">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>{message || 'Processing complete!'}</p>
          </div>
        )}
        {status === 'error' && (
          <div className="error-message">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p>{message || 'An error occurred. Please try again.'}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProcessingStatus
