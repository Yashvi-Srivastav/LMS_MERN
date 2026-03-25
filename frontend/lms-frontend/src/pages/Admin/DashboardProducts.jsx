import React, { useState } from 'react'
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from 'react-hook-form'
import { Spinner } from '@/components/ui/Spinner'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useGetCourseHook, useCreateCourseHook } from '@/hooks/course.hook'

const DashboardProducts = () => {
  const { data } = useGetCourseHook()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const { mutate, isPending, reset } = useCreateCourseHook()
  const [openModule, setopenModule] = useState(false)

  const getCourseId = (id) => navigate(`/dashboard/CourseModule/${id}`)

  const createCourseHandler = (data) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('amount', data.amount)
    formData.append('thumbnail', data.thumbnail[0])
    mutate(formData, {
      onSuccess: (data) => {
        setopenModule(false)
        reset()
        toast.success(data.message)
      }
    })
  }

  return (
    <div className='p-8 flex flex-col gap-8'>

      {/* Page heading + Add button */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold' style={{ color: '#1a1a1a', fontFamily: 'Georgia, serif' }}>Products</h1>
          <div className='mt-1 h-1 w-12 rounded-full' style={{ background: '#EF9F27' }} />
        </div>

        <Dialog open={openModule} onOpenChange={setopenModule}>
          <DialogTrigger
            className='px-5 py-2.5 rounded-full text-sm font-semibold transition-all'
            style={{ background: '#EF9F27', color: '#1a1a1a' }}
          >
            + Add Course
          </DialogTrigger>

          <DialogContent style={{ background: '#1e1e1e', border: '1px solid #2a2a2a', borderRadius: '20px' }}>
            <DialogHeader>
              <DialogTitle style={{ color: '#e8e4d8', fontFamily: 'Georgia, serif' }}>Add New Course</DialogTitle>
              <DialogDescription>
                <form onSubmit={handleSubmit(createCourseHandler)} className='flex flex-col gap-4 mt-4'>
                  {[
                    { placeholder: 'Course title', type: 'text', name: 'title' },
                    { placeholder: 'Course description', type: 'text', name: 'description' },
                    { placeholder: 'Price (₹)', type: 'number', name: 'amount' },
                  ].map((field) => (
                    <input
                      key={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      className='w-full px-4 py-3 rounded-xl text-sm outline-none'
                      style={{ background: '#2a2a2a', border: '1px solid #3a3a3a', color: '#e8e4d8' }}
                      {...register(field.name)}
                    />
                  ))}
                  <input
                    type="file"
                    accept='image/*'
                    className='w-full px-4 py-3 rounded-xl text-sm outline-none'
                    style={{ background: '#2a2a2a', border: '1px solid #3a3a3a', color: '#888780' }}
                    {...register("thumbnail")}
                  />
                  <button
                    type="submit"
                    disabled={isPending}
                    className='w-full py-3 rounded-full text-sm font-bold mt-2'
                    style={{ background: '#EF9F27', color: '#1a1a1a' }}
                  >
                    {isPending ? <Spinner /> : 'Create Course'}
                  </button>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {/* Course grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
        {data?.courses?.map((item, index) => (
          <div
            key={index}
            onClick={() => getCourseId(item._id)}
            className='flex flex-col rounded-xl overflow-hidden cursor-pointer transition-all duration-200 hover:scale-105'
            style={{ background: '#ffffff', border: '1px solid #e8e0cc', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(239,159,39,0.25)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'}
          >
            <div className='w-full h-36 overflow-hidden'>
              <img src={item.thumbnail} alt={item.title} className='w-full h-full object-cover' />
            </div>
            <div className='p-3 flex flex-col gap-1'>
              <p className='text-sm font-semibold' style={{ color: '#1a1a1a' }}>{item.title}</p>
              <p className='text-xs' style={{ color: '#1D9E75', fontWeight: 600 }}>
                {item.amount ? `₹${item.amount}` : 'Free'}
              </p>
            </div>
            <div className='px-3 py-2 flex justify-end' style={{ borderTop: '1px solid #f0e8d8' }}>
              <span className='text-xs' style={{ color: '#888780' }}>Manage →</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default DashboardProducts