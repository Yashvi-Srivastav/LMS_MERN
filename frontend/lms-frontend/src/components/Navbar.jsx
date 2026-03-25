import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useLoggedOut } from "@/hooks/User.hook";
import { Spinner } from "@/components/ui/Spinner";
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/Store/user.store';

const CourseNestLogo = () => (
  <svg viewBox="0 0 340 70" height="55" xmlns="http://www.w3.org/2000/svg">
    <path d="M28,58 Q44,72 62,72 Q80,72 96,58" fill="none" stroke="#BA7517" strokeWidth="5" strokeLinecap="round"/>
    <path d="M31,48 Q44,60 62,60 Q80,60 93,48" fill="none" stroke="#EF9F27" strokeWidth="4" strokeLinecap="round"/>
    <path d="M36,40 Q46,50 62,50 Q78,50 88,40" fill="none" stroke="#FCDE5A" strokeWidth="3" strokeLinecap="round"/>
    <path d="M28,58 Q22,50 20,42" fill="none" stroke="#854F0B" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M96,58 Q102,50 104,42" fill="none" stroke="#854F0B" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="55" cy="37" r="9" fill="#5DCAA5"/>
    <circle cx="62" cy="32" r="10" fill="#1D9E75"/>
    <circle cx="69" cy="37" r="9" fill="#9FE1CB"/>
    <rect x="56" y="25" width="11" height="9" rx="2" fill="#085041" opacity="0.85"/>
    <path d="M58,28 L66,28 M58,31 L66,31 M58,34 L63,34" stroke="#E1F5EE" strokeWidth="1" strokeLinecap="round" fill="none"/>
    <text x="115" y="48" fontFamily="Georgia, serif" fontSize="34" fontWeight="700" fill="#EF9F27">Course</text>
    <text x="250" y="48" fontFamily="Georgia, serif" fontSize="34" fontWeight="400" fill="#e8e4d8">Nest</text>
    <text x="115" y="63" fontFamily="Arial, sans-serif" fontSize="8" letterSpacing="2" fill="#888780">WHERE LEARNING IS NURTURED</text>
  </svg>
)

const Navbar = () => {
  const navigate = useNavigate()
  const { mutate, isPending } = useLoggedOut()
  const logoutHandler = () => { mutate() }
  const { user } = useUserStore()

  return (
    <div className='h-[10vh] w-full flex items-center justify-between px-8 bg-[#1a1a1a] shadow-md border-b border-[#2a2a2a]'>

      <div className='cursor-pointer' onClick={() => navigate('/')}>
        <CourseNestLogo />
      </div>

      <Popover>
        {/* Trigger — avatar only, no username visible */}
        <PopoverTrigger className='cursor-pointer outline-none'>
          <Avatar className='h-11 w-11 ring-2 ring-[#EF9F27] ring-offset-2 ring-offset-[#1a1a1a]'>
            <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
            <AvatarFallback style={{ background: '#EF9F27', color: '#1a1a1a', fontWeight: 700 }}>
              {user?.fullName?.charAt(0) || 'U'}
            </AvatarFallback>
          </Avatar>
        </PopoverTrigger>

        {/* Popover content — styled with brand palette */}
        <PopoverContent
          className='p-0 overflow-hidden'
          style={{
            background: '#1e1e1e',
            border: '1px solid #2a2a2a',
            borderRadius: '16px',
            width: '220px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          {/* User info header */}
          <div className='flex items-center gap-3 px-5 py-4' style={{ borderBottom: '1px solid #2a2a2a' }}>
            <Avatar className='h-10 w-10'>
              <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} />
              <AvatarFallback style={{ background: '#EF9F27', color: '#1a1a1a', fontWeight: 700 }}>
                {user?.fullName?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-semibold' style={{ color: '#e8e4d8' }}>{user?.fullName}</p>
              <p className='text-xs' style={{ color: '#888780' }}>{user?.email || 'Student'}</p>
            </div>
          </div>

          {/* Menu items */}
          <div className='flex flex-col py-2'>
            <button
              onClick={() => navigate('/dashboard')}
              className='flex items-center gap-3 px-5 py-3 text-sm text-left transition-all'
              style={{ color: '#e8e4d8' }}
              onMouseEnter={e => e.currentTarget.style.background = '#2a2a2a'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ color: '#EF9F27' }}>⊞</span>
              Dashboard
            </button>

            <button
              onClick={() => navigate('/YourCourse')}
              className='flex items-center gap-3 px-5 py-3 text-sm text-left transition-all'
              style={{ color: '#e8e4d8' }}
              onMouseEnter={e => e.currentTarget.style.background = '#2a2a2a'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ color: '#1D9E75' }}>◈</span>
              Your Courses
            </button>

            {/* Divider */}
            <div style={{ borderTop: '1px solid #2a2a2a', margin: '4px 0' }} />

            <button
              onClick={logoutHandler}
              className='flex items-center gap-3 px-5 py-3 text-sm text-left transition-all'
              style={{ color: '#e05555' }}
              onMouseEnter={e => e.currentTarget.style.background = '#2a1a1a'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span>→</span>
              {isPending ? <Spinner /> : 'Logout'}
            </button>
          </div>

        </PopoverContent>
      </Popover>

    </div>
  )
}

export default Navbar