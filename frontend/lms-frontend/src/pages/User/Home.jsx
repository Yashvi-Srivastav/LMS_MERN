import SearchResult from "@/components/SearchResult";
import React, { useState } from 'react'
import CourseSection from "@/components/CourseSection";

const Home = () => {
  const [searchInput, setSearchInput] = useState('')
  const [ActiveSearch, setActiveSearch] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setActiveSearch(searchInput)
  }

  const resetFilter = () => {
    setSearchInput("")
    setActiveSearch("")
  }

  return (
    <div className='min-h-screen flex flex-col' style={{ background: '#F4F9FB', fontFamily: "'DM Sans', sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        :root {
          --forest:      #2D6A4F;
          --forest-l:    #40916C;
          --mint:        #95D5B2;
          --mint-l:      #D8F3DC;
          --amber:       #F4A51A;
          --near-black:  #0C1318;
          --ink:         #17232E;
          --muted:       #526B7A;
          --card-bg:     #F4F9FB;
          --card-border: #D6EAF2;
          --blue:        #2A7FBF;
          --blue-l:      #4BA3D8;
          --white:       #FFFFFF;
        }

        .stat-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .stat-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(42,127,191,0.1);
        }
      `}</style>

      {/* ── HERO (SearchResult component) ── */}
      <SearchResult
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSubmit={handleSubmit}
        onReset={resetFilter}
        hasActiveSearch={!!searchInput}
      />

      {/* ── WAVE DIVIDER: dark → light ── */}
      <div style={{ background: '#0C1318', lineHeight: 0, display: 'block' }}>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          width="100%"
          height="80"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
        >
          <path
            d="M0,20 C240,80 480,0 720,40 C960,80 1200,10 1440,50 L1440,80 L0,80 Z"
            fill="#F4F9FB"
          />
        </svg>
      </div>

      {/* ── STATS STRIP ── */}
      <div style={{ background: '#F4F9FB', padding: '0 48px 56px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            border: '1px solid rgba(42,127,191,0.15)',
            borderRadius: '20px',
            overflow: 'hidden',
            background: '#ffffff',
            boxShadow: '0 4px 24px rgba(42,127,191,0.07)',
          }}>
            {[
              { value: '6+',   label: 'Courses',        color: '#2A7FBF' },
              { value: '100%', label: 'Free Access',     color: '#2D6A4F' },
              { value: 'AI',   label: 'Powered Search',  color: '#F4A51A' },
              { value: '∞',    label: 'Learning',        color: '#4BA3D8' },
            ].map((stat, i, arr) => (
              <div
                key={stat.label}
                className="stat-card"
                style={{
                  flex: 1,
                  padding: '28px 20px',
                  textAlign: 'center',
                  borderRight: i < arr.length - 1 ? '1px solid rgba(42,127,191,0.1)' : 'none',
                  cursor: 'default',
                }}
              >
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: stat.color,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.68rem',
                  color: '#526B7A',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── COURSE SECTION ── */}
      <CourseSection ActiveSearch={ActiveSearch} />

      {/* ── FOOTER ── */}
      <footer style={{
        background: '#0C1318',
        borderTop: '1px solid rgba(42,127,191,0.18)',
        padding: '32px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 'auto',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #1A5480 0%, #40916C 60%, #95D5B2 100%)',
              borderRadius: '9px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              boxShadow: '0 4px 12px rgba(42,127,191,0.35)',
            }}>
              🪺
            </div>
            <div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#F4A51A', letterSpacing: '-0.02em' }}>Course</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: '#ffffff', letterSpacing: '-0.02em' }}> Nest</span>
            </div>
          </div>
          <p style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#526B7A', fontWeight: 500 }}>
            Where Learning is Nurtured
          </p>
        </div>

        <p style={{ fontSize: '0.75rem', color: '#526B7A', letterSpacing: '0.04em' }}>
          © 2025 Course Nest &nbsp;·&nbsp; 
        </p>
      </footer>

    </div>
  )
}

export default Home