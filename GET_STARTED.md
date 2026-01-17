# 🚀 Get Started with ToolMaster - Quick Start Guide

## 📋 Quick Summary

Your **ToolMaster web application** is ready to run! It's a beautiful, production-ready tool magazine management system featuring:

✅ 12-position rotary wheel visualization
✅ Smooth animations
✅ Tool management (add/edit/delete)
✅ Multi-language support (18 languages)
✅ Professional printing
✅ User authentication
✅ Dark industrial aesthetic

---

## ⚡ Start Running in 5 Minutes

### **Step 1: Install Dependencies**

```bash
cd /datadrive/AC/code/avery-claude/uploads/3a3aaecb-169a-4350-9bb3-9c171cfa55a9

npm install
```

### **Step 2: Create Database**

```bash
# Set up SQLite for development
npx prisma migrate dev

# This will:
# 1. Create .prisma/migrations/ if needed
# 2. Create SQLite database (toolmaster.db)
# 3. Set up all tables
```

### **Step 3: Seed Sample Data**

```bash
# Populate database with 12 sample tools
npx prisma db seed

# Demo user:
# Email: demo@example.com
# Password: Demo123!
```

### **Step 4: Start Development Server**

```bash
npm run dev:web
```

**Output:**
```
> next dev
  ▲ Next.js 16.1.2
  - Local:        http://localhost:3000
```

### **Step 5: Open in Browser**

Open **http://localhost:3000** in your web browser

---

## 🎯 First Time User Guide

### **Landing Page**
You'll see a beautiful marketing page with:
- Hero section showing the wheel
- Feature highlights
- Call-to-action buttons

### **Create Account**

1. Click **"Get Started"** button
2. Enter email and password
3. Click **"Register"**
4. Automatically logged in ✅

### **Your Dashboard**

You'll see:
- **Left**: 12-position rotary wheel
- **Right**: Control panel with:
  - Search box
  - IN/OUT position info
  - Position grid
  - Rotation controls (CW/CCW)
  - Action buttons

### **Try the Wheel**

1. **Click rotation buttons**: CW (clockwise) or CCW (counter-clockwise)
   - Watch the wheel rotate smoothly
   - See IN position change
   - OUT position updates automatically

2. **Click on a slot**: Select a tool to edit it

3. **Edit tool information**:
   - Tool name
   - Tool type
   - Description
   - Status (Ready/Active/Warning/Maintenance/Empty)
   - Life percentage

### **Export Configuration**

1. Click **"Export"** button
2. Your JSON file downloads
3. Contains all tool info
4. Can be imported later

### **Change Language**

1. Click tiny **🌐** button in top-right header
2. Select language from dropdown
3. Everything translates instantly!

### **Print Report**

1. Configure your tools
2. Click **"Print"** button
3. System print dialog appears
4. Choose printer or "Save as PDF"
5. Professional A4 report prints!

---

## 🎨 Exploring the Features

### **The Rotating Wheel**

