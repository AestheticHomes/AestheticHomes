'use client'

interface YouTubeEmbedProps {
  videoId: string
  title?: string
}

export default function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  return (
    <div className="yt-embed-wrapper">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`}
        title={title || 'Aesthetic Homes — Interior Design Chennai'}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 0,
          borderRadius: '8px',
        }}
      />
      <style>{`
        .yt-embed-wrapper {
          position: relative;
          width: 100%;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          border-radius: 8px;
          background: #111;
        }
      `}</style>
    </div>
  )
}
