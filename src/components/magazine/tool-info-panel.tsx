'use client';

import { ToolSlot } from './tool-magazine-wheel';

interface ToolInfoPanelProps {
  inTool: ToolSlot | undefined;
  outTool: ToolSlot | undefined;
  activeSlot: number;
  outSlot: number;
}

export function ToolInfoPanel({ inTool, outTool, activeSlot, outSlot }: ToolInfoPanelProps) {
  return (
    <div className="bg-[#1e293b] rounded-2xl border border-white/5 p-6" data-tour="tool-info">
      <div className="grid grid-cols-2 gap-6">
        {/* IN Tool */}
        <div className="space-y-2">
          <div className="text-slate-400 text-xs uppercase tracking-wider">Tool IN (12:00)</div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-[#f59e0b]">
              {inTool?.toolNumber || '--'}
            </span>
          </div>
          <div className="text-slate-500 text-sm">Pos {activeSlot}</div>
          {inTool && inTool.status !== 'EMPTY' && (
            <div className="text-xs text-slate-400 truncate">{inTool.name}</div>
          )}
        </div>

        {/* OUT Tool */}
        <div className="space-y-2">
          <div className="text-slate-400 text-xs uppercase tracking-wider">Tool OUT (4:00)</div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-[#22d3ee]">
              {outTool?.toolNumber || '--'}
            </span>
          </div>
          <div className="text-slate-500 text-sm">Pos {outSlot}</div>
          {outTool && outTool.status !== 'EMPTY' && (
            <div className="text-xs text-slate-400 truncate">{outTool.name}</div>
          )}
        </div>
      </div>
    </div>
  );
}
