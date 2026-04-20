"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (embed) {
      track("video_embed_view", { src });
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => {
      if (!hasStarted.current) {
        hasStarted.current = true;
        track("video_start", { src });
      }
      track("video_play", {
        at_seconds: Math.round(video.currentTime),
      });
    };

    const onPause = () => {
      if (video.ended) return;
      track("video_pause", {
        at_seconds: Math.round(video.currentTime),
        percent: video.duration
          ? Math.round((video.currentTime / video.duration) * 100)
          : 0,
      });
    };

    const onEnded = () => {
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
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("volumechange", onVolumeChange);
      video.removeEventListener("error", onError);
    };
  }, [src, embed]);

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
    <video
      ref={videoRef}
      className="absolute inset-0 h-full w-full object-cover"
      src={src}
      poster={poster || undefined}
      controls
      playsInline
      preload="metadata"
      aria-label="Mensaje en video de Law Offices of Manuel Solis"
    >
      Tu navegador no puede reproducir el video.
    </video>
  );
}
