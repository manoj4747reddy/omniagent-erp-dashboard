'use client'

import { useState } from 'react'
import { Settings, RefreshCw, Bell, Clock } from 'lucide-react'
import { CommandPanel } from '@/components/command-panel'
import { AgentMatrix } from '@/components/agent-matrix'
import { OutputCanvas } from '@/components/output-canvas'

export default function Dashboard() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const handleCommand = (command: string) => {
    console.log('Command received:', command)
    // Auto-activate agents based on command
    if (
      command.toLowerCase().includes('finance') ||
      command.toLowerCase().includes('revenue')
    ) {
      setActiveAgent('finance')
    } else if (
      command.toLowerCase().includes('inventory') ||
      command.toLowerCase().includes('warehouse')
    ) {
      setActiveAgent('inventory')
    } else if (
      command.toLowerCase().includes('analytics') ||
      command.toLowerCase().includes('report')
    ) {
      setActiveAgent('analytics')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
      {/* Top Navigation */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
              <span className="text-sm font-bold text-slate-900">OA</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-100">OmniAgent ERP</h1>
              <p className="text-xs text-slate-500">AI Multi-Agent Workflow</p>
            </div>
          </div>

          {/* Center - Status */}
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Clock className="w-4 h-4" />
            <span>Real-time Processing</span>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className={`p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-all ${
                isRefreshing ? 'animate-spin' : ''
              }`}
              title="Refresh data"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button
              className="relative p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-all"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-400" />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-all"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-max">
          {/* Left Panel - Command Input */}
          <div className="lg:col-span-1 h-[600px] md:h-[700px]">
            <CommandPanel onCommand={handleCommand} />
          </div>

          {/* Center Panel - Agent Matrix */}
          <div className="lg:col-span-1 h-[600px] md:h-[700px]">
            <AgentMatrix activeAgent={activeAgent} />
          </div>

          {/* Right Panel - Output Canvas */}
          <div className="lg:col-span-1 h-[600px] md:h-[700px]">
            <OutputCanvas />
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700">
            <p className="text-xs text-slate-500 mb-1">System Load</p>
            <p className="text-lg font-semibold text-slate-100">42%</p>
            <p className="text-xs text-emerald-400">Healthy</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700">
            <p className="text-xs text-slate-500 mb-1">Processed Today</p>
            <p className="text-lg font-semibold text-slate-100">2.4K</p>
            <p className="text-xs text-cyan-400">+18% vs yesterday</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700">
            <p className="text-xs text-slate-500 mb-1">Avg Latency</p>
            <p className="text-lg font-semibold text-slate-100">245ms</p>
            <p className="text-xs text-emerald-400">Optimized</p>
          </div>
          <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700">
            <p className="text-xs text-slate-500 mb-1">Success Rate</p>
            <p className="text-lg font-semibold text-slate-100">99.2%</p>
            <p className="text-xs text-amber-400">Outstanding</p>
          </div>
        </div>
      </main>
    </div>
  )
}
