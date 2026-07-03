'use client'

import { useState, useEffect } from 'react'
import {
  BarChart3,
  DollarSign,
  Package,
  Zap,
  CircleDot,
  Code2,
} from 'lucide-react'

interface AgentCardProps {
  name: string
  icon: React.ReactNode
  status: 'idle' | 'running' | 'completed'
  logs: string[]
}

const TERMINAL_LOGS = {
  'Finance Agent': [
    '> Fetching Q3 financial data...',
    '> Parsing ledger entries...',
    '✓ Revenue calculated: $2.4M',
    '✓ Expenses processed: $1.8M',
    '> Generating PDF report...',
  ],
  'Inventory Agent': [
    '> Scanning warehouse systems...',
    '✓ Warehouse A: 4,230 units',
    '✓ Warehouse B: 3,890 units',
    '✓ Warehouse C: 2,150 units',
    '> Processing reorder alerts...',
  ],
  'Analytics Agent': [
    '> Collecting metrics...',
    '✓ Page views: 1.2M',
    '✓ Conversion rate: 3.4%',
    '✓ Avg session: 4m 32s',
    '> Compiling dashboards...',
  ],
}

export function AgentCard({ name, icon, status, logs }: AgentCardProps) {
  // Use provided logs if available, otherwise use default TERMINAL_LOGS
  const displayLogs = logs && logs.length > 0 ? logs : []

  return (
    <div
      className={`relative rounded-lg border overflow-hidden transition-all duration-300 ${
        status === 'running'
          ? 'bg-slate-800 border-amber-500/30 glow-amber-active shadow-lg'
          : status === 'completed'
            ? 'bg-slate-800 border-emerald-500/30 glow-green shadow-lg'
            : 'bg-slate-800/50 border-slate-700 hover:border-slate-600'
      }`}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400/0 via-amber-400 to-amber-400/0" />

      {/* Header */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-amber-400">{icon}</div>
            <h3 className="text-sm font-semibold text-slate-100">{name}</h3>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full transition-all ${
                status === 'running'
                  ? 'bg-amber-400 animate-pulse-slow shadow-lg shadow-amber-400/50'
                  : status === 'completed'
                    ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50'
                    : 'bg-slate-500'
              }`}
            />
            <span className="text-xs font-medium text-slate-400">
              {status === 'running'
                ? 'Running'
                : status === 'completed'
                  ? 'Completed'
                  : 'Idle'}
            </span>
          </div>
        </div>
      </div>

      {/* Terminal Box */}
      <div className="mx-4 mb-4 bg-black/40 rounded border border-slate-700/50 overflow-hidden">
        <div className="px-3 py-2 bg-slate-900/80 border-b border-slate-700/50 flex items-center gap-2">
          <Code2 className="w-3 h-3 text-amber-400/60" />
          <span className="text-xs font-semibold text-slate-400">Terminal</span>
        </div>

        <div className="px-3 py-2 min-h-20 max-h-32 overflow-y-auto text-xs terminal-text space-y-1">
          {displayLogs.length === 0 ? (
            <div className="text-slate-600">
              {status === 'idle' ? (
                <span className="text-slate-500">&gt; Waiting for command...</span>
              ) : status === 'running' ? (
                <span className="text-amber-500 animate-pulse">&gt; Processing...</span>
              ) : (
                <span className="text-emerald-500">&gt; Completed</span>
              )}
            </div>
          ) : (
            displayLogs.map((log, idx) => (
              <div key={idx} className="text-slate-300 break-words">
                {log.startsWith('✓') || log.startsWith('!') ? (
                  <span className="text-emerald-400">{log}</span>
                ) : log.includes('error') || log.includes('Error') ? (
                  <span className="text-red-400">{log}</span>
                ) : log.startsWith('>') ? (
                  <span className="text-cyan-400">{log}</span>
                ) : (
                  <span className="text-slate-300">{log}</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Loading animation when running */}
      {status === 'running' && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-amber-400"
                  style={{
                    animation: `pulse 1.5s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
            <span className="text-xs text-amber-400/70">Processing...</span>
          </div>
        </div>
      )}

      {/* Completion indicator */}
      {status === 'completed' && (
        <div className="px-4 pb-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-400/20 border border-emerald-400 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
            </div>
            <span className="text-xs text-emerald-400/70">Completed</span>
          </div>
        </div>
      )}

      {/* Footer stats */}
      <div className="px-4 py-3 bg-slate-900/50 border-t border-slate-700/50 text-xs text-slate-400 flex justify-between">
        <span>Tasks: 24</span>
        <span>Success: 98.2%</span>
        <span>Latency: 245ms</span>
      </div>
    </div>
  )
}
