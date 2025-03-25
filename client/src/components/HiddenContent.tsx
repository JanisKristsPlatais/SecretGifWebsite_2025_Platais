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
            <h2 className="font-pixel text-2xl text-primary mb-8">ACCESS GRANTED</h2>
            
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="material-icons text-white text-5xl">lock_open</span>
              </div>
            </div>
            
            {/* Content after authentication */}
            <div className="max-w-lg mx-auto text-left">
              <h3 className="font-bold text-xl mb-4 text-gray-800">🔐 Secret Area Unlocked!</h3>
              <p className="text-gray-700 mb-6">
                Congratulations on successfully authenticating with the secret key! You've discovered the hidden area that very few people know about. 
                This exclusive content is only available to those who possess the secret GIF.
              </p>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg mb-8 border border-blue-200 shadow-sm">
                <h4 className="font-bold text-lg text-primary mb-4">Exclusive Access Granted</h4>
                <p className="text-gray-700 mb-4">
                  Welcome to the restricted area! As one of the few visitors who discovered this secret space,
                  you've earned special recognition and access to hidden content.
                </p>
                
                <div className="flex justify-center my-6 bg-white p-4 rounded-lg border border-gray-300">
                  <img src={originalGifPath} alt="Secret Key" className="border border-gray-300 rounded shadow-sm" />
                </div>
                
                <p className="text-gray-700 text-sm italic text-center">
                  The secret key you used to unlock this area!
                </p>
              </div>
              
              <div className="bg-white rounded-lg border border-blue-200 mb-8 overflow-hidden">
                <div className="p-4 bg-blue-50 border-b border-blue-200">
                  <h4 className="font-medium text-blue-900">Secret Society</h4>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex items-start">
                    <span className="material-icons text-blue-600 mr-2 text-sm">verified</span>
                    <p className="text-sm text-gray-700">
                      You are now part of an exclusive group of people who know about this hidden area.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="material-icons text-blue-600 mr-2 text-sm">verified</span>
                    <p className="text-sm text-gray-700">
                      This verification system ensures that only those with the exact key can enter.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="material-icons text-blue-600 mr-2 text-sm">verified</span>
                    <p className="text-sm text-gray-700">
                      The secret GIF serves as both a challenge and a password - only the truly resourceful can find it.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="material-icons text-blue-600 mr-2 text-sm">verified</span>
                    <p className="text-sm text-gray-700">
                      This authentication method is unique and much more interesting than typical username/password systems.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <div className="bg-white p-5 rounded-lg border border-blue-200 shadow-sm">
                  <h4 className="font-bold text-sm text-blue-800 mb-3">Access Level</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Authenticated</span>
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Secret Keeper</span>
                    <span className="bg-indigo-600 text-white text-xs px-2 py-1 rounded">Elite Access</span>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-blue-200 shadow-sm">
                  <h4 className="font-bold text-sm text-blue-800 mb-3">Exclusive Privileges</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-5">
                    <li>Knowledge of this secret area</li>
                    <li>Access to hidden content</li>
                    <li>Bragging rights among friends</li>
                    <li>The satisfaction of solving the puzzle</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-lg text-white mb-8">
                <h4 className="font-bold text-lg mb-3">🏆 Achievement Unlocked</h4>
                <p className="mb-2">
                  "Secret Key Master" - You've successfully discovered and used a secret key to access hidden content.
                </p>
                <div className="flex items-center text-xs bg-white bg-opacity-20 p-2 rounded">
                  <span className="material-icons text-yellow-300 mr-1 text-sm">emoji_events</span>
                  <span>Only 2% of visitors have unlocked this achievement!</span>
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
