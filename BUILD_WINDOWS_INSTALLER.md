# 🪟 Build Windows Installer - Complete Guide

## ✨ What You'll Create

A professional **Windows installer** (.exe setup file) for your ToolMaster application:

- ✅ **One-click installer** with setup wizard
- ✅ **Desktop shortcut** created automatically
- ✅ **Start Menu entry** added
- ✅ **Uninstaller** included
- ✅ **Offline operation** - no internet required
- ✅ **SQLite database** embedded
- ✅ **All 9 languages** included
- ✅ **Professional installer UI**

**Output:** `ToolMaster Setup 1.0.0.exe` (~250 MB)

---

## 🎯 Prerequisites

### **Required:**
1. **Windows 10 or 11** computer
2. **Node.js 20+** installed
   - Download: https://nodejs.org/
   - LTS version recommended
3. **Git** (optional, for cloning)
   - Download: https://git-scm.com/

### **Verify Installation:**
```powershell
# Open PowerShell or Command Prompt
node --version
# Should show: v20.x.x or higher

npm --version
# Should show: 10.x.x or higher
```

---

## 🚀 Step-by-Step Build Instructions

### **Step 1: Open PowerShell or Command Prompt**

Press **Windows Key + R**, type `powershell` or `cmd`, press Enter.

### **Step 2: Navigate to Project Directory**

```powershell
cd "C:\path\to\your\toolmaster\project"
```

For example:
```powershell
cd "C:\Users\YourName\Documents\toolmaster"
```

Or if using the upload:
```powershell
cd "C:\datadrive\AC\code\avery-claude\uploads\3a3aaecb-169a-4350-9bb3-9c171cfa55a9"
```

### **Step 3: Install Dependencies**

```powershell
npm install
```

This downloads all required packages. Takes 3-5 minutes.

**Expected output:**
```
added 1500+ packages in 3m
```

### **Step 4: Set Up Database Schema**

```powershell
npx prisma generate
```

Generates Prisma client for SQLite database.

**Expected output:**
```
✔ Generated Prisma Client
```

### **Step 5: Build Next.js Application**

```powershell
npm run build:web
```

Creates optimized production build. Takes 2-3 minutes.

**Expected output:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                   ...      ...
└ ○ /dashboard                          ...      ...
```

### **Step 6: Build Windows Installer** ⭐

```powershell
npm run build
```

This creates:
1. Next.js production build
2. Electron app package
3. **Windows installer** (.exe)

Takes 5-10 minutes.

**Expected output:**
```
  • electron-builder  version=26.4.0
  • loaded configuration  file=electron-builder.yml
  • building        target=nsis file=ToolMaster Setup 1.0.0.exe
  • building        target=portable file=ToolMaster 1.0.0.exe
  • packaging       platform=win32 arch=x64 electron=40.0.0
  • building block map  blockMapFile=dist\ToolMaster Setup 1.0.0.exe.blockmap
  • building block map  blockMapFile=dist\ToolMaster 1.0.0.exe.blockmap
```

**Build complete!** ✅

---

## 📦 Output Files

After successful build, you'll find:

```
dist/
├── ToolMaster Setup 1.0.0.exe      ← INSTALLER (This is what you want!)
├── ToolMaster 1.0.0.exe            ← Portable version
├── ToolMaster Setup 1.0.0.exe.blockmap
└── win-unpacked/                   ← Unpacked app files
    └── ToolMaster.exe
```

### **Main Installer File:**
```
📦 ToolMaster Setup 1.0.0.exe
   Size: ~250 MB
   Type: NSIS Installer
   Purpose: Install ToolMaster on Windows
