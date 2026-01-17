# 🔧 ToolMaster - Windows Desktop Application

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Platform](https://img.shields.io/badge/Platform-Windows%2011-blue)
![Offline](https://img.shields.io/badge/Internet-Not%20Required-success)

> **Professional 12-position rotary tool magazine manager - 100% offline Windows desktop application**

---

## 🎯 What is ToolMaster?

ToolMaster is a **standalone Windows desktop application** for managing 12-position rotary tool changers in CNC machines and manufacturing environments.

**Built for:**
- ✅ Windows 11 (also works on Windows 10/7)
- ✅ 100% offline operation (no internet required)
- ✅ Factory floors and workshops
- ✅ Air-gapped secure environments
- ✅ Industrial settings

---

## ✨ Key Features

### 🎡 **12-Position Rotating Wheel**
- Clock-style visual interface
- Smooth rotation animations
- IN/OUT position tracking
- Real-time status updates

### 🔧 **Tool Management**
- Add, edit, delete tools
- Track tool life percentage
- Status monitoring (Ready, Active, Warning, Maintenance, Empty)
- Complete tool inventory

### 🌐 **9-Language Support**
- 🇬🇧 English
- 🇪🇸 Spanish
- 🇩🇪 German
- 🇫🇷 French
- 🇮🇹 Italian
- 🇵🇹 Portuguese
- 🇨🇳 Chinese
- 🇯🇵 Japanese
- 🇳🇴 Norwegian

### 🖨️ **Professional Printing**
- A4-formatted reports
- Magazine visualization diagrams
- Complete tool listings
- Print to PDF or paper

### 🔐 **Local Authentication**
- Multi-user support
- Secure password hashing
- No external login services
- All data stays on your computer

### 💾 **Offline Database**
- SQLite embedded database
- No external server required
- All data stored locally
- Simple backup (copy one file)

---

## 📦 Installation

### **Option 1: Download Pre-built Installer**

1. Download `ToolMaster Setup 1.0.0.exe` from releases
2. Double-click to run installer
3. Follow setup wizard
4. Launch from Desktop shortcut
5. Done!

### **Option 2: Build From Source**

#### **Prerequisites:**
- Windows 10 or Windows 11
- Node.js 20+ ([download](https://nodejs.org))
- Git ([download](https://git-scm.com))
- Visual Studio Code (optional, recommended)

#### **Quick Build:**

```bash
# 1. Clone the repository
git clone https://github.com/jaszyTALON/toolmaster.git
cd toolmaster

# 2. Install dependencies
npm install

# 3. Generate database client
npx prisma generate

# 4. Test it works (development mode)
npm run dev

# 5. Build Windows installer
npm run build:web
npm run build
```

**Output:** `dist/ToolMaster Setup 1.0.0.exe` (~250 MB)

---

## 🚀 Quick Start

### **For Users:**

1. Run `ToolMaster Setup 1.0.0.exe`
2. Choose installation location
3. Create desktop shortcut
4. Launch ToolMaster
5. Create your user account
6. Start managing tools!

### **For Developers (VS Code):**

```bash
# Open in VS Code
code .

# Open terminal (Ctrl + ~)
npm install
npx prisma generate
npm run dev
```

Electron window opens with the app running!

---

## 🛠️ Development

### **Available Scripts:**

```bash
npm run dev          # Run in development mode (hot reload)
npm run dev:web      # Run Next.js dev server only
npm run build:web    # Build Next.js UI
npm run build        # Build Windows installer
npm run lint         # Check code quality
```

### **Project Structure:**

```
toolmaster/
├── src/                    # React UI components
│   ├── app/                # Next.js pages
│   ├── components/         # Reusable components
│   ├── lib/                # Utilities
│   └── locales/            # Translation files
├── prisma/                 # Database schema
│   ├── schema.prisma       # SQLite schema
│   └── seed.ts             # Sample data
├── public/
│   ├── electron.js         # Electron main process
│   └── locales/            # Translation files
├── package.json            # Dependencies
└── electron-builder.yml    # Installer config
```

---

## 🔌 Offline Operation

**ToolMaster requires NO internet connection:**

- ✅ Works completely offline
- ✅ No external servers
- ✅ No cloud dependencies
- ✅ All data stored locally
- ✅ Zero telemetry or tracking
- ✅ Complete privacy

**Perfect for:**
- Factory floors without internet
- Secure/air-gapped systems
- Remote locations
- Privacy-conscious users
- Industrial environments

**Data Location:**
```
C:\Users\[YourName]\AppData\Roaming\ToolMaster\toolmaster.db
```

**Backup:** Simply copy the `toolmaster.db` file!

---

## 🖥️ System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| **OS** | Windows 7 SP1 | Windows 11 |
| **RAM** | 2 GB | 4 GB+ |
| **Disk Space** | 500 MB | 1 GB |
| **Processor** | 64-bit | Modern CPU |
| **Internet** | Not required | Not required |

---

## 🏗️ Technology Stack

**Desktop Framework:**
- Electron 40.0.0 (Latest)
- Native Windows integration

**Frontend:**
- React 19.2.3
- Next.js 16.1.2
- TypeScript 5.x
- Tailwind CSS v4
- Framer Motion (animations)
- Shadcn/ui components

**Backend/Database:**
- SQLite 3.x (embedded)
- Prisma 5.22.0 (ORM)
- NextAuth.js 4.24.13 (auth)

**Build Tools:**
- electron-builder 26.4.0
- NSIS (Windows installer)

---

## 📚 Documentation

| Guide | Description |
|-------|-------------|
| **SIMPLIFIED_ELECTRON_ONLY.md** | Simple build guide |
| **BUILD_WINDOWS_INSTALLER.md** | Detailed build process |
| **TROUBLESHOOTING_WHITE_SCREEN.md** | Fix common issues |
| **OFFLINE_STANDALONE_OPERATION.md** | Offline architecture |
| **LANGUAGES_COMPLETE.md** | Translation details |

---

## 🔧 Building the Installer

### **Step-by-Step:**

1. **Install Node.js 20+** from https://nodejs.org

2. **Clone and Install:**
   ```bash
   git clone https://github.com/jaszyTALON/toolmaster.git
   cd toolmaster
   npm install
   ```

3. **Generate Prisma:**
   ```bash
   npx prisma generate
   ```

4. **Build Next.js:**
   ```bash
   npm run build:web
   ```

5. **Build Installer:**
   ```bash
   npm run build
   ```

6. **Find Installer:**
   ```
   dist/ToolMaster Setup 1.0.0.exe
   ```

**Build Time:** ~10 minutes total

---

## 🐛 Troubleshooting

### **White Screen on Startup?**

Use development mode to see errors:
```bash
npm run dev
```

Then press `F12` in Electron window to see console errors.

### **Build Failed?**

Clean and rebuild:
```bash
Remove-Item -Recurse -Force .next, dist, node_modules
npm install
npx prisma generate
npm run build:web
npm run build
```

### **No Uninstaller?**

Make sure you're running:
- ✅ `dist/ToolMaster Setup 1.0.0.exe` (installer with uninstaller)
- ❌ NOT `dist/win-unpacked/ToolMaster.exe` (portable, no uninstaller)

---

## 📝 License

MIT License - Free to use, modify, and distribute

---

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📞 Support

**Having issues?**
- Check `TROUBLESHOOTING_WHITE_SCREEN.md`
- Open DevTools (`F12`) to see errors
- Check GitHub Issues

---

## 🎯 Summary

**ToolMaster** is a simple, offline Windows desktop application for managing 12-position rotary tool magazines:

- ✅ Easy to install (double-click installer)
- ✅ Simple to build (4 commands)
- ✅ Works 100% offline
- ✅ Professional Windows installer
- ✅ Multi-language support
- ✅ Local SQLite database
- ✅ No internet required ever

**Perfect for industrial environments where reliability and offline operation are critical.**

---

**Repository:** https://github.com/jaszyTALON/toolmaster

**Status:** Production Ready ✅

**Last Updated:** January 2026
