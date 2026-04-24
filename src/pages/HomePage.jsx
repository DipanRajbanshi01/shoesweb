import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HeroSection } from '../components/home/HeroSection'
import { CategoriesSection } from '../components/home/CategoriesSection'
import { FeaturedProducts } from '../components/home/FeaturedProducts'
import { TrendingSection } from '../components/home/TrendingSection'

function EditorialBanner() {
  return (
    <section className="section-gap layout-pad">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-4xl overflow-hidden min-h-[400px] md:min-h-[500px] flex items-center"
      >
        <img
          src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=1600&auto=format&fit=crop&q=80"
          alt="Editorial"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

        <div className="relative z-10 px-10 md:px-16 max-w-2xl">
          <span className="text-accent text-xs font-semibold uppercase tracking-widest">
            Limited Edition
          </span>
          <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white leading-tight">
            Built for the
            <br />Bold Move.
          </h2>
          <p className="mt-4 text-white/70 text-base max-w-sm leading-relaxed">
            Performance meets artistry. Our sports collection redefines what it means to train at the limit.
          </p>
          <Link
            to="/shop/sports"
            className="mt-8 inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-accent hover:text-white transition-all duration-300 text-sm"
          >
            Shop Sports
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </motion.div>
    </section>
  )
}

function BrandStrip() {
  const brands = ['AERO', 'STRIDE', 'APEX', 'LUXE', 'ORIGIN', 'NOVA', 'DRIFT', 'FORMA']
  return (
    <div className="py-10 border-y border-gray-100 dark:border-gray-800 overflow-hidden">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        className="flex items-center gap-12 w-max"
      >
        {[...brands, ...brands].map((brand, i) => (
          <span
            key={i}
            className="text-2xl font-bold text-gray-200 dark:text-gray-800 tracking-widest uppercase whitespace-nowrap"
          >
            {brand}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandStrip />
      <CategoriesSection />
      <FeaturedProducts />
      <EditorialBanner />
      <TrendingSection />
    </>
  )
}
