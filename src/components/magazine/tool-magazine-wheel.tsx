'use client';

import { motion } from 'framer-motion';

export interface ToolSlot {
  id: string;
  slotNumber: number;
  toolNumber: number;
  name: string;
  type: string | null;
  status: 'READY' | 'ACTIVE' | 'WARNING' | 'EMPTY' | 'MAINTENANCE';
  lifePercent: number;
}

interface ToolMagazineWheelProps {
  tools: ToolSlot[];
  activeSlot: number; // Which slot is at 12 o'clock (IN position)
  outSlot: number; // Which slot is at OUT position
  onSlotClick?: (slotNumber: number) => void;
}

export function ToolMagazineWheel({ tools, activeSlot, outSlot, onSlotClick }: ToolMagazineWheelProps) {
  // Calculate rotation to put activeSlot at 12 o'clock (top)
  // Slot 1 at 12 o'clock = 0 rotation
  // Each slot is 30 degrees (360/12)
  const rotation = (activeSlot - 1) * -30;

  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto flex items-center justify-center" data-tour="magazine-wheel">
      {/* Static Indicator Triangle at Top (IN position) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 z-20 flex flex-col items-center gap-1">
        <div className="text-[#f59e0b] text-xs font-bold tracking-wider">IN</div>
        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px] border-t-[#f59e0b] drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
      </div>

      {/* OUT indicator (at 4 o'clock position from current IN) */}
      <div className="absolute z-20 flex items-center gap-1" style={{
        bottom: '15%',
        right: '5%',
      }}>
        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[15px] border-b-[#22d3ee] drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] rotate-[135deg]" />
        <div className="text-[#22d3ee] text-xs font-bold tracking-wider">OUT</div>
      </div>

      {/* Rotating Wheel Container */}
      <motion.div
        className="relative w-full h-full rounded-full border-2 border-[#334155] bg-[#0f172a] shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]"
        animate={{ rotate: rotation }}
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
      >
        {/* Center Hub */}
        <div className="absolute inset-0 m-auto w-1/3 h-1/3 rounded-full bg-gradient-to-br from-[#1e293b] to-[#020617] border border-[#334155] shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center justify-center z-10">
          <motion.div
            className="text-center"
            animate={{ rotate: -rotation }}
            transition={{ type: 'spring', stiffness: 60, damping: 20 }}
          >
            <div className="text-[#38bdf8] font-bold text-xl">MAG</div>
            <div className="text-[#94a3b8] text-xs">CW/CCW</div>
          </motion.div>
        </div>

        {/* Slots */}
        {tools.map((tool) => {
          const slotIndex = tool.slotNumber - 1;
          const angle = slotIndex * 30; // 30 degrees per slot
          const isInPosition = tool.slotNumber === activeSlot;
          const isOutPosition = tool.slotNumber === outSlot;
          const isEmpty = tool.status === 'EMPTY';

          return (
            <div
              key={tool.id}
              className="absolute top-0 left-1/2 -ml-[24px] pointer-events-none"
              style={{
                transform: `rotate(${angle}deg)`,
                transformOrigin: '24px 250px',
                height: '500px',
              }}
            >
              {/* The Actual Slot Circle */}
              <motion.div
                className="w-[48px] h-[48px] -mt-[24px] cursor-pointer pointer-events-auto"
                style={{ transform: `rotate(${-angle - rotation}deg)` }}
                animate={{ rotate: -angle - rotation }}
                transition={{ type: 'spring', stiffness: 60, damping: 20 }}
                onClick={() => onSlotClick?.(tool.slotNumber)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`
                    relative w-full h-full rounded-full border-2 flex items-center justify-center font-mono font-bold text-sm shadow-lg backdrop-blur-sm transition-all duration-300
                    ${isInPosition
                      ? 'bg-[#f59e0b]/20 border-[#f59e0b] text-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-110'
                      : isOutPosition
                        ? 'bg-[#22d3ee]/20 border-[#22d3ee] text-[#22d3ee] shadow-[0_0_20px_rgba(34,211,238,0.4)]'
                        : isEmpty
                          ? 'bg-slate-800/50 border-slate-700 text-slate-600 border-dashed'
                          : tool.status === 'WARNING'
                            ? 'bg-[#f59e0b]/10 border-[#f59e0b]/50 text-[#f59e0b]'
                            : tool.status === 'ACTIVE'
                              ? 'bg-[#10b981]/10 border-[#10b981]/50 text-[#10b981]'
                              : 'bg-[#38bdf8]/10 border-[#38bdf8]/50 text-[#38bdf8]'
                    }
                  `}
                >
                  {tool.toolNumber}
                  {isInPosition && (
                    <div className="absolute inset-0 rounded-full animate-pulse bg-[#f59e0b]/10" />
                  )}
                </div>
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Decorative Rings */}
      <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none scale-110" />
      <div className="absolute inset-0 rounded-full border border-white/5 pointer-events-none scale-125 border-dashed opacity-30" />
    </div>
  );
}
