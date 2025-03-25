import { useState, useEffect, useRef } from "react";
import DragSource from "./DragSource";
import DropTarget from "./DropTarget";
import Confetti from "./Confetti";

interface DragGameProps {
  onAccessGranted: () => void;
  accessGranted: boolean;
  hasVisited: boolean;
}

export default function DragGame({ onAccessGranted, accessGranted, hasVisited }: DragGameProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const dragGameRef = useRef<HTMLDivElement>(null);

  // If user has visited before, show a message
  useEffect(() => {
    if (hasVisited && !accessGranted) {
      // Auto-grant access after a short delay if they've already been here
      const timer = setTimeout(() => {
        onAccessGranted();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [hasVisited, accessGranted, onAccessGranted]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDrop = () => {
    setShowConfetti(true);
    onAccessGranted();
    
    // Hide confetti after animation completes
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const handleAccessButtonClick = () => {
    setShowConfetti(true);
    onAccessGranted();
    
    // Hide confetti after animation completes
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <div 
        ref={dragGameRef}
        id="dragGameContainer" 
        className={`bg-white rounded-lg shadow-lg p-6 mb-8 transition-opacity duration-300 ${accessGranted ? 'opacity-50' : 'opacity-100'}`}
      >
        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
          <DragSource 
            onDragStart={handleDragStart} 
            onDragEnd={handleDragEnd}
            isDragging={isDragging}
            disabled={accessGranted}
          />
          
          {/* Arrow indicator for desktop */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <span className="material-icons text-primary text-4xl animate-pulse">arrow_forward</span>
          </div>
          
          {/* Arrow indicator for mobile */}
          <div className="md:hidden flex items-center justify-center my-4">
            <span className="material-icons text-primary text-4xl animate-pulse">arrow_downward</span>
          </div>
          
          <DropTarget 
            onDrop={handleDrop}
            isDragging={isDragging}
            disabled={accessGranted}
          />
        </div>
        
        {/* Instruction panel */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start">
            <span className="material-icons text-primary mr-2 mt-1">info</span>
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-1">How to access:</h3>
              <ul className="text-xs text-gray-600 list-disc list-inside">
                <li className="mb-1">Drag the SecretGif to the drop zone</li>
                <li className="mb-1">On mobile, tap and hold to drag</li>
                <li className="mb-1">Release to drop and unlock content</li>
                <li>
                  For accessibility, you can also{" "}
                  <button 
                    id="accessButton" 
                    className="text-primary hover:underline focus:outline-none"
                    onClick={handleAccessButtonClick}
                    disabled={accessGranted}
                  >
                    click here
                  </button>{" "}
                  to unlock
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
