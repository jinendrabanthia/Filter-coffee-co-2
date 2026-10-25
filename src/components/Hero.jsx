import { useRef, useState, useEffect } from 'react';

/**
 * Hero Component — Video background with instant poster pre-render and fast-start streaming.
 * Uses optimized MP4 (faststart) & WebM with 0-delay WebP poster fallback.
 */
export default function Hero() {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMuteButton, setShowMuteButton] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.volume = 1.0;

    // Check if video is already ready (e.g. from cache or fast load)
    if (video.readyState >= 2) {
      setVideoLoaded(true);
    }

    const handleReady = () => {
      setVideoLoaded(true);
      setVideoError(false);
    };

    const handleError = (e) => {
      console.warn('Hero background video playback note:', e);
      setVideoError(true);
    };

    const handleEnded = () => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    };

    video.addEventListener('loadeddata', handleReady);
    video.addEventListener('canplay', handleReady);
    video.addEventListener('playing', handleReady);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    // Keep video playing on tab re-focus
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && video.paused) {
        video.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Auto-play muted video with low-latency promise
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setVideoLoaded(true);
          setTimeout(() => setShowMuteButton(true), 800);
        })
        .catch(() => {
          // Autoplay prevented by browser policy; stays ready on poster
          setIsPlaying(false);
        });
    }

    return () => {
      video.removeEventListener('loadeddata', handleReady);
      video.removeEventListener('canplay', handleReady);
      video.removeEventListener('playing', handleReady);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (video) {
      const newMuted = !isMuted;
      video.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-[100px] pb-12 overflow-hidden bg-black"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Full landscape background video with instant poster image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none" aria-hidden="true">
        {/* Instant high-res poster displayed at 0ms delay */}
        <img
          src="/videos/homepage/hero-poster.webp"
          alt=""
          loading="eager"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 pointer-events-none ${
            videoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />

        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/videos/homepage/hero-poster.webp"
          className={`w-full h-full object-cover pointer-events-none transition-opacity duration-700 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoadedData={() => setVideoLoaded(true)}
          onCanPlay={() => setVideoLoaded(true)}
          onPlaying={() => {
            setVideoLoaded(true);
            setIsPlaying(true);
          }}
          onEnded={() => {
            const video = videoRef.current;
            if (video) {
              video.currentTime = 0;
              video.play().catch(() => {});
            }
          }}
          onError={() => setVideoError(true)}
        >
          <source src="/videos/homepage/bg-video-optimized.mp4" type="video/mp4" />
          <source src="/videos/homepage/bg-video-optimized.webm" type="video/webm" />
          <source src="/videos/homepage/bg%20video%20homepage.mp4" type="video/mp4" />
        </video>
      </div>



      {/* Mute/Unmute Button - Bottom Right */}
      {showMuteButton && (
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          aria-pressed={!isMuted}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/70 hover:bg-black/90 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black"
          style={{
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          }}
        >
          {!isMuted ? (
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.142 16.142a9 9 0 01-12.728 0M5 5a9 9 0 0112.728 0m0 0l-2.829 2.829M18.536 13.464a5 5 0 010 7.072m0 0l-2.829 2.829M13.765 8.235a1 1 0 011.414 1.414l-2.829 2.829M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" />
            </svg>
          )}
          {/* Tooltip */}
          <span className="absolute bottom-full right-0 mb-2 px-2 py-1 text-xs font-medium text-white bg-black/80 backdrop-blur-md rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {isMuted ? 'Unmute' : 'Mute'}
          </span>
        </button>
      )}
    </section>
  );
}
