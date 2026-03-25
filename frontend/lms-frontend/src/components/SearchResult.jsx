import React from 'react'

const SearchResult = ({ searchInput, setSearchInput, handleSubmit, onReset, hasActiveSearch }) => {
  const SearchText = ['Mern Stack development', 'React for beginners', 'Advanced Javascript', 'Node.js Essentials', 'DeveOps' , 'Full Stack Web Development', 'App Development']

  return (
    <div className='w-full flex items-center justify-center' style={{
      background: '#0C1318',
      padding: '120px 48px 90px',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '480px',
    }}>

      {/* Layered background glows */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 80% 60% at 50% -10%, rgba(45,106,79,0.38) 0%, transparent 55%),
          radial-gradient(ellipse 50% 50% at 15% 50%, rgba(42,127,191,0.22) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 85% 70%, rgba(42,127,191,0.14) 0%, transparent 60%),
          radial-gradient(ellipse 30% 30% at 80% 90%, rgba(244,165,26,0.07) 0%, transparent 60%)
        `,
      }} />

      {/* Decorative rings */}
      {[500, 780, 1060].map((size, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${size}px`,
          height: `${size}px`,
          top: `${[-180, -320, -460][i]}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          borderRadius: '50%',
          border: `1px solid ${['rgba(149,213,178,0.09)', 'rgba(42,127,191,0.07)', 'rgba(42,127,191,0.04)'][i]}`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '680px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>

        {/* Eyebrow badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.7rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#F4A51A',
          fontWeight: 600,
          marginBottom: '20px',
          padding: '6px 16px',
          border: '1px solid rgba(244,165,26,0.25)',
          borderRadius: '100px',
          background: 'rgba(244,165,26,0.06)',
          animation: 'fadeDown 0.6s ease both',
        }}>
          🌱 &nbsp; AI-Powered Learning
        </div>

        {/* Heading */}
        <div className='text-center' style={{ marginBottom: '12px', animation: 'fadeDown 0.6s 0.1s ease both' }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            fontWeight: 700,
            color: '#ffffff',
            lineHeight: 1.08,
            letterSpacing: '-0.035em',
          }}>
            Find Your{' '}
            <em style={{ fontStyle: 'italic', color: '#4BA3D8' }}>Next</em>
            <br />Course
          </h1>
        </div>

        {/* Subheading */}
        <p style={{
          fontSize: '0.78rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#526B7A',
          fontWeight: 500,
          marginBottom: '40px',
          animation: 'fadeDown 0.6s 0.18s ease both',
        }}>
          Where Learning is Nurtured
        </p>

        {/* Search bar */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(42,127,191,0.28)',
            borderRadius: '14px',
            padding: '6px 6px 6px 20px',
            backdropFilter: 'blur(12px)',
            marginBottom: '24px',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            animation: 'fadeUp 0.6s 0.28s ease both',
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'rgba(75,163,216,0.6)'
            e.currentTarget.style.boxShadow = '0 0 0 4px rgba(42,127,191,0.18)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(42,127,191,0.28)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {/* Search icon */}
          <svg style={{ color: '#4BA3D8', flexShrink: 0, marginRight: '10px' }}
            width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>

          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder='Search with AI…'
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.95rem',
              color: '#ffffff',
              fontWeight: 400,
            }}
          />

          {hasActiveSearch && (
            <button
              type='button'
              onClick={onReset}
              style={{
                padding: '10px 16px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#526B7A',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                marginRight: '6px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
              onMouseLeave={e => e.currentTarget.style.color = '#526B7A'}
            >
              Reset
            </button>
          )}

          <button
            type='submit'
            style={{
              flexShrink: 0,
              padding: '12px 28px',
              background: 'linear-gradient(135deg, #F4A51A 0%, #e8900a 100%)',
              border: 'none',
              borderRadius: '10px',
              color: '#0C1318',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.88rem',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '0.03em',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-1px)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(244,165,26,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            Search
          </button>
        </form>

        {/* Quick search pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          justifyContent: 'center',
          animation: 'fadeUp 0.6s 0.38s ease both',
        }}>
          {SearchText.map((item, index) => (
            <div
              key={index}
              onClick={() => setSearchInput(item)}
              style={{
                padding: '8px 18px',
                border: '1px solid rgba(42,127,191,0.3)',
                borderRadius: '100px',
                color: 'rgba(75,163,216,0.85)',
                fontSize: '0.8rem',
                fontWeight: 500,
                cursor: 'pointer',
                background: 'rgba(42,127,191,0.06)',
                backdropFilter: 'blur(6px)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#2A7FBF'
                e.currentTarget.style.borderColor = '#4BA3D8'
                e.currentTarget.style.color = '#ffffff'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(42,127,191,0.4)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(42,127,191,0.06)'
                e.currentTarget.style.borderColor = 'rgba(42,127,191,0.3)'
                e.currentTarget.style.color = 'rgba(75,163,216,0.85)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {item}
            </div>
          ))}
        </div>

      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  )
}

export default SearchResult