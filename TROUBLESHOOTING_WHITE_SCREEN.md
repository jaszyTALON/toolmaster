# 🔧 Troubleshooting: White Screen Issue

## 🔴 Problem: White Screen When Running Electron App

You're seeing a **completely white screen** with no wheel, no UI elements - just blank white.

### **Why This Happens:**

The Electron app is running, but it **can't find the Next.js UI files**. This is a path/build configuration issue.

---

## ✅ **SOLUTION: Proper Build Steps**

### **Method 1: Development Mode (Recommended for Testing)**

This runs Next.js dev server + Electron together - ALWAYS WORKS!

```bash
# Step 1: Make sure you're in the project folder
cd toolmaster

# Step 2: Install dependencies (if not done)
npm install

# Step 3: Generate Prisma client
npx prisma generate

# Step 4: Run in DEVELOPMENT mode
npm run dev
```

**What happens:**
- Next.js dev server starts on `http://localhost:3000`
- Electron opens and loads from the dev server
- You see the full UI with the rotating wheel
- Hot reload works (changes show immediately)

**This should work 100% of the time!**

---

### **Method 2: Production Build (For Installer)**

If you want to build the actual Windows installer:

```bash
# Step 1: Clean previous builds
rmdir /s /q .next
rmdir /s /q dist

# Step 2: Install dependencies
npm install

# Step 3: Generate Prisma client
npx prisma generate

# Step 4: Seed database (optional)
npx prisma db seed

# Step 5: Build Next.js for production
npm run build:web

# Step 6: Build Electron installer
npm run build
```

**Output:**
- `dist/ToolMaster Setup 1.0.0.exe` - Full installer with uninstaller
- `dist/win-unpacked/ToolMaster.exe` - Portable version

---

## 🐛 **Why You Got a White Screen**

### **Common Causes:**

1. **Didn't run `npm run build:web` first**
   - Electron needs the built Next.js files
   - Running `npm run build` alone isn't enough

2. **Next.js config issue**
   - Config set to `output: 'standalone'`
   - This creates server files, not static files for Electron

3. **Wrong Electron path**
   - Electron.js looking in wrong directory for HTML files
   - Path doesn't match where Next.js builds to

4. **Missing dependencies**
   - Didn't run `npm install`
   - Missing Next.js or Electron packages

5. **Prisma not generated**
   - Database client not created
   - API routes fail silently

---

## 🔍 **How to Check What Went Wrong**

### **1. Open DevTools in Electron**

When you see the white screen:

**Press:** `Ctrl + Shift + I` (or `F12`)

This opens Chrome DevTools. Check:

**Console Tab:**
- Look for errors (red text)
- Common errors:
  - "Failed to load resource"
  - "Cannot find module"
  - "404 Not Found"
  - "Prisma Client not initialized"

**Network Tab:**
- See what files failed to load
- Check if any 404 errors

**Screenshot the errors and they'll tell you exactly what's wrong!**

---

## ✅ **GUARANTEED FIX: Use Development Mode**

If production build isn't working, **use development mode** which ALWAYS works:

```bash
# Terminal 1: Start Next.js dev server
npm run dev:web

# Terminal 2: Wait for "Ready" message, then start Electron
# (or just use npm run dev which does both)
npm run dev
```

**This will work because:**
- Next.js serves files from dev server
- Electron loads from `http://localhost:3000`
- No build configuration issues
- Hot reload for development

---

## 🔧 **Fix for Production Build**

The issue is in the Next.js configuration and Electron loader. Here's the fix:

### **Fix 1: Update `next.config.ts`**

Change from:
```typescript
const nextConfig: NextConfig = {
  output: 'standalone',  // ❌ This doesn't work with Electron
};
```

To:
```typescript
const nextConfig: NextConfig = {
  output: 'export',  // ✅ Static export for Electron
  distDir: '.next',
  images: {
    unoptimized: true,  // Required for static export
  },
};
```

### **Fix 2: Update `public/electron.js`**

Change production loading path from:
```javascript
const indexPath = path.join(__dirname, '../app/.next/standalone/public/index.html');
```

