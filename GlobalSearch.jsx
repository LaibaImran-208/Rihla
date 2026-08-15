import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, MapPin, ArrowRight } from 'lucide-react';
import { allPlaces, emirates } from '@/data/emirates';
import { buildSearchIndex, searchIndex } from '@/lib/search';
import { Image } from '@/components/ui/image';

const emirateMap = Object.fromEntries(emirates.map((e) => [e.id, e]));
const index = buildSearchIndex(allPlaces, emirateMap);

export default function GlobalSearch({ onActiveChange }) {
  const [query, setQuery] = useState('');
  const hasQuery = query.trim().length > 0;
  const results = useMemo(() => searchIndex(index, query), [query]);

  useEffect(() => {
    onActiveChange?.(hasQuery);
  }, [hasQuery, onActiveChange]);

  return (
    <div>
      <label className="flex items-center gap-3 rounded-2xl border border-[#1A3355] bg-[#0A1A30] px-5 py-4 transition focus-within:border-[#C8965A]/60">
        <Search size={20} className="shrink-0 text-[#C8965A]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any place, landmark or attraction in UAE..."
          className="w-full bg-transparent text-base text-[#F5F0E8] outline-none placeholder:text-[#65758D]" />
        
        {hasQuery &&
        <button onClick={() => setQuery('')} className="shrink-0 text-[#65758D] transition hover:text-[#F5F0E8]" aria-label="Clear search">
            <X size={18} />
          </button>
        }
      </label>
      

      {hasQuery &&
      <div className="mt-8">
          {results.length > 0 ?
        <>
              <p className="mb-4 text-sm text-[#8FA3BF]">{results.length} {results.length === 1 ? 'place' : 'places'} found across the UAE</p>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {results.map(({ place: p, emirateName }) =>
            <Link
              to={`/place/${p.id}`}
              key={p.id}
              className="group overflow-hidden rounded-2xl border border-[#1A3355] bg-[#0A1A30] transition hover:border-[#C8965A]/40 hover:-translate-y-1">
              
                    <div className="relative h-44">
                      <Image src={`${p.image}?auto=format&fit=crop&w=600&q=85`} alt={p.name} className="h-full w-full" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A30] to-transparent" />
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full bg-[#050E1D]/80 px-3 py-1 text-xs text-[#E8B97A] backdrop-blur">{p.category}</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-xl font-bold text-[#F5F0E8]">{p.name}</h3>
                      <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-[#C8965A]">
                        <MapPin size={14} /> {emirateName}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-[#8FA3BF] line-clamp-2">{p.overview}</p>
                      <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#E8B97A]">
                        Explore Location <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
            )}
              </div>
            </> :

        <div className="py-16 text-center">
              <p className="font-display text-xl text-[#F5F0E8]">No places found.</p>
              <p className="mt-2 text-sm text-[#8FA3BF]">Try searching by landmark name, category, or emirate.</p>
            </div>
        }
        </div>
      }
    </div>);

}