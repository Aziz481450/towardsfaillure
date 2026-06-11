export default function GymEquipment() {
  const plates = [
    { r: 22, inner: 12, off: 0, del: '0s' },
    { r: 20, inner: 11, off: 1.5, del: '0.15s' },
    { r: 18, inner: 10, off: 3, del: '0.3s' },
    { r: 16, inner: 9, off: 4.5, del: '0.45s' },
    { r: 14, inner: 8, off: 6, del: '0.6s' },
    { r: 12, inner: 7, off: 7.5, del: '0.75s' },
    { r: 10, inner: 6, off: 9, del: '0.9s' },
  ]

  return (
    <div className="gym-bg" aria-hidden="true">
      <svg className="gym-bg-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="bar-metal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#555" />
            <stop offset="30%" stopColor="#888" />
            <stop offset="50%" stopColor="#aaa" />
            <stop offset="70%" stopColor="#888" />
            <stop offset="100%" stopColor="#444" />
          </linearGradient>
          <linearGradient id="plate-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="20%" stopColor="#333" />
            <stop offset="50%" stopColor="#444" />
            <stop offset="80%" stopColor="#333" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
          <linearGradient id="plate-grad-r" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="20%" stopColor="#333" />
            <stop offset="50%" stopColor="#444" />
            <stop offset="80%" stopColor="#333" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
          <radialGradient id="plate-face">
            <stop offset="0%" stopColor="#3a3a3a" />
            <stop offset="60%" stopColor="#2a2a2a" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </radialGradient>
          <linearGradient id="floor-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DC2626" stopOpacity="0" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0.06" />
          </linearGradient>
          <filter id="plate-shadow">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.4" />
          </filter>
          <filter id="glow-bar">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Floor glow */}
        <rect x="0" y="68" width="100" height="32" fill="url(#floor-grad)" className="gym-floor" />

        {/* Squat rack uprights */}
        <rect x="8" y="12" width="2.5" height="58" fill="#222" rx="0.5" opacity="0.4" className="gym-rack" />
        <rect x="89.5" y="12" width="2.5" height="58" fill="#222" rx="0.5" opacity="0.4" className="gym-rack" />
        {/* Rack cross beams */}
        <rect x="6" y="18" width="7" height="1.2" fill="#222" rx="0.3" opacity="0.3" />
        <rect x="87" y="18" width="7" height="1.2" fill="#222" rx="0.3" opacity="0.3" />
        <rect x="6" y="62" width="7" height="1.2" fill="#222" rx="0.3" opacity="0.3" />
        <rect x="87" y="62" width="7" height="1.2" fill="#222" rx="0.3" opacity="0.3" />
        {/* J-hooks */}
        <rect x="10" y="34" width="3" height="2.5" fill="#DC2626" rx="0.3" opacity="0.15" />
        <rect x="87" y="34" width="3" height="2.5" fill="#DC2626" rx="0.3" opacity="0.15" />

        {/* Left plates */}
        <g filter="url(#plate-shadow)" className="gym-plate-group">
          {plates.map((p, i) => (
            <g key={`lp${i}`} className="gym-plate" style={{ animationDelay: p.del }}>
              <ellipse cx={28 + p.off} cy={37} rx={p.r * 0.08} ry={p.r * 0.95} fill="#1a1a1a" />
              <ellipse cx={28 + p.off} cy={37} rx={p.r * 0.08} ry={p.r * 0.9} fill="url(#plate-face)" />
              <ellipse cx={28 + p.off} cy={37} rx={p.r * 0.08} ry={p.r * 0.85} fill="none" stroke="#333" strokeWidth="0.3" opacity="0.5" />
            </g>
          ))}
        </g>

        {/* Right plates */}
        <g filter="url(#plate-shadow)" className="gym-plate-group">
          {plates.map((p, i) => (
            <g key={`rp${i}`} className="gym-plate" style={{ animationDelay: p.del }}>
              <ellipse cx={72 - p.off} cy={37} rx={p.r * 0.08} ry={p.r * 0.95} fill="#1a1a1a" />
              <ellipse cx={72 - p.off} cy={37} rx={p.r * 0.08} ry={p.r * 0.9} fill="url(#plate-face)" />
              <ellipse cx={72 - p.off} cy={37} rx={p.r * 0.08} ry={p.r * 0.85} fill="none" stroke="#333" strokeWidth="0.3" opacity="0.5" />
            </g>
          ))}
        </g>

        {/* Barbell shaft */}
        <rect x="10" y="35" width="80" height="3.5" rx="1.5" fill="url(#bar-metal)" filter="url(#glow-bar)" className="gym-bar" />

        {/* Knurling marks */}
        {Array.from({ length: 18 }, (_, i) => (
          <line key={`k${i}`} x1={28 + i * 2.4} y1="35.5" x2={28 + i * 2.4} y2="38" stroke="#666" strokeWidth="0.25" opacity="0.3" />
        ))}

        {/* Collar clamps */}
        <rect x="26" y="33" width="2.5" height="7" rx="0.4" fill="#555" opacity="0.6" />
        <rect x="71.5" y="33" width="2.5" height="7" rx="0.4" fill="#555" opacity="0.6" />

        {/* Center knurling */}
        <rect x="40" y="35.5" width="20" height="2.5" rx="0.5" fill="#555" opacity="0.2" />

        {/* Plate weight labels */}
        {[0, 1, 2, 3, 4, 5, 6].map(i => (
          <g key={`wl${i}`}>
            <text x={28 + plates[i].off} y="38.5" textAnchor="middle" fill="#DC2626"
              fontSize="1.8" fontWeight="700" opacity="0.15" fontFamily="Oswald,sans-serif">
              {45 - i * 5}
            </text>
            <text x={72 - plates[i].off} y="38.5" textAnchor="middle" fill="#DC2626"
              fontSize="1.8" fontWeight="700" opacity="0.15" fontFamily="Oswald,sans-serif">
              {45 - i * 5}
            </text>
          </g>
        ))}

        {/* Floor reflection */}
        <rect x="10" y="68" width="80" height="2" rx="1" fill="#DC2626" opacity="0.04" className="gym-reflect" />

        {/* Particles */}
        {Array.from({ length: 25 }, (_, i) => (
          <circle key={`p${i}`} cx={8 + Math.random() * 84} cy={12 + Math.random() * 72}
            r={0.3 + Math.random() * 0.4} fill="#DC2626" opacity="0.08"
            className="gym-particle"
            style={{ animationDelay: `${Math.random() * 8}s`, animationDuration: `${5 + Math.random() * 8}s` }} />
        ))}
      </svg>
    </div>
  )
}
