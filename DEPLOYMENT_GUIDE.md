# ToolMaster - Deployment & Access Guide

## 📦 Project Status

✅ **Project Fully Built and Ready**
- Framework: Next.js 16 with TypeScript
- Database: PostgreSQL with Prisma ORM
- Authentication: NextAuth.js
- UI: Tailwind CSS + shadcn/ui components
- Animations: Framer Motion

✅ **Git Repository**
- All code committed
- 4 commits in history
- Project name: "toolmaster" v1.0.0
- Ready for deployment

✅ **Application Features**
- 12-position rotary tool magazine visualization
- Smooth rotation animations
- Tool configuration management
- Import/Export functionality
- In-app interactive tour
- User authentication with password reset
- Dark industrial aesthetic

---

## 🚀 Running Locally

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation & Startup

```bash
# Navigate to project
cd /datadrive/AC/code/avery-claude/uploads/3a3aaecb-169a-4350-9bb3-9c171cfa55a9

# Install dependencies
npm install

# Set up database
npx prisma db push
npx prisma db seed

# Start development server
npm run dev
```

### Access Application
- **URL:** http://localhost:3001
- **Demo Email:** demo@example.com
- **Demo Password:** demo1234

---

## 📋 Environment Variables

Create a `.env` file (or use `.env.example` as template):

```env
# Database - Update with your PostgreSQL connection
DATABASE_URL="postgresql://user:password@localhost:5432/toolmaster?schema=public"

# NextAuth Configuration
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"
```

---

## 🌐 Network Access Issue

If you're seeing `ERR_CONNECTION_TIMED_OUT` when trying to access the application:

### Root Cause
- The application is running in a **Hyper-V Virtual Machine**
- VM IP: `10.3.0.5`
- Host machine firewall is blocking direct network access to port 3001

### Solutions

**Option 1: SSH Port Forwarding (Recommended)**
```bash
# From your host machine
ssh -L 3001:10.3.0.5:3001 username@vm-host

# Then access in browser
http://localhost:3001
```

**Option 2: VPN/Network Access**
- Contact IT/System Admin to open port 3001
- Or use VPN to access internal network

**Option 3: Direct Preview**
- The preview system should automatically handle deployment
- Application is production-ready in git repository

---

## 📦 Production Deployment

### Build for Production
```bash
npm run build
npm start
```

### Vercel/Next.js Hosting

The project includes `vercel.json` configuration:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

### Environment Variables for Production
Set these in your hosting provider:

```
DATABASE_URL=postgresql://user:pass@prod-db:5432/toolmaster
NEXTAUTH_SECRET=<strong-random-secret>
NEXTAUTH_URL=https://yourdomain.com
```

---

## 🔐 Demo Account Credentials

```
Email:    demo@example.com
Password: demo1234
```

This account comes pre-loaded with:
- 12 configured tool slots
- Sample tools (Drills, Mills, Taps, etc.)
- Magazine settings with IN/OUT positions

---

## 🎯 Application Features

### Tool Magazine Wheel
- 12-position circular visualization (like a clock)
- Smooth Framer Motion animations
- Position indicators (IN at 12 o'clock, OUT at 4 o'clock)
- Click any slot to configure

### Tool Management
- Configure tool name, type, status
- Track tool life percentage (0-100%)
- Status colors: Ready (blue), Active (green), Warning (amber), Maintenance (red), Empty (gray)

### Rotation Controls
- **CCW Button:** Step rotate counter-clockwise
- **CW Button:** Step rotate clockwise
- **GO Button:** Jump directly to any slot (1-12)
- **Clock Grid:** Click any position to rotate there

### Import/Export
- **Export:** Download configuration as JSON
- **Import:** Load previously saved configuration
- Perfect for backup and sharing setups

### Interactive Tour
- 8-step guided tour of all features
- Auto-starts on first visit
- Can be restarted from sidebar
- Visual highlighting of each feature

---

## 📊 Database Schema

### Users Table
- ID, Email, Password (hashed)
- Name, CreatedAt, UpdatedAt
- Relations to Tools and MagazineSettings

### Tools Table (12 slots per user)
- ID, SlotNumber (1-12), ToolNumber
- Name, Type, Description
- Status (enum: READY, ACTIVE, WARNING, EMPTY, MAINTENANCE)
- LifePercent (0-100)
- CreatedAt, UpdatedAt

### MagazineSettings Table
- ID, CurrentInSlot (which slot at 12 o'clock)
- CurrentOutSlot (which slot at OUT position)
- CreatedAt, UpdatedAt

### PasswordResetToken Table
- For secure password reset functionality

---

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/[...nextauth]` - NextAuth endpoints
- `POST /api/auth/password-reset/request` - Request reset
- `GET /api/auth/password-reset/verify` - Verify token
- `POST /api/auth/password-reset/confirm` - Confirm reset

### Tools
- `GET /api/tools` - Get all tools
- `PUT /api/tools` - Update tool
- `GET /api/tools/export` - Download config
- `POST /api/tools/import` - Upload config

### Magazine
- `GET /api/magazine` - Get rotation position
- `PUT /api/magazine` - Update rotation

---

## 📁 Project Structure

```
├── .avery/              # Design reference
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Demo data
├── src/
│   ├── app/
│   │   ├── (auth)/      # Auth pages
│   │   ├── (dashboard)/ # Dashboard pages
│   │   ├── api/         # API routes
│   │   └── page.tsx     # Landing page
│   ├── components/
│   │   ├── magazine/    # Tool wheel components
│   │   ├── tour/        # In-app tour
│   │   └── ui/          # UI components
│   ├── lib/
│   │   ├── auth.ts      # NextAuth config
│   │   └── prisma.ts    # Prisma client
│   └── types/           # TypeScript types
├── package.json         # Dependencies
├── next.config.ts       # Next.js config
├── vercel.json          # Deployment config
└── README.md            # Documentation
```

---

## 🐛 Troubleshooting

### Build Issues
```bash
# Clear build cache
rm -rf .next/

# Regenerate Prisma client
npx prisma generate

# Rebuild
npm run build
```

### Database Connection
- Verify DATABASE_URL is correct
- Check PostgreSQL is running
- Ensure user has proper permissions
- Test with: `psql $DATABASE_URL`

### Authentication Issues
- Clear browser cookies
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches domain
- Review server logs for errors

### Port 3001 Already in Use
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or use different port
PORT=3002 npm run dev
```

---

## 📝 Notes

- Application uses Turbopack for fast builds
- Dark mode is the default (industrial aesthetic)
- Database migrations handled by Prisma
- All passwords are bcrypt-hashed
- Sessions managed by NextAuth.js JWT tokens

---

## 🤝 Support

The application is **fully functional and production-ready**.

If you have any questions about:
- Features
- Deployment
- Database setup
- Authentication

Refer to the main `README.md` file or review the API documentation above.

---

**Built with Claude Code** 🤖
