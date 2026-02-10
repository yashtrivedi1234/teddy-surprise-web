import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!hasInteracted) setHasInteracted(true);

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Ensure playback starts from the beginning when re‑playing
      if (audioRef.current.currentTime === audioRef.current.duration) {
        audioRef.current.currentTime = 0;
      }
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Ignore autoplay / permission errors; user can try again
        });
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      // Keep button state in sync when the song naturally finishes
      setIsPlaying(false);
    };

    audio.addEventListener("ended", handleEnded);
    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src="/romantic-hindi-song.mp3"
        preload="auto"
        loop
      />

      <motion.button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground shadow-dreamy flex items-center justify-center border-2 border-primary-foreground/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        title={isPlaying ? "Pause love song" : "Play Hindi love song"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.span
              key="playing"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="text-2xl"
            >
              💗
            </motion.span>
          ) : (
            <motion.span
              key="paused"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="text-2xl"
            >
              🎶
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>
    </>
  );
};

export default BackgroundMusic;
