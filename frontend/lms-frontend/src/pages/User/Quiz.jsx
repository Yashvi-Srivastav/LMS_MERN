import { useGetQuiz } from '@/hooks/quiz.hook'
import React, { useState } from 'react' 
import { useNavigate, useParams } from 'react-router-dom'


const Quiz = () => {
    const {id} = useParams()
    const {data}= useGetQuiz(id)

    const [selectedAnswer,  setSelectedAnswer] = useState({})
    const [showResult,  setshowResult] = useState(false)
    const [score, setScore] = useState(0)
    const navigate = useNavigate()

    const handleSelectAnswer = (questionId, selectedOption)=> {
        setSelectedAnswer(prev=>({
            ...prev,
            [questionId]:selectedOption
        }))
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        let correctCount = 0

        data.quiz.questions.forEach(question=>{
            if(selectedAnswer[question._id]===question.correctOption){
                correctCount++
            }
        })

        setScore(correctCount)
        setshowResult(true)
    }

    const question = data?.quiz?.questions || []
    const totalQuestion = question.length
    const answerCount = Object.keys(selectedAnswer).length
    console.log(question)

    return (
        <div style={{ minHeight: '100vh', background: '#0d1117', fontFamily: "'DM Sans', sans-serif", padding: '40px 16px' }}>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
            `}</style>

            {showResult ? (
                <>
                <h1>
                    <div style={{ maxWidth: 720, margin: '0 auto', background: '#111318', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 40, textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>

                        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(239,159,39,0.12)', border: '2px solid rgba(239,159,39,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 32 }}>
                            🎯
                        </div>

                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 700, color: '#f0ece0', marginBottom: 12 }}>
                            {score}/{totalQuestion}
                        </h2>

                        <p style={{ fontSize: 16, color: '#EF9F27', fontWeight: 500, marginBottom: 24 }}>
                            {score===totalQuestion ? "Perfect Score 🏆" : score>=totalQuestion*0.7 ? "Great job 🎉" : score>=totalQuestion*0.5 ? "Good effort 👍" : "Keep learning 📚"}
                        </p>

                        <button
                            onClick={()=>navigate(-1)}
                            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', color: '#c9c3b0', padding: '8px 20px', borderRadius: 8, fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 32 }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(239,159,39,0.35)'}
                            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'}
                        >
                            ← Back
                        </button>

                        <div style={{ textAlign: 'left', marginTop: 8 }}>
                            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: '#f0ece0', marginBottom: 20 }}>
                                Review Answers
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {question.map((question, index) => {
                                    const userAnswer = selectedAnswer[question._id]
                                    const isCorrect = userAnswer === question.correctOption
                                    return (
                                        <div key={index} style={{
                                            padding: '16px 18px',
                                            borderRadius: 12,
                                            border: `1px solid ${isCorrect ? 'rgba(29,158,117,0.4)' : 'rgba(239,68,68,0.4)'}`,
                                            background: isCorrect ? 'rgba(29,158,117,0.07)' : 'rgba(239,68,68,0.07)'
                                        }}>
                                            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                                                <span style={{ color: '#EF9F27', fontWeight: 600, fontSize: 13, flexShrink: 0 }}>Q{index+1}.</span>
                                                <p style={{ color: '#e8e4d8', fontSize: 14, fontWeight: 500 }}>{question.content}</p>
                                            </div>
                                            <div style={{ paddingLeft: 24, display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13 }}>
                                                <p>
                                                    <span style={{ color: '#6b7280', fontWeight: 600 }}>Your Answer: </span>
                                                    <span style={{ color: isCorrect ? '#1D9E75' : '#ef4444' }}>{userAnswer}</span>
                                                </p>
                                                {!isCorrect && (
                                                    <p>
                                                        <span style={{ color: '#6b7280', fontWeight: 600 }}>Correct Answer: </span>
                                                        <span style={{ color: '#1D9E75' }}>{question.correctOption}</span>
                                                    </p>
                                                )}
                                                {question.explanation && (
                                                    <p style={{ color: '#8a8680', marginTop: 4 }}>
                                                        <span style={{ fontWeight: 600, color: '#6b7280' }}>Explanation: </span>
                                                        {question.explanation}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        <button
                            style={{ marginTop: 28, background: '#EF9F27', color: '#1a1a1a', padding: '12px 32px', borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', width: '100%' }}
                            onMouseEnter={e => e.currentTarget.style.background = '#d48c1c'}
                            onMouseLeave={e => e.currentTarget.style.background = '#EF9F27'}
                            onClick={() => {
                                setshowResult(false)
                                setSelectedAnswer({})
                                setScore(0)
                            }}
                        >
                            Retake Quiz
                        </button>

                    </div>
                </h1>
                </>
            ) : (
                <>
                <form onSubmit={handleSubmit} style={{ maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>

                    {question.map((question, index) => {
                        return (
                            <div key={index} style={{ background: '#111318', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '24px 24px 20px' }}>
                                <div style={{ marginBottom: 18 }}>
                                    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#EF9F27', marginBottom: 8 }}>
                                        Question {index+1} of {totalQuestion}
                                    </p>
                                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 17, fontWeight: 700, color: '#f0ece0', lineHeight: 1.4 }}>
                                        {question.content}
                                    </h3>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {question.options.map((option, index) => {
                                        const isSelected = selectedAnswer[question._id] === option
                                        return (
                                            <label
                                                key={index}
                                                style={{
                                                    display: 'flex', alignItems: 'center', gap: 12,
                                                    padding: '12px 16px', borderRadius: 10, cursor: 'pointer',
                                                    border: `1px solid ${isSelected ? 'rgba(239,159,39,0.5)' : 'rgba(255,255,255,0.07)'}`,
                                                    background: isSelected ? 'rgba(239,159,39,0.08)' : 'rgba(255,255,255,0.02)',
                                                    transition: 'all 0.15s ease'
                                                }}
                                                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
                                                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)' }}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`question=${question._id}`}
                                                    value={option}
                                                    checked={selectedAnswer[question._id] === option}
                                                    onChange={() => handleSelectAnswer(question._id, option)}
                                                    style={{ accentColor: '#EF9F27', width: 16, height: 16, flexShrink: 0 }}
                                                />
                                                <span style={{ fontSize: 14, color: isSelected ? '#f0ece0' : '#c9c3b0' }}>
                                                    {option}
                                                </span>
                                            </label>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}

                    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8, paddingBottom: 24 }}>
                        <button
                            disabled={answerCount < totalQuestion}
                            type="submit"
                            style={{
                                padding: '13px 40px', borderRadius: 10, fontFamily: "'DM Sans', sans-serif",
                                fontWeight: 700, fontSize: 14, border: 'none', cursor: answerCount < totalQuestion ? 'not-allowed' : 'pointer',
                                background: answerCount < totalQuestion ? 'rgba(255,255,255,0.05)' : '#EF9F27',
                                color: answerCount < totalQuestion ? '#4a5568' : '#1a1a1a',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => { if (answerCount >= totalQuestion) e.currentTarget.style.background = '#d48c1c' }}
                            onMouseLeave={e => { if (answerCount >= totalQuestion) e.currentTarget.style.background = '#EF9F27' }}
                        >
                            {answerCount < totalQuestion ? `Answer all questions (${answerCount}/${totalQuestion})` : 'Submit Quiz'}
                        </button>
                    </div>

                </form>
                </>
            )}

        </div>
    )
}

export default Quiz
