# ToolMaster Design Reference

## Theme: Titanium Forge - Industrial Machine Tool Magazine

### Color Palette
```
primary: #38bdf8 (Sky Blue - Metallic accent)
secondary: #f59e0b (Amber - Warning/Active highlights)
tertiary: #94a3b8 (Slate gray)
background: #020617 (Deep slate/charcoal)
surface_1: #0f172a (Dark slate surface)
surface_2: #1e293b (Medium slate surface)
surface_3: #334155 (Light slate surface)
text_primary: #f8fafc (Near white)
text_secondary: #94a3b8 (Muted gray)
text_tertiary: #64748b (Darker muted)
border: rgba(255, 255, 255, 0.1)
border_accent: rgba(56, 189, 248, 0.3)
success: #10b981 (Emerald)
warning: #f59e0b (Amber)
error: #ef4444 (Red)
cyan: #22d3ee (Cyan for OUT position)
```

### Typography
- **Font Family:** Inter, system-ui, sans-serif
- **Scale:** Base 16px, Scale 1.25 (Major Third)

### Spacing System
Strict 8px grid (p-2, p-4, p-6, p-8)

### Layout Architecture
- Bento Sidebar Grid for Dashboard
- Large circular wheel visualization as focal point
- Control panel on right side with clear sections

### Signature Effects
- Industrial Glow (Blue/Amber)
- Deep Slate Gradients
- Brushed Metal Surfaces
- Subtle shadows and borders

### Key UI Components

#### Tool Magazine Wheel
- 12 positions arranged like a clock
- Amber highlight for IN position (12 o'clock)
- Cyan highlight for OUT position
- Dark slate slots with metallic borders
- Center hub with MAG indicator
- Smooth rotation animation using Framer Motion
- Position indicator triangle at top

#### Control Panel
- Search tools input
- Tool IN/OUT display panel
- Clock Position Reference grid (12 positions)
- CCW/CW rotation buttons
- Export/Import/Print/Analytics buttons
- Configure Tools button

#### Status Colors
- READY: Blue (#38bdf8)
- ACTIVE: Emerald (#10b981)
- WARNING: Amber (#f59e0b)
- EMPTY: Dark slate (#334155)
- MAINTENANCE: Red (#ef4444)

### Button Styles
- Primary: Gradient blue with glow
- Secondary: Dark slate with border
- Danger: Red with glow
- Ghost: Transparent with hover

### Card Components
- Dark surface backgrounds
- Subtle white/10 borders
- Rounded corners (rounded-xl to rounded-2xl)
- Inner shadows for depth
