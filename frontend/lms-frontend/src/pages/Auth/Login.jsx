import { Link } from "react-router-dom"
import React from 'react'
import { useForm } from 'react-hook-form'
import { Spinner } from '@/components/ui/Spinner'
import { useLoginHook } from '@/hooks/User.hook'

const Login = () => {
  const { register, handleSubmit } = useForm()
  const { mutate, isPending } = useLoginHook()

  const loginFormHandler = (data) => {
    mutate(data)
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: '#0C1318',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .login-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(42,127,191,0.25);
          border-radius: 12px;
          padding: 14px 18px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          color: #ffffff;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .login-input::placeholder { color: rgba(82,107,122,0.8); }
        .login-input:focus {
          border-color: rgba(75,163,216,0.6);
          box-shadow: 0 0 0 4px rgba(42,127,191,0.15);
        }

        .login-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #F4A51A 0%, #e8900a 100%);
          border: none;
          border-radius: 12px;
          color: #0C1318;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.92rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(244,165,26,0.4);
        }
        .login-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .register-link {
          color: #4BA3D8;
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }
        .register-link:hover { color: #F4A51A; }
      `}</style>

      {/* Background glows */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 70% 60% at 50% -5%, rgba(45,106,79,0.35) 0%, transparent 55%),
          radial-gradient(ellipse 45% 45% at 10% 60%, rgba(42,127,191,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 35% 35% at 90% 70%, rgba(42,127,191,0.12) 0%, transparent 60%)
        `,
      }} />

      {/* Decorative rings */}
      {[500, 780, 1060].map((size, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${size}px`,
          height: `${size}px`,
          top: `${[-220, -360, -500][i]}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          borderRadius: '50%',
          border: `1px solid ${['rgba(149,213,178,0.07)', 'rgba(42,127,191,0.06)', 'rgba(42,127,191,0.03)'][i]}`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* Card */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '420px',
        margin: '0 24px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(42,127,191,0.18)',
        borderRadius: '24px',
        padding: '44px 40px 40px',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(149,213,178,0.04)',
        animation: 'fadeUp 0.6s ease both',
      }}>

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px', justifyContent: 'center' }}>
          <div style={{
            width: '38px',
            height: '38px',
            background: 'linear-gradient(135deg, #1A5480 0%, #40916C 60%, #95D5B2 100%)',
            borderRadius: '11px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            boxShadow: '0 4px 14px rgba(42,127,191,0.4)',
          }}>
            🪺
          </div>
          <div>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#F4A51A', letterSpacing: '-0.02em' }}>Course</span>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#ffffff', letterSpacing: '-0.02em' }}> Nest</span>
          </div>
        </div>

        {/* Heading */}
        <div style={{ marginBottom: '28px', textAlign: 'center' }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.9rem',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: '8px',
          }}>
            Welcome <em style={{ fontStyle: 'italic', color: '#4BA3D8' }}>back</em>
          </h1>
          <p style={{ fontSize: '0.82rem', color: '#526B7A', fontWeight: 400 }}>
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(loginFormHandler)} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

          {/* Email field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#526B7A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#2A7FBF' }}
                width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
              </svg>
              <input
                className='login-input'
                type="email"
                placeholder='you@example.com'
                style={{ paddingLeft: '42px' }}
                {...register('email')}
              />
            </div>
          </div>

          {/* Password field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#526B7A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#2A7FBF' }}
                width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <input
                className='login-input'
                type="password"
                placeholder='Enter your password'
                style={{ paddingLeft: '42px' }}
                {...register('password')}
              />
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(42,127,191,0.12)', margin: '6px 0' }} />

          {/* Submit */}
          <button type='submit' className='login-btn' disabled={isPending}>
            {isPending ? <Spinner /> : (
              <>
                Sign In
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </>
            )}
          </button>

          {/* Register link */}
          <p style={{ textAlign: 'center', fontSize: '0.82rem', color: '#526B7A', marginTop: '4px' }}>
            Don't have an account?{' '}
            <Link to='/register' className='register-link'>
              Register
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}

export default Login