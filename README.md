# Free Online PDF Tools - Merge, Compress, Convert PDF to Word, Edit PDF No Watermark

A comprehensive suite of free, online PDF processing tools built with React. No registration required, no watermarks, and all processing happens in the browser for maximum privacy.

## Features

### 1. PDF Merge
- Combine multiple PDF files into a single document
- Perfect for merging reports, contracts, or multi-page documents
- Maintains original quality

### 2. PDF Split
- Extract specific pages or page ranges
- Split all pages into separate files
- Extract first or last page

### 3. PDF Compress
- Reduce PDF file size without losing quality
- Multiple compression levels (Low, Medium, High)
- Ideal for email attachments and web uploads

### 4. PDF Convert
- Convert PDF to Word (DOCX)
- Convert PDF to Excel (XLSX)
- Convert PDF to PowerPoint (PPTX)
- Convert PDF to Images (JPG/PNG)

### 5. PDF Edit
- Rotate pages (90°, 180°, 270°)
- Delete specific pages
- Add text to pages
- Add watermarks

### 6. PDF Security
- Protect PDF with password
- Unlock password-protected PDFs
- Set custom permissions

## Why Choose Us?

- **100% Free** - No hidden charges or premium features
- **No Watermarks** - Processed files remain clean
- **No Registration** - Start using immediately
- **Fast Processing** - Optimized for speed
- **Secure & Private** - Files processed locally
- **Responsive Design** - Works on all devices

## Tech Stack

- **Frontend**: React 18
- **Routing**: React Router (Pager implementation)
- **PDF Processing**: PDF-lib
- **File Download**: File-saver
- **Build Tool**: Vite
- **Deployment**: Cloudflare Pages (CDN)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pdf-tools
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Deployment

### Cloudflare Pages Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy to Cloudflare Pages:
```bash
npx wrangler pages deploy dist
```

3. Or connect your GitHub repository to Cloudflare Pages for automatic deployments

### Configuration Files

- `cloudflare/_headers` - Security headers and caching policies
- `cloudflare/_redirects` - SPA routing configuration
- `cloudflare/wrangler.toml` - Cloudflare Workers configuration

## Project Structure

```
pdf-tools/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── UploadZone.jsx
│   │   └── ProcessingStatus.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Merge.jsx
│   │   ├── Split.jsx
│   │   ├── Compress.jsx
│   │   ├── Convert.jsx
│   │   ├── Edit.jsx
│   │   └── Security.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
├── cloudflare/
│   ├── _headers
│   ├── _redirects
│   └── wrangler.toml
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Privacy & Security

- All PDF processing happens locally in the browser
- Files are never uploaded to external servers
- No personal data is collected
- No tracking cookies or analytics

## Performance Optimization

- Cloudflare CDN for fast global delivery
- Optimized asset caching headers
- Lazy loading for better initial load time
- Minimal bundle size with code splitting

## License

MIT License - Feel free to use and modify for your needs.

## Support

For issues or feature requests, please open an issue on GitHub.

## Roadmap

- [ ] OCR support for scanned PDFs
- [ ] More image format conversions
- [ ] Batch processing optimization
- [ ] Advanced PDF compression algorithms
- [ ] PDF metadata editor
- [ ] Digital signature support
