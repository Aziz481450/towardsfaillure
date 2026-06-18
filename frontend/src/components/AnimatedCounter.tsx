import { useScrollReveal } from '../hooks/useScrollReveal'
import { useCountUp } from '../hooks/useCountUp'

interface AnimatedCounterProps {
  target: number
  suffix?: string
  label: string
  icon?: string
}

export default function AnimatedCounter({ target, suffix = '', label }: AnimatedCounterProps) {
  const { ref, isVisible } = useScrollReveal()
  const value = useCountUp(target, 2000, isVisible)

  return (
    <div ref={ref} className="text-center">
      <span className="block font-oswald text-4xl md:text-5xl font-bold text-white leading-none tracking-tight">
        {value.toLocaleString()}{suffix}
      </span>
      <span className="block text-white/30 text-xs font-semibold uppercase tracking-[0.08em] mt-2">
        {label}
      </span>
    </div>
  )
}
