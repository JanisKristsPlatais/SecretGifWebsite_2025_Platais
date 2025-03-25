import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import nidokingImage from "@assets/chunky.gif";

interface DropTargetProps {
  onDrop: () => void;
  isDragging: boolean;
  disabled: boolean;
}

export default function DropTarget({ onDrop, isDragging, disabled }: DropTargetProps) {
  const [isOver, setIsOver] = useState(false);
  const [hasDropped, setHasDropped] = useState(false);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Reset state when disabled
  useEffect(() => {
    if (disabled) {
      setHasDropped(true);
    } else {
      setHasDropped(false);
    }
  }, [disabled]);

  // Handle standard drag and drop for desktop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    
    if (data === "secretgif" && !disabled) {
      setHasDropped(true);
      onDrop();
    }
    
    setIsOver(false);
  };

  // Handle touch interactions with drop zone for mobile
  useEffect(() => {
    const checkTouchDrop = (e: TouchEvent) => {
      if (!isDragging || disabled || hasDropped) return;
      
      if (dropZoneRef.current) {
        const touch = e.changedTouches[0];
        const rect = dropZoneRef.current.getBoundingClientRect();
        
        // Check if touch is within the drop zone
        if (
          touch.clientX >= rect.left &&
          touch.clientX <= rect.right &&
          touch.clientY >= rect.top &&
          touch.clientY <= rect.bottom
        ) {
          setHasDropped(true);
          onDrop();
        }
      }
    };
    
    document.addEventListener("touchend", checkTouchDrop);
    
    return () => {
      document.removeEventListener("touchend", checkTouchDrop);
    };
  }, [isDragging, onDrop, disabled, hasDropped]);

  return (
    <div className="drop-target flex-1 flex flex-col items-center">
      <h2 className="font-pixel text-sm mb-4 text-center text-gray-700">Drop Here</h2>
      <motion.div
        ref={dropZoneRef}
        id="dropZone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        animate={
          isOver 
            ? { scale: 1.05, backgroundColor: "rgba(93, 109, 190, 0.2)" } 
            : { scale: 1, backgroundColor: "rgba(249, 250, 251, 1)" }
        }
        className={`drop-zone w-36 h-36 border-4 border-dashed rounded-lg 
          flex items-center justify-center transition-all duration-300 
          ${isOver ? 'border-primary' : 'border-gray-300'} 
          ${hasDropped ? 'bg-green-100 border-green-400' : 'bg-gray-50'}`}
      >
        {hasDropped ? (
          <img 
            src={nidokingImage} 
            alt="Secret Gif" 
            className="w-24 h-24 object-contain"
          />
        ) : (
          <div className="flex flex-col items-center">
            <span className="material-icons text-gray-400 text-3xl mb-2">add_circle_outline</span>
            <p className="text-gray-400 text-xs text-center">Drop Zone</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
