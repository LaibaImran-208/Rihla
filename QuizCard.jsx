import { useState } from 'react';
import { Check, X, Lightbulb } from 'lucide-react';
export default function QuizCard({quiz,quizId,onComplete}){
  const [selected,setSelected]=useState(null);
  const [answered,setAnswered]=useState(false);
  if(!quiz) return null;
  const correct=selected===quiz.correct;
  const handleSelect=(i)=>{
    if(answered) return;
    setSelected(i);
    setAnswered(true);
    if(onComplete) onComplete(quizId,i===quiz.correct);
  };
  return (
    <div className="rounded-2xl border border-[#1A3355] bg-[#0A1A30] p-6">
      <div className="mb-4 flex items-center gap-2"><Lightbulb className="text-[#C8965A]" size={20}/><h4 className="font-display text-lg font-bold text-[#F5F0E8]">Test Your Knowledge</h4></div>
      <p className="mb-4 text-sm text-[#B7C3D4]">{quiz.question}</p>
      <div className="space-y-2">{quiz.options.map((opt,i)=>{
        const isCorrect=answered&&i===quiz.correct;
        const isWrong=answered&&i===selected&&i!==quiz.correct;
        return <button key={i} onClick={()=>handleSelect(i)} disabled={answered} className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition ${isCorrect?'border-[#2D6A4F] bg-[#2D6A4F]/20 text-[#F5F0E8]':isWrong?'border-[#C0392B] bg-[#C0392B]/20 text-[#F5F0E8]':answered?'border-[#1A3355] bg-[#071426] text-[#8FA3BF]':'border-[#1A3355] bg-[#071426] text-[#B7C3D4] hover:border-[#C8965A]/40'} ${!answered&&!isCorrect&&!isWrong&&'cursor-pointer'}`}>
          <span>{opt}</span>{isCorrect&&<Check className="text-[#2D6A4F]" size={18}/>}{isWrong&&<X className="text-[#C0392B]" size={18}/>}
        </button>;
      })}</div>
      {answered&&<div className={`mt-4 rounded-xl p-4 text-sm ${correct?'bg-[#2D6A4F]/15 text-[#B7C3D4]':'bg-[#C0392B]/15 text-[#B7C3D4]'}`}><b className={correct?'text-[#2D6A4F]':'text-[#C0392B]'}>{correct?'Correct! ':'Not quite. '}</b>{quiz.explanation}</div>}
    </div>
  );
}