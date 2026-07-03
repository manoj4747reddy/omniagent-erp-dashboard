'use client'

import { DollarSign, Package, BarChart3, Zap } from 'lucide-react'
import { AgentCard } from './agent-card'

type AgentStatus = 'idle' | 'running' | 'completed'

interface AgentState {
  status: AgentStatus
  logs: string[]
}

interface AgentStatuses {
  Finance: AgentState
  Inventory: AgentState
  Analytics: AgentState
}

interface AgentMatrixProps {
  agentStatuses: AgentStatuses
}

const AGENTS = [
  {
    id: 'Finance',
    name: 'Finance Agent',
    icon: <DollarSign className="w-5 h-5" />,
  },
  {
    id: 'Inventory',
    name: 'Inventory Agent',
    icon: <Package className="w-5 h-5" />,
  },
  {
    id: 'Analytics',
    name: 'Analytics Agent',
    icon: <BarChart3 className="w-5 h-5" />,
  },
]

export function AgentMatrix({ agentStatuses }: AgentMatrixProps) {
  const getAgentActiveCount = () => {
    return Object.values(agentStatuses).filter((a) => a.status === 'running').length
  }

  const activeCount = getAgentActiveCount()

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
            <div
              className={`w-2 h-2 rounded-full ${
                activeCount > 0 ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'
              }`}
            />
            <span>{activeCount > 0 ? `${activeCount} Active` : 'All Idle'}</span>
          </div>
        </div>
      </div>

      {/* Agent Cards */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {AGENTS.map((agent) => (
          <AgentCard
            key={agent.id}
            name={agent.name}
            icon={agent.icon}
            status={agentStatuses[agent.id as keyof AgentStatuses].status}
            logs={agentStatuses[agent.id as keyof AgentStatuses].logs}
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
