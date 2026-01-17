'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ToolMagazineWheel, ToolSlot } from '@/components/magazine/tool-magazine-wheel';
import { RotationController } from '@/components/magazine/rotation-controller';
import { ClockPositionGrid } from '@/components/magazine/clock-position-grid';
import { ToolInfoPanel } from '@/components/magazine/tool-info-panel';
import { ToolConfigDialog } from '@/components/magazine/tool-config-dialog';
import { PrintableToolReport } from '@/components/magazine/printable-tool-report';
import { InAppTour } from '@/components/tour/in-app-tour';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, Upload, Printer, BarChart3, Settings, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from '@/lib/translations';

export default function DashboardPage() {
  const { t, language } = useTranslation();
  const [tools, setTools] = useState<ToolSlot[]>([]);
  const [activeSlot, setActiveSlot] = useState(1); // Slot at 12 o'clock (IN)
  const [outSlot, setOutSlot] = useState(4); // OUT position (typically 4 steps from IN)
  const [isLoading, setIsLoading] = useState(true);
  const [isRotating, setIsRotating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<ToolSlot | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const printComponentRef = useRef<HTMLDivElement>(null);

  // Calculate OUT slot based on IN slot (4 positions clockwise)
  const calculateOutSlot = (inSlot: number): number => {
    return ((inSlot - 1 + 4) % 12) + 1;
  };

  // Fetch tools and magazine settings
  const fetchData = useCallback(async () => {
    try {
      const [toolsRes, settingsRes] = await Promise.all([
        fetch('/api/tools'),
        fetch('/api/magazine'),
      ]);

      if (toolsRes.ok) {
        const toolsData = await toolsRes.json();
        setTools(toolsData);
      }

      if (settingsRes.ok) {
        const settingsData = await settingsRes.json();
        setActiveSlot(settingsData.currentInSlot);
        setOutSlot(settingsData.currentOutSlot);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load magazine data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle rotation
  const handleRotate = async (direction: 'CW' | 'CCW') => {
    setIsRotating(true);

    const newInSlot = direction === 'CW'
      ? ((activeSlot % 12) + 1)
      : ((activeSlot - 2 + 12) % 12) + 1;

    const newOutSlot = calculateOutSlot(newInSlot);

    setActiveSlot(newInSlot);
    setOutSlot(newOutSlot);

    // Save to server
    try {
      await fetch('/api/magazine', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentInSlot: newInSlot, currentOutSlot: newOutSlot }),
      });
    } catch (error) {
      console.error('Error saving rotation:', error);
    }

    setTimeout(() => setIsRotating(false), 500);
  };

  // Handle go to specific slot
  const handleGoToSlot = async (slotNumber: number) => {
    setIsRotating(true);

    const newOutSlot = calculateOutSlot(slotNumber);

    setActiveSlot(slotNumber);
    setOutSlot(newOutSlot);

    // Save to server
    try {
      await fetch('/api/magazine', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentInSlot: slotNumber, currentOutSlot: newOutSlot }),
      });
      toast.success(`Rotated to slot ${slotNumber}`);
    } catch (error) {
      console.error('Error saving rotation:', error);
      toast.error('Failed to save rotation');
    }

    setTimeout(() => setIsRotating(false), 500);
  };

  // Handle slot click
  const handleSlotClick = (slotNumber: number) => {
    const tool = tools.find(t => t.slotNumber === slotNumber);
    if (tool) {
      setSelectedTool(tool);
      setConfigDialogOpen(true);
    }
  };

  // Handle tool update
  const handleToolUpdate = async (updatedTool: Partial<ToolSlot> & { id: string }) => {
    try {
      const response = await fetch('/api/tools', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTool),
      });

      if (response.ok) {
        const updated = await response.json();
        setTools(prev => prev.map(t => t.id === updated.id ? updated : t));
        toast.success('Tool updated successfully');
        setConfigDialogOpen(false);
      } else {
        throw new Error('Failed to update tool');
      }
    } catch (error) {
      console.error('Error updating tool:', error);
      toast.error('Failed to update tool');
    }
  };

  // Handle export
  const handleExport = async () => {
    try {
      const response = await fetch('/api/tools/export');
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `toolmaster-config-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast.success('Configuration exported');
      }
    } catch (error) {
      console.error('Error exporting:', error);
      toast.error('Failed to export configuration');
    }
  };

  // Handle import
  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      const response = await fetch('/api/tools/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success('Configuration imported successfully');
        fetchData();
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Import failed');
      }
    } catch (error) {
      console.error('Error importing:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to import configuration');
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle print with react-to-print
  const handlePrint = useReactToPrint({
    content: () => printComponentRef.current,
    documentTitle: `ToolMaster-Report-${new Date().toISOString().split('T')[0]}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  // Get tool at IN and OUT positions
  const inTool = tools.find(t => t.slotNumber === activeSlot);
  const outTool = tools.find(t => t.slotNumber === outSlot);

  // Filter tools based on search
  const filteredTools = searchQuery
    ? tools.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.toolNumber.toString().includes(searchQuery) ||
        (t.type && t.type.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : tools;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-[#38bdf8] mx-auto" />
          <p className="text-slate-400">Loading magazine data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <InAppTour />

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Left: Magazine Wheel */}
        <div className="space-y-6">
          <div className="bg-[#0f172a]/60 rounded-2xl border border-white/5 p-8">
            <ToolMagazineWheel
              tools={tools}
              activeSlot={activeSlot}
              outSlot={outSlot}
              onSlotClick={handleSlotClick}
            />
          </div>
        </div>

        {/* Right: Controls */}
        <div className="space-y-6">
          {/* Search */}
          <div className="relative" data-tour="search-tools">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              type="text"
              placeholder="Search tools by name or desc..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-[#1e293b] border-white/10 text-white focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8]/50"
            />
          </div>

          {/* Tool Info Panel */}
          <ToolInfoPanel
            inTool={inTool}
            outTool={outTool}
            activeSlot={activeSlot}
            outSlot={outSlot}
          />

          {/* Clock Position Grid */}
          <ClockPositionGrid
            tools={tools}
            activeSlot={activeSlot}
            outSlot={outSlot}
            onSlotClick={handleGoToSlot}
          />

          {/* Rotation Controller */}
          <RotationController
            onRotate={handleRotate}
            onGoToSlot={handleGoToSlot}
            currentInSlot={activeSlot}
            isRotating={isRotating}
          />

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3" data-tour="action-buttons">
            <Button
              variant="outline"
              className="bg-[#1e293b] border-white/10 hover:bg-white/5 text-slate-300"
              onClick={handleExport}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              className="bg-[#1e293b] border-white/10 hover:bg-white/5 text-slate-300"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              className="hidden"
              onChange={handleImport}
            />
            <Button
              variant="outline"
              className="bg-[#1e293b] border-white/10 hover:bg-white/5 text-slate-300"
              onClick={handlePrint}
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button
              variant="outline"
              className="bg-[#a855f7]/20 border-[#a855f7]/30 hover:bg-[#a855f7]/30 text-[#a855f7]"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
          </div>

          {/* Configure Tools Button */}
          <Button
            className="w-full bg-[#1e293b] border border-white/10 hover:bg-white/5 text-slate-300"
            onClick={() => {
              const firstTool = tools[0];
              if (firstTool) {
                setSelectedTool(firstTool);
                setConfigDialogOpen(true);
              }
            }}
            data-tour="configure-tools"
          >
            <Settings className="w-4 h-4 mr-2" />
            Configure Tools
          </Button>
        </div>
      </div>

      {/* Tool Configuration Dialog */}
      {selectedTool && (
        <ToolConfigDialog
          open={configDialogOpen}
          onOpenChange={setConfigDialogOpen}
          tool={selectedTool}
          tools={tools}
          onSave={handleToolUpdate}
          onSelectTool={setSelectedTool}
        />
      )}

      {/* Hidden printable report */}
      <div className="hidden">
        <PrintableToolReport
          ref={printComponentRef}
          tools={tools}
          currentInSlot={activeSlot}
          currentOutSlot={outSlot}
          translations={{
            toolReport: t('report.toolReport', 'Tool Magazine Report'),
            reportDate: t('report.reportDate', 'Report Date'),
            totalTools: t('magazine.totalTools', 'Total Tools'),
            inPosition: t('magazine.inPosition', 'IN Position'),
            outPosition: t('magazine.outPosition', 'OUT Position'),
            magazineOverview: t('magazine.magazineOverview', 'Magazine Overview'),
            toolList: t('magazine.toolList', 'Tool List'),
            slot: t('magazine.slot', 'Slot'),
            tool: t('magazine.tool', 'Tool'),
            toolName: t('magazine.toolName', 'Tool Name'),
            type: t('magazine.type', 'Type'),
            description: t('magazine.description', 'Description'),
            status: t('magazine.status', 'Status'),
            life: t('magazine.life', 'Life'),
            position: t('magazine.position', 'Position'),
            ready: t('status.ready', 'Ready'),
            active: t('status.active', 'Active'),
            warning: t('status.warning', 'Warning'),
            empty: t('status.empty', 'Empty'),
            maintenance: t('status.maintenance', 'Maintenance'),
            generatedBy: t('report.generatedBy', 'Generated by'),
            printedOn: t('report.printedOn', 'Printed on'),
            page: t('report.page', 'Page'),
          }}
        />
      </div>
    </div>
  );
}