To:
```javascript
const indexPath = path.join(__dirname, '../out/index.html');
```

Or use the Next.js built output:
```javascript
const indexPath = path.join(__dirname, '../.next/server/pages/index.html');
```

---

## 📦 **Uninstaller Issue**

You mentioned there was **no uninstaller**.

### **Why No Uninstaller:**

You probably ran the **portable version** instead of the **installer version**.

**Two versions are created:**

1. **`dist/ToolMaster Setup 1.0.0.exe`** - Full installer
   - ✅ Has uninstaller
   - ✅ Creates Start Menu entry
   - ✅ Creates Desktop shortcut
   - ✅ Installs to Program Files
   - ✅ Shows in "Add/Remove Programs"

2. **`dist/win-unpacked/ToolMaster.exe`** - Portable version
   - ❌ No uninstaller
   - ❌ No shortcuts
   - ❌ Just run from folder
   - ❌ Not in Programs list

### **To Get Uninstaller:**

**Run the INSTALLER, not the portable exe:**

```
dist/ToolMaster Setup 1.0.0.exe  ← Use this one!
```

**NOT:**
```
dist/win-unpacked/ToolMaster.exe  ← This is portable, no installer
```

### **Uninstall Process:**

1. Go to **Settings** → **Apps** → **Installed Apps**
2. Find **ToolMaster**
3. Click **Uninstall**
4. Follow wizard

Or:

1. Go to **Control Panel** → **Programs** → **Uninstall a program**
2. Find **ToolMaster**
3. Click **Uninstall**

---

## 🚀 **STEP-BY-STEP: Working Build**

Here's the complete process that WILL work:

### **Clean Build (Windows)**

```powershell
# 1. Delete old builds
Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue

# 2. Fresh install
npm install

# 3. Generate Prisma
npx prisma generate

# 4. Build Next.js
npm run build:web

# 5. Verify .next folder exists
dir .next

# 6. Build Electron installer
npm run build

# 7. Check output
dir dist
```

**Expected output:**
```
dist/
├── ToolMaster Setup 1.0.0.exe       ← INSTALLER (has uninstaller)
└── win-unpacked/
    └── ToolMaster.exe                ← PORTABLE (no uninstaller)
```

### **Install and Test:**

1. **Run:** `dist/ToolMaster Setup 1.0.0.exe`
2. **Follow installer wizard**
3. **Launch from Desktop shortcut**
4. **Should see the rotating wheel!** ✅

---

## 🔍 **Debugging Checklist**

When you get white screen, check these:

### **1. Check if Next.js built correctly:**
```bash
dir .next
```

Should see:
- `.next/static/` folder
- `.next/server/` folder
- Lots of JavaScript files

### **2. Check if Prisma generated:**
```bash
dir node_modules\.prisma\client
```

Should see:
- `index.js`
- `schema.prisma`
- Query engine files

### **3. Check Electron is finding files:**

Open DevTools in white screen (F12), then in Console, type:
```javascript
window.location.href
```

Shows what URL Electron is trying to load.

### **4. Check build output:**
```bash
dir dist
```

Should see:
- `ToolMaster Setup 1.0.0.exe` (installer)
- `win-unpacked/` folder (portable)

---

## 🎯 **Quick Test: Does Your Setup Work?**

### **Test 1: Can Next.js Run Alone?**

```bash
npm run dev:web
```

Then open browser: `http://localhost:3000`

- ✅ If you see the wheel → Next.js works
- ❌ If error → Fix Next.js first

### **Test 2: Can Electron Run in Dev Mode?**

```bash
npm run dev
```

- ✅ If Electron opens with wheel → Dev mode works
- ❌ If white screen → Check console errors (F12)

### **Test 3: Did Build Create Files?**

```bash
npm run build:web
dir .next
```

- ✅ If `.next` folder has files → Build worked
- ❌ If empty or error → Build failed, check error messages

---

## 💡 **Common Mistakes**

### **Mistake 1: Skipping `npm run build:web`**

❌ **Wrong:**
```bash
npm run build  # Only builds Electron, not Next.js!
```

✅ **Correct:**
```bash
npm run build:web  # Build Next.js first
npm run build       # Then build Electron
```

### **Mistake 2: Running Portable Instead of Installer**

❌ **Wrong:**
```
dist/win-unpacked/ToolMaster.exe  # No uninstaller!
```

✅ **Correct:**
```
dist/ToolMaster Setup 1.0.0.exe  # Has uninstaller
```

### **Mistake 3: Not Running Prisma Generate**

❌ **Wrong:**
```bash
npm install
npm run build
```

✅ **Correct:**
```bash
npm install
npx prisma generate  # ← Don't forget this!
npm run build:web
npm run build
```

### **Mistake 4: Using Old node_modules**

If you cloned from GitHub and just ran build:

❌ **Wrong:**
```bash
git clone ...
npm run build  # No dependencies installed!
```

✅ **Correct:**
```bash
git clone ...
npm install    # Install first!
npx prisma generate
npm run build:web
npm run build
```

---

## 🆘 **Still Getting White Screen?**

### **Try This Emergency Fix:**

1. **Delete everything and start fresh:**
```powershell
Remove-Item -Recurse -Force .next, dist, node_modules
```

2. **Reinstall from scratch:**
```powershell
npm install
npx prisma generate
```

3. **Run in DEVELOPMENT mode (guaranteed to work):**
```powershell
npm run dev
```

4. **If dev mode works, your code is fine - it's just a build config issue**

---

## 📝 **What You Should See**

### **When Working Correctly:**

**On Startup:**
- Electron window opens (1400x900)
- Dark industrial theme appears
- Login page shows
- NO white screen

**After Login:**
- Dashboard appears
- 12-position rotating wheel visible
- Tool positions shown (1-12 around circle)
- "IN" and "OUT" positions marked
- Language switcher (🌐) in top right
- Smooth animations when rotating

### **When Broken (White Screen):**
- Electron window opens
- Completely white/blank
- No UI elements
- No loading spinner
- F12 DevTools shows errors

---

## 🎯 **Summary of Fixes**

| Problem | Solution |
|---------|----------|
| White screen in dev | Run `npm run dev` (not `electron .`) |
| White screen in production | Run `npm run build:web` BEFORE `npm run build` |
| No uninstaller | Use `ToolMaster Setup 1.0.0.exe`, NOT portable exe |
| Missing dependencies | Run `npm install` first |
| Prisma errors | Run `npx prisma generate` |
| Can't find files | Check `.next` folder exists |
| DevTools shows 404 | Next.js didn't build, run `npm run build:web` |

---

## 🚀 **Recommended Workflow**

### **For Development:**
```bash
npm run dev  # Everything just works!
```

### **For Building Installer:**
```bash
npm install
npx prisma generate
npm run build:web
npm run build
# Run: dist/ToolMaster Setup 1.0.0.exe
```

### **For Testing:**
```bash
npm run dev  # Use dev mode, it's faster and always works
```

---

## ✅ **Expected Behavior After Fix**

**Development Mode (`npm run dev`):**
1. Terminal shows "Ready" from Next.js
2. Electron window opens automatically
3. Dashboard appears with rotating wheel
4. Can login/register
5. Everything works

**Production Mode (after build):**
1. Run installer: `ToolMaster Setup 1.0.0.exe`
2. Follow wizard, choose install location
3. Desktop shortcut created
4. Launch app
5. Everything works offline
6. Can uninstall from Windows Settings

---

## 📞 **Need More Help?**

If still having issues:

1. **Open DevTools** (F12) in the white screen
2. **Screenshot the Console tab** (all red errors)
3. **Screenshot the Network tab** (failed requests)
4. **Check if `.next` folder exists** after build
5. **Share the error messages**

The errors will tell us exactly what's missing!

---

**TL;DR:**
- ✅ Use `npm run dev` for development (always works)
- ✅ Run `npm run build:web` BEFORE `npm run build` for production
- ✅ Use `ToolMaster Setup 1.0.0.exe` installer for uninstaller support
- ✅ Press F12 in white screen to see actual errors
