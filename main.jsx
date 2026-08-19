import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import QRCode from 'qrcode';
import { Check, Copy, Download, Link2, Palette, QrCode, ShieldCheck, Sparkles } from 'lucide-react';
import './styles.css';

const SAMPLE_URL = 'https://easyqr.app/hello';

function normalizeUrl(value) {
  const trimmed = value.trim();
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function App() {
  const [url, setUrl] = useState(SAMPLE_URL);
  const [size, setSize] = useState(320);
  const [dark, setDark] = useState('#14231d');
  const [light, setLight] = useState('#ffffff');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const canvasRef = useRef(null);
  const cleanUrl = normalizeUrl(url);

  useEffect(() => {
    if (!cleanUrl || !canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, cleanUrl, {
      width: size,
      margin: 2,
      errorCorrectionLevel: 'H',
      color: { dark, light },
    }).then(() => setError('')).catch(() => setError('That link is too long to turn into a QR code.'));
  }, [cleanUrl, size, dark, light]);

  const downloadPng = () => {
    if (!cleanUrl || !canvasRef.current) return;
    const anchor = document.createElement('a');
    anchor.download = 'easyqr-code.png';
    anchor.href = canvasRef.current.toDataURL('image/png');
    anchor.click();
  };

  const downloadSvg = async () => {
    if (!cleanUrl) return;
    const svg = await QRCode.toString(cleanUrl, {
      type: 'svg', margin: 2, errorCorrectionLevel: 'H', color: { dark, light },
    });
    const anchor = document.createElement('a');
    anchor.download = 'easyqr-code.svg';
    anchor.href = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    anchor.click();
    URL.revokeObjectURL(anchor.href);
  };

  const copyImage = async () => {
    if (!canvasRef.current || !navigator.clipboard?.write) return;
    canvasRef.current.toBlob(async (blob) => {
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <main>
      <header className="nav wrap">
        <a className="brand" href="#top" aria-label="EasyQR home">
          <span className="logo"><QrCode size={22} strokeWidth={2.5} /></span>
          EasyQR
        </a>
        <span className="nav-note"><ShieldCheck size={16} /> Private by design</span>
      </header>

      <section className="hero wrap" id="top">
        <div className="eyebrow"><Sparkles size={15} /> Free. Fast. No sign-up.</div>
        <h1>Links, made <span>scannable.</span></h1>
        <p className="subtitle">Paste any link. Get a crisp, ready-to-share QR code in a second.</p>

        <div className="workspace">
          <section className="controls">
            <div>
              <label htmlFor="url">Your link</label>
              <div className="input-wrap">
                <Link2 size={20} />
                <input id="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Paste a link here…" autoFocus />
                {url && <button className="clear" onClick={() => setUrl('')} aria-label="Clear link">×</button>}
              </div>
              <p className="hint">We’ll add https:// automatically if needed.</p>
            </div>

            <div className="divider" />

            <div className="custom-title"><Palette size={18} /> Customize</div>
            <div className="color-grid">
              <label className="color-field">QR color
                <span><input type="color" value={dark} onChange={(e) => setDark(e.target.value)} /><code>{dark.toUpperCase()}</code></span>
              </label>
              <label className="color-field">Background
                <span><input type="color" value={light} onChange={(e) => setLight(e.target.value)} /><code>{light.toUpperCase()}</code></span>
              </label>
            </div>
            <label className="size-field">Image size <strong>{size}px</strong>
              <input type="range" min="200" max="800" step="20" value={size} onChange={(e) => setSize(Number(e.target.value))} />
              <span className="range-labels"><small>200px</small><small>800px</small></span>
            </label>
          </section>

          <section className="preview" aria-live="polite">
            <div className="preview-top"><span>Preview</span><i><span /> Ready to scan</i></div>
            <div className="qr-stage">
              {cleanUrl ? <canvas ref={canvasRef} /> : <div className="empty"><QrCode size={54} /><p>Your QR code will appear here</p></div>}
            </div>
            {error && <p className="error">{error}</p>}
            <div className="actions">
              <button className="primary" onClick={downloadPng} disabled={!cleanUrl}><Download size={18} /> Download PNG</button>
              <button className="secondary" onClick={downloadSvg} disabled={!cleanUrl}>SVG</button>
              <button className="icon-button" onClick={copyImage} disabled={!cleanUrl} title="Copy image" aria-label="Copy QR code image">
                {copied ? <Check size={19} /> : <Copy size={19} />}
              </button>
            </div>
            <p className="local-note"><ShieldCheck size={14} /> Generated locally in your browser</p>
          </section>
        </div>
      </section>

      <section className="benefits wrap">
        <article><span>01</span><h2>Instant</h2><p>Your QR updates as you type. No waiting around.</p></article>
        <article><span>02</span><h2>Private</h2><p>Your links never leave your browser or touch a server.</p></article>
        <article><span>03</span><h2>High quality</h2><p>Download sharp PNG or scalable SVG files.</p></article>
      </section>

      <footer className="wrap"><span>EasyQR</span><p>Make the internet easier to share.</p><small>© 2026 EasyQR</small></footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
