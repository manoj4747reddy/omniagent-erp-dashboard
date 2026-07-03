'use client'

import { useState } from 'react'
import {
  FileText,
  BarChart3,
  Zap,
  ChevronRight,
  Download,
  Share2,
} from 'lucide-react'
import { InvoiceView } from './views/invoice-view'
import { ChartView } from './views/chart-view'
import { KPIView } from './views/kpi-view'

type ViewType = 'invoice' | 'chart' | 'kpi'

const VIEW_TABS = [
  { id: 'invoice', label: 'Invoice', icon: <FileText className="w-4 h-4" /> },
  { id: 'chart', label: 'Inventory', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'kpi', label: 'Metrics', icon: <Zap className="w-4 h-4" /> },
] as const

export function OutputCanvas() {
  const [activeView, setActiveView] = useState<ViewType>('invoice')

  const renderView = () => {
    switch (activeView) {
      case 'invoice':
        return <InvoiceView />
      case 'chart':
        return <ChartView />
      case 'kpi':
        return <KPIView />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
      {/* Header with tabs */}
      <div className="border-b border-slate-700 bg-slate-800/50">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex gap-1">
            {VIEW_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as ViewType)}
                className={`px-4 py-2 rounded-t flex items-center gap-2 text-sm font-medium transition-all duration-200 ${
                  activeView === tab.id
                    ? 'bg-slate-700 text-amber-400 border-b-2 border-amber-400'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-all"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              className="p-2 rounded hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-all"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {renderView()}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 border-t border-slate-700 bg-slate-800/50 flex items-center justify-between text-xs text-slate-400">
        <span>Last updated: 2 minutes ago</span>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Live</span>
        </div>
      </div>
    </div>
  )
}
