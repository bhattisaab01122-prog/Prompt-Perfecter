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

  // Serve static assets with cache headers for better performance
  // Images, CSS, JS get long cache (1 year) since they have hashed filenames
  app.use(express.static(distPath, {
    maxAge: '1y',
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      const ext = path.extname(filePath).toLowerCase();
      
      // Long cache for versioned assets (CSS, JS, images)
      if (['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico', '.woff', '.woff2', '.ttf'].includes(ext)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        res.setHeader('Expires', new Date(Date.now() + 31536000000).toUTCString());
      }
      // HTML files get short cache to allow updates
      else if (['.html'].includes(ext)) {
        res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
        res.setHeader('Expires', new Date(Date.now() + 3600000).toUTCString());
      }
      // XML files (sitemap, etc) get medium cache
      else if (['.xml', '.txt'].includes(ext)) {
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.setHeader('Expires', new Date(Date.now() + 86400000).toUTCString());
      }
    }
  }));

  app.use("*", (req, res) => {
    const requestPath = req.originalUrl.split('?')[0];
    const isKnownRoute = KNOWN_ROUTES.includes(requestPath);
    
    if (!isKnownRoute) {
      res.status(404);
    }
    
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
