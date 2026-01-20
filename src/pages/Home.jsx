import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  const tools = [
    {
      id: 'merge',
      title: 'Merge PDF',
      description: 'Combine multiple PDF files into one document',
      icon: 'M12 4V20M4 12H20',
      link: '/merge',
      color: '#667eea'
    },
    {
      id: 'split',
      title: 'Split PDF',
      description: 'Extract pages from your PDF file',
      icon: 'M4 12L12 4M12 4L20 12M12 4V20',
      link: '/split',
      color: '#f56565'
    },
    {
      id: 'compress',
      title: 'Compress PDF',
      description: 'Reduce PDF file size without losing quality',
      icon: 'M4 12V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V12',
      link: '/compress',
      color: '#48bb78'
    },
    {
      id: 'convert',
      title: 'Convert PDF',
      description: 'Convert PDF to Word, Excel, PowerPoint, or images',
      icon: 'M4 16L8 12M4 16L8 20M4 16H20M20 8L16 12M20 8L16 4M20 8H4',
      link: '/convert',
      color: '#ed8936'
    },
    {
      id: 'edit',
      title: 'Edit PDF',
      description: 'Rotate, delete pages, add watermarks and text',
      icon: 'M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H16C16.5304 20 17.0391 19.7893 17.4142 19.4142C17.7893 19.0391 18 18.5304 18 18V11',
      link: '/edit',
      color: '#9f7aea'
    },
    {
      id: 'security',
      title: 'Security',
      description: 'Protect PDF with password or unlock PDF',
      icon: 'M12 15V17M12 9V11M12 5V7M12 13V15M12 5V7',
      link: '/security',
      color: '#4299e1'
    }
  ]

  const features = [
    {
      title: '100% Free',
      description: 'All tools are completely free to use with no hidden charges'
    },
    {
      title: 'No Watermarks',
      description: 'Process your PDFs without adding any watermarks'
    },
    {
      title: 'No Registration',
      description: 'Start using our tools immediately without signing up'
    },
    {
      title: 'Fast Processing',
      description: 'Quickly process your files with our optimized algorithms'
    },
    {
      title: 'Secure & Private',
      description: 'Your files are processed locally and automatically deleted'
    },
    {
      title: 'Works Everywhere',
      description: 'Access our tools from any device with a web browser'
    }
  ]

  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Free Online PDF Tools
          </h1>
          <p className="hero-subtitle">
            Merge, Compress, Convert PDF to Word, Edit PDF No Watermark
          </p>
          <p className="hero-description">
            All-in-one PDF processing solution. Fast, free, and secure.
          </p>
        </div>
      </section>

      <section className="tools-section">
        <div className="container">
          <h2 className="section-title">PDF Tools</h2>
          <div className="tools-grid">
            {tools.map(tool => (
              <Link key={tool.id} to={tool.link} className="tool-card">
                <div className="tool-icon" style={{ color: tool.color }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d={tool.icon} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to Process Your PDFs?</h2>
            <p>Choose a tool above to get started. It's free and takes just a few seconds.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
