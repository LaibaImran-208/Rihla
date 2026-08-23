import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
const links = [['/', 'Home'], ['/emirates-explorer', 'Emirates'], ['/culture', 'Culture'], ['/values', 'Values'], ['/citizenship', 'Citizenship'], ['/sustainability', 'Sustainability'], ['/timeline', 'Timeline'], ['/calendar', 'Calendar'], ['/challenges', 'Challenges']];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-[#1A3355]/80 bg-[#050E1D]/90 backdrop-blur-xl">
    <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
      <Link to="/" className="flex items-center gap-3">
      <img
    src="/rihla_logo.png"
    alt="Rihla logo"
    className="h-12 w-12 object-contain"
  />
<span className="flex items-center gap-2">
  <p className="text-[#F5F0E8] [font-family:'Sacramento',_system-ui] text-3xl">
    Rihla
  </p>

  <small className="text-[#C8965A] text-2xl [font-family:'Architects_Daughter',_system-ui]">
    رحلة
  </small>
</span>
      </Link>
      <nav className="hidden items-center gap-5 lg:flex">{links.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => `text-sm transition ${isActive ? 'text-[#E8B97A]' : 'text-[#8FA3BF] hover:text-[#F5F0E8]'}`}>{label}</NavLink>)}</nav>
      <Link to="/digital-passport" className="hidden rounded-full border border-[#C8965A]/40 px-5 py-2 text-sm font-semibold text-[#E8B97A] md:block">🛂 Passport</Link>
      <button onClick={() => setOpen(!open)} className="text-[#F5F0E8] lg:hidden" aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
    </div>{open && <nav className="border-t border-[#1A3355] bg-[#071426] px-5 py-5 lg:hidden">{links.map(([to, label]) => <NavLink onClick={() => setOpen(false)} key={to} to={to} className="block py-3 text-[#F5F0E8]">{label}</NavLink>)}<Link onClick={() => setOpen(false)} to="/digital-passport" className="block py-3 text-[#E8B97A]">🛂 Digital Passport</Link></nav>}
  </header>;
}