import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import nidokingImage from "@assets/chunky.gif";

interface DragSourceProps {
  onDragStart: () => void;
  onDragEnd: () => void;
  isDragging: boolean;
  disabled: boolean;
}

export default function DragSource({ onDragStart, onDragEnd, isDragging, disabled }: DragSourceProps) {
  const dragRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isGrabbed, setIsGrabbed] = useState(false);
  const [touchDragging, setTouchDragging] = useState(false);

  // Reset position when dragging ends or component is disabled
  useEffect(() => {
    if (!isDragging || disabled) {
      setPosition({ x: 0, y: 0 });
    }
  }, [isDragging, disabled]);

  // Handle standard drag events for desktop
  const handleDragStart = (e: React.DragEvent) => {
    if (disabled) return;
    
    e.dataTransfer.setData("text/plain", "nidoking");
    setIsGrabbed(true);
    onDragStart();
  };

  const handleDragEnd = () => {
    if (disabled) return;
    
    setIsGrabbed(false);
    onDragEnd();
  };

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (disabled) return;
    
    setTouchDragging(true);
    onDragStart();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchDragging || disabled) return;
    
    const touch = e.touches[0];
    if (dragRef.current) {
      const rect = dragRef.current.getBoundingClientRect();
      const offsetX = touch.clientX - rect.left - rect.width / 2;
      const offsetY = touch.clientY - rect.top - rect.height / 2;
      
      setPosition({ x: offsetX, y: offsetY });
    }
  };

  const handleTouchEnd = () => {
    if (disabled) return;
    
    setTouchDragging(false);
    setPosition({ x: 0, y: 0 });
    onDragEnd();
  };

  return (
    <div className="drag-source flex-1 flex flex-col items-center">
      <h2 className="font-pixel text-sm mb-4 text-center text-gray-700">Drag Me</h2>
      <motion.div
        ref={dragRef}
        id="draggablePokemon"
        draggable={!disabled}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        animate={touchDragging ? position : {}}
        transition={{ type: "spring", damping: 20 }}
        className={`pokemon-container relative drag-cursor drop-shadow-custom active:drop-shadow-active 
          ${isGrabbed ? 'opacity-50' : 'opacity-100'} 
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-grab'}`}
        style={{ visibility: disabled ? 'hidden' : 'visible' }}
      >
        <img
          src={nidokingImage}
          alt="Nidoking Pokémon"
          className="w-32 h-32 object-contain pointer-events-none"
        />
        <div className="mt-4 text-center text-xs text-gray-500 font-pixel">
          <span className="material-icons text-primary animate-bounce text-sm inline-block mr-1">touch_app</span>
          <span>Grab me</span>
        </div>
      </motion.div>
    </div>
  );
}
