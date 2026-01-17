'use client';

import React from 'react';

interface Tool {
  id: string;
  slotNumber: number;
  toolNumber: number;
  name: string;
  type: string | null;
  description: string | null;
  status: string;
  lifePercent: number;
}

interface PrintableToolReportProps {
  tools: Tool[];
  currentInSlot: number;
  currentOutSlot: number;
  translations: any;
}

export const PrintableToolReport = React.forwardRef<
  HTMLDivElement,
  PrintableToolReportProps
>(({ tools, currentInSlot, currentOutSlot, translations }, ref) => {
  const sortedTools = [...tools].sort((a, b) => a.slotNumber - b.slotNumber);
  const printDate = new Date().toLocaleString();

  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'READY':
        return '#38bdf8'; // Sky blue
      case 'ACTIVE':
        return '#10b981'; // Green
      case 'WARNING':
        return '#f59e0b'; // Amber
      case 'MAINTENANCE':
        return '#ef4444'; // Red
      case 'EMPTY':
        return '#6b7280'; // Gray
      default:
        return '#64748b';
    }
  };

  return (
    <div
      ref={ref}
      className="bg-white text-black p-8"
      style={{
        width: '210mm',
        minHeight: '297mm',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Header */}
      <div className="mb-8 border-b-2 border-slate-800 pb-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          ToolMaster {translations.toolReport || 'Tool Magazine Report'}
        </h1>
        <div className="flex justify-between text-sm text-slate-600">
          <div>
            <p>
              <strong>{translations.reportDate || 'Report Date'}:</strong>{' '}
              {printDate}
            </p>
            <p>
              <strong>{translations.totalTools || 'Total Tools'}:</strong>{' '}
              {tools.length} / 12
            </p>
          </div>
          <div className="text-right">
            <p>
              <strong>{translations.inPosition || 'IN Position'}:</strong> Slot{' '}
              {currentInSlot} (12 o'clock)
            </p>
            <p>
              <strong>{translations.outPosition || 'OUT Position'}:</strong>{' '}
              Slot {currentOutSlot}
            </p>
          </div>
        </div>
      </div>

      {/* Magazine Overview Diagram */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          {translations.magazineOverview || 'Magazine Overview'}
        </h2>
        <div className="flex justify-center mb-6">
          <div className="relative" style={{ width: '300px', height: '300px' }}>
            <svg width="300" height="300" viewBox="0 0 300 300">
              {/* Clock positions */}
              {Array.from({ length: 12 }).map((_, i) => {
                const angle = ((i + 1) * 30 - 90) * (Math.PI / 180);
                const x = 150 + 120 * Math.cos(angle);
                const y = 150 + 120 * Math.sin(angle);
                const slotNumber = i + 1;
                const tool = sortedTools.find(
                  (t) => t.slotNumber === slotNumber
                );
                const isIn = slotNumber === currentInSlot;
                const isOut = slotNumber === currentOutSlot;

                return (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy={y}
                      r="20"
                      fill={
                        isIn
                          ? '#f59e0b'
                          : isOut
                          ? '#22d3ee'
                          : tool
                          ? getStatusColor(tool.status)
                          : '#e2e8f0'
                      }
                      stroke="#1e293b"
                      strokeWidth="2"
                    />
                    <text
                      x={x}
                      y={y + 5}
                      textAnchor="middle"
                      fill="white"
                      fontSize="14"
                      fontWeight="bold"
                    >
                      {slotNumber}
                    </text>
                  </g>
                );
              })}
              {/* Center circle */}
              <circle
                cx="150"
                cy="150"
                r="40"
                fill="#0f172a"
                stroke="#1e293b"
                strokeWidth="2"
              />
              <text
                x="150"
                y="155"
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
              >
                IN: {currentInSlot}
              </text>
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-4 text-xs mb-6">
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: '#f59e0b' }}
            />
            <span>{translations.inPosition || 'IN'}</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: '#22d3ee' }}
            />
            <span>{translations.outPosition || 'OUT'}</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: '#38bdf8' }}
            />
            <span>{translations.ready || 'Ready'}</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: '#10b981' }}
            />
            <span>{translations.active || 'Active'}</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: '#f59e0b' }}
            />
            <span>{translations.warning || 'Warning'}</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: '#ef4444' }}
            />
            <span>{translations.maintenance || 'Maintenance'}</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: '#6b7280' }}
            />
            <span>{translations.empty || 'Empty'}</span>
          </div>
        </div>
      </div>

      {/* Tool List Table */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          {translations.toolList || 'Tool List'}
        </h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="border border-slate-700 p-2 text-left">
                {translations.slot || 'Slot'} #
              </th>
              <th className="border border-slate-700 p-2 text-left">
                {translations.tool || 'Tool'} #
              </th>
              <th className="border border-slate-700 p-2 text-left">
                {translations.toolName || 'Tool Name'}
              </th>
              <th className="border border-slate-700 p-2 text-left">
                {translations.type || 'Type'}
              </th>
              <th className="border border-slate-700 p-2 text-left">
                {translations.description || 'Description'}
              </th>
              <th className="border border-slate-700 p-2 text-center">
                {translations.status || 'Status'}
              </th>
              <th className="border border-slate-700 p-2 text-center">
                {translations.life || 'Life'} %
              </th>
              <th className="border border-slate-700 p-2 text-center">
                {translations.position || 'Position'}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTools.map((tool) => {
              const isIn = tool.slotNumber === currentInSlot;
              const isOut = tool.slotNumber === currentOutSlot;

              return (
                <tr
                  key={tool.id}
                  className={`${
                    isIn
                      ? 'bg-amber-100'
                      : isOut
                      ? 'bg-cyan-100'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="border border-slate-300 p-2 font-bold">
                    {tool.slotNumber}
                  </td>
                  <td className="border border-slate-300 p-2">
                    T{tool.toolNumber.toString().padStart(2, '0')}
                  </td>
                  <td className="border border-slate-300 p-2 font-medium">
                    {tool.name}
                  </td>
                  <td className="border border-slate-300 p-2">{tool.type}</td>
                  <td className="border border-slate-300 p-2 text-xs">
                    {tool.description || '-'}
                  </td>
                  <td className="border border-slate-300 p-2 text-center">
                    <span
                      className="inline-block px-2 py-1 rounded text-xs font-medium text-white"
                      style={{ backgroundColor: getStatusColor(tool.status) }}
                    >
                      {tool.status}
                    </span>
                  </td>
                  <td className="border border-slate-300 p-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full transition-all"
                          style={{
                            width: `${tool.lifePercent}%`,
                            backgroundColor:
                              tool.lifePercent >= 70
                                ? '#10b981'
                                : tool.lifePercent >= 30
                                ? '#f59e0b'
                                : '#ef4444',
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium">
                        {tool.lifePercent}%
                      </span>
                    </div>
                  </td>
                  <td className="border border-slate-300 p-2 text-center text-xs">
                    {isIn && (
                      <span className="font-bold text-amber-600">IN</span>
                    )}
                    {isOut && (
                      <span className="font-bold text-cyan-600">OUT</span>
                    )}
                    {!isIn && !isOut && '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-slate-300 text-xs text-slate-600">
        <div className="flex justify-between">
          <div>
            <p>
              <strong>{translations.generatedBy || 'Generated by'}:</strong>{' '}
              ToolMaster v1.0.0
            </p>
            <p>
              <strong>{translations.printedOn || 'Printed on'}:</strong>{' '}
              {printDate}
            </p>
          </div>
          <div className="text-right">
            <p>{translations.page || 'Page'} 1 of 1</p>
          </div>
        </div>
      </div>
    </div>
  );
});

PrintableToolReport.displayName = 'PrintableToolReport';
