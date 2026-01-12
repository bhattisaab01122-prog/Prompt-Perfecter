import express, { type Express } from "express";
import fs from "fs";
import path from "path";

const KNOWN_ROUTES = [
  "/",
  "/privacy",
  "/contact",
  "/articles/hallucinations",
  "/articles/midjourney",
];

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  app.use("*", (req, res) => {
    const requestPath = req.originalUrl.split('?')[0];
    const isKnownRoute = KNOWN_ROUTES.includes(requestPath);
    
    if (!isKnownRoute) {
      res.status(404);
    }
    
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
