// components/Background.js
import { motion } from 'framer-motion';

export function Background() {
  const cubes = Array.from({ length: 20 }); // Increase number of cubes for more coverage

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {cubes.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-36 h-36 bg-green-500 rounded shadow-lg opacity-30"
          initial={{
            opacity: 0,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            opacity: 0.3,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: 360,
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ backgroundColor: i % 2 === 0 ? "green" : "yellow" }}
        />
      ))}
    </div>
  );
}
