import React from 'react'
import { Link } from 'react-router-dom'

export const Cancel = () => {
    return (
        <div style={{ minHeight: '100vh', background: '#f5f0e8', fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
            `}</style>

            <div style={{ background: '#ffffff', border: '1px solid #e8e0cc', borderRadius: 24, padding: '56px 48px', textAlign: 'center', maxWidth: 440, width: '100%', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>

                {/* Cancel icon */}
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(239,68,68,0.08)', border: '2px solid rgba(239,68,68,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                        <path d="M6 6l12 12M6 18L18 6" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
                    </svg>
                </div>

                {/* Heading */}
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>
                    Payment Cancelled
                </h1>

                {/* Divider */}
                <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, #ef4444, transparent)', borderRadius: 99, margin: '0 auto 16px' }} />

                <p style={{ fontSize: 14, color: '#888780', lineHeight: 1.7, marginBottom: 36 }}>
                    Your payment was not completed. No charges were made to your account.
                </p>

                <Link to={'/'}>
                    <button
                        style={{ background: '#1a1a1a', color: '#f5f0e8', border: 'none', borderRadius: 10, padding: '13px 36px', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, cursor: 'pointer', width: '100%', transition: 'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#333'}
                        onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}
                    >
                        Go to Home
                    </button>
                </Link>

            </div>
        </div>
    )
}

export default Cancel
