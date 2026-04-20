"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@vercel/analytics";

type Props = {
  src: string;
  poster?: string;
};

function isEmbedUrl(src: string) {
  return /embed\.aspx|sharepoint\.com|stream\.microsoft|youtube\.com\/embed|player\.vimeo/i.test(
    src,
  );
}

export default function VideoPlayer({ src, poster }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const milestonesReached = useRef<Set<number>>(new Set());
  const hasStarted = useRef(false);
  const embed = isEmbedUrl(src);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (embed) {
      track("video_embed_view", { src });
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const attemptPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          // Autoplay blocked; user will tap play.
        });
      }
    };

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener("loadeddata", attemptPlay, { once: true });
    }

    const onPlay = () => {
      setIsPlaying(true);
      if (!hasStarted.current) {
        hasStarted.current = true;
        track("video_start", { src });
      }
      track("video_play", {
        at_seconds: Math.round(video.currentTime),
      });
    };

    const onPause = () => {
      setIsPlaying(false);
      if (video.ended) return;
      track("video_pause", {
        at_seconds: Math.round(video.currentTime),
        percent: video.duration
          ? Math.round((video.currentTime / video.duration) * 100)
          : 0,
      });
    };

    const onEnded = () => {
      setIsPlaying(false);
      track("video_complete", {
        duration_seconds: Math.round(video.duration || 0),
      });
    };

    const onTimeUpdate = () => {
      if (!video.duration) return;
      const pct = (video.currentTime / video.duration) * 100;
      for (const milestone of [25, 50, 75] as const) {
        if (pct >= milestone && !milestonesReached.current.has(milestone)) {
          milestonesReached.current.add(milestone);
          track(`video_progress_${milestone}`, {
            at_seconds: Math.round(video.currentTime),
          });
        }
      }
    };

    const onVolumeChange = () => {
      setIsMuted(video.muted);
      if (!video.muted && hasStarted.current) {
        track("video_unmute", {
          at_seconds: Math.round(video.currentTime),
        });
      }
    };

    const onError = () => {
      track("video_error", {
        code: video.error?.code ?? null,
        message: video.error?.message ?? null,
      });
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("volumechange", onVolumeChange);
    video.addEventListener("error", onError);

    return () => {
      video.removeEventListener("loadeddata", attemptPlay);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("volumechange", onVolumeChange);
      video.removeEventListener("error", onError);
    };
  }, [src, embed]);

  const handleUnmute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    if (video.volume === 0) video.volume = 1;
    if (video.paused) {
      const p = video.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => undefined);
      }
    }
    setIsMuted(false);
  };

  if (embed) {
    return (
      <iframe
        ref={iframeRef}
        className="absolute inset-0 h-full w-full border-0"
        src={src}
        title="Mensaje en video de Law Offices of Manuel Solis"
        allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    );
  }

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster || undefined}
        controls
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-label="Mensaje en video de Law Offices of Manuel Solis"
      >
        Tu navegador no puede reproducir el video.
      </video>

      {isMuted && isPlaying ? (
        <button
          type="button"
          onClick={handleUnmute}
          className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center gap-3 bg-black/25 text-white transition-opacity hover:bg-black/35"
          aria-label="Activar sonido del video"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/70 bg-black/40 backdrop-blur-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-7 w-7"
              aria-hidden
            >
              <path
                d="M4 9v6h4l5 4V5L8 9H4z"
                fill="currentColor"
              />
              <path
                d="M16 8l5 8M21 8l-5 8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.32em]">
            Toca para activar sonido
          </span>
        </button>
      ) : null}
    </>
  );
}
