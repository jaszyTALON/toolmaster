'use client';

import { ToolSlot } from './tool-magazine-wheel';

interface ClockPositionGridProps {
  tools: ToolSlot[];
  activeSlot: number;
  outSlot: number;
  onSlotClick?: (slotNumber: number) => void;
}

export function ClockPositionGrid({ tools, activeSlot, outSlot, onSlotClick }: ClockPositionGridProps) {
  // Map slot numbers to their clock positions based on current activeSlot (which is at 12 o'clock)
  const getClockPosition = (slotNumber: number): number => {
    // If slot 1 is at 12 o'clock (activeSlot=1), then:
    // slot 1 -> 12 o'clock, slot 2 -> 1 o'clock, etc.
    const offset = slotNumber - activeSlot;
    let clockPos = offset;
    if (clockPos <= 0) clockPos += 12;
    if (clockPos === 12) clockPos = 12;
    return clockPos === 12 ? 12 : clockPos;
  };

  // Create grid data - sorted by clock position
  const gridData = tools.map((tool) => ({
    tool,
    clockPos: getClockPosition(tool.slotNumber),
  })).sort((a, b) => {
    // Sort so 12 comes first, then 1, 2, 3...
    const aPos = a.clockPos === 12 ? 0 : a.clockPos;
    const bPos = b.clockPos === 12 ? 0 : b.clockPos;
    return aPos - bPos;
  });

  return (
    <div className="bg-[#1e293b] rounded-2xl border border-white/5 p-6" data-tour="position-reference">
      <h3 className="text-white font-semibold mb-4">Clock Position Reference</h3>

      <div className="grid grid-cols-4 gap-2">
        {gridData.map(({ tool, clockPos }) => {
          const isIn = tool.slotNumber === activeSlot;
          const isOut = tool.slotNumber === outSlot;

          return (
            <button
              key={tool.id}
              onClick={() => onSlotClick?.(tool.slotNumber)}
              className={`
                p-2 rounded-lg border text-center transition-all hover:scale-105
                ${isIn
                  ? 'bg-[#f59e0b]/20 border-[#f59e0b] text-[#f59e0b]'
                  : isOut
                    ? 'bg-[#22d3ee]/20 border-[#22d3ee] text-[#22d3ee]'
                    : 'bg-[#0f172a] border-white/10 text-slate-400 hover:border-white/20 hover:text-white'
                }
              `}
            >
              <div className="text-[10px] text-slate-500">{clockPos}:00</div>
              <div className="font-bold text-lg">{tool.toolNumber}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-[#f59e0b]/20 border border-[#f59e0b]" />
          <span className="text-slate-400">IN (12:00)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-[#22d3ee]/20 border border-[#22d3ee]" />
          <span className="text-slate-400">OUT</span>
        </div>
      </div>
    </div>
  );
}
