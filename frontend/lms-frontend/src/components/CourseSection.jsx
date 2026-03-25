import { useGetCourseHook } from '@/hooks/course.hook'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const CourseSection = ({ ActiveSearch }) => {
  const { data, error } = useGetCourseHook(ActiveSearch)
  const navigate = useNavigate()

  const navigateSingleCourse = (id) => {
    navigate(`/singleCourse/${id}`)
  }

  return (
    <div style={{ background: '#F4F9FB', padding: '0 48px 80px', flex: 1 }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <style>{`
          .course-card {
            transition: transform 0.3s cubic-bezier(.25,.8,.25,1), box-shadow 0.3s cubic-bezier(.25,.8,.25,1), border-color 0.3s;
          }
          .course-card:hover {
            transform: translateY(-6px);
            border-color: rgba(42,127,191,0.28) !important;
            box-shadow: 0 20px 50px rgba(42,127,191,0.1), 0 4px 12px rgba(0,0,0,0.06) !important;
          }
          .course-card:hover .card-cta {
            color: #F4A51A;
            gap: 8px;
          }
          .course-card:hover .card-cta svg {
            transform: translateX(3px);
          }
          .course-card:hover .card-thumb img {
            transform: scale(1.07);
          }
          .card-thumb img {
            transition: transform 0.4s ease;
          }
          .card-cta {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 0.78rem;
            font-weight: 600;
            color: #2A7FBF;
            cursor: pointer;
            transition: gap 0.2s, color 0.2s;
          }
          .card-cta svg {
            transition: transform 0.2s;
          }
          .filter-tab {
            padding: 7px 16px;
            border-radius: 100px;
            font-size: 0.78rem;
            font-weight: 600;
            cursor: pointer;
            border: 1.5px solid #D6EAF2;
            background: transparent;
            color: #526B7A;
            font-family: 'DM Sans', sans-serif;
            letter-spacing: 0.03em;
            transition: all 0.2s;
          }
          .filter-tab:hover, .filter-tab.active {
            background: #2A7FBF;
            border-color: #2A7FBF;
            color: #ffffff;
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .course-card {
            animation: fadeUp 0.5s ease both;
          }
        `}</style>

        {/* ── Section Header ── */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '36px',
          paddingTop: '48px',
        }}>
          <div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              color: '#17232E',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              position: 'relative',
              display: 'inline-block',
            }}>
              {ActiveSearch ? `Results for "${ActiveSearch}"` : 'All Courses'}
            </h2>
            {/* Blue underline */}
            <div style={{
              marginTop: '8px',
              height: '3px',
              width: '56px',
              background: 'linear-gradient(to right, #2A7FBF, #C8E6F5)',
              borderRadius: '100px',
            }} />
            <p style={{
              marginTop: '8px',
              fontSize: '0.82rem',
              color: '#526B7A',
              fontWeight: 400,
            }}>
              {data?.courses?.length ?? 0} courses available &nbsp;·&nbsp; Start learning today
            </p>
          </div>

          {/* Filter tabs — only show when not searching */}
          {!ActiveSearch && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['All', 'Free', 'Full Stack', 'AI / ML'].map((tab, i) => (
                <button key={tab} className={`filter-tab${i === 0 ? ' active' : ''}`}>
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Course Grid ── */}
        {data?.courses?.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: '24px',
          }}>
            {data.courses.map((item, index) => (
              <div
                key={item._id || index}
                className='course-card'
                onClick={() => navigateSingleCourse(item._id)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #D6EAF2',
                  borderRadius: '18px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  animationDelay: `${Math.min(index * 0.07, 0.42)}s`,
                }}
              >
                {/* Thumbnail */}
                <div
                  className='card-thumb'
                  style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', position: 'relative' }}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />

                  {/* Free badge */}
                  {!item.price && (
                    <span style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: '#2D6A4F',
                      color: '#D8F3DC',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '3px 9px',
                      borderRadius: '100px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                    }}>
                      Free
                    </span>
                  )}

                  {/* Type badge */}
                  <span style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(12,19,24,0.72)',
                    backdropFilter: 'blur(8px)',
                    color: 'rgba(75,163,216,0.9)',
                    fontSize: '0.58rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '3px 9px',
                    borderRadius: '100px',
                    border: '1px solid rgba(42,127,191,0.28)',
                  }}>
                    Course
                  </span>
                </div>

                {/* Card body */}
                <div style={{ padding: '18px 20px 6px' }}>
                  {/* Category tag */}
                  <span style={{
                    display: 'inline-block',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#2A7FBF',
                    background: 'rgba(42,127,191,0.08)',
                    border: '1px solid rgba(42,127,191,0.2)',
                    padding: '3px 10px',
                    borderRadius: '100px',
                    marginBottom: '10px',
                  }}>
                    {item.category || 'Course'}
                  </span>

                  {/* Title */}
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#17232E',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.3,
                    marginBottom: '14px',
                  }}>
                    {item.title}
                  </h3>
                </div>

                {/* Card footer */}
                <div style={{
                  padding: '12px 20px 16px',
                  borderTop: '1px solid #D6EAF2',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <span style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: item.price ? '#17232E' : '#40916C',
                    letterSpacing: '-0.02em',
                  }}>
                    {item.price ? `₹${item.price}` : 'Free'}
                  </span>

                  <button className='card-cta' style={{ background: 'none', border: 'none', fontFamily: "'DM Sans', sans-serif", padding: 0 }}>
                    View
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 12h14M13 6l6 6-6 6"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (

          /* ── Empty State ── */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '96px 0',
            gap: '12px',
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(42,127,191,0.08)',
              border: '1.5px solid rgba(42,127,191,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              marginBottom: '8px',
            }}>
              🔍
            </div>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#17232E',
              letterSpacing: '-0.02em',
            }}>
              No courses found
            </p>
            <p style={{ fontSize: '0.85rem', color: '#526B7A', fontWeight: 400 }}>
              Try a different search term
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default CourseSection