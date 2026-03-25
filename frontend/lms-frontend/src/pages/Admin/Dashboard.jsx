import DashboardSideBar from '@/components/DashboardSideBar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className='flex min-h-screen' style={{ background: '#f5f0e8' }}>
      <DashboardSideBar />
      <div className='flex-1 overflow-auto'>
        <Outlet />
      </div>
    </div>
  )
}

export default Dashboard