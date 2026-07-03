'use client'

import { useState, useEffect } from 'react'
import { DollarSign, Package, BarChart3, Zap } from 'lucide-react'
import { AgentCard } from './agent-card'

interface AgentMatrixProps {
  activeAgent?: string | null
}

const AGENTS = [
  {
    id: 'finance',
    name: 'Finance Agent',
    icon: <DollarSign className="w-5 h-5" />,
  },
  {
    id: 'inventory',
    name: 'Inventory Agent',
    icon: <Package className="w-5 h-5" />,
  },
  {
    id: 'analytics',
    name: 'Analytics Agent',
    icon: <BarChart3 className="w-5 h-5" />,
  },
]

export function AgentMatrix({ activeAgent }: AgentMatrixProps) {
  const [agents, setAgents] = useState(
    AGENTS.map((agent) => ({
      ...agent,
      status: 'idle' as 'idle' | 'active',
      logs: [],
    }))
  )

  useEffect(() => {
    // Auto-activate agents in sequence for demo
    const financeTimer = setTimeout(() => {
      setAgents((prev) =>
        prev.map((a) => (a.id === 'finance' ? { ...a, status: 'active' } : a))
      )
    }, 500)

    const inventoryTimer = setTimeout(() => {
      setAgents((prev) =>
        prev.map((a) => (a.id === 'inventory' ? { ...a, status: 'active' } : a))
      )
    }, 3500)

    const analyticsTimer = setTimeout(() => {
      setAgents((prev) =>
        prev.map((a) => (a.id === 'analytics' ? { ...a, status: 'active' } : a))
      )
    }, 6500)

    // Deactivate all after demo
    const resetTimer = setTimeout(() => {
      setAgents((prev) =>
        prev.map((a) => ({ ...a, status: 'idle' }))
      )
    }, 12000)

    return () => {
      clearTimeout(financeTimer)
      clearTimeout(inventoryTimer)
      clearTimeout(analyticsTimer)
      clearTimeout(resetTimer)
    }
  }, [])

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-700 bg-slate-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="w-5 h-5 text-amber-400" />
            <h2 className="text-sm font-semibold text-slate-100">Agent Matrix</h2>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>2 Active</span>
          </div>
        </div>
      </div>

      {/* Agent Cards */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            name={agent.name}
            icon={agent.icon}
            status={agent.status}
            logs={agent.logs}
          />
        ))}

        {/* System Status Card */}
        <div className="mt-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700 text-xs text-slate-400 space-y-2">
          <div className="flex justify-between">
            <span>System Health</span>
            <span className="text-emerald-400">99.8%</span>
          </div>
          <div className="flex justify-between">
            <span>Queue Depth</span>
            <span className="text-amber-400">3 pending</span>
          </div>
          <div className="flex justify-between">
            <span>Avg Response Time</span>
            <span className="text-cyan-400">340ms</span>
          </div>
        </div>
      </div>
    </div>
  )
}
