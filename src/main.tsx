/**
 * @file src/main.tsx
 * @description React application entry point.
 *
 * Mounts the React app into #root (defined in index.html).
 * Wraps with HelmetProvider for react-helmet-async SEO management.
 * Imports the master CSS token file — must be first import.
 *
 * NOTE: StrictMode is enabled (double-renders in dev to catch side-effects).
 *       Remove <StrictMode> only if you encounter issues with third-party libs.
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'

// Master design token file — must load before any component styles
import './styles/tokens.css'

const rootEl = document.getElementById('root')

if (!rootEl) {
  throw new Error('Root element #root not found')
}

if (import.meta.env.DEV) {
  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

  const renderBootError = (title: string, detail: string) => {
    rootEl.innerHTML = `
      <div style="padding:24px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;background:#111;color:#f8f8f2;min-height:100vh;line-height:1.5;">
        <h1 style="font-size:16px;margin:0 0 12px;">App failed to start (${escapeHtml(title)})</h1>
        <pre style="white-space:pre-wrap;word-break:break-word;margin:0;">${escapeHtml(detail)}</pre>
      </div>
    `
  }

  window.addEventListener('error', (event) => {
    const detail = event.error?.stack ?? event.message ?? 'Unknown runtime error'
    renderBootError('runtime error', detail)
  })

  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason
    const detail = reason instanceof Error
      ? `${reason.message}\n\n${reason.stack ?? ''}`
      : String(reason)
    renderBootError('unhandled rejection', detail)
  })
}

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    {/*
      HelmetProvider is required by react-helmet-async.
      All <Seo> components use this context to manage <head> tags.
    */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
)
