import { Spinner } from '@/components/ui/Spinner'
import { useRegisterHook } from '@/hooks/User.hook'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from "react-router-dom"

const Register = () => {
    const {register, handleSubmit} = useForm()
    const {mutate, isPending} = useRegisterHook()
    const registerFormHandler=(data)=>{
        mutate(data)
    }
    return (
        <div className='h-screen w-screen flex items-center justify-center' style={{ background: '#f5f0e8', fontFamily: "'DM Sans', sans-serif" }}>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
                .reg-input::placeholder { color: #aaa49a; }
                .reg-input:focus { outline: none; border-color: rgba(239,159,39,0.5) !important; box-shadow: 0 0 0 3px rgba(239,159,39,0.10); }
            `}</style>

            <div style={{ background: '#ffffff', border: '1px solid #e8e0cc', borderRadius: 24, padding: '48px 40px', width: '100%', maxWidth: 420, boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: 36 }}>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 28, fontWeight: 700, color: '#1a1a1a', marginBottom: 8 }}>
                        Create Account
                    </h1>
                    <div style={{ width: 40, height: 2, background: 'linear-gradient(90deg, #EF9F27, transparent)', borderRadius: 99, margin: '0 auto 12px' }} />
                    <p style={{ fontSize: 13, color: '#888780' }}>Where learning is nurtured</p>
                </div>

                <form onSubmit={handleSubmit(registerFormHandler)} className='flex flex-col gap-4'>

                    <input
                        className='reg-input w-full px-4 py-3 rounded-xl text-sm'
                        style={{ border: '1px solid #e0d9cc', background: '#faf8f4', color: '#1a1a1a', fontFamily: "'DM Sans', sans-serif", transition: 'border-color 0.2s, box-shadow 0.2s' }}
                        type="text"
                        placeholder='Enter Your Name'
                        {...register('fullName')}
                    />

                    <input
                        className='reg-input w-full px-4 py-3 rounded-xl text-sm'
                        style={{ border: '1px solid #e0d9cc', background: '#faf8f4', color: '#1a1a1a', fontFamily: "'DM Sans', sans-serif", transition: 'border-color 0.2s, box-shadow 0.2s' }}
                        type="email"
                        placeholder='Enter Your Email'
                        {...register('email')}
                    />

                    <input
                        className='reg-input w-full px-4 py-3 rounded-xl text-sm'
                        style={{ border: '1px solid #e0d9cc', background: '#faf8f4', color: '#1a1a1a', fontFamily: "'DM Sans', sans-serif", transition: 'border-color 0.2s, box-shadow 0.2s' }}
                        type="password"
                        placeholder='Enter Your Password'
                        {...register('password')}
                    />

                    <button
                        type='submit'
                        className='text-center w-full py-3 rounded-xl text-sm font-bold mt-2'
                        style={{ background: '#EF9F27', color: '#1a1a1a', border: 'none', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer', transition: 'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#d48c1c'}
                        onMouseLeave={e => e.currentTarget.style.background = '#EF9F27'}
                    >
                        {isPending ? <Spinner /> : 'Register'}
                    </button>

                    <h1 style={{ textAlign: 'center', fontSize: 13, color: '#888780', marginTop: 4 }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: '#EF9F27', fontWeight: 600, textDecoration: 'none' }}>
                            Login
                        </Link>
                    </h1>

                </form>
            </div>
        </div>
    )
}

export default Register
