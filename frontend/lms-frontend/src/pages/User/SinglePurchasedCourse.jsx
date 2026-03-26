import { useGetPurchaseCourse } from '@/hooks/course.hook'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useModuleStores } from '@/Store/module.store'
import { useGetComment } from '@/hooks/module.hook'
import { useCreateComment } from '@/hooks/comment.hook'
import {useForm} from 'react-hook-form'
import { checkQuizApi } from '@/Api/quiz.api'
import { useCheckQuiz, useCreateQuiz, useGetQuiz } from '@/hooks/quiz.hook'
import { useMutation } from '@tanstack/react-query'

const SinglePurchasedCourse = () => {
    const {setModule, module} = useModuleStores()

    const{id} = useParams()
    const {register, handleSubmit,  } = useForm()
    const navigate = useNavigate()
    const {data} = useGetPurchaseCourse(id)
    const {data:getCommentData} = useGetComment(module?._id)

    const {data:CheckQuiz} = useCheckQuiz(module?._id)
    
    const getQuizHandler=(id)=> {
       navigate(`/quiz/${id}`)
    }

   const {mutate:createQuiz} = useCreateQuiz()
      const createQuizHandler=(data)=>{
        createQuiz({
           id:data._id,
            payload: {
            moduleId: data._id,   
            content: data.title   
        }
        })
    }
    
    const videoHandler =(data)=>{
        setModule(data)
    }
    const {mutate} = useCreateComment()
    const moduleId = module?._id
    const createCommentHandler=(data)=>{
       mutate({
        id:moduleId,
      payload:data
       })
    }

    return (
        <div className='flex' style={{ background: '#0d1117', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500&display=swap');

                .spc-accordion [data-radix-collection-item] { border-bottom: 1px solid rgba(255,255,255,0.07); }
                .spc-accordion button { color: #c9c3b0 !important; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; }
                .spc-accordion button:hover { color: #f0ece0 !important; }
                .spc-comment-input::placeholder { color: #4a5568; }
                .spc-comment-input:focus { outline: none; border-color: rgba(239,159,39,0.45) !important; box-shadow: 0 0 0 3px rgba(239,159,39,0.08); }
            `}</style>

           {/* ── LEFT: video + comments ── */}
           <div className='left h-screen w-[50%] flex flex-col' style={{ background: '#111318', borderRight: '1px solid rgba(255,255,255,0.06)' }}>

                {/* Video */}
                <div className='h-[50%] w-full' style={{ background: '#000', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <video className='h-full w-full object-contain' src={module?.video} controls />
                </div>

                {/* Comments */}
                <div className='flex-1 overflow-y-auto p-6'>
                    <h1
                        className='text-xs font-semibold uppercase tracking-widest mb-4'
                        style={{ color: '#EF9F27', letterSpacing: '0.12em' }}
                    >
                        Comments
                    </h1>

                    {module ? (
                        <>
                            <div className='flex flex-col gap-3 mb-5'>
                                {getCommentData?.map((item, index) => (
                                    <div key={index} className='flex items-start gap-3'>
                                        <div
                                            className='w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0'
                                            style={{ background: 'linear-gradient(135deg,#1a3a2a,#1D9E75)', color: '#a8f0d4' }}
                                        >
                                            {item.comment?.charAt(0).toUpperCase()}
                                        </div>
                                        <div
                                            className='px-3 py-2 rounded-lg text-sm'
                                            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: '#c9c3b0' }}
                                        >
                                            {item.comment}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <form className='flex gap-2' onSubmit={handleSubmit(createCommentHandler)}>
                                <input
                                    type="text"
                                    className='spc-comment-input flex-1 px-3 py-2 rounded-lg text-sm'
                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', color: '#e8e4d8', fontFamily: "'DM Sans', sans-serif" }}
                                    {...register('comment')}
                                />
                                <button
                                    className="cursor-pointer relative z-50 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                                    type="submit"
                                    style={{ background: '#EF9F27', color: '#1a1a1a' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#d48c1c'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#EF9F27'}
                                >
                                    Add Comment
                                </button>
                            </form>
                        </>
                    ) : (
                        <p className='text-sm' style={{ color: '#4a5568' }}>Please Select a Module</p>
                    )}
                </div>
           </div>

           {/* ── RIGHT: curriculum ── */}
           <div className='right h-screen w-[50%] flex items-start justify-center py-9 overflow-y-auto' style={{ background: '#0d1117' }}>

                <div className='w-[70%] h-fit'>

                    <h2
                        className='text-lg font-bold mb-6'
                        style={{ fontFamily: 'Playfair Display, serif', color: '#f0ece0' }}
                    >
                        Course Content
                    </h2>

                    <div className='spc-accordion flex flex-col gap-2'>
                        {data?.modules?.map((item, index) => (
                            <div onClick={() => videoHandler(item)} key={index}>
                                <Accordion type="single" collapsible>
                                    <AccordionItem
                                        value="item-1"
                                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, overflow: 'hidden', marginBottom: 0 }}
                                    >
                                        <AccordionTrigger
                                            className='px-4 py-3 text-sm font-medium hover:no-underline'
                                            style={{ color: '#c9c3b0' }}
                                        >
                                            <div className='flex items-center gap-3'>
                                                <span
                                                    className='w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0'
                                                    style={{ background: 'rgba(239,159,39,0.12)', color: '#EF9F27', border: '1px solid rgba(239,159,39,0.25)' }}
                                                >
                                                    {index + 1}
                                                </span>
                                                {item.title}
                                            </div>
                                        </AccordionTrigger>

                                        <AccordionContent
                                            className='px-4 pb-3 flex items-center gap-3'
                                            style={{ background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.06)' }}
                                        >
                                            <button
                                                className='cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold transition-all'
                                                style={{ background: 'rgba(29,158,117,0.15)', color: '#1D9E75', border: '1px solid rgba(29,158,117,0.3)' }}
                                                onClick={() => createQuizHandler(item)}
                                                type="button"
                                                onMouseEnter={e => e.currentTarget.style.background = 'rgba(29,158,117,0.25)'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'rgba(29,158,117,0.15)'}
                                            >
                                                + Create Quiz
                                            </button>

                                            {item.quiz ? (
                                                <h1
                                                    className='text-xs font-medium cursor-pointer px-3 py-1.5 rounded-lg transition-all'
                                                    style={{ background: 'rgba(239,159,39,0.12)', color: '#EF9F27', border: '1px solid rgba(239,159,39,0.25)' }}
                                                    onClick={() => getQuizHandler(item.quiz)}
                                                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,159,39,0.22)'}
                                                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,159,39,0.12)'}
                                                >
                                                    View Quiz →
                                                </h1>
                                            ) : (
                                                <h1 className='text-xs' style={{ color: '#4a5568' }}>No Quiz</h1>
                                            )}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                        ))}
                    </div>

                </div>
           </div>
        </div>
    )
}

export default SinglePurchasedCourse