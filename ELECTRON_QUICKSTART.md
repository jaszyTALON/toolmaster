# ToolMaster Electron - Quick Start Guide

## ⚡ 5-Minute Setup to Build Your First Installer

### What Changed?

Your web app is now a **desktop application** with:
- ✅ Standalone Windows installer (.exe)
- ✅ Offline operation (no server needed)
- ✅ SQLite embedded database
- ✅ Professional look and feel
- ✅ Start menu shortcuts

---

## 🚀 Build Your First Installer (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```
**Time: 2 minutes**

### Step 2: Reset Database
```bash
npx prisma db push --force-reset
npx prisma db seed
```
**Time: 30 seconds**

### Step 3: Build Installer
```bash
npm run build:electron
```
**Time: 2-3 minutes**

### Step 4: Find Your Installer
Look in the `dist/` folder:
```
dist/ToolMaster Setup 1.0.0.exe  ← This is your installer!
```

---

## 📦 Installer Files

After building, you'll have:

| File | Use | Size |
|------|-----|------|
| `ToolMaster Setup 1.0.0.exe` | Full installer (recommended) | ~150MB |
| `ToolMaster 1.0.0.exe` | Portable standalone | ~150MB |

**Pick one and share with users!**

---

## 🎯 What Users Get

When someone installs your app:

1. **Double-click installer**
2. **Follow wizard** (2 minutes)
3. **App installed** to `C:\Program Files\ToolMaster\`
4. **Launch from** Start Menu or Desktop shortcut
5. **No internet required** - fully offline
6. **Uninstall** from Windows Control Panel

---

## 💻 Development

### Start Dev Environment
```bash
npm run dev
```

This starts:
- ✅ Next.js dev server on http://localhost:3000
- ✅ Electron window with hot-reload
- ✅ Dev tools visible for debugging

### When Done Editing
```bash
Ctrl+C  # Stop both servers
```

---

## 🔧 Testing Your Build

### Quick Test (no installer)
```bash
npm run pack
dist\win-unpacked\ToolMaster.exe
```

### Full Test (with installer)
```bash
npm run build:electron
dist\ToolMaster Setup 1.0.0.exe
```

Follow the installer wizard to test.

---

## 📝 Database

### Where is the Database?

User data stored in:
```
C:\Users\[Username]\AppData\Local\ToolMaster\toolmaster.db
```

### Backup/Restore

```bash
# Copy this file for backup
C:\Users\[Username]\AppData\Local\ToolMaster\toolmaster.db

# Paste it back to restore
```

### Reset Database

Delete the .db file and restart - it recreates automatically.

---

## 🎨 Customize

### Change the App Icon

1. Get a .ico file (256x256 or 512x512)
2. Save as `public/icon.ico`
3. Rebuild: `npm run build:electron`

### Change the App Name

Edit `package.json`:
```json
"productName": "My Cool App"
```

Then rebuild:
```bash
npm run build:electron
```

---

## 🔄 Update Your App

### When You Make Changes

1. **Edit your code**
2. **Update version** in `package.json`:
   ```json
   "version": "1.1.0"
   ```
3. **Rebuild**:
   ```bash
   npm run build:electron
   ```
4. **New installer**:
   ```
   dist/ToolMaster Setup 1.1.0.exe
   ```

---

## 📊 Project Commands

```bash
# Development
npm run dev                    # Start dev with electron
npm run dev:next             # Next.js only
npm run dev:electron         # Electron only

# Building
npm run build:electron       # Full build + installer (MAIN)
npm run pack                 # Build without installer (faster test)
npm run build:nextjs         # Next.js only

# Database
npx prisma migrate deploy    # Sync database
npx prisma db push          # Push schema
npx prisma db seed          # Add demo data
```

---

## ✅ Quick Checklist

Before sharing your installer:

- [ ] `npm run build:electron` completes without errors
- [ ] Installer file exists in `dist/`
- [ ] Test installer on clean Windows system
- [ ] App launches after installation
- [ ] Demo account works (demo@example.com / demo1234)
- [ ] Wheel rotates smoothly
- [ ] All features work
- [ ] Uninstaller works

---

## 🆘 Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | `rm -rf node_modules && npm install && npm run build:electron` |
| Installer not found | Check `dist/` folder, rebuild with `npm run build:electron` |
| App won't launch | Run `npx prisma db push`, then reinstall |
| Database error | Delete `C:\Users\[You]\AppData\Local\ToolMaster\toolmaster.db` and restart |
| Port 3000 in use | Use `PORT=3001 npm run dev` |

---

## 📦 Share Your App

1. **Built installer** in `dist/ToolMaster Setup 1.0.0.exe`
2. **Upload to** website, Google Drive, Dropbox, etc.
3. **Users download** and run installer
4. **Works offline** - no server needed!

---

## 🎯 Key Differences (Web vs Electron)

| Feature | Web App | Electron App |
|---------|---------|--------------|
| Server needed? | Yes | No |
| Offline? | No | Yes |
| Installation? | No | Yes (to C:\ Program Files) |
| Database | PostgreSQL | SQLite |
| Share with users? | URL | .exe file |
| Works offline? | No | Yes |

---

## 🚀 You're Ready!

```bash
# One command builds everything
npm run build:electron

# Then share the .exe file!
```

**That's it!** Your installer is ready to distribute. 🎉

---

## 📚 Full Details

For in-depth information, see:
- **[ELECTRON_BUILD_GUIDE.md](ELECTRON_BUILD_GUIDE.md)** - Complete build documentation
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Original web deployment info

---

**Version**: 1.0.0
**Last Updated**: January 2024
