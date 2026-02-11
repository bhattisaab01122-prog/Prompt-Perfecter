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

  // Explicit routes for sitemap.xml and robots.txt with correct Content-Type
  // This ensures crawlers always get the XML/text file, never the HTML fallback
  app.get('/sitemap.xml', (_req, res) => {
    const sitemapPath = path.resolve(distPath, 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      res.setHeader('Content-Type', 'application/xml; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.setHeader('Expires', new Date(Date.now() + 86400000).toUTCString());
      res.sendFile(sitemapPath);
    } else {
      res.status(404).send('Sitemap not found');
    }
  });

  app.get('/robots.txt', (_req, res) => {
    const robotsPath = path.resolve(distPath, 'robots.txt');
    if (fs.existsSync(robotsPath)) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      res.sendFile(robotsPath);
    } else {
      res.status(404).send('Robots.txt not found');
    }
  });

  // Serve static assets with cache headers for better performance
  app.use(express.static(distPath, {
    maxAge: '1y',
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      const ext = path.extname(filePath).toLowerCase();
      
      if (['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico', '.woff', '.woff2', '.ttf'].includes(ext)) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
        res.setHeader('Expires', new Date(Date.now() + 31536000000).toUTCString());
      } else if (['.html'].includes(ext)) {
        res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
        res.setHeader('Expires', new Date(Date.now() + 3600000).toUTCString());
      }
    }
  }));

  // SPA catch-all: known routes get 200, unknown routes get 404
  app.use("*", (req, res) => {
    const requestPath = req.originalUrl.split('?')[0];
    const isKnownRoute = KNOWN_ROUTES.includes(requestPath);
    
    if (!isKnownRoute) {
      res.status(404);
    }
    
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
