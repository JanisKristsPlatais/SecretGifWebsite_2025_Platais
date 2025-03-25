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
            
            {/* Navigation tabs */}
            <div className="border-b border-gray-200 mb-8">
              <div className="flex justify-center">
                <button className="px-4 py-2 font-medium text-primary border-b-2 border-primary">Dashboard</button>
                <button className="px-4 py-2 font-medium text-gray-500 hover:text-primary">Files</button>
                <button className="px-4 py-2 font-medium text-gray-500 hover:text-primary">Settings</button>
                <button className="px-4 py-2 font-medium text-gray-500 hover:text-primary">Admin</button>
              </div>
            </div>
            
            {/* Content after authentication */}
            <div className="max-w-lg mx-auto text-left">
              <h3 className="font-bold text-xl mb-4 text-gray-800">🔐 The Secure Vault - Welcome!</h3>
              <p className="text-gray-700 mb-6">
                Congratulations on successfully authenticating with the secret key! Very few people have access to this restricted area. You've proven that you possess the required credentials.
              </p>
              
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg mb-8 border border-gray-200 shadow-sm">
                <h4 className="font-bold text-lg text-primary mb-4">Authorized Personnel Only</h4>
                <p className="text-gray-700 mb-4">
                  This secure area contains special content only accessible to authenticated users. Your key has been verified and your access privileges have been confirmed.
                </p>
                
                <div className="flex justify-center my-6 bg-white p-4 rounded-lg border border-gray-300">
                  <img src={originalGifPath} alt="Secret Key" className="border border-gray-300 rounded shadow-sm" />
                </div>
                
                <p className="text-gray-700 text-sm italic text-center">
                  The key you used for authentication is displayed above for verification purposes.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-sm text-primary mb-3">Access Level</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Authenticated</span>
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">Verified</span>
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">High Clearance</span>
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
                  <h4 className="font-bold text-sm text-primary mb-3">Authorized Features</h4>
                  <ul className="text-sm text-gray-700 list-disc pl-5">
                    <li>Access to secure documents</li>
                    <li>Encrypted message system</li>
                    <li>Secure file storage</li>
                    <li>Priority support channel</li>
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
