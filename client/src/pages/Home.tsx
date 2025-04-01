import { useState, useEffect } from "react";
import FileVerifier from "../components/FileVerifier";
import HiddenContent from "../components/HiddenContent";
import { useAccessStore } from "../lib/useAccessStore";
import { apiRequest } from "../lib/queryClient";

export default function Home() {
  const { accessGranted, grantAccess, resetAccess } = useAccessStore();
  const [hasVisited, setHasVisited] = useState(false);

  // Check if the user has already accessed the content
  useEffect(() => {
    const checkAccess = async () => {
      try {
        const response = await apiRequest("GET", "/api/access-status", undefined);
        const data = await response.json();
        if (data.hasAccess) {
          setHasVisited(true);
        }
      } catch (error) {
        console.error("Error checking access status:", error);
      }
    };
    
    checkAccess();
  }, []);
  
  // Mark that the user has accessed the content
  const updateAccessStatus = async () => {
    try {
      await apiRequest("POST", "/api/access-status", { hasAccess: true });
    } catch (error) {
      console.error("Error updating access status:", error);
    }
  };
  
  const handleAccessGranted = () => {
    grantAccess();
    updateAccessStatus();
  };
  
  const handleReset = async () => {
    resetAccess();
    setHasVisited(false);
    // Reset the access status on the server
    try {
      await apiRequest("POST", "/api/access-status", { hasAccess: false });
    } catch (error) {
      console.error("Error resetting access status:", error);
    }
  };
  
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center">
        <header className="w-full max-w-2xl text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-pixel text-primary mb-4">
            SecretGif Website
          </h1>
          <p className="text-gray-700 text-sm md:text-base max-w-md mx-auto">
            Drag the correct GIF file to access this website's content.
          </p>
        </header>

        <div id="gameContainer" className="w-full max-w-2xl">
          <FileVerifier 
            onAccessGranted={handleAccessGranted} 
            accessGranted={accessGranted} 
            hasVisited={hasVisited}
          />
          <HiddenContent 
            accessGranted={accessGranted} 
            onReset={handleReset}
          />
        </div>

        <footer className="mt-8 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} SecretGif Website. Only authorized visitors can access this site.</p>
        </footer>
      </div>
    </div>
  );
}
 