```

---

## 🎬 Installing Your App

### **Step 1: Run the Installer**

Double-click: `ToolMaster Setup 1.0.0.exe`

### **Step 2: Setup Wizard**

**Welcome Screen:**
```
┌─────────────────────────────────────┐
│  Welcome to ToolMaster Setup        │
│                                     │
│  This wizard will guide you through │
│  the installation of ToolMaster.    │
│                                     │
│  [Next]  [Cancel]                   │
└─────────────────────────────────────┘
```

Click **Next**.

### **Step 3: Choose Install Location**

```
┌─────────────────────────────────────┐
│  Select Destination Location        │
│                                     │
│  Where should ToolMaster be         │
│  installed?                         │
│                                     │
│  C:\Program Files\ToolMaster        │
│                                     │
│  [Browse...]                        │
│                                     │
│  [Back]  [Next]  [Cancel]           │
└─────────────────────────────────────┘
```

- Default location is fine: `C:\Program Files\ToolMaster`
- Or click **Browse** to choose different location
- Click **Next**

### **Step 4: Select Start Menu Folder**

```
┌─────────────────────────────────────┐
│  Select Start Menu Folder           │
│                                     │
│  ToolMaster                         │
│                                     │
│  [Back]  [Install]  [Cancel]        │
└─────────────────────────────────────┘
```

Click **Install**.

### **Step 5: Installation Progress**

```
┌─────────────────────────────────────┐
│  Installing...                      │
│                                     │
│  ████████████████░░░░░░░  75%       │
│                                     │
│  Extracting files...                │
└─────────────────────────────────────┘
```

Wait for installation to complete (30 seconds - 1 minute).

### **Step 6: Completion**

```
┌─────────────────────────────────────┐
│  Completing ToolMaster Setup        │
│                                     │
│  ✓ Installation complete!           │
│                                     │
│  □ Run ToolMaster                   │
│                                     │
│  [Finish]                           │
└─────────────────────────────────────┘
```

- Check **"Run ToolMaster"** if you want to launch immediately
- Click **Finish**

### **Step 7: App Launches!**

ToolMaster opens automatically with:
- Desktop shortcut created ✅
- Start Menu entry created ✅
- Ready to use ✅

---

## 🎯 Using the Installed App

### **Ways to Launch ToolMaster:**

**Method 1: Desktop Shortcut**
```
Desktop → Double-click "ToolMaster" icon
```

**Method 2: Start Menu**
```
Windows Key → Type "ToolMaster" → Click
```

**Method 3: Direct Executable**
```
C:\Program Files\ToolMaster\ToolMaster.exe
```

### **First Time Setup:**

1. **App launches** - Beautiful ToolMaster window opens
2. **Create account** or use demo:
   - Email: `demo@example.com`
   - Password: `Demo123!`
3. **Dashboard appears** with rotating wheel
4. **Start managing tools!**

---

## 🗑️ Uninstalling

### **Method 1: Windows Settings**
```
Settings → Apps → Apps & features
→ Search "ToolMaster"
→ Click ToolMaster
→ Uninstall
```

### **Method 2: Start Menu**
```
Start Menu → ToolMaster folder
→ Uninstall ToolMaster
```

### **Method 3: Control Panel**
```
Control Panel → Programs and Features
→ Select ToolMaster
→ Uninstall
```

**What gets removed:**
- ✅ All program files
- ✅ Desktop shortcut
- ✅ Start Menu entries
- ✅ Uninstaller

**What's preserved:**
- User data (if needed for reinstall)
- Can be manually deleted from `%APPDATA%\ToolMaster`

---

## 🎨 Installer Features

### **Professional Setup Wizard:**
- Clean, modern UI
- Step-by-step installation
- Progress indicators
- Cancel option at any step

### **Installation Options:**
- ✅ Choose installation directory
- ✅ Create desktop shortcut (enabled by default)
- ✅ Create Start Menu shortcut (enabled by default)
- ✅ Add to Windows Programs list

### **Included in Installation:**
- ✅ ToolMaster executable
- ✅ SQLite database (embedded)
- ✅ All 9 language files
- ✅ Chromium runtime (for Electron)
- ✅ All dependencies bundled
- ✅ Uninstaller

### **No Additional Requirements:**
- ❌ No internet needed
- ❌ No database setup
- ❌ No configuration files
- ❌ No admin rights required (for user install)
- ❌ No additional software

---

## 📊 File Sizes

**Installer:**
```
ToolMaster Setup 1.0.0.exe  ~250 MB (compressed)
```

**Installed Size:**
```
C:\Program Files\ToolMaster\  ~400 MB (uncompressed)
```

**Breakdown:**
- Electron runtime: ~150 MB
- Chromium engine: ~120 MB
- Next.js app: ~50 MB
- Dependencies: ~50 MB
- Language files: <1 MB
- Database: <10 MB

---

## 🔧 Build Troubleshooting

### **Issue: "npm command not found"**

**Solution:** Install Node.js from https://nodejs.org/

### **Issue: Build fails with errors**

**Solution:**
```powershell
# Clear cache and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm run build
```

### **Issue: "EPERM: operation not permitted"**

**Solution:** Run PowerShell as Administrator:
```
Right-click PowerShell → Run as Administrator
```

### **Issue: Antivirus blocking electron-builder**

**Solution:** Temporarily disable antivirus or add exception for:
- `node_modules\electron\`
- `node_modules\electron-builder\`

### **Issue: Out of disk space**

**Solution:** Need ~2 GB free space:
- ~500 MB for node_modules
- ~500 MB for build output
- ~1 GB temporary files

### **Issue: Build takes forever**

**Solution:** First build takes longest (10-15 min). Subsequent builds faster (5-7 min).

---

## 💡 Build Tips

### **Speed Up Builds:**
```powershell
# Only rebuild installer (skip Next.js build if unchanged)
npx electron-builder -w
```

### **Build Portable Version Only:**
```powershell
# Faster, no installer
npm run pack
```

### **Clean Build (if issues):**
```powershell
# Delete previous build
Remove-Item -Recurse -Force dist
Remove-Item -Recurse -Force .next

