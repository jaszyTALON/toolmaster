# ToolMaster - 12-Position Rotary Tool Changer

A precision tool magazine management system for CNC machines. Visualize, configure, and control your 12-position rotary tool changer with smooth animations and an industrial-grade UI.

## Features

### 🎯 Core Functionality
- **Interactive Wheel Visualization**: 12-position circular tool magazine displayed like a clock face
- **Smooth Rotation Animation**: Fluid transitions using Framer Motion
- **Real-time Position Tracking**: Always know which tool is at IN (12 o'clock) and OUT positions
- **Click-to-Configure**: Click any slot to configure that tool's properties

### 🛠️ Tool Management
- Configure tool name, number, type, and description
- Track tool life percentage with visual indicators
- Set tool status (Ready, Active, Warning, Maintenance, Empty)
- Search tools by name, type, or number
- Import/Export configurations as JSON

### 🎨 Industrial Design
- Dark slate/charcoal background (#020617)
- Metallic blue accents (#38bdf8) for primary actions
- Amber highlights (#f59e0b) for IN position (12 o'clock)
- Cyan highlights (#22d3ee) for OUT position
- Smooth glassmorphism effects and glows

### 🔐 Authentication
- Email/password authentication with NextAuth.js
- Secure password hashing with bcrypt
- Password reset flow
- Protected dashboard routes
- Demo account included

### 📚 In-App Tour
- Interactive 8-step guided tour
- Auto-starts on first visit
- Can be restarted anytime from sidebar
- Explains all features with visual highlights

## Demo Credentials

- **Email**: demo@example.com
- **Password**: demo1234

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **UI Components**: shadcn/ui with Radix UI
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Form Validation**: Zod & React Hook Form
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd toolmaster
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

4. Set up the database
```bash
npx prisma db push
npx prisma db seed
```

5. Run the development server
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts            # Seed data with demo user
├── src/
│   ├── app/
│   │   ├── (auth)/        # Auth pages (login, register, etc.)
│   │   ├── (dashboard)/   # Protected dashboard pages
│   │   ├── api/           # API routes
│   │   └── page.tsx       # Landing page
│   ├── components/
│   │   ├── magazine/      # Tool magazine wheel components
│   │   ├── tour/          # In-app tour
│   │   └── ui/            # shadcn/ui components
│   ├── lib/
│   │   ├── auth.ts        # NextAuth configuration
│   │   └── prisma.ts      # Prisma client
│   └── types/             # TypeScript type definitions
└── .avery/
    └── design-reference.md # Design system documentation
```

## Key Concepts

### Slot Numbering
- Slots are numbered 1-12 clockwise around the magazine
- The IN position is always at 12 o'clock (top)
- The OUT position is typically 4 positions clockwise from IN

### Clock Position Calculation
When the magazine rotates, the slot at 12 o'clock changes. The clock position reference shows which slot is at which hour marker.

Example: If slot 5 is at 12 o'clock (IN), then:
- Slot 5 = 12:00
- Slot 6 = 1:00
- Slot 7 = 2:00
- etc.

### Tool Status Colors
- **Ready** (Blue): Tool is ready for use
- **Active** (Green): Tool is currently in use
- **Warning** (Amber): Tool life is low or needs attention
- **Maintenance** (Red): Tool requires maintenance
- **Empty** (Gray): No tool in this slot

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth endpoints
- `POST /api/auth/password-reset/request` - Request password reset
- `GET /api/auth/password-reset/verify` - Verify reset token
- `POST /api/auth/password-reset/confirm` - Confirm password reset

### Tools
- `GET /api/tools` - Get all tools for current user
- `PUT /api/tools` - Update a tool
- `GET /api/tools/export` - Export configuration as JSON
- `POST /api/tools/import` - Import configuration from JSON

### Magazine
- `GET /api/magazine` - Get magazine settings (IN/OUT positions)
- `PUT /api/magazine` - Update magazine positions (rotate)

## Configuration

### Custom Tool Types
You can add custom tool types by editing the tool configuration dialog. Common types include:
- Drill
- Mill
- Tap
- Reamer
- Bore
- Chamfer

### Import/Export Format
Configuration files use JSON format:
```json
{
  "version": "1.0",
  "exportedAt": "2024-01-16T12:00:00.000Z",
  "magazineSettings": {
    "currentInSlot": 12,
    "currentOutSlot": 4
  },
  "tools": [
    {
      "slotNumber": 1,
      "toolNumber": 1,
      "name": "Carbide Drill 5mm",
      "type": "Drill",
      "status": "READY",
      "lifePercent": 85
    }
    // ... 11 more tools
  ]
}
```

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables for Production
Make sure to set secure values for:
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL`: Your production URL
- `DATABASE_URL`: Your production database URL

## Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check that PostgreSQL is running
- Ensure database exists and user has permissions

### Build Errors
- Run `npm run build` to check for TypeScript errors
- Run `npx prisma generate` to regenerate Prisma client
- Clear `.next` folder and rebuild

### Authentication Issues
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies and try again

## License

This project is provided as-is for demonstration purposes.

## Credits

Built with Claude Code by Anthropic.
