import { useGetSingleCourseHook } from '@/hooks/course.hook'
import { usePayment } from '@/hooks/payment.hook'
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner } from '@/components/ui/spinner'

const SingleCourse = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data } = useGetSingleCourseHook(id)
  const { mutate, isPending } = usePayment()

  const purchaseHandler = (data) => {
    const product = {
      _id: data._id,
      name: data.title,
      price: data.amount,
      image: data.thumbnail
    }
    mutate(product)
  }

  return (
    <div className='min-h-screen' style={{ background: '#f5f0e8' }}>

      {/* Top bar */}
      <div className='px-8 py-4 flex items-center gap-2 text-sm' style={{ background: '#1a1a1a', color: '#888780' }}>
        <span onClick={() => navigate('/')} className='cursor-pointer hover:underline' style={{ color: '#EF9F27' }}>
          Home
        </span>
        <span>/</span>
        <span style={{ color: '#e8e4d8' }}>{data?.title}</span>
      </div>

      <div className='max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10'>

        {/* Left — course info */}
        <div className='flex-1 flex flex-col gap-6'>

          {/* Title */}
          <div>
            <h1 className='text-3xl font-bold leading-snug' style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>
              {data?.title}
            </h1>
            <div className='mt-2 h-1 w-16 rounded-full' style={{ background: '#EF9F27' }} />
          </div>

          {/* Category pill */}
          {data?.category && (
            <span
              className='w-fit px-4 py-1 rounded-full text-xs font-semibold'
              style={{ background: '#fef3d6', color: '#854F0B', border: '1px solid #BA7517' }}
            >
              {data.category}
            </span>
          )}

          {/* Description */}
          {data?.description && (
            <div
              className='rounded-xl p-6'
              style={{ background: '#ffffff', border: '1px solid #e8e0cc' }}
            >
              <h2 className='text-base font-semibold mb-3' style={{ color: '#1a1a1a' }}>
                About this course
              </h2>
              <p className='text-sm leading-relaxed' style={{ color: '#5a5a56' }}>
                {data.description}
              </p>
            </div>
          )}

          {/* What you'll learn */}
          <div
            className='rounded-xl p-6'
            style={{ background: '#ffffff', border: '1px solid #e8e0cc' }}
          >
            <h2 className='text-base font-semibold mb-4' style={{ color: '#1a1a1a' }}>
              What you'll learn
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              {['Hands-on projects', 'Industry best practices', 'Real-world skills', 'Expert guidance'].map((item, i) => (
                <div key={i} className='flex items-center gap-2 text-sm' style={{ color: '#5a5a56' }}>
                  <span className='text-base' style={{ color: '#1D9E75' }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Instructor */}
          {data?.instructor && (
            <div
              className='rounded-xl p-6 flex items-center gap-4'
              style={{ background: '#ffffff', border: '1px solid #e8e0cc' }}
            >
              <div
                className='w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold'
                style={{ background: '#1D9E75', color: '#fff' }}
              >
                {data.instructor?.charAt(0)}
              </div>
              <div>
                <p className='text-xs' style={{ color: '#888780' }}>Instructor</p>
                <p className='text-sm font-semibold' style={{ color: '#1a1a1a' }}>{data.instructor}</p>
              </div>
            </div>
          )}

        </div>

        {/* Right — purchase card */}
        <div className='w-full lg:w-80 flex-shrink-0'>
          <div
            className='rounded-2xl overflow-hidden sticky top-6'
            style={{ background: '#ffffff', border: '1px solid #e8e0cc', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
          >
            {/* Thumbnail */}
            <div className='w-full h-48 overflow-hidden'>
              <img
                src={data?.thumbnail}
                alt={data?.title}
                className='w-full h-full object-cover'
              />
            </div>

            {/* Price + buy */}
            <div className='p-6 flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <span className='text-2xl font-bold' style={{ color: '#1a1a1a' }}>
                  {data?.amount ? `₹${data.amount}` : 'Free'}
                </span>
                {data?.amount && (
                  <span
                    className='text-xs px-3 py-1 rounded-full'
                    style={{ background: '#fef3d6', color: '#854F0B' }}
                  >
                    One-time payment
                  </span>
                )}
              </div>

              <button
                onClick={() => purchaseHandler(data)}
                className='w-full py-3 rounded-full text-sm font-bold transition-all'
                style={{ background: '#EF9F27', color: '#1a1a1a' }}
                onMouseEnter={e => e.currentTarget.style.background = '#BA7517'}
                onMouseLeave={e => e.currentTarget.style.background = '#EF9F27'}
              >
                {isPending ? <Spinner /> : data?.amount ? '🔒 Enroll Now' : 'Start Learning'}
              </button>

              <div className='flex flex-col gap-2'>
                {['Full lifetime access', 'Access on all devices', 'Certificate of completion'].map((item, i) => (
                  <div key={i} className='flex items-center gap-2 text-xs' style={{ color: '#888780' }}>
                    <span style={{ color: '#1D9E75' }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SingleCourse