# Rebuild everything
npm run build
```

### **Check Build Configuration:**
```powershell
# View electron-builder config
Get-Content electron-builder.yml
```

---

## 📝 Customization Options

### **Change App Name:**

Edit `package.json`:
```json
{
  "name": "my-custom-name",
  "productName": "My Custom App Name"
}
```

### **Change Version:**

Edit `package.json`:
```json
{
  "version": "2.0.0"
}
```

Output will be: `My Custom App Name Setup 2.0.0.exe`

### **Change Install Directory:**

Edit `electron-builder.yml`:
```yaml
nsis:
  installerLanguages:
    - en_US
  installerHeader: path/to/header.bmp
  installerIcon: path/to/icon.ico
```

### **Add App Icon:**

1. Create `icon.ico` (256x256 pixels)
2. Place in `public/` folder
3. Update `electron-builder.yml`:

```yaml
win:
  icon: public/icon.ico
```

---

## 🎯 Distribution Checklist

Before distributing your installer:

- [ ] Test installer on clean Windows machine
- [ ] Verify app launches after install
- [ ] Test all features (wheel, languages, print)
- [ ] Check desktop shortcut works
- [ ] Check Start Menu entry works
- [ ] Test uninstaller
- [ ] Verify offline operation (disconnect internet)
- [ ] Check database creates properly
- [ ] Test all 9 languages
- [ ] Verify print functionality
- [ ] Test with demo account
- [ ] Create new user account (test registration)
- [ ] Export/import configuration (test backup)

---

## 📦 Installer Contents

Your installer includes:

**Application Files:**
```
ToolMaster.exe               Main executable
resources/                   App resources
  └── app.asar              Packaged app code
locales/                     UI language files
public/locales/              Translation files (9 languages)
*.dll                        System libraries
*.pak                        Chromium resources
```

**Database:**
```
toolmaster.db                SQLite database (created on first run)
```

**Configuration:**
```
.env                         Environment variables
prisma/schema.prisma         Database schema
```

---

## 🚀 Quick Build Reference

```powershell
# Full build process (start to finish):

# 1. Install dependencies
npm install

# 2. Generate Prisma client
npx prisma generate

# 3. Build Next.js app
npm run build:web

# 4. Build Windows installer
npm run build

# Done! Find installer at:
# dist/ToolMaster Setup 1.0.0.exe
```

**Total time:** 10-15 minutes (first time)

---

## ✅ Success Checklist

After build completes:

- [ ] Found `ToolMaster Setup 1.0.0.exe` in `dist/` folder
- [ ] File size ~250 MB
- [ ] Double-clicked installer
- [ ] Setup wizard opened
- [ ] Installation completed successfully
- [ ] Desktop shortcut created
- [ ] Start Menu entry created
- [ ] App launches when clicking shortcut
- [ ] Login screen appears
- [ ] Demo account works (demo@example.com / Demo123!)
- [ ] Dashboard shows rotating wheel
- [ ] All features work offline
- [ ] Language switcher has 9 languages
- [ ] Print functionality works
- [ ] Uninstaller is present

---

## 🎉 You're Done!

Your **ToolMaster Windows installer** is ready!

**What you have:**
- ✅ Professional installer with setup wizard
- ✅ One-click installation process
- ✅ Desktop and Start Menu shortcuts
- ✅ Uninstaller included
- ✅ Offline operation (no internet needed)
- ✅ SQLite embedded database
- ✅ All 9 languages included
- ✅ ~250 MB installer file
- ✅ Production-ready for distribution

**Distribute your installer:**
1. Copy `ToolMaster Setup 1.0.0.exe` to USB drive
2. Share via email or file sharing
3. Upload to website for download
4. Users can install with just a few clicks!

**No web hosting, no servers, no internet required - true standalone Windows application!** 🎡✨

---

## 📞 Need Help?

**Build Issues:**
- Check Node.js version: `node --version` (need 20+)
- Clear cache: Delete `node_modules` and reinstall
- Run as Administrator if permission errors
- Disable antivirus temporarily

**Installer Issues:**
- Test on different Windows machine
- Check file isn't corrupted (verify size ~250 MB)
- Run installer as Administrator
- Check Windows Defender SmartScreen (click "Run anyway")

**App Issues:**
- Check desktop shortcut path
- Try running from: `C:\Program Files\ToolMaster\ToolMaster.exe`
- Check database file created in app directory
- Try with demo account first

---

**Last Updated:** January 16, 2024
**Status:** ✅ READY TO BUILD
**Platform:** Windows 10, 11
**Output:** Professional NSIS installer
**Size:** ~250 MB installer
**Installation Time:** 30-60 seconds
**Offline:** 100% - no internet required