- **Design**: Clock-style 12 positions
- **IN Position**: 12 o'clock (amber #f59e0b)
- **OUT Position**: 4 positions from IN (cyan #22d3ee)
- **Color Coding**:
  - Blue = Ready
  - Green = Active
  - Yellow = Warning
  - Red = Maintenance
  - Gray = Empty

### **Tool Management**

- Click any slot to edit
- Set tool details
- Update status
- Track life percentage
- See real-time updates

### **Rotating the Wheel**

- Click **CW** (clockwise) to advance one position
- Click **CCW** (counter-clockwise) to go back
- Each rotation changes IN/OUT
- Smooth animation

### **Language Support**

Available languages (18 total):
- English, Spanish, German, French, Italian, Portuguese, Chinese, Japanese, Korean, Russian, Arabic, Dutch, Polish, Turkish, Swedish, Norwegian, Danish, Finnish

### **Professional Printing**

Reports include:
- Magazine diagram
- All 12 tools with details
- Color-coded status
- Tool life tracking
- Current IN/OUT positions

---

## 📊 Sample Data

The app seeds with 12 sample tools:

| Slot | Tool | Type | Status | Life |
|------|------|------|--------|------|
| 1 | Carbide Drill 8mm | Drill | Ready | 85% |
| 2 | Face Mill 50mm | Mill | Active | 92% |
| 3 | Tap M6 | Tap | Warning | 12% |
| 4 | Drill 5mm | Drill | Ready | 78% |
| 5 | Endmill 6mm | End Mill | Ready | 65% |
| 6 | Countersink | Countersink | Empty | 0% |
| 7 | Reamer 10mm | Reamer | Ready | 88% |
| 8 | Boring Bar | Boring | Maintenance | 45% |
| 9 | Thread Mill | Mill | Ready | 73% |
| 10 | Drill 3mm | Drill | Ready | 81% |
| 11 | Chamfer Tool | Chamfer | Ready | 55% |
| 12 | Carbide Drill 5mm | Drill | Ready | 60% |

**Edit any tool** by clicking its slot on the wheel!

---

## 🔧 Useful Commands

```bash
# Start development server
npm run dev:web

# Build for production
npm run build:web

# Start production server
npm start

# Reset database
npx prisma migrate reset

# Check database status
npx prisma studio

# Generate Prisma client
npx prisma generate

# View database (GUI)
npx prisma studio  # Opens http://localhost:5555
```

---

## 🌐 Running as Web Server

### **Default: Localhost Only**

```bash
npm run dev:web
# Accessible at: http://localhost:3000
# Only from your computer
```

### **Network Access (Development)**

To access from other computers:

```bash
# Option 1: Listen on all interfaces
HOSTNAME=0.0.0.0 npm run dev:web

# Then access from other machines:
# http://192.168.x.x:3000 (your IP address)
```

### **Production Deployment**

For cloud deployment (Vercel, Docker, VPS):
See `WEB_DEPLOYMENT_GUIDE.md` for detailed instructions

---

## 🐛 Troubleshooting

### **Issue: "Port 3000 already in use"**

```bash
# Use different port
PORT=3001 npm run dev:web
# Access at http://localhost:3001
```

### **Issue: Database error**

```bash
# Reset and recreate database
npx prisma migrate reset

# Seed again
npx prisma db seed
```

### **Issue: Dependencies won't install**

```bash
# Clear cache
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### **Issue: Can't login**

```bash
# Reset database with fresh demo user
npx prisma migrate reset

# Default credentials will work:
# Email: demo@example.com
# Password: Demo123!
```

### **Issue: Wheel not rotating**

- Check browser console for errors
- Clear browser cache (Ctrl+Shift+Delete)
- Try different browser
- Restart dev server

---

## 💡 Pro Tips

### **Development**

1. **Hot Reload**: Changes automatically refresh
2. **Console**: Check browser console for errors
3. **Prisma Studio**: `npx prisma studio` for GUI database editor
4. **Next.js**: Check terminal for build errors

### **Database**

- SQLite used for development (file-based)
- Data saved in `toolmaster.db`
- Can be deleted and recreated anytime
- Use PostgreSQL for production

### **Styling**

- Uses Tailwind CSS v4
- Dark theme by default
- Industrial aesthetic
- Customize in `tailwind.config.ts`

### **Language**

- Default: English
- Language preference saved
- Works offline
- 18 languages available

---

## 🎯 What to Try First

### **5-Minute Demo**

1. Start app: `npm run dev:web`
2. Open http://localhost:3000
3. Register with email
4. View the wheel
5. Click CW/CCW to rotate
6. Click a tool slot to edit
7. Change language with 🌐 button
8. Click Print to see report

### **Tool Management Test**

1. Find a tool (e.g., slot 3)
2. Click it to open editor
3. Change tool name
4. Update status
5. Adjust life percentage
6. Save
7. See changes on wheel

### **Export/Import Test**

1. Click Export button
2. JSON file downloads
3. Change something
4. Click Import button
5. Select your JSON file
6. Configuration restored

---

## 📱 Responsive Design

The app works on:
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px)
- ✅ Tablet (768px)
- ✅ Mobile (320px+)

Try resizing your browser window to see responsive behavior!

---

## 🔐 Security Notes

### **Development Mode**

- No HTTPS (http:// only)
- Demo credentials in code
- SQLite database (local file)
- Great for testing!

### **Before Production**

- Change NEXTAUTH_SECRET
- Use HTTPS/SSL
- Use PostgreSQL database
- Add rate limiting
- Enable CORS properly
- See `WEB_DEPLOYMENT_GUIDE.md`

---

## 📚 Documentation Files

- **GET_STARTED.md** (this file) - Quick start
- **WEB_APP_COMPLETE.md** - Complete feature overview
- **WEB_DEPLOYMENT_GUIDE.md** - Deploy to cloud
- **LANGUAGE_AND_PRINT_FEATURES.md** - Language & print details
- **QUICK_FEATURE_GUIDE.md** - Feature visual guide

---

## 🎉 You're Ready!

Everything is set up. Just run:

```bash
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev:web
```

Then open http://localhost:3000 and enjoy! 🚀

---

## ❓ Common Questions

**Q: Can I use this on the internet?**
A: Yes! See `WEB_DEPLOYMENT_GUIDE.md` for deployment instructions

**Q: How many users can it handle?**
A: Unlimited! Each user has isolated data. Scale with PostgreSQL + hosting

**Q: Can I change the wheel style?**
A: Yes! Edit `src/components/magazine/tool-magazine-wheel.tsx`

**Q: How do I add languages?**
A: Add JSON file to `public/locales/{code}.json`, then update language switcher

**Q: Can I print without internet?**
A: Yes! Print functionality is entirely client-side

**Q: Is my data secure?**
A: Yes! Password hashing, per-user isolation, encrypted sessions

---

## 🚀 Next Steps

1. **Get it running**: Follow steps above
2. **Explore features**: Try the wheel, edit tools
3. **Test all functions**: Export, import, print, languages
4. **Deploy**: Use `WEB_DEPLOYMENT_GUIDE.md` when ready
5. **Customize**: Modify colors, add features, adapt to your needs

---

## 💬 Need Help?

- Check the documentation files
- Review code comments
- Check terminal for error messages
- Try restarting: `npm run dev:web`
- Clear database: `npx prisma migrate reset`

**Enjoy ToolMaster!** Happy tool managing! 🔧✨
