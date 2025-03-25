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
              <h3 className="font-bold text-xl mb-4 text-gray-800">🎮 Secret Gaming Achievement Unlocked!</h3>
              <p className="text-gray-700 mb-6">
                Congratulations on successfully authenticating with the secret key! You've discovered the hidden Nidoking zone that very few people know about. 
                You've proven yourself to be a true Pokémon master!
              </p>
              
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-lg mb-8 border border-purple-200 shadow-sm">
                <h4 className="font-bold text-lg text-primary mb-4">Nidoking Fan Club - Elite Member</h4>
                <p className="text-gray-700 mb-4">
                  Welcome to the exclusive Nidoking Fan Club! As one of the few trainers who discovered this secret area,
                  you've earned special recognition and access to rare content.
                </p>
                
                <div className="flex justify-center my-6 bg-white p-4 rounded-lg border border-gray-300">
                  <img src={originalGifPath} alt="Secret Key" className="border border-gray-300 rounded shadow-sm" />
                </div>
                
                <p className="text-gray-700 text-sm italic text-center">
                  The legendary Nidoking animation you used to unlock this area!
                </p>
              </div>
              
              <div className="bg-white rounded-lg border border-purple-200 mb-8 overflow-hidden">
                <div className="p-4 bg-purple-50 border-b border-purple-200">
                  <h4 className="font-medium text-purple-900">Nidoking Fun Facts</h4>
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex items-start">
                    <span className="material-icons text-purple-600 mr-2 text-sm">stars</span>
                    <p className="text-sm text-gray-700">
                      Nidoking is a Poison/Ground type Pokémon introduced in Generation I.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="material-icons text-purple-600 mr-2 text-sm">stars</span>
                    <p className="text-sm text-gray-700">
                      It evolves from Nidorino when exposed to a Moon Stone.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="material-icons text-purple-600 mr-2 text-sm">stars</span>
                    <p className="text-sm text-gray-700">
                      Nidoking's tail is so powerful that it can snap a telephone pole as if it were a twig.
                    </p>
                  </div>
                  <div className="flex items-start">
                    <span className="material-icons text-purple-600 mr-2 text-sm">stars</span>
                    <p className="text-sm text-gray-700">
                      In the original Pokémon games, Giovanni, the Team Rocket boss, had a powerful Nidoking in his team.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <div className="bg-white p-5 rounded-lg border border-purple-200 shadow-sm">
                  <h4 className="font-bold text-sm text-purple-800 mb-3">Member Status</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Authenticated</span>
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">Elite Trainer</span>
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Secret Finder</span>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-purple-200 shadow-sm">
                  <h4 className="font-bold text-sm text-purple-800 mb-3">Elite Perks</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-5">
                    <li>Secret Nidoking evolution strategies</li>
                    <li>Hidden game tips and tricks</li>
                    <li>Exclusive fan art collection</li>
                    <li>Priority Pokémon trading opportunities</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-lg text-white mb-8">
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
