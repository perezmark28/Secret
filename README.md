# For My Love

A personal romantic website with a small backend so **Memories** (photos) and **Gallery** (videos) sync across all devices.

## Deploy to Railway

1. Push this folder to a GitHub repo.
2. In [Railway](https://railway.com), click **New Project** → **Deploy from GitHub** and select the repo.
3. Railway runs `npm install` and `npm start` (Node + Express server).
4. Add a **Public Domain** in the project settings to get a URL like `your-app.up.railway.app`.

Open the URL and use PIN **010125** on the landing page to enter.

## Optional: Keep uploads across deploys

By default, photos and videos are stored on the server’s disk. On Railway, the filesystem is **ephemeral**, so uploads are lost when you redeploy.

To keep them:

1. In your Railway project, open your service → **Settings** → **Volumes**.
2. Click **Add Volume**, create a volume, and mount it at `/data`.
3. In the same service, go to **Variables** and add: **`UPLOAD_DIR`** = **`/data`**.

New uploads will be stored in the volume and persist across deploys.

## Run locally

```bash
npm install
npm start
```

Then open http://localhost:3000 (or the port shown). Memories and Gallery use the API; if the server isn’t running, the site falls back to saving in the browser (per device only).
