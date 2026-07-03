'use client'

import { useState } from 'react'
import { Settings, RefreshCw, Bell, Clock } from 'lucide-react'
import { CommandPanel } from '@/components/command-panel'
import { AgentMatrix } from '@/components/agent-matrix'
import { OutputCanvas } from '@/components/output-canvas'

type AgentStatus = 'idle' | 'running' | 'completed'
type ViewType = 'welcome' | 'invoice' | 'inventory' | 'analytics'

interface AgentState {
  status: AgentStatus
  logs: string[]
}

interface AgentStatuses {
  Finance: AgentState
  Inventory: AgentState
  Analytics: AgentState
}

export default function Dashboard() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [activeView, setActiveView] = useState<ViewType>('welcome')
  const [agentStatuses, setAgentStatuses] = useState<AgentStatuses>({
    Finance: { status: 'idle', logs: [] },
    Inventory: { status: 'idle', logs: [] },
    Analytics: { status: 'idle', logs: [] },
  })
  const [isRefreshing, setIsRefreshing] = useState(false)

  const analyticsLogs = [
    '> Collecting metrics from all sources...',
    '> Processing 1.2M page views...',
    '> Analyzing conversion patterns...',
    '✓ Conversion rate: 3.4%',
    '✓ Avg session time: 4m 32s',
    '✓ User engagement: 87.3%',
    '> Compiling dashboard insights...',
    '✓ Dashboard compiled successfully',
  ]

  const inventoryLogs = [
    '> Scanning warehouse systems...',
    '> Connecting to WMS...',
    '✓ Warehouse A: 4,230 units',
    '✓ Warehouse B: 3,890 units',
    '✓ Warehouse C: 2,150 units',
    '> Analyzing stock levels...',
    '✓ Reorder alerts: 5 items',
    '✓ Inventory check complete',
  ]

  const financeLogs = [
    '> Fetching Q3 financial data...',
    '> Accessing ledger systems...',
    '✓ Revenue calculated: $2.4M',
    '✓ Operating expenses: $1.8M',
    '✓ Net profit: $600K',
    '> Generating invoice report...',
    '> PDF generation in progress...',
    '✓ Invoice report generated',
  ]

  const handleCommand = (command: string) => {
    if (isProcessing) return

    setIsProcessing(true)

    // Reset all states
    setAgentStatuses({
      Finance: { status: 'idle', logs: [] },
      Inventory: { status: 'idle', logs: [] },
      Analytics: { status: 'idle', logs: [] },
    })
    setActiveView('welcome')

    // Start Analytics agent immediately
    setTimeout(() => {
      setAgentStatuses((prev) => ({
        ...prev,
        Analytics: { status: 'running', logs: [] },
      }))

      // Stream analytics logs
      analyticsLogs.forEach((log, idx) => {
        setTimeout(() => {
          setAgentStatuses((prev) => ({
            ...prev,
            Analytics: {
              status: prev.Analytics.status,
              logs: [...prev.Analytics.logs, log],
            },
          }))
        }, idx * 400)
      })

      // Complete analytics after all logs are streamed
      setTimeout(() => {
        setAgentStatuses((prev) => ({
          ...prev,
          Analytics: { ...prev.Analytics, status: 'completed' },
        }))
      }, analyticsLogs.length * 400 + 200)
    }, 100)

    // Start Inventory agent after analytics completes
    setTimeout(() => {
      setAgentStatuses((prev) => ({
        ...prev,
        Inventory: { status: 'running', logs: [] },
      }))

      // Stream inventory logs
      inventoryLogs.forEach((log, idx) => {
        setTimeout(() => {
          setAgentStatuses((prev) => ({
            ...prev,
            Inventory: {
              status: prev.Inventory.status,
              logs: [...prev.Inventory.logs, log],
            },
          }))
        }, idx * 400)
      })

      // Complete inventory after all logs are streamed
      setTimeout(() => {
        setAgentStatuses((prev) => ({
          ...prev,
          Inventory: { ...prev.Inventory, status: 'completed' },
        }))
      }, inventoryLogs.length * 400 + 200)
    }, analyticsLogs.length * 400 + 800)

    // Start Finance agent last, then switch view
    setTimeout(() => {
      setAgentStatuses((prev) => ({
        ...prev,
        Finance: { status: 'running', logs: [] },
      }))

      // Stream finance logs
      financeLogs.forEach((log, idx) => {
        setTimeout(() => {
          setAgentStatuses((prev) => ({
            ...prev,
            Finance: {
              status: prev.Finance.status,
              logs: [...prev.Finance.logs, log],
            },
          }))
        }, idx * 400)
      })

      // Complete finance and switch to invoice view
      setTimeout(() => {
        setAgentStatuses((prev) => ({
          ...prev,
          Finance: { ...prev.Finance, status: 'completed' },
        }))
        setActiveView('invoice')
        setIsProcessing(false)
      }, financeLogs.length * 400 + 200)
    }, analyticsLogs.length * 400 + inventoryLogs.length * 400 + 1600)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
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
            <CommandPanel onCommand={handleCommand} isProcessing={isProcessing} />
          </div>

          {/* Center Panel - Agent Matrix */}
          <div className="lg:col-span-1 h-[600px] md:h-[700px]">
            <AgentMatrix agentStatuses={agentStatuses} />
          </div>

          {/* Right Panel - Output Canvas */}
          <div className="lg:col-span-1 h-[600px] md:h-[700px]">
            <OutputCanvas activeView={activeView} onViewChange={setActiveView} />
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
