'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { X, ChevronRight, ChevronLeft, Lightbulb } from 'lucide-react';

interface TourStep {
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

const tourSteps: TourStep[] = [
  {
    target: '[data-tour="magazine-wheel"]',
    title: 'Tool Magazine Wheel',
    content: 'This is your 12-position rotary tool magazine visualized as a clock. The amber-highlighted slot is at the 12 o\'clock IN position, and the cyan slot is at the OUT position. Click any slot to configure that tool.',
    position: 'right',
  },
  {
    target: '[data-tour="tool-info"]',
    title: 'Tool Status Panel',
    content: 'This panel shows which tool is currently at the IN position (12 o\'clock) ready for use, and which tool is at the OUT position. The large numbers indicate the tool IDs.',
    position: 'left',
  },
  {
    target: '[data-tour="position-reference"]',
    title: 'Clock Position Reference',
    content: 'This grid shows all 12 positions mapped to clock positions. Click any position to quickly rotate the magazine so that tool becomes the IN tool at 12 o\'clock.',
    position: 'left',
  },
  {
    target: '[data-tour="rotation-controls"]',
    title: 'Manual Rotation Controls',
    content: 'Use CCW (counter-clockwise) or CW (clockwise) buttons to step rotate the magazine one position at a time. Or enter a specific slot number and click GO to rotate directly to that position.',
    position: 'left',
  },
  {
    target: '[data-tour="action-buttons"]',
    title: 'Import & Export',
    content: 'Export your current tool configuration as a JSON file for backup, or import a previously saved configuration. You can also print the current layout or view analytics.',
    position: 'left',
  },
  {
    target: '[data-tour="configure-tools"]',
    title: 'Configure Tools',
    content: 'Click here to open the tool configuration dialog where you can assign tool names, types, and track tool life percentage for each slot in the magazine.',
    position: 'top',
  },
  {
    target: '[data-tour="search-tools"]',
    title: 'Search Tools',
    content: 'Quickly find tools by searching their name, type, or tool number. This helps you locate specific tools in your magazine.',
    position: 'bottom',
  },
  {
    target: '[data-tour="tour-button"]',
    title: 'Start Tour Anytime',
    content: 'You can restart this tour anytime by clicking the "Start Tour" button in the sidebar. Happy tool managing!',
    position: 'right',
  },
];

const TOUR_STORAGE_KEY = 'toolmaster-tour-completed';

export function InAppTour() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [highlightPosition, setHighlightPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  const step = tourSteps[currentStep];

  // Check if tour should auto-start
  useEffect(() => {
    const tourCompleted = localStorage.getItem(TOUR_STORAGE_KEY);
    if (!tourCompleted) {
      // Delay to let the page render
      const timer = setTimeout(() => {
        setIsActive(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Listen for manual tour start
  useEffect(() => {
    const handleStartTour = () => {
      setCurrentStep(0);
      setIsActive(true);
    };

    window.addEventListener('start-tour', handleStartTour);
    return () => window.removeEventListener('start-tour', handleStartTour);
  }, []);

  // Calculate positions
  const updatePositions = useCallback(() => {
    if (!isActive || !step) return;

    const targetElement = document.querySelector(step.target);
    if (!targetElement) return;

    const rect = targetElement.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const scrollLeft = window.scrollX;

    // Set highlight position
    setHighlightPosition({
      top: rect.top + scrollTop - 8,
      left: rect.left + scrollLeft - 8,
      width: rect.width + 16,
      height: rect.height + 16,
    });

    // Calculate tooltip position based on specified position
    const tooltipWidth = 320;
    const tooltipHeight = 200;
    const gap = 16;

    let top = 0;
    let left = 0;

    switch (step.position) {
      case 'top':
        top = rect.top + scrollTop - tooltipHeight - gap;
        left = rect.left + scrollLeft + (rect.width - tooltipWidth) / 2;
        break;
      case 'bottom':
        top = rect.bottom + scrollTop + gap;
        left = rect.left + scrollLeft + (rect.width - tooltipWidth) / 2;
        break;
      case 'left':
        top = rect.top + scrollTop + (rect.height - tooltipHeight) / 2;
        left = rect.left + scrollLeft - tooltipWidth - gap;
        break;
      case 'right':
        top = rect.top + scrollTop + (rect.height - tooltipHeight) / 2;
        left = rect.right + scrollLeft + gap;
        break;
    }

    // Ensure tooltip stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 16) left = 16;
    if (left + tooltipWidth > viewportWidth - 16) left = viewportWidth - tooltipWidth - 16;
    if (top < scrollTop + 16) top = scrollTop + 16;
    if (top + tooltipHeight > scrollTop + viewportHeight - 16) {
      top = scrollTop + viewportHeight - tooltipHeight - 16;
    }

    setTooltipPosition({ top, left });

    // Scroll element into view if needed
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [isActive, step]);

  useEffect(() => {
    updatePositions();

    window.addEventListener('resize', updatePositions);
    window.addEventListener('scroll', updatePositions);

    return () => {
      window.removeEventListener('resize', updatePositions);
      window.removeEventListener('scroll', updatePositions);
    };
  }, [updatePositions, currentStep]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setIsActive(false);
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');
  };

  const handleSkip = () => {
    handleClose();
  };

  if (!isActive || !step) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-[100] pointer-events-auto">
        {/* Dark overlay with cutout for highlighted element */}
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          <defs>
            <mask id="tour-mask">
              <rect x="0" y="0" width="100%" height="100%" fill="white" />
              <rect
                x={highlightPosition.left}
                y={highlightPosition.top}
                width={highlightPosition.width}
                height={highlightPosition.height}
                rx="12"
                fill="black"
              />
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(2, 6, 23, 0.85)"
            mask="url(#tour-mask)"
          />
        </svg>

        {/* Highlight border */}
        <motion.div
          className="absolute border-2 border-[#38bdf8] rounded-xl pointer-events-none shadow-[0_0_30px_rgba(56,189,248,0.3)]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 1,
            scale: 1,
            top: highlightPosition.top,
            left: highlightPosition.left,
            width: highlightPosition.width,
            height: highlightPosition.height,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Tooltip */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            className="absolute w-80 bg-[#0f172a] border border-[#38bdf8]/30 rounded-2xl shadow-2xl p-5 z-[101]"
            style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-[#38bdf8]/20 rounded-lg">
                  <Lightbulb className="w-4 h-4 text-[#38bdf8]" />
                </div>
                <h3 className="font-semibold text-white">{step.title}</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="h-7 w-7 p-0 text-slate-400 hover:text-white hover:bg-white/10 -mr-2 -mt-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Content */}
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
              {step.content}
            </p>

            {/* Progress */}
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {tourSteps.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === currentStep
                        ? 'bg-[#38bdf8]'
                        : i < currentStep
                        ? 'bg-[#38bdf8]/40'
                        : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-500">
                {currentStep + 1} of {tourSteps.length}
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="text-slate-400 hover:text-white hover:bg-white/5"
              >
                Skip Tour
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="border-white/10 text-slate-300 hover:bg-white/5 disabled:opacity-30"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={handleNext}
                  className="bg-[#38bdf8] hover:bg-[#38bdf8]/90 text-white"
                >
                  {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
                  {currentStep < tourSteps.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
