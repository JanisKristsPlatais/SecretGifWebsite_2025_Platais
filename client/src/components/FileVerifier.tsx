import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "./Confetti";

interface FileVerifierProps {
  onAccessGranted: () => void;
  accessGranted: boolean;
  hasVisited: boolean;
}

export default function FileVerifier({ onAccessGranted, accessGranted, hasVisited }: FileVerifierProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const verifyFile = async (file: File): Promise<boolean> => {
    // Check file type
    if (!file.type.includes('image/gif')) {
      setErrorMessage("File must be a GIF image");
      return false;
    }

    // Check if it's the correct file (chunky.gif)
    if (file.name.toLowerCase() !== 'chunky.gif') {
      setErrorMessage("This is not the correct GIF");
      return false;
    }

    // Calculate file hash
    try {
      const buffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      // This is the hash of the original chunky.gif file
      const expectedHash = '91bea7b8ba0faae4e7c6fecb5b87612bd9e6affd01dac442ad2f9b73c95c65d5';
      
      if (hashHex !== expectedHash) {
        setErrorMessage("This isn't the correct chunky.gif");
        return false;
      }
      
      setErrorMessage(null);
      return true;
    } catch (error) {
      console.error("Error verifying file:", error);
      setErrorMessage("Error verifying the file");
      return false;
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!accessGranted) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (accessGranted) return;
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const isValid = await verifyFile(file);
      if (isValid === true) {
        setShowConfetti(true);
        onAccessGranted();
        
        // Hide confetti after animation completes
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      }
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (accessGranted) return;
    
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const isValid = await verifyFile(file);
      if (isValid === true) {
        setShowConfetti(true);
        onAccessGranted();
        
        // Hide confetti after animation completes
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      }
    }
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <div 
        className={`bg-white rounded-lg shadow-lg p-6 mb-8 transition-opacity duration-300 ${accessGranted ? 'opacity-50' : 'opacity-100'}`}
      >
        <motion.div
          ref={dropZoneRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          animate={
            isDragging 
              ? { scale: 1.02, backgroundColor: "rgba(93, 109, 190, 0.1)" } 
              : { scale: 1, backgroundColor: "rgba(255, 255, 255, 1)" }
          }
          className={`drop-zone w-full h-64 border-2 border-dashed rounded-lg 
            flex flex-col items-center justify-center p-6
            ${isDragging ? 'border-primary' : 'border-gray-300'} 
            ${accessGranted ? 'bg-green-50 border-green-400' : ''}`}
        >
          {!accessGranted ? (
            <>
              <div className="flex flex-col items-center text-center mb-6">
                <span className="material-icons text-primary text-4xl mb-4">
                  upload_file
                </span>
                <h3 className="font-medium text-lg text-gray-800 mb-2">
                  Upload the Secret GIF
                </h3>
                <p className="text-sm text-gray-600 max-w-md">
                  Drag and drop the correct GIF file, or click to browse your files
                </p>
                {errorMessage && (
                  <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/gif"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                disabled={accessGranted}
              >
                Browse Files
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <span className="material-icons text-green-500 text-4xl mb-3">
                check_circle
              </span>
              <p className="text-green-700 font-medium">
                Access granted! Scroll down to view content.
              </p>
            </div>
          )}
        </motion.div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-start">
            <span className="material-icons text-primary mr-2 mt-1">info</span>
            <div>
              <h3 className="text-sm font-bold text-gray-700 mb-1">Instructions:</h3>
              <ul className="text-xs text-gray-600 list-disc list-inside">
                <li className="mb-1">Find the file named "chunky.gif"</li>
                <li className="mb-1">Drag and drop it into the upload area</li>
                <li className="mb-1">Alternatively, click "Browse Files" to select it</li>
                <li>Only the correct GIF file will grant you access</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}