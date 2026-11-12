// components/Marquee.jsx

const DEFAULT_MESSAGES = [
  '🚚 Livraison offerte dès 50 000 FCFA',
  '🔥 -20% sur la nouvelle collection',
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
