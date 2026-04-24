import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrolled } from '../../hooks/useScrolled'
import { useCart } from '../../context/CartContext'
import { useDarkMode } from '../../hooks/useDarkMode'
import { clsx } from 'clsx'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Men', to: '/shop/men' },
  { label: 'Formal', to: '/shop/formal' },
]

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  )
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export function Navbar() {
  const scrolled = useScrolled(60)
  const { itemCount, setIsOpen } = useCart()
  const [dark, setDark] = useDarkMode()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  const isTransparent = isHome && !scrolled && !mobileOpen

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isTransparent
            ? 'bg-transparent'
            : 'bg-white/95 dark:bg-surface-dark/95 backdrop-blur-md shadow-sm'
        )}
      >
        <div className="layout-pad">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              to="/"
              className={clsx(
                'text-2xl font-bold tracking-widest transition-colors duration-300',
                isTransparent ? 'text-white' : 'text-gray-900 dark:text-white'
              )}
            >
              SOLE
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    clsx(
                      'text-sm font-medium tracking-wide transition-colors duration-200',
                      isActive
                        ? 'text-accent'
                        : isTransparent
                        ? 'text-white/80 hover:text-white'
                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setDark((d) => !d)}
                className={clsx(
                  'p-2.5 rounded-full transition-colors duration-200',
                  isTransparent
                    ? 'text-white hover:bg-white/10'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
                aria-label="Toggle dark mode"
              >
                {dark ? <SunIcon /> : <MoonIcon />}
              </button>

              <button
                className={clsx(
                  'hidden md:flex p-2.5 rounded-full transition-colors duration-200',
                  isTransparent
                    ? 'text-white hover:bg-white/10'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
                aria-label="Search"
              >
                <SearchIcon />
              </button>

              <button
                className={clsx(
                  'hidden md:flex p-2.5 rounded-full transition-colors duration-200',
                  isTransparent
                    ? 'text-white hover:bg-white/10'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
                aria-label="Account"
              >
                <UserIcon />
              </button>

              <button
                onClick={() => setIsOpen(true)}
                className={clsx(
                  'relative p-2.5 rounded-full transition-colors duration-200',
                  isTransparent
                    ? 'text-white hover:bg-white/10'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
                aria-label="Open cart"
              >
                <CartIcon />
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {itemCount > 9 ? '9+' : itemCount}
                  </motion.span>
                )}
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className={clsx(
                  'md:hidden p-2.5 rounded-full transition-colors duration-200',
                  isTransparent
                    ? 'text-white hover:bg-white/10'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                )}
                aria-label="Toggle menu"
              >
                <div className="w-5 flex flex-col gap-1.5">
                  <span
                    className={clsx(
                      'block h-0.5 transition-all duration-300 origin-center',
                      isTransparent ? 'bg-white' : 'bg-current',
                      mobileOpen && 'rotate-45 translate-y-2'
                    )}
                  />
                  <span
                    className={clsx(
                      'block h-0.5 transition-all duration-300',
                      isTransparent ? 'bg-white' : 'bg-current',
                      mobileOpen && 'opacity-0'
                    )}
                  />
                  <span
                    className={clsx(
                      'block h-0.5 transition-all duration-300 origin-center',
                      isTransparent ? 'bg-white' : 'bg-current',
                      mobileOpen && '-rotate-45 -translate-y-2'
                    )}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-white dark:bg-surface-dark pt-20 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-1 mt-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      clsx(
                        'block py-4 text-2xl font-semibold border-b border-gray-100 dark:border-gray-800 transition-colors',
                        isActive
                          ? 'text-accent'
                          : 'text-gray-900 dark:text-white'
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="mt-10 flex items-center gap-4">
              <button className="p-3 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                <SearchIcon />
              </button>
              <button className="p-3 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                <UserIcon />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
