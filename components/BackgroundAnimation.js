import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function BackgroundAnimation() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const balls = Array.from({ length: 60 }); // Fewer balls for larger effect

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {balls.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-60"
          initial={{
            x: '100vw', // Start from the far right
            y: Math.random() * window.innerHeight, // Random vertical position
          }}
          animate={{
            x: '-10vw', // Move past the left edge
            y: window.innerHeight + 100, // Move downward past the bottom
          }}
          transition={{
            duration: Math.random() * 4 + 6, // Random speed
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.3, // Staggered start
          }}
          style={{
            width: Math.random() * 40 + 40, // Larger size between 40px and 80px
            height: Math.random() * 40 + 40,
            backgroundColor: i % 2 === 0 ? "#FFD700" : "#008000", // Alternate between yellow and green
          }}
        />
      ))}
    </div>
  );
}
