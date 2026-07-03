import {
  TrendingUp,
  DollarSign,
  Zap,
  Target,
  Users,
  Clock,
  AlertCircle,
  CheckCircle,
} from 'lucide-react'

interface KPICard {
  label: string
  value: string
  unit?: string
  change: string
  trend: 'up' | 'down' | 'stable'
  icon: React.ReactNode
  backgroundColor: string
  textColor: string
  accentColor: string
}

const kpis: KPICard[] = [
  {
    label: 'Total Revenue',
    value: '2.4',
    unit: 'M',
    change: '+18% vs last quarter',
    trend: 'up',
    icon: <DollarSign className="w-5 h-5" />,
    backgroundColor: 'bg-slate-800/50',
    textColor: 'text-amber-400',
    accentColor: 'border-amber-400/20',
  },
  {
    label: 'Operating Efficiency',
    value: '94',
    unit: '%',
    change: '+3% vs last quarter',
    trend: 'up',
    icon: <Zap className="w-5 h-5" />,
    backgroundColor: 'bg-slate-800/50',
    textColor: 'text-cyan-400',
    accentColor: 'border-cyan-400/20',
  },
  {
    label: 'Goal Completion',
    value: '87',
    unit: '%',
    change: '+12% vs last quarter',
    trend: 'up',
    icon: <Target className="w-5 h-5" />,
    backgroundColor: 'bg-slate-800/50',
    textColor: 'text-violet-400',
    accentColor: 'border-violet-400/20',
  },
  {
    label: 'Active Users',
    value: '3.2',
    unit: 'K',
    change: '+24% vs last quarter',
    trend: 'up',
    icon: <Users className="w-5 h-5" />,
    backgroundColor: 'bg-slate-800/50',
    textColor: 'text-emerald-400',
    accentColor: 'border-emerald-400/20',
  },
  {
    label: 'Avg Response Time',
    value: '340',
    unit: 'ms',
    change: '-15% vs last quarter',
    trend: 'down',
    icon: <Clock className="w-5 h-5" />,
    backgroundColor: 'bg-slate-800/50',
    textColor: 'text-pink-400',
    accentColor: 'border-pink-400/20',
  },
  {
    label: 'System Uptime',
    value: '99.8',
    unit: '%',
    change: '+0.2% vs last quarter',
    trend: 'up',
    icon: <CheckCircle className="w-5 h-5" />,
    backgroundColor: 'bg-slate-800/50',
    textColor: 'text-emerald-400',
    accentColor: 'border-emerald-400/20',
  },
]

export function KPIView() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <TrendingUp className="w-6 h-6 text-amber-400" />
        <h2 className="text-2xl font-bold text-slate-100">
          Key Performance Indicators
        </h2>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi, index) => (
          <div
            key={index}
            className={`${kpi.backgroundColor} border ${kpi.accentColor} rounded-lg p-6 transition-all hover:border-opacity-50 cursor-pointer hover:shadow-lg hover:shadow-opacity-10`}
          >
            {/* Header with Icon */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-slate-400">{kpi.label}</p>
              <div className={`${kpi.textColor}`}>{kpi.icon}</div>
            </div>

            {/* Value */}
            <div className="mb-4">
              <div className="flex items-baseline gap-1">
                <span className={`text-3xl font-bold ${kpi.textColor}`}>
                  {kpi.value}
                </span>
                <span className="text-sm text-slate-400">{kpi.unit}</span>
              </div>
            </div>

            {/* Change Indicator */}
            <div className="flex items-center gap-2 pt-3 border-t border-slate-700/50">
              <div
                className={`w-2 h-2 rounded-full ${
                  kpi.trend === 'up'
                    ? 'bg-emerald-400'
                    : kpi.trend === 'down'
                      ? 'bg-red-400'
                      : 'bg-slate-400'
                }`}
              />
              <p
                className={`text-xs font-medium ${
                  kpi.trend === 'up'
                    ? 'text-emerald-400'
                    : kpi.trend === 'down'
                      ? 'text-red-400'
                      : 'text-slate-400'
                }`}
              >
                {kpi.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Alerts Section */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-amber-400" />
          System Alerts
        </h3>

        <div className="space-y-3">
          {[
            {
              level: 'warning',
              title: 'High Memory Usage',
              desc: 'Analytics Agent memory at 85% capacity',
            },
            {
              level: 'info',
              title: 'Scheduled Maintenance',
              desc: 'Database optimization scheduled for tomorrow at 2:00 AM UTC',
            },
            {
              level: 'success',
              title: 'Integration Complete',
              desc: 'New Finance Agent module successfully deployed',
            },
          ].map((alert, i) => (
            <div
              key={i}
              className={`flex items-start gap-3 p-4 rounded-lg border ${
                alert.level === 'warning'
                  ? 'bg-amber-400/10 border-amber-400/30'
                  : alert.level === 'success'
                    ? 'bg-emerald-400/10 border-emerald-400/30'
                    : 'bg-cyan-400/10 border-cyan-400/30'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                  alert.level === 'warning'
                    ? 'bg-amber-400'
                    : alert.level === 'success'
                      ? 'bg-emerald-400'
                      : 'bg-cyan-400'
                }`}
              />
              <div className="flex-1">
                <p
                  className={`text-sm font-semibold ${
                    alert.level === 'warning'
                      ? 'text-amber-200'
                      : alert.level === 'success'
                        ? 'text-emerald-200'
                        : 'text-cyan-200'
                  }`}
                >
                  {alert.title}
                </p>
                <p className="text-xs text-slate-400 mt-1">{alert.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-slate-700">
        {[
          { label: 'Last Update', value: '2 min ago' },
          { label: 'Data Points', value: '1.2M' },
          { label: 'Accuracy', value: '99.2%' },
          { label: 'Confidence', value: '98.7%' },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
            <p className="text-lg font-semibold text-slate-200">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
