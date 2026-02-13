import express, { type Request, Response, NextFunction } from "express";
import compression from "compression";
import fs from "fs";
import path from "path";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();

// Trust proxy - required for correct host/protocol detection behind reverse proxy
app.set('trust proxy', true);

// Canonical URL handling: redirect non-www and IP addresses to https://www.getpromptfix.com
app.use((req, res, next) => {
  const forwardedHost = req.get('x-forwarded-host') || '';
  const host = req.get('host') || '';
  const hostname = req.hostname || '';
  
  const actualHost = (forwardedHost || host || hostname).toLowerCase().split(':')[0];
  const isIPAddress = /^(\d{1,3}\.){3}\d{1,3}$/.test(actualHost);
  
  if (isIPAddress) {
    const redirectUrl = `https://www.getpromptfix.com${req.originalUrl}`;
    return res.redirect(301, redirectUrl);
  }
  
  // Redirect non-www to www canonical URL
  if (actualHost === 'getpromptfix.com') {
    const redirectUrl = `https://www.getpromptfix.com${req.originalUrl}`;
    return res.redirect(301, redirectUrl);
  }
  
  next();
});

app.use(compression());

// Clean URL redirects
app.use((req, res, next) => {
  const url = req.originalUrl;
  
  if (url.endsWith('/index.html')) {
    const cleanUrl = url.replace('/index.html', '/');
    return res.redirect(301, cleanUrl);
  }
  
  if (url.endsWith('.html')) {
    const cleanUrl = url.replace('.html', '');
    return res.redirect(301, cleanUrl);
  }
  
  next();
});

const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
  }),
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

// Serve sitemap.xml and robots.txt with correct Content-Type BEFORE Vite/static middleware
function findStaticFile(filename: string): string | null {
  const candidates = [
    path.resolve(process.cwd(), 'dist', 'public', filename),
    path.resolve(process.cwd(), 'client', 'public', filename),
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return null;
}

app.get('/sitemap.xml', (_req, res) => {
  const filePath = findStaticFile('sitemap.xml');
  if (filePath) {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(filePath);
  } else {
    res.status(404).send('Sitemap not found');
  }
});

app.get('/robots.txt', (_req, res) => {
  const filePath = findStaticFile('robots.txt');
  if (filePath) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(filePath);
  } else {
    res.status(404).send('Robots.txt not found');
  }
});

(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    },
  );
})();
