import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import originalGifPath from "@assets/chunky.gif";

interface HiddenContentProps {
  accessGranted: boolean;
  onReset: () => void;
}

export default function HiddenContent({ accessGranted, onReset }: HiddenContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "files" | "settings" | "admin">("dashboard");
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    apiAccess: false,
    sessionTimeout: "30 minutes"
  });

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
                <button 
                  className={`px-4 py-2 font-medium ${activeTab === "dashboard" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-primary"}`}
                  onClick={() => setActiveTab("dashboard")}
                >
                  Dashboard
                </button>
                <button 
                  className={`px-4 py-2 font-medium ${activeTab === "files" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-primary"}`}
                  onClick={() => setActiveTab("files")}
                >
                  Files
                </button>
                <button 
                  className={`px-4 py-2 font-medium ${activeTab === "settings" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-primary"}`}
                  onClick={() => setActiveTab("settings")}
                >
                  Settings
                </button>
                <button 
                  className={`px-4 py-2 font-medium ${activeTab === "admin" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-primary"}`}
                  onClick={() => setActiveTab("admin")}
                >
                  Admin
                </button>
              </div>
            </div>
            
            {/* Tab content */}
            <div className="max-w-lg mx-auto text-left">
              {activeTab === "dashboard" && (
                <>
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
                </>
              )}
              
              {activeTab === "files" && (
                <>
                  <h3 className="font-bold text-xl mb-4 text-gray-800">📂 Secure File Repository</h3>
                  <p className="text-gray-700 mb-6">
                    Access your secure files and documents. All files are encrypted and only accessible to authorized personnel.
                  </p>
                  
                  <div className="bg-white rounded-lg border border-gray-200 mb-6 overflow-hidden">
                    <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="material-icons text-primary mr-2">folder</span>
                        <h4 className="font-medium">Secret Documents</h4>
                      </div>
                      <span className="text-xs text-gray-500">4 files</span>
                    </div>
                    
                    <ul className="divide-y divide-gray-200">
                      <li className="p-3 hover:bg-gray-50 flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="material-icons text-gray-500 mr-2 text-sm">description</span>
                          <span className="text-sm">security_protocol.pdf</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-blue-600 text-sm hover:underline">View</button>
                          <button className="text-blue-600 text-sm hover:underline">Download</button>
                        </div>
                      </li>
                      <li className="p-3 hover:bg-gray-50 flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="material-icons text-gray-500 mr-2 text-sm">description</span>
                          <span className="text-sm">access_codes.txt</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-blue-600 text-sm hover:underline">View</button>
                          <button className="text-blue-600 text-sm hover:underline">Download</button>
                        </div>
                      </li>
                      <li className="p-3 hover:bg-gray-50 flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="material-icons text-gray-500 mr-2 text-sm">image</span>
                          <span className="text-sm">blueprint.png</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-blue-600 text-sm hover:underline">View</button>
                          <button className="text-blue-600 text-sm hover:underline">Download</button>
                        </div>
                      </li>
                      <li className="p-3 hover:bg-gray-50 flex justify-between items-center">
                        <div className="flex items-center">
                          <span className="material-icons text-gray-500 mr-2 text-sm">description</span>
                          <span className="text-sm">credentials.key</span>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-blue-600 text-sm hover:underline">View</button>
                          <button className="text-blue-600 text-sm hover:underline">Download</button>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <button className="flex items-center text-sm text-white bg-primary hover:bg-primary-dark px-4 py-2 rounded-lg">
                      <span className="material-icons mr-1 text-sm">upload_file</span>
                      Upload New File
                    </button>
                  </div>
                </>
              )}
              
              {activeTab === "settings" && (
                <>
                  <h3 className="font-bold text-xl mb-4 text-gray-800">⚙️ Security Settings</h3>
                  <p className="text-gray-700 mb-6">
                    Configure your access preferences and security settings. Changes made here affect how you interact with the secure system.
                  </p>
                  
                  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <h4 className="font-medium">Account Security</h4>
                    </div>
                    
                    <div className="p-4 space-y-4">
                      <div className="flex justify-between items-center py-2">
                        <div>
                          <h5 className="font-medium text-sm">Two-Factor Authentication</h5>
                          <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={securitySettings.twoFactorEnabled}
                            onChange={() => setSecuritySettings(prev => ({
                              ...prev,
                              twoFactorEnabled: !prev.twoFactorEnabled
                            }))}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-t border-gray-100">
                        <div>
                          <h5 className="font-medium text-sm">Session Timeout</h5>
                          <p className="text-xs text-gray-500">Automatically log out after period of inactivity</p>
                        </div>
                        <select 
                          className="text-sm border rounded p-1"
                          value={securitySettings.sessionTimeout}
                          onChange={(e) => setSecuritySettings(prev => ({
                            ...prev,
                            sessionTimeout: e.target.value
                          }))}
                        >
                          <option value="15 minutes">15 minutes</option>
                          <option value="30 minutes">30 minutes</option>
                          <option value="1 hour">1 hour</option>
                          <option value="4 hours">4 hours</option>
                        </select>
                      </div>
                      
                      <div className="flex justify-between items-center py-2 border-t border-gray-100">
                        <div>
                          <h5 className="font-medium text-sm">API Access</h5>
                          <p className="text-xs text-gray-500">Allow external applications to access your data</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input 
                            type="checkbox" 
                            className="sr-only peer" 
                            checked={securitySettings.apiAccess}
                            onChange={() => setSecuritySettings(prev => ({
                              ...prev,
                              apiAccess: !prev.apiAccess
                            }))}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                      Cancel
                    </button>
                    <button className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-dark">
                      Save Changes
                    </button>
                  </div>
                </>
              )}
              
              {activeTab === "admin" && (
                <>
                  <h3 className="font-bold text-xl mb-4 text-gray-800">🛡️ Admin Control Panel</h3>
                  <p className="text-gray-700 mb-6">
                    Advanced administration tools for system management. These controls should only be accessed by authorized administrators.
                  </p>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                      <span className="material-icons text-red-600 mr-2">warning</span>
                      <div>
                        <h4 className="font-bold text-red-600 text-sm">Restricted Area</h4>
                        <p className="text-sm text-red-700">
                          This section contains system-critical controls. Actions performed here affect all users and cannot be easily reversed.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-sm mb-3 flex items-center">
                        <span className="material-icons text-primary mr-1 text-sm">group</span>
                        User Management
                      </h4>
                      <p className="text-xs text-gray-600 mb-4">Manage user accounts and access permissions</p>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Active users: 42</span>
                        <button className="text-xs text-blue-600 hover:underline">Manage</button>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-sm mb-3 flex items-center">
                        <span className="material-icons text-primary mr-1 text-sm">shield</span>
                        Security Audit
                      </h4>
                      <p className="text-xs text-gray-600 mb-4">Review system security logs and events</p>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Last audit: Today</span>
                        <button className="text-xs text-blue-600 hover:underline">View Logs</button>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-sm mb-3 flex items-center">
                        <span className="material-icons text-primary mr-1 text-sm">key</span>
                        API Keys
                      </h4>
                      <p className="text-xs text-gray-600 mb-4">Manage system integration credentials</p>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Active keys: 3</span>
                        <button className="text-xs text-blue-600 hover:underline">Manage</button>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <h4 className="font-medium text-sm mb-3 flex items-center">
                        <span className="material-icons text-primary mr-1 text-sm">backup</span>
                        System Backup
                      </h4>
                      <p className="text-xs text-gray-600 mb-4">Create and manage system backups</p>
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Last backup: 6h ago</span>
                        <button className="text-xs text-blue-600 hover:underline">Run Backup</button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
                    <h4 className="font-medium text-sm mb-3">System Status</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Server Uptime</span>
                        <span className="text-xs font-medium">14d 6h 32m</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs">CPU Usage</span>
                        <div className="flex items-center">
                          <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                            <div className="h-2 bg-green-500 rounded-full" style={{ width: "23%" }}></div>
                          </div>
                          <span className="text-xs">23%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Memory Usage</span>
                        <div className="flex items-center">
                          <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                            <div className="h-2 bg-blue-500 rounded-full" style={{ width: "67%" }}></div>
                          </div>
                          <span className="text-xs">67%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs">Storage Usage</span>
                        <div className="flex items-center">
                          <div className="w-20 h-2 bg-gray-200 rounded-full mr-2">
                            <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "82%" }}></div>
                          </div>
                          <span className="text-xs">82%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              
              
              {/* Reset button shown at the bottom of every tab */}
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
