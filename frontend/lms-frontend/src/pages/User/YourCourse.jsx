import { useGetAllPurchaseCourse } from '@/hooks/course.hook'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const YourCourse = () => {
  const { data } = useGetAllPurchaseCourse()
  const navigate = useNavigate()
  const [hoveredId, setHoveredId] = useState(null)

  const navigateSinglePurchaseCourse = (id) => {
    navigate(id)
  }

  const courses = data?.purchasedCourse || []

  return (
    <div className="your-course-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500&display=swap');

        .your-course-root {
          min-height: 100vh;
          background: #0d1117;
          font-family: 'DM Sans', sans-serif;
          color: #e8e8e8;
          position: relative;
          overflow-x: hidden;
        }

        /* Ambient glow blobs matching hero */
        .your-course-root::before {
          content: '';
          position: fixed;
          top: -120px;
          left: -120px;
          width: 480px;
          height: 480px;
          background: radial-gradient(circle, rgba(0,120,110,0.18) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .your-course-root::after {
          content: '';
          position: fixed;
          bottom: -100px;
          right: -100px;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(230,160,30,0.10) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .yc-container {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
          padding: 56px 32px 80px;
        }

        /* Header section */
        .yc-header {
          margin-bottom: 48px;
        }
        .yc-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 999px;
          padding: 6px 16px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #a0aec0;
          margin-bottom: 20px;
        }
        .yc-eyebrow svg {
          color: #e6a01e;
        }
        .yc-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 700;
          line-height: 1.1;
          color: #ffffff;
          margin: 0 0 12px;
        }
        .yc-title span {
          font-style: italic;
          color: #4db8c8;
        }
        .yc-subtitle {
          font-size: 14px;
          font-weight: 300;
          color: #718096;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .yc-count-badge {
          display: inline-block;
          margin-left: 12px;
          background: rgba(230,160,30,0.15);
          border: 1px solid rgba(230,160,30,0.3);
          color: #e6a01e;
          border-radius: 6px;
          padding: 2px 10px;
          font-size: 12px;
          font-weight: 500;
          vertical-align: middle;
          font-style: normal;
          letter-spacing: 0.04em;
        }

        /* Divider */
        .yc-divider {
          width: 64px;
          height: 2px;
          background: linear-gradient(90deg, #e6a01e, transparent);
          margin: 24px 0 48px;
        }

        /* Grid */
        .yc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 24px;
        }

        /* Card */
        .yc-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(.22,.68,0,1.2),
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
          position: relative;
          animation: cardFadeIn 0.5s ease both;
        }
        @keyframes cardFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .yc-card:hover {
          transform: translateY(-6px) scale(1.01);
          border-color: rgba(230,160,30,0.35);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(230,160,30,0.1);
        }

        /* Gold accent line on top on hover */
        .yc-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, #e6a01e, #4db8c8);
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 2;
        }
        .yc-card:hover::before {
          opacity: 1;
        }

        /* Thumbnail */
        .yc-thumbnail {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          background: #161b22;
          overflow: hidden;
        }
        .yc-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .yc-card:hover .yc-thumbnail img {
          transform: scale(1.05);
        }

        /* Play overlay on hover */
        .yc-play-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .yc-card:hover .yc-play-overlay {
          opacity: 1;
        }
        .yc-play-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(230,160,30,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(230,160,30,0.4);
          transform: scale(0.8);
          transition: transform 0.3s cubic-bezier(.22,.68,0,1.2);
        }
        .yc-card:hover .yc-play-btn {
          transform: scale(1);
        }
        .yc-play-btn svg {
          margin-left: 3px;
        }

        /* Card body */
        .yc-card-body {
          padding: 16px 18px 20px;
        }
        .yc-card-tag {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: #4db8c8;
          margin-bottom: 8px;
        }
        .yc-card-title {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          font-weight: 700;
          color: #f0f0f0;
          line-height: 1.35;
          margin: 0 0 14px;
          transition: color 0.2s ease;
        }
        .yc-card:hover .yc-card-title {
          color: #ffffff;
        }
        .yc-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .yc-progress-wrap {
          flex: 1;
          height: 3px;
          background: rgba(255,255,255,0.08);
          border-radius: 99px;
          overflow: hidden;
          margin-right: 10px;
        }
        .yc-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #e6a01e, #f0c040);
          border-radius: 99px;
          width: 35%; /* placeholder - wire to real progress if available */
        }
        .yc-continue-arrow {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 500;
          color: #e6a01e;
          letter-spacing: 0.04em;
          opacity: 0;
          transform: translateX(-4px);
          transition: opacity 0.25s ease, transform 0.25s ease;
          white-space: nowrap;
        }
        .yc-card:hover .yc-continue-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* Empty state */
        .yc-empty {
          text-align: center;
          padding: 80px 24px;
        }
        .yc-empty-icon {
          font-size: 56px;
          margin-bottom: 20px;
          opacity: 0.5;
        }
        .yc-empty-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          color: #718096;
          margin-bottom: 8px;
        }
        .yc-empty-sub {
          font-size: 14px;
          color: #4a5568;
        }

        /* Stagger animation delays */
        .yc-card:nth-child(1)  { animation-delay: 0.05s; }
        .yc-card:nth-child(2)  { animation-delay: 0.10s; }
        .yc-card:nth-child(3)  { animation-delay: 0.15s; }
        .yc-card:nth-child(4)  { animation-delay: 0.20s; }
        .yc-card:nth-child(5)  { animation-delay: 0.25s; }
        .yc-card:nth-child(6)  { animation-delay: 0.30s; }
        .yc-card:nth-child(7)  { animation-delay: 0.35s; }
        .yc-card:nth-child(8)  { animation-delay: 0.40s; }
      `}</style>

      <div className="yc-container">
        {/* Header */}
        <div className="yc-header">
          <div className="yc-eyebrow">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
            My Learning
          </div>
          <h1 className="yc-title">
            Your <span>Courses</span>
            {courses.length > 0 && (
              <span className="yc-count-badge">{courses.length} enrolled</span>
            )}
          </h1>
          <p className="yc-subtitle">Where Learning Is Nurtured</p>
          <div className="yc-divider" />
        </div>

        {/* Grid or Empty */}
        {courses.length === 0 ? (
          <div className="yc-empty">
            <div className="yc-empty-icon">📚</div>
            <div className="yc-empty-title">No courses yet</div>
            <div className="yc-empty-sub">Explore and enroll in a course to get started</div>
          </div>
        ) : (
          <div className="yc-grid">
            {courses.map((item, index) => (
              <div
                key={item._id || index}
                className="yc-card"
                onClick={() => navigateSinglePurchaseCourse(item._id)}
                onMouseEnter={() => setHoveredId(item._id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="yc-thumbnail">
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="yc-play-overlay">
                    <div className="yc-play-btn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="yc-card-body">
                  <div className="yc-card-tag">Course</div>
                  <h2 className="yc-card-title">{item.title}</h2>
                  <div className="yc-card-footer">
                    <div className="yc-progress-wrap">
                      <div className="yc-progress-bar" />
                    </div>
                    <div className="yc-continue-arrow">
                      Continue
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default YourCourse
