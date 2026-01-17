# ⚡ Quick Build Guide - Windows Installer

## 🚀 Build in 4 Commands

```powershell
# 1. Install dependencies (3-5 min)
npm install

# 2. Generate database client (10 sec)
npx prisma generate

# 3. Build Next.js app (2-3 min)
npm run build:web

# 4. Build Windows installer (5-10 min)
npm run build
```

**Total time: 10-15 minutes**

---

## 📦 Output

```
dist/ToolMaster Setup 1.0.0.exe  (~250 MB)
```

This is your **professional Windows installer!**

---

## ✅ What You Get

- ✅ One-click installer with setup wizard
- ✅ Desktop shortcut
- ✅ Start Menu entry
- ✅ Uninstaller
- ✅ Offline operation
- ✅ SQLite database embedded
- ✅ All 9 languages included
- ✅ No web server needed
- ✅ No internet required

---

## 🎯 Installation (For End Users)

1. Double-click `ToolMaster Setup 1.0.0.exe`
2. Follow setup wizard
3. Click Install
4. Done! App launches

**Install time: 30-60 seconds**

---

## 💻 Requirements

**To Build:**
- Windows 10 or 11
- Node.js 20+
- ~2 GB free disk space

**To Run (End Users):**
- Windows 10 or 11
- ~400 MB free disk space
- No additional software needed!

---

## 🎬 After Install

**Launch Options:**
- Desktop shortcut
- Start Menu → ToolMaster
- `C:\Program Files\ToolMaster\ToolMaster.exe`

**First Login:**
- Email: `demo@example.com`
- Password: `Demo123!`

---

## 🔧 Troubleshooting

**Build fails?**
```powershell
Remove-Item -Recurse -Force node_modules
npm install
npm run build
```

**Need admin rights?**
```
Right-click PowerShell → Run as Administrator
```

**Installer won't run?**
- Windows Defender warning? Click "Run anyway"
- Run as Administrator

---

## 📖 Full Documentation

See `BUILD_WINDOWS_INSTALLER.md` for complete guide with:
- Detailed step-by-step instructions
- Troubleshooting tips
- Customization options
- Distribution checklist

---

**Ready to build your standalone Windows app!** 🪟✨
