import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import nidokingImage from "@assets/chunky.gif";

interface HiddenContentProps {
  accessGranted: boolean;
  onReset: () => void;
}

export default function HiddenContent({ accessGranted, onReset }: HiddenContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll to content when it becomes visible
  useEffect(() => {
    if (accessGranted && contentRef.current) {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
    }
  }, [accessGranted]);

  const contentVariants = {
    hidden: { maxHeight: 0, opacity: 0, overflow: "hidden" },
    visible: { 
      maxHeight: 2000, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {accessGranted && (
        <motion.div
          ref={contentRef}
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          className="bg-white rounded-lg shadow-lg p-6 relative"
        >
          <div className={`access-indicator ${accessGranted ? 'granted bg-green-500' : 'bg-gray-300'}`}></div>
          
          <div className="text-center">
            <h2 className="font-pixel text-xl text-primary mb-6">Welcome to Nidoking's Realm!</h2>
            
            <div className="flex justify-center mb-6">
              <img 
                src={nidokingImage} 
                alt="Nidoking Pokémon" 
                className="w-24 h-24 object-contain mx-auto mb-4"
              />
            </div>
            
            {/* Example content tabs */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex justify-center">
                <button className="px-4 py-2 font-medium text-primary border-b-2 border-primary">Home</button>
                <button className="px-4 py-2 font-medium text-gray-500 hover:text-primary">Gallery</button>
                <button className="px-4 py-2 font-medium text-gray-500 hover:text-primary">About</button>
                <button className="px-4 py-2 font-medium text-gray-500 hover:text-primary">Contact</button>
              </div>
            </div>
            
            {/* Example content */}
            <div className="max-w-lg mx-auto text-left">
              <h3 className="font-bold text-lg mb-3 text-gray-800">Nidoking Information</h3>
              <p className="text-gray-700 mb-4">
                Nidoking is a dual-type Poison/Ground Pokémon introduced in Generation I. It evolves from Nidorino when exposed to a Moon Stone. It is the final form of Nidoran♂.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-bold text-sm text-primary mb-2">Type</h4>
                  <div className="flex space-x-2">
                    <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded">Poison</span>
                    <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded">Ground</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-bold text-sm text-primary mb-2">Abilities</h4>
                  <ul className="text-sm text-gray-700">
                    <li>Poison Point</li>
                    <li>Rivalry</li>
                    <li>Sheer Force (Hidden)</li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <button 
                  onClick={onReset}
                  className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center mx-auto"
                >
                  <span className="material-icons mr-1">replay</span>
                  Reset Drag &amp; Drop Game
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
