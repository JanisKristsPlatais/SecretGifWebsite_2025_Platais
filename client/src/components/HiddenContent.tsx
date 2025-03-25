import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
            <h2 className="font-pixel text-xl text-primary mb-6">Secret Content Unlocked!</h2>
            
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                <span className="material-icons text-white text-4xl">lock_open</span>
              </div>
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
              <h3 className="font-bold text-lg mb-3 text-gray-800">Welcome to the Secret Area</h3>
              <p className="text-gray-700 mb-4">
                Congratulations on finding and uploading the correct GIF file! This content is only visible to those who have the specific file required for access.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-bold text-sm text-primary mb-2">Security Level</h4>
                  <div className="flex space-x-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Authorized</span>
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Verified</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded">
                  <h4 className="font-bold text-sm text-primary mb-2">Features</h4>
                  <ul className="text-sm text-gray-700">
                    <li>Exclusive content</li>
                    <li>Special access</li>
                    <li>Members only area</li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <button 
                  onClick={onReset}
                  className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center mx-auto"
                >
                  <span className="material-icons mr-1">replay</span>
                  Reset Authentication
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
