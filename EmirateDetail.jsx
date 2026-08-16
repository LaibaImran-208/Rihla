import { useMemo, useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, MapPin, Check, ArrowLeft, X, ChevronDown, Stamp } from 'lucide-react';
import gsap from 'gsap';
import Navbar from '@/components/rihla/Navbar';
import Footer from '@/components/rihla/Footer';
import { emirates } from '@/data/emirates';
import { Image } from '@/components/ui/image';
import useJourney from '@/hooks/useJourney';

const SORTS = [
  { id: 'default', label: 'Default' },
  { id: 'az', label: 'A → Z' },
  { id: 'za', label: 'Z → A' },
  { id: 'category', label: 'Category' }
];

export default function EmirateDetail() {
  const { emirateId } = useParams();
  const emirate = emirates.find(e => e.id === emirateId);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('default');
  const [sortOpen, setSortOpen] = useState(false);
  const { exploredPlaces, togglePlace, stamps, unlockStamp } = useJourney();
  const stampBadgeRef = useRef(null);

  // Stamp logic: unlock when at least half the emirate's locations are explored.
  const emiratePlaces = emirate?.locations || [];
  const exploredInEmirate = emiratePlaces.filter(p => exploredPlaces.includes(p.id)).length;
  const stampThreshold = Math.max(1, Math.ceil(emiratePlaces.length / 2));
  const stampEarned = emirate ? stamps.includes(emirate.id) : false;
  const prevStampEarned = useRef(stampEarned);

  // Auto-unlock stamp when threshold is met.
  useEffect(() => {
    if (emirate && !stampEarned && exploredInEmirate >= stampThreshold) {
      unlockStamp(emirate.id);
    }
  }, [exploredInEmirate, stampThreshold, stampEarned, emirate, unlockStamp]);

  // Stamp animation when newly earned.
  useEffect(() => {
    if (stampEarned && !prevStampEarned.current && stampBadgeRef.current) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReducedMotion) {
        gsap.fromTo(stampBadgeRef.current,
          { scale: 0.7, rotation: -15, opacity: 0 },
          { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: 'back.out(2)' }
        );
      }
    }
    prevStampEarned.current = stampEarned;
  }, [stampEarned]);

  // Derive categories from this emirate's locations only.
  const categories = useMemo(() => {
    if (!emirate) return ['All'];
    const cats = [...new Set(emirate.locations.map(p => p.category))].sort();
    return ['All', ...cats];
  }, [emirate]);

  // Filter + search + sort.
  const visible = useMemo(() => {
    if (!emirate) return [];
    let places = [...emirate.locations];
    if (filter !== 'All') places = places.filter(p => p.category === filter);
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      places = places.filter(p => {
        const haystack = [
          p.name, p.overview, p.didYouKnow, p.category,
          p.history, p.significance, p.emirate,
          ...(p.facts || []), ...(p.related || [])
        ].join(' ').toLowerCase();
        return haystack.includes(q);
      });
    }
    switch (sort) {
      case 'az': places.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'za': places.sort((a, b) => b.name.localeCompare(a.name)); break;
      case 'category': places.sort((a, b) => a.category.localeCompare(b.category)); break;
      default: break;
    }
    return places;
  }, [emirate, filter, query, sort]);

  if (!emirate) {
    return (
      <main className="min-h-screen bg-[#050E1D]">
        <Navbar />
        <div className="grid min-h-[60vh] place-items-center px-5 pt-20 text-center">
          <div>
            <h1 className="font-display text-3xl text-[#F5F0E8]">Emirate not found</h1>
            <Link to="/emirates-explorer" className="mt-6 inline-block text-[#E8B97A]">← Back to Emirates</Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const stampProgress = Math.min(100, Math.round((exploredInEmirate / stampThreshold) * 100));

  return (
    <main className="min-h-screen bg-[#050E1D]">
      <Navbar />
      {/* Emirate Hero */}
      <div className="relative h-[380px] w-full overflow-hidden bg-[#050E1D]">
         <Image src={emirate.image} alt={emirate.name} fittingType="fit"className="h-full w-full"/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050E1D] via-[#050E1D]/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-5 pb-10">
          <Link to="/emirates-explorer" className="mb-4 inline-flex items-center gap-2 text-sm text-[#E8B97A] hover:text-[#F5F0E8]">
            <ArrowLeft size={16} /> Back to Emirates
          </Link>
          <p className="text-[#E8B97A]">{emirate.arabic}</p>
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">{emirate.name}</h1>
          <p className="mt-1 text-[#B7C3D4]">{emirate.tagline}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-12">
        {/* Introduction + Stamp Progress */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="leading-8 text-[#B7C3D4]">{emirate.description}</p>
          </div>
          <div className={`rounded-2xl border p-5 ${stampEarned ? 'border-[#C8965A]/50 bg-[#C8965A]/10' : 'border-[#1A3355] bg-[#0A1A30]'}`}>
            <div className="flex items-center gap-2">
              <Stamp size={20} className={stampEarned ? 'text-[#C8965A]' : 'text-[#65758D]'} />
              <h3 className="font-display text-lg font-bold text-[#F5F0E8]">Emirate Stamp</h3>
            </div>
            {stampEarned ? (
              <div ref={stampBadgeRef} className="mt-3 text-center">
                <div className="text-4xl">🛂</div>
                <p className="mt-2 text-sm font-bold text-[#E8B97A]">Stamp Unlocked!</p>
                <p className="mt-1 text-xs text-[#8FA3BF]">You explored {exploredInEmirate} of {emiratePlaces.length} locations.</p>
              </div>
            ) : (
              <div className="mt-3">
                <p className="text-sm text-[#8FA3BF]">Explore {stampThreshold} locations to unlock this stamp.</p>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-[#B7C3D4]">{exploredInEmirate} / {stampThreshold} explored</span>
                  <span className="text-[#E8B97A]">{stampProgress}%</span>
                </div>
                <div className="mt-1.5 h-2 rounded-full bg-[#050E1D]">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#A67340] to-[#E8B97A] transition-all" style={{ width: `${stampProgress}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search + Filters + Sort */}
        <div className="mt-10 mb-6">
          <h2 className="mb-4 font-display text-2xl font-bold text-[#F5F0E8]">Discover {emirate.name}</h2>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="flex flex-1 items-center gap-2 rounded-full border border-[#1A3355] bg-[#0A1A30] px-4">
              <Search size={18} className="text-[#8FA3BF]" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder={`Search ${emirate.name} locations...`}
                className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-[#65758D]"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-[#65758D] hover:text-[#F5F0E8]"><X size={16} /></button>
              )}
            </label>
            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-2 rounded-full border border-[#1A3355] bg-[#0A1A30] px-4 py-2.5 text-sm text-[#B7C3D4]"
              >
                Sort: {SORTS.find(s => s.id === sort)?.label}
                <ChevronDown size={14} />
              </button>
              {sortOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                  <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-xl border border-[#1A3355] bg-[#0A1A30] py-1 shadow-xl">
                    {SORTS.map(s => (
                      <button
                        key={s.id}
                        onClick={() => { setSort(s.id); setSortOpen(false); }}
                        className={`block w-full px-4 py-2 text-left text-sm ${sort === s.id ? 'bg-[#C8965A]/20 text-[#E8B97A]' : 'text-[#B7C3D4] hover:bg-[#1A3355]'}`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          {/* Category filters */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {categories.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-bold ${filter === f ? 'bg-[#C8965A] text-[#050E1D]' : 'border border-[#1A3355] text-[#B7C3D4]'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="mb-4 text-sm text-[#8FA3BF]">
          {visible.length} {visible.length === 1 ? 'location' : 'locations'} found
          {(filter !== 'All' || query) && (
            <button onClick={() => { setFilter('All'); setQuery(''); setSort('default'); }} className="ml-2 text-[#E8B97A] hover:underline">Clear all</button>
          )}
        </p>

        {/* Location cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map(p => {
            const explored = exploredPlaces.includes(p.id);
            return (
              <Link
                to={`/place/${p.id}`}
                key={p.id}
                className="group overflow-hidden rounded-2xl border border-[#1A3355] bg-[#0A1A30] transition hover:border-[#C8965A]/40 hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <Image src={`${p.image}?auto=format&fit=crop&w=600&q=85`} alt={p.name} className="h-full w-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A30] to-transparent" />
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full bg-[#050E1D]/80 px-3 py-1 text-xs text-[#E8B97A] backdrop-blur">{p.category}</span>
                  </div>
                  {explored && (
                    <div className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-[#2D6A4F]">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-bold text-[#F5F0E8]">{p.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#8FA3BF] line-clamp-2">{p.overview}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#E8B97A]">
                    <MapPin size={15} /> View Details →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {visible.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-[#8FA3BF]">No locations match your search. Try different filters or search terms.</p>
            <button onClick={() => { setFilter('All'); setQuery(''); }} className="mt-4 text-[#E8B97A] hover:underline">Reset search</button>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}