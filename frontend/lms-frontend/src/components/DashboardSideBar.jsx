import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const DashboardSideBar = () => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { to: '/', label: 'Home', icon: '⌂' },
    { to: '/dashboard', label: 'Analytics', icon: '◎' },
    { to: '/dashboard/dashboardProduct', label: 'Products', icon: '⊞' },
  ]

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className='md:hidden fixed top-4 left-4 z-50 w-9 h-9 rounded-lg flex items-center justify-center'
        style={{ background: '#EF9F27', color: '#1a1a1a', fontSize: 18 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Overlay on mobile */}
      {isOpen && (
        <div
          className='md:hidden fixed inset-0 z-30'
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static z-40 flex flex-col h-screen w-64 flex-shrink-0
          transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        style={{ background: '#1a1a1a', borderRight: '1px solid #2a2a2a' }}
      >
        {/* Brand */}
        <div className='px-6 py-6 mt-10 md:mt-0' style={{ borderBottom: '1px solid #2a2a2a' }}>
          <span className='text-lg font-bold' style={{ color: '#EF9F27', fontFamily: 'Georgia, serif' }}>Course</span>
          <span className='text-lg' style={{ color: '#e8e4d8', fontFamily: 'Georgia, serif' }}>Nest</span>
          <p className='text-xs mt-0.5 tracking-widest' style={{ color: '#888780' }}>ADMIN PANEL</p>
        </div>

        {/* Nav links */}
        <nav className='flex flex-col gap-1 px-3 py-4'>
          {links.map((link) => {
            const isActive = location.pathname === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className='flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all'
                style={{
                  background: isActive ? '#2a2010' : 'transparent',
                  color: isActive ? '#EF9F27' : '#a0a09a',
                  borderLeft: isActive ? '3px solid #EF9F27' : '3px solid transparent',
                }}
                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#222' }}
                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
              >
                <span style={{ fontSize: '16px' }}>{link.icon}</span>
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}

export default DashboardSideBar