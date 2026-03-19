'use client'

import { useEffect } from 'react'

type InstagramWindow = Window & {
  instgrm?: {
    Embeds?: {
      process: () => void
    }
  }
}

interface InstagramEmbedProps {
  postUrl: string
  caption?: string
}

export default function InstagramEmbed({ postUrl, caption }: InstagramEmbedProps) {
  useEffect(() => {
    const instagramWindow = window as InstagramWindow

    if (instagramWindow.instgrm?.Embeds?.process) {
      instagramWindow.instgrm.Embeds.process()
      return
    }

    const existingScript = document.querySelector<HTMLScriptElement>('script[src="https://www.instagram.com/embed.js"]')

    if (existingScript) {
      existingScript.addEventListener('load', () => {
        instagramWindow.instgrm?.Embeds?.process()
      }, { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true
    script.defer = true
    script.onload = () => {
      instagramWindow.instgrm?.Embeds?.process()
    }
    document.body.appendChild(script)
  }, [postUrl])

  return (
    <div className="ig-embed-wrapper">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned=""
        data-instgrm-permalink={`${postUrl}?utm_source=ig_embed`}
        data-instgrm-version="14"
        style={{
          margin: '0 auto',
          maxWidth: '400px',
          width: '100%',
          border: 0,
          borderRadius: '8px',
        }}
      >
        <div style={{ padding: '16px' }}>
          <p style={{ fontSize: '14px', color: '#666' }}>
            {caption || 'Loading...'}
          </p>
        </div>
      </blockquote>
      <style>{`
        .ig-embed-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;
        }
        .ig-embed-wrapper iframe {
          border-radius: 8px !important;
          max-width: 100%;
        }
      `}</style>
    </div>
  )
}
