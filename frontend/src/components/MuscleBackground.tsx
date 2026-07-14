export default function MuscleBackground() {
  const fibers = [
    // ── Chest (pectoralis major) ──
    { d: 'M28,34 Q45,38 72,34', del: '0s', dur: '2.8s' },
    { d: 'M26,37 Q45,41 74,37', del: '0.15s', dur: '3.2s' },
    { d: 'M24,40 Q45,45 76,40', del: '0.3s', dur: '3s' },
    { d: 'M27,43 Q45,48 73,43', del: '0.45s', dur: '3.4s' },
    { d: 'M30,46 Q45,51 70,46', del: '0.6s', dur: '2.6s' },
    { d: 'M23,35 Q45,39 77,35', del: '0.75s', dur: '3.6s' },
    { d: 'M25,48 Q45,53 75,48', del: '0.9s', dur: '3s' },

    // ── Shoulders (deltoids) ──
    { d: 'M18,28 Q22,33 24,38', del: '0.05s', dur: '2.6s' },
    { d: 'M82,28 Q78,33 76,38', del: '0.2s', dur: '2.6s' },
    { d: 'M16,30 Q20,36 22,42', del: '0.35s', dur: '3s' },
    { d: 'M84,30 Q80,36 78,42', del: '0.5s', dur: '3s' },
    { d: 'M14,34 Q18,40 20,46', del: '0.65s', dur: '2.8s' },
    { d: 'M86,34 Q82,40 80,46', del: '0.8s', dur: '2.8s' },
    { d: 'M20,26 Q24,30 26,36', del: '0.1s', dur: '3.2s' },
    { d: 'M80,26 Q76,30 74,36', del: '0.25s', dur: '3.2s' },
    { d: 'M12,38 Q16,44 18,50', del: '0.7s', dur: '3.4s' },
    { d: 'M88,38 Q84,44 82,50', del: '0.85s', dur: '3.4s' },

    // ── Biceps ──
    { d: 'M14,42 Q10,52 12,60', del: '0.1s', dur: '3.6s' },
    { d: 'M86,42 Q90,52 88,60', del: '0.3s', dur: '3.6s' },
    { d: 'M12,44 Q8,54 10,62', del: '0.5s', dur: '3s' },
    { d: 'M88,44 Q92,54 90,62', del: '0.7s', dur: '3s' },
    { d: 'M10,48 Q6,57 8,65', del: '0.9s', dur: '3.4s' },
    { d: 'M90,48 Q94,57 92,65', del: '1.1s', dur: '3.4s' },
    { d: 'M16,46 Q12,55 14,63', del: '0.2s', dur: '3.8s' },
    { d: 'M84,46 Q88,55 86,63', del: '0.4s', dur: '3.8s' },

    // ── Forearms ──
    { d: 'M10,62 Q8,70 12,78', del: '0.15s', dur: '3.2s' },
    { d: 'M90,62 Q92,70 88,78', del: '0.35s', dur: '3.2s' },
    { d: 'M8,65 Q6,73 10,82', del: '0.55s', dur: '3.6s' },
    { d: 'M92,65 Q94,73 90,82', del: '0.75s', dur: '3.6s' },
    { d: 'M14,64 Q12,72 16,80', del: '0.25s', dur: '3.4s' },
    { d: 'M86,64 Q88,72 84,80', del: '0.45s', dur: '3.4s' },
    { d: 'M12,68 Q10,76 14,84', del: '0.65s', dur: '3.8s' },
    { d: 'M88,68 Q90,76 86,84', del: '0.85s', dur: '3.8s' },

    // ── Abs (rectus abdominis) ──
    { d: 'M42,50 Q50,53 58,50', del: '0s', dur: '2.4s' },
    { d: 'M41,55 Q50,58 59,55', del: '0.15s', dur: '2.6s' },
    { d: 'M40,60 Q50,63 60,60', del: '0.3s', dur: '2.8s' },
    { d: 'M41,65 Q50,68 59,65', del: '0.45s', dur: '2.5s' },
    { d: 'M42,70 Q50,73 58,70', del: '0.6s', dur: '3s' },
    { d: 'M44,55 L44,72', del: '0.05s', dur: '2.2s' },
    { d: 'M50,52 L50,72', del: '0.2s', dur: '2.2s' },
    { d: 'M56,55 L56,72', del: '0.35s', dur: '2.2s' },
    { d: 'M42,48 Q50,51 58,48', del: '0.1s', dur: '2.4s' },

    // ── Serratus / Intercostals ──
    { d: 'M24,48 Q30,52 36,56', del: '0.2s', dur: '3s' },
    { d: 'M76,48 Q70,52 64,56', del: '0.4s', dur: '3s' },
    { d: 'M22,52 Q28,56 34,60', del: '0.6s', dur: '3.2s' },
    { d: 'M78,52 Q72,56 66,60', del: '0.8s', dur: '3.2s' },

    // ── Lats (latissimus dorsi) ──
    { d: 'M22,42 Q30,54 38,62', del: '0.1s', dur: '3.5s' },
    { d: 'M78,42 Q70,54 62,62', del: '0.3s', dur: '3.5s' },
    { d: 'M20,46 Q28,58 36,66', del: '0.5s', dur: '3.8s' },
    { d: 'M80,46 Q72,58 64,66', del: '0.7s', dur: '3.8s' },
    { d: 'M18,50 Q26,62 34,70', del: '0.9s', dur: '4s' },
    { d: 'M82,50 Q74,62 66,70', del: '1.1s', dur: '4s' },
    { d: 'M24,44 Q32,56 40,64', del: '0.2s', dur: '3.3s' },
    { d: 'M76,44 Q68,56 60,64', del: '0.4s', dur: '3.3s' },

    // ── Quads ──
    { d: 'M34,76 Q40,86 38,100', del: '0s', dur: '3s' },
    { d: 'M66,76 Q60,86 62,100', del: '0.15s', dur: '3s' },
    { d: 'M30,78 Q36,88 34,104', del: '0.3s', dur: '3.5s' },
    { d: 'M70,78 Q64,88 66,104', del: '0.45s', dur: '3.5s' },
    { d: 'M28,80 Q34,90 32,106', del: '0.6s', dur: '3.2s' },
    { d: 'M72,80 Q66,90 68,106', del: '0.75s', dur: '3.2s' },
    { d: 'M40,78 L40,102', del: '0.05s', dur: '2.6s' },
    { d: 'M46,78 L46,102', del: '0.2s', dur: '2.6s' },
    { d: 'M54,78 L54,102', del: '0.35s', dur: '2.6s' },
    { d: 'M60,78 L60,102', del: '0.5s', dur: '2.6s' },
    { d: 'M36,76 Q42,86 40,100', del: '0.1s', dur: '3.4s' },
    { d: 'M64,76 Q58,86 60,100', del: '0.25s', dur: '3.4s' },

    // ── Hamstrings (inner) ──
    { d: 'M32,80 Q38,92 36,106', del: '0.4s', dur: '3.6s' },
    { d: 'M68,80 Q62,92 64,106', del: '0.55s', dur: '3.6s' },
    { d: 'M34,82 Q40,94 38,108', del: '0.7s', dur: '3.8s' },
    { d: 'M66,82 Q60,94 62,108', del: '0.85s', dur: '3.8s' },

    // ── Calves ──
    { d: 'M32,104 Q36,112 34,122', del: '0.1s', dur: '3.4s' },
    { d: 'M68,104 Q64,112 66,122', del: '0.3s', dur: '3.4s' },
    { d: 'M30,106 Q34,114 32,125', del: '0.5s', dur: '3s' },
    { d: 'M70,106 Q66,114 68,125', del: '0.7s', dur: '3s' },
    { d: 'M28,108 Q32,116 30,128', del: '0.9s', dur: '3.6s' },
    { d: 'M72,108 Q68,116 70,128', del: '1.1s', dur: '3.6s' },
    { d: 'M36,106 L36,126', del: '0.2s', dur: '2.8s' },
    { d: 'M64,106 L64,126', del: '0.4s', dur: '2.8s' },
    { d: 'M38,108 L38,128', del: '0.6s', dur: '3.2s' },
    { d: 'M62,108 L62,128', del: '0.8s', dur: '3.2s' },

    // ── Traps (trapezius) ──
    { d: 'M26,22 Q50,16 74,22', del: '0s', dur: '2.6s' },
    { d: 'M24,25 Q50,19 76,25', del: '0.15s', dur: '2.8s' },
    { d: 'M22,28 Q50,22 78,28', del: '0.3s', dur: '3s' },
    { d: 'M28,20 Q50,14 72,20', del: '0.45s', dur: '2.4s' },
    { d: 'M20,30 Q50,24 80,30', del: '0.6s', dur: '3.2s' },
    { d: 'M30,18 Q50,12 70,18', del: '0.7s', dur: '2.6s' },

    // ── Neck ──
    { d: 'M42,10 Q50,8 58,10', del: '0.1s', dur: '2.4s' },
    { d: 'M40,14 Q50,12 60,14', del: '0.3s', dur: '2.6s' },
    { d: 'M44,8 L44,14', del: '0s', dur: '2.2s' },
    { d: 'M50,6 L50,14', del: '0.2s', dur: '2.2s' },
    { d: 'M56,8 L56,14', del: '0.4s', dur: '2.2s' },
    { d: 'M38,16 Q50,14 62,16', del: '0.5s', dur: '2.8s' },

    // ── Glutes ──
    { d: 'M30,70 Q50,76 70,70', del: '0.1s', dur: '3s' },
    { d: 'M28,74 Q50,80 72,74', del: '0.3s', dur: '3.4s' },
    { d: 'M32,72 Q50,78 68,72', del: '0.5s', dur: '3.2s' },
  ]

  const nodes = [
    // Chest
    { cx: 35, cy: 40, s: 4.5 }, { cx: 65, cy: 40, s: 4.5 },
    // Shoulders
    { cx: 22, cy: 36, s: 4 }, { cx: 78, cy: 36, s: 4 },
    // Biceps peak
    { cx: 12, cy: 54, s: 3.5 }, { cx: 88, cy: 54, s: 3.5 },
    // Forearm
    { cx: 11, cy: 74, s: 3 }, { cx: 89, cy: 74, s: 3 },
    // Abs center
    { cx: 50, cy: 60, s: 4 },
    // Lats
    { cx: 30, cy: 56, s: 3.5 }, { cx: 70, cy: 56, s: 3.5 },
    // Quads
    { cx: 38, cy: 90, s: 4 }, { cx: 62, cy: 90, s: 4 },
    // Calves
    { cx: 34, cy: 116, s: 3.5 }, { cx: 66, cy: 116, s: 3.5 },
    // Traps
    { cx: 30, cy: 24, s: 3.5 }, { cx: 70, cy: 24, s: 3.5 },
    // Glutes
    { cx: 38, cy: 74, s: 3.5 }, { cx: 62, cy: 74, s: 3.5 },
  ]

  return (
    <div className="muscle-bg" aria-hidden="true">
      <svg className="muscle-bg-svg" viewBox="0 0 100 140" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="mg-fiber" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DC2626" stopOpacity="0" />
            <stop offset="40%" stopColor="#DC2626" stopOpacity="0.3" />
            <stop offset="60%" stopColor="#DC2626" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="mg-fiber-v" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DC2626" stopOpacity="0" />
            <stop offset="40%" stopColor="#DC2626" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#DC2626" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </linearGradient>
          <filter id="mg-glow">
            <feGaussianBlur stdDeviation="0.6" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="mg-glow-lg">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="node-rad">
            <stop offset="0%" stopColor="#DC2626" stopOpacity="0.5" />
            <stop offset="40%" stopColor="#DC2626" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="core-rad">
            <stop offset="0%" stopColor="#DC2626" stopOpacity="0.03" />
            <stop offset="60%" stopColor="#DC2626" stopOpacity="0.01" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Body core glow */}
        <ellipse cx="50" cy="68" rx="30" ry="44" fill="url(#core-rad)" className="mg-core" />

        {/* Deep / background fibers (subtle) */}
        {fibers.map((f, i) => (
          <path key={`df${i}`} d={f.d} fill="none" stroke="#DC2626" strokeWidth="0.2"
            opacity="0.08" className="mg-fiber-deep"
            style={{ animationDelay: f.del, animationDuration: f.dur }} />
        ))}

        {/* Main fiber lines */}
        {fibers.map((f, i) => (
          <path key={i} d={f.d} fill="none" stroke="url(#mg-fiber)" strokeWidth="0.65"
            strokeLinecap="round" className="mg-fiber"
            style={{ animationDelay: f.del, animationDuration: f.dur }} />
        ))}

        {/* Vertical fiber gradient override for quads/abs */}
        {fibers.slice(54, 74).map((f, i) => (
          <path key={`vf${i}`} d={f.d} fill="none" stroke="url(#mg-fiber-v)" strokeWidth="0.5"
            strokeLinecap="round" className="mg-fiber"
            style={{ animationDelay: f.del, animationDuration: f.dur }} />
        ))}

        {/* Glowing nodes */}
        {nodes.map((n, i) => (
          <g key={`n${i}`} className="mg-node" style={{ animationDelay: `${i * 0.12}s` }}>
            <circle cx={n.cx} cy={n.cy} r={n.s * 2.2} fill="url(#node-rad)" filter="url(#mg-glow-lg)" />
            <circle cx={n.cx} cy={n.cy} r={n.s * 0.9} fill="#DC2626" opacity="0.12" filter="url(#mg-glow)" />
            <circle cx={n.cx} cy={n.cy} r={n.s * 0.3} fill="#DC2626" opacity="0.35" />
          </g>
        ))}

        {/* Outer silhouette */}
        <path d="M50,3 Q46,3 44,4 L42,6 Q38,8 36,10 L32,14 Q28,18 26,20 L24,22 Q20,24 18,28 Q16,32 15,36 L14,42 Q13,48 14,54 L15,60 Q16,64 17,68 L18,74 Q19,78 20,82 L22,88 Q24,94 28,100 L32,108 Q34,112 36,116 L38,120 Q40,124 42,128 L44,132 Q46,135 48,137 L50,138 L52,137 Q54,135 56,132 L58,128 Q60,124 62,120 L64,116 Q66,112 68,108 L72,100 Q76,94 78,88 L80,82 Q81,78 82,74 L83,68 Q84,64 85,60 L86,54 Q87,48 86,42 L85,36 Q84,32 82,28 Q80,24 76,22 L74,20 Q72,18 68,14 L64,10 Q62,8 58,6 L56,4 Q54,3 52,3Z"
          fill="none" stroke="#DC2626" strokeWidth="0.2" opacity="0.1" className="mg-outline" />

        {/* Inner silhouette glow */}
        <path d="M50,3 Q46,3 44,4 L42,6 Q38,8 36,10 L32,14 Q28,18 26,20 L24,22 Q20,24 18,28 Q16,32 15,36 L14,42 Q13,48 14,54 L15,60 Q16,64 17,68 L18,74 Q19,78 20,82 L22,88 Q24,94 28,100 L32,108 Q34,112 36,116 L38,120 Q40,124 42,128 L44,132 Q46,135 48,137 L50,138 L52,137 Q54,135 56,132 L58,128 Q60,124 62,120 L64,116 Q66,112 68,108 L72,100 Q76,94 78,88 L80,82 Q81,78 82,74 L83,68 Q84,64 85,60 L86,54 Q87,48 86,42 L85,36 Q84,32 82,28 Q80,24 76,22 L74,20 Q72,18 68,14 L64,10 Q62,8 58,6 L56,4 Q54,3 52,3Z"
          fill="none" stroke="url(#mg-fiber)" strokeWidth="1.5" opacity="0.15" className="mg-outline-glow"
          style={{ animationDelay: '0s', animationDuration: '4s' }} />

        {/* Particles */}
        {Array.from({ length: 40 }, (_, i) => (
          <circle key={`p${i}`} cx={10 + Math.random() * 80} cy={8 + Math.random() * 124} r={0.3 + Math.random() * 0.5}
            fill="#DC2626" opacity="0.12" className="mg-particle"
            style={{ animationDelay: `${Math.random() * 10}s`, animationDuration: `${6 + Math.random() * 10}s` }} />
        ))}
      </svg>
    </div>
  )
}
