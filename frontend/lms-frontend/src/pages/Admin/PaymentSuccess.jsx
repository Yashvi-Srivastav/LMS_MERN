import { useCheckoutSuccess } from "@/hooks/payment.hook";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
    const [searchParam] = useSearchParams()
    const {mutate} = useCheckoutSuccess()

    useEffect(()=>{
       const sessionId = searchParam.get('session_id')
       if(sessionId){
           mutate(sessionId)
       }
    },[searchParam, mutate])

    return (
        <div style={{ minHeight: '100vh', background: '#f5f0e8', fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
            `}</style>

            <div style={{ background: '#ffffff', border: '1px solid #e8e0cc', borderRadius: 24, padding: '56px 48px', textAlign: 'center', maxWidth: 440, width: '100%', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>

                {/* Success icon */}
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(29,158,117,0.10)', border: '2px solid rgba(29,158,117,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                        <path d="M5 13l4 4L19 7" stroke="#1D9E75" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                {/* Heading */}
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 30, fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>
                    Payment Successful!
                </h1>

                {/* Divider */}
                <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, #EF9F27, transparent)', borderRadius: 99, margin: '0 auto 16px' }} />

                <p style={{ fontSize: 14, color: '#888780', lineHeight: 1.7, marginBottom: 36 }}>
                    You're all set! Your course has been unlocked and is ready to start.
                </p>

                <Link to={'/'}>
                    <button
                        style={{ background: '#EF9F27', color: '#1a1a1a', border: 'none', borderRadius: 10, padding: '13px 36px', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, cursor: 'pointer', width: '100%', transition: 'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#d48c1c'}
                        onMouseLeave={e => e.currentTarget.style.background = '#EF9F27'}
                    >
                        Go to Home
                    </button>
                </Link>

            </div>
        </div>
    )
}

export default PaymentSuccess
