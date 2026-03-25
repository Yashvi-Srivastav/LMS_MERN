import { useGetSingleCourseHook } from '@/hooks/course.hook'
import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {useForm} from 'react-hook-form'
import { useCreateModule } from '@/hooks/module.hook'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createModuleApi } from '@/Api/module.api'
import { Spinner } from '@/components/ui/Spinner'


    const CreateModule = () => {

    const {id} = useParams()
    const {data} = useGetSingleCourseHook(id)
    const [openModule, setopenModule] = useState(false)
   
    const {register, handleSubmit} = useForm()
    const { mutate, isPending, reset } = useCreateModule()
    const courseId = id

    const moduleFormHandler=(data)=>{
        const formdata = new FormData()
          formdata.append('title',data.title)
          formdata.append('video',data.video[0])
          formdata.append('courseId',courseId)
        mutate(formdata,{
            onSuccess:(data)=>{
                setopenModule(false),
                reset()
            }
        })
    }
    
    return (
        <div
          className='flex flex-col justify-start items-center py-9 h-screen w-full'
          style={{ background: '#0d1117', fontFamily: "'DM Sans', sans-serif" }}
        >
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500&display=swap');
          `}</style>

          {/* Course title */}
          <h1
            className='text-2xl font-bold mb-8'
            style={{ color: '#f0ece0', fontFamily: 'Playfair Display, serif' }}
          >
            {data?.title}
          </h1>

          <Dialog open={openModule} onOpenChange={setopenModule}>
            <DialogTrigger
              className='px-5 py-2.5 rounded-lg text-sm font-semibold transition-all'
              style={{ background: '#EF9F27', color: '#1a1a1a' }}
              onMouseEnter={e => e.currentTarget.style.background = '#d48c1c'}
              onMouseLeave={e => e.currentTarget.style.background = '#EF9F27'}
            >
              + Create Module
            </DialogTrigger>

            <DialogContent style={{ background: '#111318', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, color: '#f0ece0' }}>
              <DialogHeader>
                <DialogTitle style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: '#f0ece0', marginBottom: 20 }}>
                  Create New Module
                </DialogTitle>

                <form onSubmit={handleSubmit(moduleFormHandler)} className='flex flex-col gap-4'>
                  <input
                    type="text"
                    placeholder='Enter Module Title'
                    className='w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all'
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.10)',
                      color: '#e8e4d8',
                      fontFamily: "'DM Sans', sans-serif"
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = 'rgba(239,159,39,0.5)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'}
                    {...register('title')}
                  />

                  <div
                    className='w-full px-4 py-2.5 rounded-lg text-sm'
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.10)',
                    }}
                  >
                    <input
                      type="file"
                      accept='video/*'
                      className='w-full text-sm'
                      style={{ color: '#8a8680', fontFamily: "'DM Sans', sans-serif" }}
                      {...register('video')}
                    />
                  </div>

                  <button
                    type="submit"
                    className='w-full py-2.5 rounded-lg text-sm font-semibold transition-all mt-1'
                    style={{ background: '#EF9F27', color: '#1a1a1a' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#d48c1c'}
                    onMouseLeave={e => e.currentTarget.style.background = '#EF9F27'}
                  >
                    {isPending ? <Spinner /> : 'Submit'}
                  </button>
                </form>

              </DialogHeader>
            </DialogContent>
          </Dialog>

          {/* All Modules */}
          <div className='w-full max-w-2xl mt-10 px-6'>
            <div className='flex items-center gap-3 mb-6'>
              <h1
                className='text-lg font-bold'
                style={{ fontFamily: 'Playfair Display, serif', color: '#f0ece0' }}
              >
                All Modules
              </h1>
              <span
                className='px-2.5 py-0.5 rounded-full text-xs font-medium'
                style={{ background: 'rgba(239,159,39,0.12)', color: '#EF9F27', border: '1px solid rgba(239,159,39,0.25)' }}
              >
                {data?.modules?.length}
              </span>
            </div>

            <div className='flex flex-col gap-3'>
              {data?.modules.map((item, index) => (
                <div
                  key={index}
                  className='flex items-center gap-4 px-5 py-4 rounded-xl transition-all'
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(239,159,39,0.25)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'}
                >
                  <span
                    className='w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0'
                    style={{ background: 'rgba(239,159,39,0.12)', color: '#EF9F27', border: '1px solid rgba(239,159,39,0.25)' }}
                  >
                    {index + 1}
                  </span>
                  <h1 className='text-sm font-medium' style={{ color: '#c9c3b0' }}>
                    {item.title}
                  </h1>
                </div>
              ))}
            </div>
          </div>

        </div>
    )
  }

export default CreateModule
