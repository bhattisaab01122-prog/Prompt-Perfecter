# PromptFix — Hostinger Deployment Guide

## What's included in this package

```
promptfix-hostinger.zip
├── dist/                  ← compiled app (server + frontend, ready to run)
│   ├── index.cjs          ← Node.js server (single compiled file)
│   └── public/            ← static frontend assets (HTML, CSS, JS, images)
├── package.json           ← dependencies list
├── package-lock.json      ← exact dependency versions
├── .env.example           ← environment variable template
├── init.sql               ← database setup (run once)
└── README-DEPLOY.md       ← this file
```

---

## Requirements

- **Node.js** 18 or higher
- **PostgreSQL** database (Hostinger offers this, or use [Neon.tech](https://neon.tech) free tier)
- **Google Gemini API key** (get one free at [aistudio.google.com](https://aistudio.google.com/app/apikey))

---

## Step-by-Step Setup on Hostinger

### 1. Set up your PostgreSQL database

Hostinger provides PostgreSQL under **Hosting → Databases**.  
Alternatively, create a free PostgreSQL database at [neon.tech](https://neon.tech).

Once you have a database, connect to it and run **`init.sql`** to create the tables:

```sql
-- Paste the contents of init.sql into your database query editor and run it
```

You will get a connection string that looks like:
```
postgresql://username:password@host:5432/database_name
```

### 2. Upload files to Hostinger

Upload the following files/folders to your Hostinger Node.js app root directory via **File Manager** or **FTP**:

```
dist/
package.json
package-lock.json
.env           ← (create this from .env.example)
```

> **Do NOT upload** `README-DEPLOY.md`, `.env.example`, or `init.sql` to the server.

### 3. Create your `.env` file

In your Hostinger file manager, create a file named `.env` in the app root:

```env
DATABASE_URL=postgresql://your_user:your_password@your_host:5432/your_db
GEMINI_API_KEY=your-gemini-api-key-here
NODE_ENV=production
PORT=3000
```

Replace each value with your actual credentials.

### 4. Install dependencies

In the Hostinger Node.js terminal (SSH or built-in terminal), run:

```bash
npm install --production
```

This installs only the runtime dependencies (not dev tools).

### 5. Configure the start command

In Hostinger's Node.js app settings, set the **entry point / startup file** to:

```
dist/index.cjs
```

Or if they ask for a start command:

```bash
NODE_ENV=production node dist/index.cjs
```

### 6. Start the application

Click **Start** (or **Restart**) in Hostinger's Node.js control panel.  
Your app will be available at your domain.

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection string |
| `GEMINI_API_KEY` | ✅ Yes | Your Google Gemini API key (free at aistudio.google.com) |
| `PORT` | Optional | Server port (default: 3000) |
| `NODE_ENV` | ✅ Yes | Must be `production` |

---

## Troubleshooting

**App won't start:**
- Check that `NODE_ENV=production` is set
- Check that `DATABASE_URL` is correct and the database is reachable
- Make sure you ran `npm install --production`

**"DATABASE_URL must be set" error:**
- Your `.env` file is missing or not being read — confirm it's in the same folder as `dist/`

**Gemini errors / optimization not working:**
- Verify your `GEMINI_API_KEY` is valid at [aistudio.google.com](https://aistudio.google.com/app/apikey)
- The free tier has generous limits — no billing required

**Port conflict:**
- Change `PORT` in your `.env` to match what Hostinger assigns (often `3000` or `8080`)

---

## Custom Domain

In Hostinger's control panel under **Domains**, point your domain to the Node.js app.  
SSL is handled automatically by Hostinger.

Update the canonical URL in `dist/public/index.html` if needed — search for `getpromptfix.com` and replace with your domain.

---

## Support

For issues with the application itself, check the Node.js app logs in Hostinger's control panel.
