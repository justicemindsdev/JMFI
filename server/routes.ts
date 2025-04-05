import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple API route to get article data
  app.get("/api/articles/ben-mak-advocacy", (req, res) => {
    res.json({
      title: "The Extraordinary Rarity of Ben's Parliamentary Advocacy Success: A Statistical Analysis",
      author: "Justice Minds Editorial Team",
      publishDate: "November 30, 2024",
      description: "A statistical analysis of the exceptional rarity of successful parliamentary advocacy in the UK political system."
    });
  });

  // API route to submit newsletter signup
  app.post("/api/newsletter/subscribe", (req, res) => {
    const { email } = req.body;
    
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    
    // In a real application, this would store the email in a database
    // and likely integrate with an email marketing service
    
    return res.status(200).json({ 
      message: "Subscription successful",
      email
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
