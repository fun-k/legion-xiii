import type { Officer } from '@/data/officers'

export function OfficerCard({ rank, name, post, since, record, quote, featured }: Officer) {
  return (
    <article
      className={`parchment-card relative flex flex-col gap-5 rounded-sm p-7 sm:p-8 ${
        featured ? 'md:p-10' : ''
      }`}
    >
      <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4">
        <div className={`wax-seal ${featured ? 'h-16 w-16 sm:h-20 sm:w-20' : 'h-12 w-12 sm:h-14 sm:w-14'}`}>
          <span
            className={`font-display font-bold text-parchment/90 ${featured ? 'text-lg sm:text-xl' : 'text-xs sm:text-sm'}`}
          >
            XIII
          </span>
        </div>
      </div>

      <div>
        <p className="font-display text-xs tracking-[0.3em] text-brass uppercase">
          {rank}
        </p>
        <h3
          className={`font-display-deco text-parchment mt-2 ${
            featured ? 'text-3xl sm:text-4xl' : 'text-2xl'
          }`}
        >
          {name}
        </h3>
        <p className="mt-2 text-sm text-muted italic">{post}</p>
        <p className="mt-1 text-xs text-brass-dim uppercase tracking-wider">{since}</p>
      </div>

      <div className="divider-ornate">
        <span className="h-1.5 w-1.5 rotate-45 bg-brass-dim" />
      </div>

      <blockquote className="font-body italic text-parchment-dim leading-relaxed border-l-2 border-crimson/60 pl-4">
        "{quote}"
      </blockquote>

      <p className="text-sm leading-relaxed text-muted">{record}</p>
    </article>
  )
}
