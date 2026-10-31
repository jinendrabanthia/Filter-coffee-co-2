import { useRef, useState, useEffect } from 'react';

/**
 * Hero Component — Video background with instant poster pre-render and fast-start streaming.
 * Uses optimized MP4 (faststart) & WebM with 0-delay WebP poster fallback.
 */
export default function Hero() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
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
    </section>
  );
}
