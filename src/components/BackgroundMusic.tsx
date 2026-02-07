import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Simple romantic melody using Web Audio API
  const playNote = (ctx: AudioContext, frequency: number, startTime: number, duration: number, volume: number = 0.08) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(frequency, startTime);
    
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(volume, startTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(startTime);
    osc.stop(startTime + duration);
  };

  const playMelody = () => {
    if (!audioContextRef.current || audioContextRef.current.state === "closed") {
      audioContextRef.current = new AudioContext();
    }
    
    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    
    // Romantic piano-like melody pattern (C major / A minor)
    const melodyNotes = [
      // Bar 1 - gentle ascending
      { freq: 523.25, time: 0, dur: 1.2 },     // C5
      { freq: 659.25, time: 0.8, dur: 1.0 },   // E5
      { freq: 783.99, time: 1.6, dur: 1.5 },   // G5
      { freq: 880.00, time: 2.8, dur: 1.8 },   // A5
      // Bar 2 - soft descending
      { freq: 783.99, time: 4.2, dur: 1.2 },   // G5
      { freq: 659.25, time: 5.2, dur: 1.0 },   // E5
      { freq: 587.33, time: 6.0, dur: 1.5 },   // D5
      { freq: 523.25, time: 7.2, dur: 2.0 },   // C5
      // Bar 3 - emotional climb
      { freq: 440.00, time: 9.0, dur: 1.2 },   // A4
      { freq: 523.25, time: 10.0, dur: 1.0 },  // C5
      { freq: 659.25, time: 10.8, dur: 1.5 },  // E5
      { freq: 698.46, time: 12.0, dur: 2.0 },  // F5
      // Bar 4 - resolution
      { freq: 659.25, time: 13.8, dur: 1.5 },  // E5
      { freq: 523.25, time: 15.0, dur: 1.2 },  // C5
      { freq: 493.88, time: 16.0, dur: 1.0 },  // B4
      { freq: 523.25, time: 17.0, dur: 2.5 },  // C5
    ];

    // Soft bass harmony
    const bassNotes = [
      { freq: 130.81, time: 0, dur: 4.0 },     // C3
      { freq: 110.00, time: 4.0, dur: 4.0 },   // A2
      { freq: 146.83, time: 8.0, dur: 4.0 },   // D3
      { freq: 130.81, time: 12.0, dur: 4.0 },  // C3
    ];

    melodyNotes.forEach(note => {
      playNote(ctx, note.freq, now + note.time, note.dur, 0.06);
    });

    bassNotes.forEach(note => {
      playNote(ctx, note.freq, now + note.time, note.dur, 0.03);
    });
  };

  const toggleMusic = () => {
    if (!hasInteracted) setHasInteracted(true);
    
    if (isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsPlaying(false);
    } else {
      playMelody();
      // Loop the melody every ~19 seconds
      intervalRef.current = window.setInterval(playMelody, 19500);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, []);

  return (
    <motion.button
      onClick={toggleMusic}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary/90 backdrop-blur-sm text-primary-foreground shadow-dreamy flex items-center justify-center border-2 border-primary-foreground/20"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      title={isPlaying ? "Pause music" : "Play romantic melody"}
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
            🎵
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
  );
};

export default BackgroundMusic;
