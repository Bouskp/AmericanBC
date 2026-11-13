// components/Marquee.jsx

const DEFAULT_MESSAGES = [
  'Produits 100% originaux et authentiques',
  '2 dermo-conseillères spécialisées pour vous guider dans vos choix',
  '💳 Paiement Mobile Money accepté(Wave, Orange Money)',
]

export default function Marquee({ messages = DEFAULT_MESSAGES, speed = 70 }) {
  if (!messages.length) return null

  const items = Array.from({ length: 4 }, () => messages).flat()

  return (
    <div
      className='group overflow-hidden whitespace-nowrap bg-brand-red text-sm text-white'
      style={{ animationDuration: `${speed}s` }}
    >
      <div className='inline-flex animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none cursor-pointer'>
        {items.map((msg, i) => (
          <span
            key={i}
            className='px-12 py-2 text-xs uppercase md:text-base font-semibold tracking-widest'
            aria-hidden={i >= messages.length}
          >
            {msg}
          </span>
        ))}
      </div>
    </div>
  )
}
