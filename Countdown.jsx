import { useState, useEffect } from 'react';
export default function Countdown({festival}){
  const [now,setNow]=useState(new Date());
  useEffect(()=>{const t=setInterval(()=>setNow(new Date()),1000);return()=>clearInterval(t);},[]);
  if(!festival||festival.type==='variable') return <span className="text-xs text-[#8FA3BF]">Dates subject to lunar calendar confirmation</span>;
  const target=new Date(now.getFullYear(),festival.date.month-1,festival.date.day);
  if(target<now) target.setFullYear(now.getFullYear()+1);
  const diff=target-now;
  if(diff<0) return <span className="text-xs text-[#8FA3BF]">Celebrated on {festival.date.day}/{festival.date.month}</span>;
  const days=Math.floor(diff/86400000);
  const hours=Math.floor((diff%86400000)/3600000);
  const mins=Math.floor((diff%3600000)/60000);
  const secs=Math.floor((diff%60000)/1000);
  const isToday=days===0&&hours===0&&mins===0;
  if(isToday) return <span className="text-xs font-bold text-[#E8B97A]">🎉 Celebrating today!</span>;
  return (
    <div className="flex gap-2">
      {[['Days',days],['Hrs',hours],['Min',mins],['Sec',secs]].map(([label,val])=>(
        <div key={label} className="rounded-lg bg-[#050E1D] px-2 py-1 text-center"><b className="font-display text-lg text-[#E8B97A]">{String(val).padStart(2,'0')}</b><p className="text-[10px] text-[#8FA3BF]">{label}</p></div>
      ))}
    </div>
  );
}