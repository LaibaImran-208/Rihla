import { Link } from 'react-router-dom';
import { Award, Star, MapPin, Brain, Stamp } from 'lucide-react';
import Navbar from '@/components/rihla/Navbar';
import Footer from '@/components/rihla/Footer';
import PassportBook from '@/components/rihla/PassportBook';
import useJourney from '@/hooks/useJourney';
export default function DigitalPassport(){
  const { exploredPlaces, stamps, points, completedQuizzes } = useJourney();
  const completed=stamps.length===7;
  return (<main className="min-h-screen bg-[#050E1D]"><Navbar/>
    <section className="px-5 pb-12 pt-36 text-center"><span className="rihla-kicker">Your journey, your achievement</span><h1 className="font-display text-5xl font-bold text-[#F5F0E8] sm:text-6xl">Digital <span className="text-[#C8965A]">Passport</span></h1><p className="rihla-subtitle">Every emirate you explore adds a stamp to your passport. Your progress is saved automatically on this device.</p></section>
    <section className="mx-auto max-w-4xl px-5 pb-20"><PassportBook/>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">{[['⭐',points,'Points'],['📍',exploredPlaces.length,'Places'],['🧠',completedQuizzes.length,'Quizzes'],['🛂',`${stamps.length}/7`,'Stamps']].map(([icon,val,label])=><div key={label} className="rounded-2xl border border-[#1A3355] bg-[#0A1A30] p-5 text-center"><div className="text-2xl">{icon}</div><b className="font-display text-2xl text-[#E8B97A]">{val}</b><p className="text-xs uppercase tracking-wider text-[#8FA3BF]">{label}</p></div>)}</div>
      <div className="mt-8 rounded-[2rem] border border-[#1A3355] bg-[#0A1A30] p-7 text-center"><Award className="mx-auto text-[#C8965A]" size={42}/><h2 className="mt-4 font-display text-2xl font-bold text-[#F5F0E8]">{completed?'National Identity Explorer Award':'Continue Exploring to Earn Certificate'}</h2><p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#8FA3BF]">{completed?'You completed all seven Emirates. Print your official Rihla achievement certificate.':`Explore places, complete quizzes, and unlock emirate stamps to earn your certificate.`}</p><div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">{completed?<button onClick={()=>window.print()} className="rihla-primary">Print Certificate</button>:<Link to="/emirates-explorer" className="rihla-primary">Continue Exploring</Link>}</div></div>
    </section><Footer/></main>);
}