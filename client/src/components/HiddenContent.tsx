import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import originalGifPath from "@assets/chunky.gif";

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
            
            {/* Content after authentication */}
            <div className="max-w-lg mx-auto text-left">
              <h3 className="font-bold text-lg mb-3 text-gray-800">🎉 Chunky's Secret Club - Welcome! 🎉</h3>
              <p className="text-gray-700 mb-4">
                Congratulations on finding and uploading the correct chunky.gif file! You're now one of the few who know Chunky's secret dance moves. This content is only visible to true Chunky fans!
              </p>
              
              <div className="bg-gray-50 p-5 rounded-lg mb-6 border border-gray-200">
                <h4 className="font-bold text-lg text-primary mb-3">About Chunky</h4>
                <p className="text-gray-700 mb-3">
                  Chunky, the dancing character from the GIF, has been an internet sensation since the early days of GIFs. His unique moves and adorable appearance have made him a beloved figure among internet culture enthusiasts.
                </p>
                <p className="text-gray-700">
                  By the way, if you don't have the GIF yet, you can right-click and save the image below to gain access to this page in the future:
                </p>
                <div className="flex justify-center my-4">
                  <img src={originalGifPath} alt="Chunky GIF" className="border border-gray-300 rounded" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-sm text-primary mb-2">Chunky Fan Status</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Authorized</span>
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Verified</span>
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">True Fan</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-bold text-sm text-primary mb-2">Exclusive Benefits</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-5">
                    <li>Access to all Chunky GIFs</li>
                    <li>Chunky dance tutorial videos</li>
                    <li>Behind-the-scenes Chunky content</li>
                    <li>Meet other Chunky enthusiasts</li>
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
