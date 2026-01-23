import React, { useRef, useEffect } from 'react';
import { useAudio } from '../../context/AudioContext';
// IMPORTANT: Apni audio file ka sahi path yahan dalein
import themeSong from '../../assets/audio/theme-song.mp3'; 

const GlobalAudioPlayer = () => {
  const audioRef = useRef(null);
  const { isPlaying } = useAudio();

  useEffect(() => {
    // Context ke hisab se play/pause karna
    if (isPlaying) {
      audioRef.current.play().catch(error => console.log("Audio play failed:", error));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <audio 
      ref={audioRef} 
      src={themeSong} 
      loop // Song khatam hone par repeat hoga
      hidden // Player dikhega nahi
    />
  );
};

export default GlobalAudioPlayer;