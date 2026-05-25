import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../../data/products'
import { formatPrice } from '../../utils/formatPrice'

const SHOWCASE_IDS = ['001', '002', '003', '004', '005', '006']
const SHOWCASE = SHOWCASE_IDS
  .map((id) => PRODUCTS.find((p) => p.id === id))
  .filter(Boolean)
const N = SHOWCASE.length

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
}

const wordReveal = {
  hidden: { opacity: 0, y: 80 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
}

const STATS = [
  { value: '2.1M', label: 'Pairs Shipped' },
  { value: '55K', label: 'Reviews' },
  { value: '120', label: 'Cities' },
  { value: '12', label: 'Years' },
]

const CARD_META = [
  { num: '2.1', label: 'Introduction' },
  { num: '2.2', label: 'Opportunity' },
  { num: '2.3', label: 'Process' },
  { num: '2.4', label: 'Metrics' },
  { num: '2.5', label: 'Edition' },
  { num: '2.6', label: 'Archive' },
]

const DEFAULT_BG = '#0E0E0E'

// Page background tone per showcase product - tinted darks so the white type stays legible
const PRODUCT_BG = {
  '001': '#101a26', // cool indigo (Air Phantom Elite)
  '002': '#1c1410', // warm umber (Urban Drift Low)
  '003': '#10211c', // forest green
  '004': '#1f1228', // deep plum
  '005': '#241a10', // burnt amber
  '006': '#0e0e0e', // matte graphite
}

function CornerMark({ className = '' }) {
  return (
    <span className={`absolute text-sm font-light leading-none select-none ${className}`}>
      +
    </span>
  )
}

function ShoeCard({ product, index, isActive }) {
  const meta = CARD_META[index % CARD_META.length]

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/15 shadow-2xl shadow-black/60">
      <img
        src={product.images[0]}
        alt={product.name}
        loading="lazy"
        draggable={false}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isActive
            ? 'grayscale-0 opacity-100 scale-100'
            : 'grayscale contrast-110 mix-blend-luminosity opacity-85 scale-105'
        }`}
      />

      {/* Top dossier strip - gradient backdrop + hairline */}
      <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
        <div className="bg-gradient-to-b from-black/70 via-black/30 to-transparent">
          <div className="flex items-center justify-between px-5 pt-5 pb-3 text-[10px] tracking-[0.22em] uppercase">
            <div className="flex items-center gap-2 text-white/70">
              <span className="text-white font-medium">{meta.num}</span>
              <span className="w-5 h-px bg-white/40" />
              <span>{meta.label}</span>
            </div>
            <span className="text-white/60">FW26 / Vol.01</span>
          </div>
          <div className="h-px bg-white/15 mx-5" />
        </div>
      </div>

      <CornerMark className="top-3 left-3 text-white/55" />
      <CornerMark className="top-3 right-3 text-white/55" />
      <CornerMark className="bottom-3 left-3 text-white/55" />
      <CornerMark className="bottom-3 right-3 text-white/55" />

      {isActive && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute top-1/2 left-0 -translate-y-1/2 h-1.5 w-20 bg-accent origin-left z-10"
        />
      )}
    </div>
  )
}

function ChevUp() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 15l-6-6-6 6" />
    </svg>
  )
}

function ChevDown() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export function HeroSection() {
  const [activeIdx, setActiveIdx] = useState(0)

  const next = useCallback(() => setActiveIdx((i) => (i + 1) % N), [])
  const prev = useCallback(() => setActiveIdx((i) => (i - 1 + N) % N), [])

  useEffect(() => {
    function onKey(e) {
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        next()
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const active = SHOWCASE[activeIdx]

  const pageBg = PRODUCT_BG[active.id] || DEFAULT_BG

  return (
    <motion.section
      className="relative min-h-screen text-white flex flex-col overflow-hidden"
      initial={{ backgroundColor: pageBg }}
      animate={{ backgroundColor: pageBg }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col"
      >
        {/* Main editorial grid - cards LEFT, text RIGHT */}
        <div className="flex-1 layout-pad py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT column - half-circle cascade, shifted slightly inward with bigger gaps */}
          <motion.div
            variants={fadeUp}
            className="lg:col-span-6 flex flex-col items-center lg:items-start order-2 lg:order-1 lg:ml-0 xl:-ml-4"
          >
            <div className="relative w-full max-w-[400px] aspect-[5/4]">
              {SHOWCASE.map((product, i) => {
                const rel = ((i - activeIdx) + N) % N
                const signed = rel > N / 2 ? rel - N : rel
                const isActive = i === activeIdx
                const abs = Math.abs(signed)
                const visible = abs <= 2

                // Half-circle bulging LEFT - active sits at the RIGHTMOST (middle) point of
                // the arc at full size; siblings shrink and curve out to upper/lower LEFT.
                const radius = 220
                const angleStep = 44
                const angleDeg = signed * angleStep
                const angleRad = (angleDeg * Math.PI) / 180

                const x = isActive ? 0 : -radius + radius * Math.cos(angleRad)
                const y = isActive ? 0 : radius * Math.sin(angleRad)
                const scale = isActive ? 1 : 0.62 - abs * 0.08
                const rotate = signed * -8
                const opacity = visible ? 1 : 0

                return (
                  <motion.button
                    type="button"
                    key={product.id}
                    onClick={() => setActiveIdx(i)}
                    animate={{ x, y, scale, rotate, opacity }}
                    transition={{
                      type: 'spring',
                      stiffness: 130,
                      damping: 22,
                      mass: 0.8,
                    }}
                    className="absolute inset-0 origin-center outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-2xl"
                    style={{
                      zIndex: isActive ? 30 : 20 - abs,
                      pointerEvents: visible ? 'auto' : 'none',
                    }}
                    aria-label={`Show ${product.name}`}
                  >
                    <ShoeCard product={product} index={i} isActive={isActive} />
                  </motion.button>
                )
              })}
            </div>

            {/* Controls + counter */}
            <div className="mt-10 flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous"
                className="w-10 h-10 border border-white/20 text-white/80 hover:bg-white hover:text-surface-dark hover:border-white transition-colors flex items-center justify-center"
              >
                <ChevUp />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next"
                className="w-10 h-10 border border-white/20 text-white/80 hover:bg-white hover:text-surface-dark hover:border-white transition-colors flex items-center justify-center"
              >
                <ChevDown />
              </button>
              <span className="ml-3 font-mono text-[10px] tracking-[0.2em] uppercase text-white/50">
                {String(activeIdx + 1).padStart(2, '0')} / {String(N).padStart(2, '0')} &middot; &uarr; &darr; keys
              </span>
            </div>
          </motion.div>

          {/* RIGHT - editorial stack */}
          <div className="lg:col-span-6 flex flex-col order-1 lg:order-2">
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 text-xs tracking-[0.2em] uppercase text-white/60"
            >
              <span className="text-white font-medium">01</span>
              <span className="flex-1 h-px bg-white/20 max-w-[80px]" />
              <span>Introduction</span>
            </motion.div>

            <h1 className="mt-8 md:mt-10 font-bold leading-[0.85] tracking-[-0.04em] uppercase text-[16vw] sm:text-[14vw] md:text-[11vw] lg:text-[9vw] xl:text-[8.5vw]">
              <motion.span variants={wordReveal} className="block">Step</motion.span>
              <motion.span variants={wordReveal} className="block">Into</motion.span>
              <motion.span variants={wordReveal} className="block">
                Sole<span className="text-accent">.</span>
              </motion.span>
            </h1>

            {/* Active product readout */}
            <motion.div variants={fadeUp} className="mt-10 md:mt-12 max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  <div>
                    <div className="flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase text-white/50">
                      <span className="w-6 h-px bg-accent" />
                      <span>Now in rotation &middot; {active.brand}</span>
                    </div>
                    <p className="mt-3 text-sm text-white/70 leading-relaxed">
                      {active.name} - <span className="text-white">{formatPrice(active.price)}</span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Link
                      to={`/product/${active.id}`}
                      className="group inline-flex items-center justify-between border border-white/30 px-4 py-3 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-surface-dark transition-colors"
                    >
                      <span>Shop the Latest</span>
                      <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </Link>
                    <Link
                      to="/shop"
                      className="inline-flex items-center justify-between border border-white/15 px-4 py-3 text-xs tracking-[0.2em] uppercase text-white/70 hover:border-white/40 hover:text-white transition-colors"
                    >
                      <span>View Lookbook</span>
                      <span>[ &rarr; ]</span>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Bottom stats strip */}
        <motion.div
          variants={fadeUp}
          className="border-t border-white/10 layout-pad py-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
            {STATS.map(({ value, label }, i) => (
              <div
                key={label}
                className={`flex items-baseline gap-3 md:gap-4 ${
                  i > 0 ? 'md:border-l md:border-white/10 md:pl-4' : ''
                }`}
              >
                <span className="text-2xl md:text-3xl font-bold tracking-tight">{value}</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/50 leading-tight">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
