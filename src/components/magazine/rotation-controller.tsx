'use client';

import { useState } from 'react';
import { RotateCw, RotateCcw, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface RotationControllerProps {
  onRotate: (direction: 'CW' | 'CCW') => void;
  onGoToSlot: (slotNumber: number) => void;
  currentInSlot: number;
  isRotating: boolean;
}

export function RotationController({ onRotate, onGoToSlot, currentInSlot, isRotating }: RotationControllerProps) {
  const [targetSlot, setTargetSlot] = useState<string>('');

  const handleGoTo = () => {
    const slot = parseInt(targetSlot);
    if (slot >= 1 && slot <= 12) {
      onGoToSlot(slot);
      setTargetSlot('');
    }
  };

  return (
    <div className="bg-[#1e293b] rounded-2xl border border-white/5 p-6 shadow-lg" data-tour="rotation-controls">
      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-4">Manual Override</h3>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => onRotate('CCW')}
          disabled={isRotating}
          className="flex flex-col items-center justify-center gap-2 h-auto py-4 bg-[#0f172a] border-white/5 hover:border-[#38bdf8]/50 hover:bg-[#38bdf8]/5 transition-all group"
        >
          <RotateCcw className="w-6 h-6 text-slate-400 group-hover:text-[#38bdf8]" />
          <span className="text-xs font-medium text-slate-300">Step CCW</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => onRotate('CW')}
          disabled={isRotating}
          className="flex flex-col items-center justify-center gap-2 h-auto py-4 bg-[#0f172a] border-white/5 hover:border-[#38bdf8]/50 hover:bg-[#38bdf8]/5 transition-all group"
        >
          <RotateCw className="w-6 h-6 text-slate-400 group-hover:text-[#38bdf8]" />
          <span className="text-xs font-medium text-slate-300">Step CW</span>
        </Button>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <label className="absolute -top-2 left-2 px-1 bg-[#1e293b] text-[10px] text-slate-500 z-10">Target Tool Slot</label>
          <Input
            type="number"
            min="1"
            max="12"
            value={targetSlot}
            onChange={(e) => setTargetSlot(e.target.value)}
            className="w-full h-12 bg-[#0f172a] border-white/10 text-white focus:border-[#f59e0b] placeholder:text-slate-600"
            placeholder="1-12"
          />
        </div>
        <Button
          onClick={handleGoTo}
          disabled={isRotating || !targetSlot || parseInt(targetSlot) < 1 || parseInt(targetSlot) > 12}
          className="h-12 px-6 bg-gradient-to-r from-[#f59e0b] to-[#d97706] hover:from-[#f59e0b]/90 hover:to-[#d97706]/90 text-white font-bold shadow-[0_4px_14px_rgba(245,158,11,0.4)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.6)] transition-all active:scale-95"
        >
          <Play className="w-4 h-4 fill-white mr-1" />
          GO
        </Button>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-[#0f172a] border border-white/5">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500">Current IN Position:</span>
          <span className="font-mono font-bold text-[#f59e0b]">Slot {currentInSlot}</span>
        </div>
      </div>
    </div>
  );
}
