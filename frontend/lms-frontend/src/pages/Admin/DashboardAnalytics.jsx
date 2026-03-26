import { useGetDailyData, useGetDataHook } from '@/hooks/analytic.hook'
import { LineChart, Line, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import React, { useMemo } from 'react'

const StatCard = ({ label, value, icon, color }) => (
  <div
    className='flex-1 rounded-2xl p-6 flex flex-col gap-2'
    style={{ background: '#ffffff', border: '1px solid #e8e0cc', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
  >
    <div className='flex items-center justify-between'>
      <p className='text-xs font-medium tracking-wide' style={{ color: '#888780' }}>{label}</p>
      <span className='text-xl'>{icon}</span>
    </div>
    <p className='text-3xl font-bold' style={{ color, fontFamily: 'Georgia, serif' }}>{value ?? '—'}</p>
  </div>
)

const DashboardAnalytics = () => {
  const { data } = useGetDataHook()

  const { startDate, endDate } = useMemo(() => {
    const end = new Date("2026-02-28")
    const start = new Date("2026-02-20")
    start.setDate(end.getDate() - 6)
    end.setDate(end.getDate() + 1)
    const toStr = (d) => d.toISOString().split('T')[0]
    return { startDate: toStr(start), endDate: toStr(end) }
  }, [])

  const { data: dailyData, isLoading } = useGetDailyData(startDate, endDate)

  return (
    <div className='p-8 flex flex-col gap-8'>

      {/* Page heading */}
      <div>
        <h1 className='text-2xl font-bold' style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>Analytics</h1>
        <div className='mt-1 h-1 w-12 rounded-full' style={{ background: '#EF9F27' }} />
      </div>


<div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
  <StatCard label="Total Courses" value={data?.courses} icon="◈" color="#EF9F27" />
  <StatCard label="Total Enrollments" value={data?.totalEnrollments} icon="✦" color="#1D9E75" />
  <StatCard label="Total Revenue" value={data?.totalRevenue ? `₹${data.totalRevenue}` : '0'} icon="◉" color="#534AB7" />
  <StatCard label="Total Users" value={data?.users} icon="⊙" color="#D85A30" />
</div>

      {/* Revenue chart */}
      <div
        className='rounded-2xl p-6'
        style={{ background: '#ffffff', border: '1px solid #e8e0cc', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
      >
        <div className='mb-6'>
          <h2 className='text-base font-semibold' style={{ color: '#1a1a1a' }}>Revenue (Daily)</h2>
          <p className='text-xs mt-1' style={{ color: '#888780' }}>Last 7 days performance</p>
          <div className='mt-2 h-0.5 w-10 rounded-full' style={{ background: '#EF9F27' }} />
        </div>

        {isLoading ? (
          <div className='h-64 flex items-center justify-center'>
            <p className='text-sm' style={{ color: '#888780' }}>Loading chart...</p>
          </div>
        ) : (
          <div className='h-72 w-full'>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData || []} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid stroke='#f0ece4' strokeDasharray="4 4" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#888780' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#888780' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: '#1a1a1a',
                    border: '1px solid #2a2a2a',
                    borderRadius: '10px',
                    color: '#e8e4d8',
                    fontSize: '12px',
                  }}
                  formatter={(value, name) => {
                    if (name === 'revenue') return [`₹${value}`, 'Revenue']
                    if (name === 'enrollments' || name === 'sales') return [value, 'Enrollments']
                    return [value, name]
                  }}
                />
                <Line
                  type='monotone'
                  dataKey='revenue'
                  stroke='#EF9F27'
                  strokeWidth={2.5}
                  dot={{ fill: '#EF9F27', r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: '#BA7517' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

    </div>
  )
}

export default DashboardAnalytics