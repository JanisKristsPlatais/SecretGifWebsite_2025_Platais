import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ConfettiPieceProps {
  color: string;
  size: number;
  x: number;
  y: number;
  duration: number;
}

function ConfettiPiece({ color, size, x, y, duration }: ConfettiPieceProps) {
  return (
    <motion.div
      initial={{ 
        top: -100, 
        left: `${x}%`, 
        rotate: 0, 
        opacity: 1 
      }}
      animate={{ 
        top: `${y}vh`, 
        rotate: 360, 
        opacity: 0 
      }}
      transition={{ 
        duration: duration,
        ease: "easeOut" 
      }}
      style={{
        position: "fixed",
        width: size,
        height: size,
        backgroundColor: color,
        zIndex: 9999
      }}
      className="pointer-events-none"
    />
  );
}

export default function Confetti() {
  const [confettiPieces, setConfettiPieces] = useState<React.ReactNode[]>([]);
  
  useEffect(() => {
    const colors = [
      "#5D6DBE", // primary
      "#A68D6B", // secondary
      "#4CAF50", // success
      "#FF9800", // orange
      "#E91E63", // pink
      "#2196F3", // blue
    ];
    
    const pieces = [];
    
    // Create 100 confetti pieces
    for (let i = 0; i < 100; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 5; // 5-15px
      const x = Math.random() * 100; // 0-100%
      const y = Math.random() * 100 + 100; // 100-200vh
      const duration = Math.random() * 3 + 2; // 2-5s
      
      pieces.push(
        <ConfettiPiece 
          key={i}
          color={color}
          size={size}
          x={x}
          y={y}
          duration={duration}
        />
      );
    }
    
    setConfettiPieces(pieces);
    
    // Clean up confetti after the longest possible duration
    const timer = setTimeout(() => {
      setConfettiPieces([]);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return <>{confettiPieces}</>;
}
 
