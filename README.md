# EasyQR

A fast, private QR code generator that turns links into customizable QR codes
directly in the browser. No account, upload, or backend service is required.

## Live Demo

[Open EasyQR on Vercel](https://easyqr-eight.vercel.app/)

## Features

- Generates QR codes instantly as you type
- Automatically adds `https://` when a protocol is missing
- Custom foreground and background colors
- Adjustable output size from 200px to 800px
- High error-correction level for reliable scanning
- PNG and SVG downloads
- Copy QR codes to the clipboard as PNG images
- Fully client-side generation for privacy
- Responsive interface for desktop and mobile

## Tech Stack

- React
- Vite
- `qrcode`
- Lucide React
- Vanilla CSS

## Run Locally

### Prerequisites

- Node.js 18 or later
- npm

Clone the repository and install its dependencies:

```bash
git clone https://github.com/krishxwebdev/easyqr.git
cd easyqr
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

On Windows, you can alternatively run `start-easyqr.bat` after installing the
dependencies. Do not open `index.html` directly; the application must be served
by Vite.

## Available Commands

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run preview  # Preview the production build
```

## Project Structure

```text
easyqr/
├── src/
│   ├── main.jsx       # QR generation logic and interface
│   └── styles.css     # Application styles
├── index.html
├── package.json
├── vite.config.js
└── start-easyqr.bat
```

## Privacy

QR codes are generated locally in the browser. The links entered into EasyQR
are not sent to an application server.

## Deployment

The application is deployed as a static Vite site on Vercel. Use `npm run
build` as the build command and `dist` as the output directory.

## Author

[krishxwebdev](https://github.com/krishxwebdev)
