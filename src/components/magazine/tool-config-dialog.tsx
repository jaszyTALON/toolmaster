'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToolSlot } from './tool-magazine-wheel';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';

interface ToolConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tool: ToolSlot;
  tools: ToolSlot[];
  onSave: (tool: Partial<ToolSlot> & { id: string }) => Promise<void>;
  onSelectTool: (tool: ToolSlot) => void;
}

export function ToolConfigDialog({
  open,
  onOpenChange,
  tool,
  tools,
  onSave,
  onSelectTool,
}: ToolConfigDialogProps) {
  const [formData, setFormData] = useState({
    toolNumber: tool.toolNumber,
    name: tool.name,
    type: tool.type || '',
    status: tool.status,
    lifePercent: tool.lifePercent,
  });
  const [isSaving, setIsSaving] = useState(false);

  // Update form when tool changes
  useEffect(() => {
    setFormData({
      toolNumber: tool.toolNumber,
      name: tool.name,
      type: tool.type || '',
      status: tool.status,
      lifePercent: tool.lifePercent,
    });
  }, [tool]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave({
        id: tool.id,
        ...formData,
        type: formData.type || null,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrevTool = () => {
    const currentIndex = tools.findIndex(t => t.id === tool.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : tools.length - 1;
    onSelectTool(tools[prevIndex]);
  };

  const handleNextTool = () => {
    const currentIndex = tools.findIndex(t => t.id === tool.id);
    const nextIndex = currentIndex < tools.length - 1 ? currentIndex + 1 : 0;
    onSelectTool(tools[nextIndex]);
  };

  const handleClearSlot = async () => {
    setIsSaving(true);
    try {
      await onSave({
        id: tool.id,
        toolNumber: tool.slotNumber,
        name: '-- EMPTY --',
        type: '--',
        status: 'EMPTY',
        lifePercent: 0,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0f172a] border-white/10 text-white max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Configure Tool Slot {tool.slotNumber}</DialogTitle>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevTool}
                className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-white/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextTool}
                className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-white/10"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <DialogDescription className="text-slate-400">
            Configure the tool assigned to this slot position.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="toolNumber" className="text-slate-300">Tool Number</Label>
              <Input
                id="toolNumber"
                type="number"
                value={formData.toolNumber}
                onChange={(e) => setFormData({ ...formData, toolNumber: parseInt(e.target.value) || 0 })}
                className="bg-[#1e293b] border-white/10 text-white focus:border-[#38bdf8]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lifePercent" className="text-slate-300">Tool Life %</Label>
              <Input
                id="lifePercent"
                type="number"
                min="0"
                max="100"
                value={formData.lifePercent}
                onChange={(e) => setFormData({ ...formData, lifePercent: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })}
                className="bg-[#1e293b] border-white/10 text-white focus:border-[#38bdf8]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">Tool Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Carbide Drill 5mm"
              className="bg-[#1e293b] border-white/10 text-white focus:border-[#38bdf8] placeholder:text-slate-600"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-slate-300">Tool Type</Label>
            <Input
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              placeholder="e.g., Drill, Mill, Tap"
              className="bg-[#1e293b] border-white/10 text-white focus:border-[#38bdf8] placeholder:text-slate-600"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-slate-300">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as ToolSlot['status'] })}
            >
              <SelectTrigger className="bg-[#1e293b] border-white/10 text-white focus:border-[#38bdf8]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1e293b] border-white/10">
                <SelectItem value="READY" className="text-[#38bdf8] focus:bg-white/10 focus:text-[#38bdf8]">Ready</SelectItem>
                <SelectItem value="ACTIVE" className="text-[#10b981] focus:bg-white/10 focus:text-[#10b981]">Active</SelectItem>
                <SelectItem value="WARNING" className="text-[#f59e0b] focus:bg-white/10 focus:text-[#f59e0b]">Warning</SelectItem>
                <SelectItem value="MAINTENANCE" className="text-[#ef4444] focus:bg-white/10 focus:text-[#ef4444]">Maintenance</SelectItem>
                <SelectItem value="EMPTY" className="text-slate-500 focus:bg-white/10 focus:text-slate-500">Empty</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Life Percent Visual */}
          <div className="space-y-2">
            <Label className="text-slate-300">Tool Life Indicator</Label>
            <div className="h-3 bg-[#1e293b] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  formData.lifePercent > 50
                    ? 'bg-[#10b981]'
                    : formData.lifePercent > 20
                    ? 'bg-[#f59e0b]'
                    : 'bg-[#ef4444]'
                }`}
                style={{ width: `${formData.lifePercent}%` }}
              />
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleClearSlot}
            disabled={isSaving}
            className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-400"
          >
            Clear Slot
          </Button>
          <div className="flex-1" />
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-white/10 text-slate-300 hover:bg-white/5"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gradient-to-r from-[#38bdf8] to-[#2563eb] hover:from-[#38bdf8]/90 hover:to-[#2563eb]/90 text-white"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
