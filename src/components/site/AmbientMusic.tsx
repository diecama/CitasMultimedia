import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

import { isAgeVerified } from "@/lib/age-gate";

/**
 * Ambient lounge soundtrack for the public site.
 *
 * Browser autoplay policy blocks audio until a user gesture. The age gate's
 * "Entrar" button is exactly that gesture, so:
 *  - when the gate confirms we dispatch `elite:age-verified` (see age-gate.ts),
 *    this component catches it and fades the track in;
 *  - on a reload where the session is already verified (no fresh gesture),
 *    play() typically rejects — we leave it paused and the toggle still works.
 *
 * The audio file is provided by the operator at public/audio/ambiente.mp3.
 * If it is missing, play() rejects and we degrade gracefully (toggle present,
 * nothing breaks). Everything is client-side and gated behind `mounted` so SSR
 * never touches the Audio API.
 */
declare global {
  interface WindowEventMap {
    "elite:age-verified": Event;
  }
}

const SRC = "/audio/ambiente.mp3";
const MAX_VOLUME = 0.32;
const FADE_MS = 1500;
const MUTE_KEY = "elite_music_muted";

export function AmbientMusic() {
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mutedRef = useRef(false);
  const pausedByHideRef = useRef(false);
  const fadeRef = useRef<number | null>(null);

  const persist = useCallback((value: boolean) => {
    try {
      window.localStorage.setItem(MUTE_KEY, value ? "1" : "0");
    } catch {
      /* storage unavailable — skip persistence */
    }
  }, []);

  const fadeTo = useCallback((target: number, done?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    const from = audio.volume;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / FADE_MS);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      audio.volume = from + (target - from) * eased;
      if (t < 1) {
        fadeRef.current = requestAnimationFrame(step);
      } else {
        fadeRef.current = null;
        done?.();
      }
    };
    fadeRef.current = requestAnimationFrame(step);
  }, []);

  const tryPlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || mutedRef.current) return;
    audio.volume = 0;
    const p = audio.play();
    if (p && typeof p.then === "function") {
      p.then(() => {
        setPlaying(true);
        fadeTo(MAX_VOLUME);
      }).catch(() => {
        // autoplay blocked (e.g. reload already verified, no fresh gesture).
        // Leave paused; the floating toggle is still available.
        setPlaying(false);
      });
    }
  }, [fadeTo]);

  // On mount: read the persisted mute preference and, if the session was
  // already age-verified before this load, attempt autostart.
  useEffect(() => {
    setMounted(true);
    const prefMuted = window.localStorage.getItem(MUTE_KEY) === "1";
    mutedRef.current = prefMuted;
    setMuted(prefMuted);
    if (isAgeVerified()) tryPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for a fresh age-gate confirmation and start the track then.
  useEffect(() => {
    const onVerified = () => tryPlay();
    window.addEventListener("elite:age-verified", onVerified);
    return () => window.removeEventListener("elite:age-verified", onVerified);
  }, [tryPlay]);

  // Pause when the tab is hidden, resume when it returns (if it should sound).
  useEffect(() => {
    const onVis = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (document.hidden) {
        if (!audio.paused) {
          audio.pause();
          pausedByHideRef.current = true;
        }
      } else if (pausedByHideRef.current) {
        pausedByHideRef.current = false;
        if (!mutedRef.current) {
          audio
            .play()
            .then(() => setPlaying(true))
            .catch(() => {});
        }
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted || audio.paused) {
      // turn sound on / resume
      mutedRef.current = false;
      setMuted(false);
      persist(false);
      audio.volume = 0;
      audio
        .play()
        .then(() => {
          setPlaying(true);
          fadeTo(MAX_VOLUME);
        })
        .catch(() => setPlaying(false));
    } else {
      // mute + pause after a soft fade-out
      mutedRef.current = true;
      setMuted(true);
      persist(true);
      fadeTo(0, () => {
        audio.pause();
        setPlaying(false);
      });
    }
  }

  if (!mounted) return null;

  const isSounding = playing && !muted;

  return (
    <>
      <audio ref={audioRef} src={SRC} loop preload="auto" aria-hidden="true" />

      <button
        type="button"
        onClick={toggle}
        aria-pressed={isSounding}
        aria-label={isSounding ? "Silenciar música ambiente" : "Reproducir música ambiente"}
        title={isSounding ? "Silenciar ambiente" : "Activar ambiente sonoro"}
        className="group fixed bottom-6 right-6 z-40 grid size-12 place-items-center rounded-full border border-gold/30 bg-background/70 text-gold backdrop-blur-md transition-all duration-500 hover:border-gold/70 hover:bg-background/90 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {isSounding && (
          <span className="pointer-events-none absolute inset-0 rounded-full border border-gold/40 animate-ping-slow" />
        )}
        {isSounding ? (
          <Volume2 className="relative size-5" />
        ) : (
          <VolumeX className="relative size-5" />
        )}
      </button>
    </>
  );
}
