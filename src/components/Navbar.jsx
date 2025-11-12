import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const loc = useLocation();

  useEffect(() => setOpen(false), [loc.pathname]);
  useEffect(() => {
    function onClick(e) { if (open && menuRef.current && !menuRef.current.contains(e.target)) setOpen(false); }
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [open]);

  const linkCls = (p) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      loc.pathname === p ? 'text-brand-gold2' : 'text-gray-200 hover:text-white'
    }`;

  return (
    <nav className="bg-brand-indigo/95 backdrop-blur border-b border-white/10 sticky top-0 z-50">
      <div className="page flex h-14 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-gold to-brand-gold2 shadow-glow" />
          <span className="text-lg font-semibold tracking-wide">RetailInsight</span>
        </Link>

        {/* desktop */}
        <div className="hidden md:flex items-center gap-1">
          <Link className={linkCls('/inventory')} to="/inventory">Inventory</Link>
          <Link className={linkCls('/analytics')} to="/analytics">Analytics</Link>
          <Link className={linkCls('/alerts')} to="/alerts">Alerts</Link>
        </div>

        {/* mobile menu button (right) */}
        <button
          aria-label="menu"
          className="md:hidden text-gray-200 hover:text-white"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {/* dropdown (right aligned) */}
        {open && (
          <div ref={menuRef}
            className="absolute right-4 top-14 w-44 glass animate-slideUp">
            <div className="p-2">
              <Link className="block w-full px-3 py-2 rounded-md hover:bg-white/10" to="/inventory">Inventory</Link>
              <Link className="block w-full px-3 py-2 rounded-md hover:bg-white/10" to="/analytics">Analytics</Link>
              <Link className="block w-full px-3 py-2 rounded-md hover:bg-white/10" to="/alerts">Alerts</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
