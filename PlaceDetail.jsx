import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, MapPin, Lightbulb, Sparkles } from 'lucide-react';
import Navbar from '@/components/rihla/Navbar';
import Footer from '@/components/rihla/Footer';
import QuizCard from '@/components/rihla/QuizCard';
import { allPlaces, emirates } from '@/data/emirates';
import useJourney from '@/hooks/useJourney';
import { Image } from '@/components/ui/image';
export default function PlaceDetail(){
  const { id } = useParams();
  const place=allPlaces.find(p=>p.id===id);
  const { exploredPlaces, togglePlace, completeQuiz } = useJourney();
  if(!place) return (<main className="min-h-screen bg-[#050E1D]"><Navbar/><div className="grid min-h-[60vh] place-items-center px-5 pt-20 text-center"><div><h1 className="font-display text-3xl text-[#F5F0E8]">Place not found</h1><Link to="/emirates-explorer" className="mt-6 inline-block text-[#E8B97A]">← Back to Emirates</Link></div></div><Footer/></main>);
  const emirate=emirates.find(e=>e.id===place.emirate);
  const explored=exploredPlaces.includes(place.id);
  const related=place.related?.map(r=>allPlaces.find(p=>p.id===r)).filter(Boolean)||[];
  return (<main className="min-h-screen bg-[#050E1D]"><Navbar/>
    <div className="relative h-[420px] w-full overflow-hidden"><Image src={`${place.image}?auto=format&fit=crop&w=1400&q=85`} alt={place.name} className="h-full w-full"/><div className="absolute inset-0 bg-gradient-to-t from-[#050E1D] via-[#050E1D]/40 to-transparent"/><div className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-5 pb-10"><Link to={`/explore/${place.emirate}`} className="mb-4 inline-flex items-center gap-2 text-sm text-[#E8B97A]"><ArrowLeft size={16}/> Back to {emirate?.name || 'Emirates'}</Link><div className="flex items-center gap-2"><span className="rounded-full bg-[#C8965A]/20 px-3 py-1 text-xs text-[#E8B97A]">{place.category}</span><span className="rounded-full bg-[#1A3355] px-3 py-1 text-xs text-[#B7C3D4]">{emirate?.name}</span></div><h1 className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl">{place.name}</h1></div></div>
    <div className="mx-auto max-w-5xl px-5 py-12">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div><h2 className="mb-3 font-display text-2xl font-bold text-[#F5F0E8]">Overview</h2><p className="leading-8 text-[#B7C3D4]">{place.overview}</p></div>
          <div><h2 className="mb-3 font-display text-2xl font-bold text-[#F5F0E8]">History</h2><p className="leading-8 text-[#B7C3D4]">{place.history}</p></div>
          <div><h2 className="mb-3 font-display text-2xl font-bold text-[#F5F0E8]">Significance</h2><p className="leading-8 text-[#B7C3D4]">{place.significance}</p></div>
          {place.facts?.length>0&&<div><h2 className="mb-3 font-display text-2xl font-bold text-[#F5F0E8]">Key Facts</h2><ul className="space-y-2">{place.facts.map((f,i)=><li key={i} className="flex items-start gap-2 text-[#B7C3D4]"><Check size={18} className="mt-1 shrink-0 text-[#2D6A4F]"/>{f}</li>)}</ul></div>}
          <div className="rounded-2xl border border-[#C8965A]/30 bg-[#C8965A]/5 p-6"><div className="mb-2 flex items-center gap-2"><Sparkles className="text-[#C8965A]" size={20}/><b className="text-[#E8B97A]">Did You Know?</b></div><p className="leading-7 text-[#B7C3D4]">{place.didYouKnow}</p></div>
          <QuizCard quiz={place.quiz} quizId={place.id} onComplete={completeQuiz}/>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-[#1A3355] bg-[#0A1A30] p-6"><h3 className="mb-4 font-display text-lg font-bold text-[#F5F0E8]">Your Progress</h3><button onClick={()=>togglePlace(place.id)} className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 font-bold transition ${explored?'bg-[#2D6A4F] text-white':'bg-[#C8965A] text-[#050E1D] hover:bg-[#E8B97A]'}`}><Check size={18}/>{explored?'Explored — marked!':'Mark as explored'}</button><p className="mt-3 text-xs text-[#8FA3BF]">Marking places as explored contributes to your passport progress.</p></div>
          {related.length>0&&<div className="rounded-2xl border border-[#1A3355] bg-[#0A1A30] p-6"><h3 className="mb-4 font-display text-lg font-bold text-[#F5F0E8]">Related Places</h3><div className="space-y-3">{related.map(r=><Link key={r.id} to={`/place/${r.id}`} className="flex items-center gap-3 rounded-xl border border-[#1A3355] p-3 transition hover:border-[#C8965A]/40"><MapPin size={16} className="text-[#C8965A]"/><div><b className="text-sm text-[#F5F0E8]">{r.name}</b><p className="text-xs text-[#8FA3BF]">{r.category}</p></div></Link>)}</div></div>}
        </div>
      </div>
    </div><Footer/></main>);
}