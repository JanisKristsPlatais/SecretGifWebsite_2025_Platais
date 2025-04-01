import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "./Confetti";
// Import the original GIF directly
import originalGifPath from "@assets/chunky.gif";

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
    // First, check file type but don't reveal what we're looking for
    if (!file.type.includes('image/gif')) {
      setErrorMessage("Invalid key format. Access denied.");
      return false;
    }

    // Check if it's named correctly but don't reveal the name
    if (file.name.toLowerCase() !== 'chunky.gif') {
      setErrorMessage("Invalid key file. Access denied.");
      return false;
    }

    // Now, let's do a deeper verification by making a visual comparison
    try {
      // Create an image element for the uploaded file
      const uploadedImg = document.createElement('img');
      const uploadedURL = URL.createObjectURL(file);
      
      // Wait for the uploaded image to load
      const uploadPromise = new Promise<HTMLImageElement>((resolve, reject) => {
        uploadedImg.onload = () => resolve(uploadedImg);
        uploadedImg.onerror = reject;
        uploadedImg.src = uploadedURL;
      });
      
      // Create an image element for the original file
      const originalImg = document.createElement('img');
      
      // Wait for the original image to load
      const originalPromise = new Promise<HTMLImageElement>((resolve, reject) => {
        originalImg.onload = () => resolve(originalImg);
        originalImg.onerror = reject;
        originalImg.src = originalGifPath;
      });
      
      // Wait for both images to load
      const [uploadedImage, originalImage] = await Promise.all([uploadPromise, originalPromise]);
      
      // Compare dimensions
      if (uploadedImage.naturalWidth !== originalImage.naturalWidth || 
          uploadedImage.naturalHeight !== originalImage.naturalHeight) {
        console.log("Dimension mismatch", 
          {uploadedWidth: uploadedImage.naturalWidth, originalWidth: originalImage.naturalWidth,
           uploadedHeight: uploadedImage.naturalHeight, originalHeight: originalImage.naturalHeight});
        setErrorMessage("Invalid key signature. Access denied.");
        URL.revokeObjectURL(uploadedURL);
        return false;
      }
      
      // Create canvas elements to compare pixel data
      const uploadedCanvas = document.createElement('canvas');
      const originalCanvas = document.createElement('canvas');
      
      // Set canvas dimensions to match images
      uploadedCanvas.width = uploadedImage.naturalWidth;
      uploadedCanvas.height = uploadedImage.naturalHeight;
      originalCanvas.width = originalImage.naturalWidth;
      originalCanvas.height = originalImage.naturalHeight;
      
      // Get canvas contexts
      const uploadedCtx = uploadedCanvas.getContext('2d');
      const originalCtx = originalCanvas.getContext('2d');
      
      if (uploadedCtx && originalCtx) {
        // Draw images onto canvases
        uploadedCtx.drawImage(uploadedImage, 0, 0);
        originalCtx.drawImage(originalImage, 0, 0);
        
        // Get image data
        const uploadedData = uploadedCtx.getImageData(0, 0, uploadedCanvas.width, uploadedCanvas.height);
        const originalData = originalCtx.getImageData(0, 0, originalCanvas.width, originalCanvas.height);
        
        // Compare a subset of pixels (checking every pixel might be too intensive)
        const pixelCheckInterval = 10; // Check every 10th pixel
        const pixelCount = uploadedData.data.length / 4; // RGBA values
        
        let mismatchCount = 0;
        const mismatchThreshold = 10; // Allow for a small number of mismatches
        
        for (let i = 0; i < pixelCount; i += pixelCheckInterval) {
          const idx = i * 4;
          // Check RGB values (ignore alpha for GIFs)
          if (uploadedData.data[idx] !== originalData.data[idx] ||
              uploadedData.data[idx + 1] !== originalData.data[idx + 1] ||
              uploadedData.data[idx + 2] !== originalData.data[idx + 2]) {
            mismatchCount++;
            if (mismatchCount > mismatchThreshold) {
              console.log("Pixel data mismatch");
              setErrorMessage("Authentication failed. Key verification error.");
              URL.revokeObjectURL(uploadedURL);
              return false;
            }
          }
        }
      }
      
      // Clean up object URL
      URL.revokeObjectURL(uploadedURL);
      
      // If we get here, it's passed all our checks
      setErrorMessage(null);
      return true;
    } catch (error) {
      console.error("Error verifying file:", error);
      setErrorMessage("Authentication system error. Try again later.");
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
                  Enter The Secret Key
                </h3>
                <p className="text-sm text-gray-600 max-w-md">
                  Upload the special key file to gain access to the secret area
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
                <li className="mb-1">You need the secret key file to enter</li>
                <li className="mb-1">Only those who have been granted the key can access</li>
                <li className="mb-1">Drag and drop your key file into the upload area</li>
                <li>Or click "Browse Files" to locate it on your device</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
 