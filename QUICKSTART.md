# ToolMaster - Quick Start Guide

## 🚀 Get Up and Running in 3 Minutes

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database available (or use the provided one)
- 5 minutes of your time

### Step 1: Install Dependencies
```bash
cd /datadrive/AC/code/avery-claude/uploads/3a3aaecb-169a-4350-9bb3-9c171cfa55a9
npm install
```
**Expected time**: 1-2 minutes

### Step 2: Set Up Database (If Needed)
```bash
# Push schema to database
npx prisma db push

# Seed with demo data
npx prisma db seed
```
**Note**: The `.env` file already has DATABASE_URL configured. If you're using a different database, update it first.

### Step 3: Start the Application
```bash
npm run dev
```
**Expected output**:
```
▲ Next.js 16.1.2
- Local:        http://localhost:3000
```

### Step 4: Access the Application

Open your browser and go to:
```
http://localhost:3000
```

### Step 5: Log In with Demo Account

Use these credentials:
- **Email**: `demo@example.com`
- **Password**: `demo1234`

---

## 🎯 What You'll See

After login, you'll see:
1. **Tool Wheel** - 12 positions arranged like a clock
2. **Control Panel** - Buttons and info display on the right
3. **Interactive Features** - Click to rotate, configure tools, import/export

### Quick Actions

| Action | How |
|--------|-----|
| Rotate CW | Click **CW** button |
| Rotate CCW | Click **CCW** button |
| Jump to slot | Click position in the clock grid |
| Configure tool | Click any slot in the wheel |
| Start tour | Click **Start Tour** in sidebar |
| Export config | Click **Export** button |
| Import config | Click **Import** button |

---

## 🔧 Commands Reference

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Run production build
npm start

# Check for TypeScript errors
npm run build

# Database commands
npx prisma db push       # Push schema changes
npx prisma db seed       # Run seed script
npx prisma studio       # Open Prisma Studio (visual DB editor)
```

---

## 📁 Key Files to Explore

- **`src/app/(dashboard)/dashboard/page.tsx`** - Main dashboard
- **`src/components/magazine/tool-magazine-wheel.tsx`** - Wheel visualization
- **`src/app/api/tools/route.ts`** - Tool API endpoints
- **`prisma/schema.prisma`** - Database schema

---

## 🐛 Troubleshooting

### Port 3000 Already in Use?
```bash
PORT=3002 npm run dev
```

### Database Connection Error?
Check your `.env` file:
```bash
# Verify DATABASE_URL is correct
echo $DATABASE_URL

# Test connection with psql
psql $DATABASE_URL
```

### Can't Access http://localhost:3000?
- Make sure `npm run dev` is running
- Try `http://localhost:3001` instead
- Check if firewall is blocking port 3000

### Seeing TypeScript Errors?
```bash
# Regenerate Prisma client
npx prisma generate

# Clear build cache and rebuild
rm -rf .next && npm run build
```

---

## 📚 More Information

- **Full Documentation**: See `README.md`
- **Deployment Guide**: See `DEPLOYMENT_GUIDE.md`
- **Project Overview**: See `PROJECT_COMPLETION_SUMMARY.md`

---

## ✨ Features Ready to Use

- ✅ 12-position tool wheel with smooth animations
- ✅ Real-time position tracking (IN at 12 o'clock)
- ✅ Tool configuration (name, type, status, life %)
- ✅ Rotation controls (CW, CCW, GO, Click)
- ✅ Import/Export tool configurations
- ✅ Interactive in-app tour
- ✅ User authentication with password reset
- ✅ Dark industrial aesthetic
- ✅ Responsive design for all devices

---

## 🎓 Next Steps

After getting the app running:

1. **Explore the Dashboard**
   - Click different positions to see them rotate to IN
   - Configure some tools with your own data
   - Try the rotation controls

2. **Take the Tour**
   - Click "Start Tour" in the sidebar
   - Learn about all features
   - Restart anytime from the same button

3. **Try Import/Export**
   - Configure a setup you like
   - Click Export to download JSON
   - Import it back to test

4. **Create Your Own User**
   - Click "Create Account" on login page
   - Sign up with your email
   - Create your tool configuration

5. **Deploy (When Ready)**
   - See `DEPLOYMENT_GUIDE.md` for hosting options
   - Vercel, AWS, DigitalOcean all supported

---

## 💡 Tips

- **Dark Mode**: Already enabled by default (industrial aesthetic)
- **Tool Colors**: Automatically color-coded based on status
- **Mobile**: Fully responsive - works on phones and tablets
- **Data Persistence**: All changes saved to database
- **Password Reset**: Working end-to-end if needed

---

## 🚨 Still Having Issues?

1. Check `.env` file exists and DATABASE_URL is set
2. Verify PostgreSQL is running
3. Try: `rm -rf node_modules && npm install`
4. Try: `rm -rf .next && npm run build`
5. Restart your terminal and try again

---

**Ready? Run `npm install && npm run dev` and start building!** 🎉
