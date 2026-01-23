import React, { createContext, useState, useContext } from 'react';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  // hasInteracted ensure karega ki pop-up sirf ek baar aaye refresh hone tak
  const [hasInteracted, setHasInteracted] = useState(false);

  const playAudio = () => {
    setIsPlaying(true);
    setHasInteracted(true);
  };

  const pauseAudio = () => {
    setIsPlaying(false);
    // Agar user pause karta hai, toh hum maante hain usne interact kar liya
    if (!hasInteracted) setHasInteracted(true);
  };

  const skipAudio = () => {
      setIsPlaying(false);
      setHasInteracted(true);
  }

  return (
    <AudioContext.Provider value={{ isPlaying, hasInteracted, playAudio, pauseAudio, skipAudio }}>
      {children}
    </AudioContext.Provider>
  );
};