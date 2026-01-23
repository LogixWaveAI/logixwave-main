import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

const ParticleBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      className="absolute inset-0 z-0" // Ensure it stays in background
      init={particlesInit}
      options={{
        fullScreen: { enable: false }, // Hum ise container mein confine rakhenge
        background: {
          color: {
            value: "transparent", // Transparent taaki tumhara gradient dikhe
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push", // Click karne par naye particles fatenge
            },
            onHover: {
              enable: true,
              mode: "grab", // Mouse ke paas aane par connect honge (Spider web effect)
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            grab: {
              distance: 140,
              links: {
                opacity: 0.5,
              },
            },
          },
        },
        particles: {
          color: {
            value: "#06b6d4", // Cyan-500 (Tumhari theme ka color)
          },
          links: {
            color: "#06b6d4",
            distance: 150,
            enable: true,
            opacity: 0.2, // Thoda subtle rakha hai
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 1, // Dheere float karenge (Soothing effect)
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 60, // Particles ki quantity
          },
          opacity: {
            value: 0.3,
          },
          shape: {
            type: "circle", // Dots
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticleBackground;