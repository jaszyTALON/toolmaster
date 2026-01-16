# ToolMaster Electron - Windows Installer Build Guide

## 🎉 You've Successfully Converted ToolMaster to Electron!

This guide will help you build a standalone Windows installer (.exe) that works completely offline with SQLite database.

---

## 📋 Prerequisites

Before building the installer, ensure you have:

- **Node.js 18+** installed
- **Windows 11** (or Windows 10)
- **~500MB** free disk space
- **Internet connection** (only needed for build, not for running the app)

---

## 🚀 Building the Windows Installer

### Step 1: Prepare the Project

```bash
# Navigate to the project directory
cd /path/to/toolmaster

# Clear any previous builds
rm -rf dist .next out
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Migrate Database to SQLite

The app is now configured to use SQLite for offline use. Initialize the database:

```bash
# Create SQLite database
npx prisma migrate deploy

# OR for fresh database with seed
npx prisma db push --force-reset
npx prisma db seed
```

This creates a `toolmaster.db` file in your data directory.

### Step 4: Build the Windows Installer

```bash
# Build both Next.js and Electron installer
npm run build:electron
```

Or if you want to build just the Electron app without installer:

```bash
npm run pack
```

### Step 5: Find Your Installer

The installer will be built at:

```
dist/ToolMaster Setup 1.0.0.exe
```

Or for portable version:

```
dist/ToolMaster 1.0.0.exe
```

---

## 📦 Installer Output Files

After building, you'll find in the `dist/` folder:

| File | Purpose |
|------|---------|
| `ToolMaster Setup 1.0.0.exe` | Full installer (recommended) |
| `ToolMaster 1.0.0.exe` | Portable standalone version |
| `ToolMaster 1.0.0.msi` | Windows MSI installer (alternative) |

---

## ✨ What's Included in the Installer

The built installer includes:

✅ ToolMaster application
✅ Embedded SQLite database
✅ All dependencies bundled
✅ Start menu shortcuts
✅ Desktop shortcut (optional during install)
✅ Uninstaller

**Total Size**: ~150-200MB

---

## 🎯 Installation & Use

### For End Users

1. **Download and Run Installer**
   - Double-click `ToolMaster Setup 1.0.0.exe`
   - Follow the installation wizard
   - Choose installation directory (default: `C:\Program Files\ToolMaster`)

2. **Launch Application**
   - Desktop shortcut
   - Start Menu → ToolMaster
   - Or direct executable

3. **First Run**
   - Demo account will be available
   - Email: `demo@example.com`
   - Password: `demo1234`
   - All 12 tool slots pre-configured

4. **Works Offline**
   - No internet required after installation
   - SQLite database stored locally
   - All features fully functional

---

## 🔧 Development Workflow

### For Local Development Testing

```bash
# Start both Next.js dev server and Electron
npm run dev

# OR start them separately
npm run dev:next          # Terminal 1
npm run dev:electron      # Terminal 2
```

This launches the app with hot-reload for development.

### Building for Testing

```bash
# Build without installer (faster)
npm run pack

# Then run the unpacked app
dist\win-unpacked\ToolMaster.exe
```

---

## 🗂️ Project Structure Changes

The app now uses this structure for Electron:

```
ToolMaster/
├── public/
│   ├── electron.js              # Main Electron process
│   ├── electron-dev.js          # Development Electron process
│   ├── electron-preload.js      # Security preload script
│   └── icon.ico                 # Application icon
├── electron-builder.yml         # Electron builder config
├── .next/                       # Built Next.js app
├── dist/                        # Output installers
└── node_modules/
```

---

## 🛠️ Customization

### Change Application Icon

Replace `public/icon.ico` with your own icon file.

**Icon requirements:**
- Format: `.ico` file (512x512 or 256x256 pixels)
- Alternative: `.png` files for different sizes

Then rebuild:

```bash
npm run build:electron
```

### Change Installation Directory

Edit `electron-builder.yml`:

```yaml
nsis:
  installDirectory: "C:\\MyApps\\ToolMaster"  # Change this
```

### Change Application Name

Edit `package.json`:

```json
{
  "name": "toolmaster",
  "productName": "ToolMaster",  // Change this
  "version": "1.0.0"
}
```

### Change Installer Name

Edit `electron-builder.yml`:

```yaml
appId: com.toolmaster.app
productName: "My Tool Manager"  // Change this
```

---

## 📊 Database Management

### Database Location

User data is stored at:

```
Windows:  C:\Users\[Username]\AppData\Local\ToolMaster\toolmaster.db
```

SQLite database file contains:
- User accounts
- Tool configurations (all 12 slots)
- Magazine settings
- Password reset tokens

### Backup Database

```bash
# Database file is located at
%APPDATA%\ToolMaster\toolmaster.db

# Copy this file to backup
```

### Reset Database

Delete the database file and restart the app:

```bash
# Database will be recreated on startup
rm %APPDATA%\ToolMaster\toolmaster.db
```

---

## 🐛 Troubleshooting

### Issue: "Build failed - Node modules not found"

**Solution:**
```bash
rm -rf node_modules
npm install
npm run build:electron
```

### Issue: Installer is very large (>500MB)

**Reason:** This is normal - includes Node.js runtime and dependencies.

**To reduce size:**
- Remove unused dependencies
- Use `npm audit` to check for unused packages

### Issue: "Cannot find toolmaster.db"

**Solution:** The database is created automatically on first run. If not:

```bash
npx prisma migrate deploy
npx prisma db seed
```

### Issue: Port 3000 already in use during dev

**Solution:**
```bash
PORT=3001 npm run dev
```

### Issue: App won't start after installation

**Solutions:**
1. Reinstall the application
2. Check that `%APPDATA%\ToolMaster` folder exists
3. Check Windows Event Viewer for error logs

---

## 🔐 Security Notes

The Electron app includes:

✅ Context isolation enabled
✅ Sandbox mode enabled
✅ Node.js integration disabled
✅ Preload script for safe IPC
✅ No dangerous permissions

---

## 📦 Distribution

### Share Your Installer

1. **Direct Download**
   - Upload `dist/ToolMaster Setup 1.0.0.exe` to your website
   - Users can download and run directly

2. **Portable Version**
   - Share `dist/ToolMaster 1.0.0.exe` (portable)
   - No installation required, just run

3. **Cloud Storage**
   - Upload to Google Drive, Dropbox, etc.
   - Users download and install

---

## 🔄 Update Workflow

When you update the app:

1. **Update version in `package.json`:**
   ```json
   "version": "1.1.0"
   ```

2. **Update Electron version (if needed):**
   ```bash
   npm install electron@latest
   ```

3. **Rebuild installer:**
   ```bash
   npm run build:electron
   ```

4. **New installer filename:**
   ```
   dist/ToolMaster Setup 1.1.0.exe
   ```

---

## 📝 Build Logs

To see detailed build logs:

```bash
# Verbose output
npm run build:electron -- --verbose

# Or set environment variable
set DEBUG=electron-builder
npm run build:electron
```

---

## ✅ Verification Checklist

Before distributing your installer:

- [ ] Installer builds without errors
- [ ] Installation wizard runs smoothly
- [ ] App launches after installation
- [ ] Demo account works (demo@example.com / demo1234)
- [ ] All 12 tool slots are configured
- [ ] Wheel rotates smoothly
- [ ] Import/Export works
- [ ] Offline functionality verified
- [ ] Icon displays correctly
- [ ] Uninstaller removes all files

---

## 🎓 Common Commands Reference

```bash
# Development
npm run dev                    # Start dev with hot reload
npm run dev:next             # Start Next.js only
npm run dev:electron         # Start Electron only

# Building
npm run build:nextjs         # Build Next.js app only
npm run build:electron       # Build Next.js + Electron installer
npm run pack                 # Build without creating installer
npm run dist                 # Create all distribution files

# Database
npx prisma migrate deploy    # Run migrations
npx prisma db push          # Push schema
npx prisma db seed          # Seed demo data
npx prisma studio           # Visual editor

# Cleanup
rm -rf .next dist out       # Clean build artifacts
rm -rf node_modules         # Clean dependencies
npm install                 # Reinstall dependencies
```

---

## 🚀 Next Steps

1. **Test the Build**
   ```bash
   npm run build:electron
   dist\ToolMaster Setup 1.0.0.exe  # Run installer
   ```

2. **Test All Features**
   - Verify wheel rotates
   - Test tool configuration
   - Check import/export
   - Confirm offline functionality

3. **Customize** (Optional)
   - Change icon
   - Update app name
   - Modify colors/styling
   - Add splash screen

4. **Distribute**
   - Upload installer to your website
   - Share via download link
   - Distribute to users

---

## 📞 Support

If you encounter issues:

1. Check the **Troubleshooting** section above
2. Review build logs with `--verbose` flag
3. Ensure all dependencies are installed
4. Try a clean rebuild: `npm install && npm run build:electron`

---

## 🎉 Success!

Your ToolMaster application is now packaged as a professional Windows installer!

**Features:**
- ✅ Standalone executable
- ✅ No external dependencies needed
- ✅ Offline operation
- ✅ SQLite database included
- ✅ Professional installer
- ✅ Uninstaller included
- ✅ Windows integration

**Your users can now:**
1. Download the installer
2. Double-click to install
3. Run the application
4. Use all features immediately
5. No internet required

**Happy building!** 🚀

---

**Version**: 1.0.0
**Last Updated**: January 2024
**Status**: Ready for Distribution
