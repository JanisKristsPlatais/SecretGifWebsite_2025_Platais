import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Simple in-memory store for access status
const accessStore: { [ip: string]: boolean } = {};

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to check if user has accessed the content
  app.get("/api/access-status", (req, res) => {
    const clientIp = req.ip || req.socket.remoteAddress || "unknown";
    const hasAccess = accessStore[clientIp] || false;
    res.json({ hasAccess });
  });

  // API route to update access status
  app.post("/api/access-status", (req, res) => {
    const clientIp = req.ip || req.socket.remoteAddress || "unknown";
    const { hasAccess } = req.body;
    
    if (typeof hasAccess === "boolean") {
      accessStore[clientIp] = hasAccess;
      res.json({ success: true, message: "Access status updated" });
    } else {
      res.status(400).json({ success: false, message: "Invalid request body" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
 

