# Deploy "secret" to GitHub & Railway

## Step 1: Push your project to GitHub

Open **PowerShell** or **Command Prompt** and run these commands **one by one**.  
Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username (e.g. if your profile is github.com/johndoe, use `johndoe`).

```powershell
cd c:\Users\User\Desktop\secret
```

```powershell
git init
```

```powershell
git add .
```

```powershell
git commit -m "Initial commit - For My Love website"
```

```powershell
git branch -M main
```

```powershell
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/secret.git
```

```powershell
git push -u origin main
```

When you run `git push`, GitHub may ask you to sign in (browser or token). Do that, then run `git push -u origin main` again if it didn’t finish.

---

## Step 2: Deploy on Railway

1. Go to **https://railway.com** and sign in (use **Login with GitHub**).
2. Click **"New Project"**.
3. Choose **"Deploy from GitHub repo"**.
4. Select your **secret** repository. If you don’t see it, click **"Configure GitHub App"** and allow Railway to see your repos, then pick **secret** again.
5. Wait for the build to finish (usually 1–2 minutes).
6. Click your service (the deployed app), go to **Settings** → under **Networking** click **"Generate domain"** (or **"Add domain"**).
7. Copy the URL (e.g. `https://secret-production-xxxx.up.railway.app`) and open it in your browser.

Your site will be live. Use PIN **010125** on the landing page to enter.
