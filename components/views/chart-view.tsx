'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'
import { TrendingUp } from 'lucide-react'

const inventoryData = [
  { warehouse: 'Warehouse A', current: 4230, capacity: 5000, reserve: 500 },
  { warehouse: 'Warehouse B', current: 3890, capacity: 5000, reserve: 500 },
  { warehouse: 'Warehouse C', current: 2150, capacity: 4000, reserve: 400 },
  { warehouse: 'Warehouse D', current: 3450, capacity: 4500, reserve: 450 },
  { warehouse: 'Regional Hub', current: 5600, capacity: 8000, reserve: 800 },
]

const trendData = [
  { month: 'Jan', units: 3200, orders: 240 },
  { month: 'Feb', units: 3800, orders: 320 },
  { month: 'Mar', units: 2700, orders: 280 },
  { month: 'Apr', units: 3900, orders: 380 },
  { month: 'May', units: 4200, orders: 420 },
  { month: 'Jun', units: 4800, orders: 500 },
  { month: 'Jul', units: 5200, orders: 580 },
]

export function ChartView() {
  return (
    <div className="p-8 space-y-8">
      {/* Inventory Levels */}
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-semibold text-slate-100">
            Inventory Levels by Warehouse
          </h3>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={inventoryData}>
            <defs>
              <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#fbbf24" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorCapacity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="warehouse" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '8px',
              }}
              cursor={{ fill: 'rgba(251, 191, 36, 0.1)' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              contentStyle={{ color: '#cbd5e1' }}
            />
            <Bar
              dataKey="current"
              fill="url(#colorCurrent)"
              name="Current Stock"
              radius={[8, 8, 0, 0]}
            />
            <Bar
              dataKey="capacity"
              fill="url(#colorCapacity)"
              name="Max Capacity"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trend Analysis */}
      <div className="bg-slate-800/50 rounded-lg border border-slate-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-slate-100">
            Inventory Trend (Last 7 Months)
          </h3>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <defs>
              <linearGradient id="colorUnits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '8px',
              }}
              cursor={{ stroke: 'rgba(139, 92, 246, 0.3)' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              contentStyle={{ color: '#cbd5e1' }}
            />
            <Line
              type="monotone"
              dataKey="units"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: '#8b5cf6', r: 4 }}
              activeDot={{ r: 6 }}
              name="Units Stored"
            />
            <Line
              type="monotone"
              dataKey="orders"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={{ fill: '#06b6d4', r: 4 }}
              activeDot={{ r: 6 }}
              name="Orders"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            label: 'Total Inventory',
            value: '19,320 units',
            trend: '+12% this month',
            color: 'text-amber-400',
          },
          {
            label: 'Avg Utilization',
            value: '78%',
            trend: '+3% this month',
            color: 'text-cyan-400',
          },
          {
            label: 'At-Risk Items',
            value: '340 units',
            trend: '-5% this month',
            color: 'text-emerald-400',
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-slate-800/50 rounded-lg border border-slate-700 p-4"
          >
            <p className="text-xs text-slate-400 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color} mb-2`}>
              {stat.value}
            </p>
            <p className="text-xs text-slate-500">{stat.trend}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
