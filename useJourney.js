import { useEffect, useState, useCallback } from 'react';

const KEY='rihla-journey-v2';
const initialState={exploredPlaces:[],exploredEmirates:[],completedQuizzes:[],points:0,badges:[],stamps:[]};

export default function useJourney(){
  const [state,setState]=useState(()=>{try{return{...initialState,...JSON.parse(localStorage.getItem(KEY))}}catch{return initialState}});
  useEffect(()=>localStorage.setItem(KEY,JSON.stringify(state)),[state]);
  const togglePlace=useCallback((id)=>setState(s=>({...s,exploredPlaces:s.exploredPlaces.includes(id)?s.exploredPlaces.filter(x=>x!==id):[...s.exploredPlaces,id]})),[]);
  const toggleEmirate=useCallback((id)=>setState(s=>({...s,exploredEmirates:s.exploredEmirates.includes(id)?s.exploredEmirates.filter(x=>x!==id):[...s.exploredEmirates,id]})),[]);
  const completeQuiz=useCallback((id,correct)=>setState(s=>s.completedQuizzes.includes(id)?s:{...s,completedQuizzes:[...s.completedQuizzes,id],points:s.points+(correct?10:2)}),[]);
  const unlockStamp=useCallback((id)=>setState(s=>s.stamps.includes(id)?s:{...s,stamps:[...s.stamps,id],points:s.points+50}),[]);
  const addBadge=useCallback((id)=>setState(s=>s.badges.includes(id)?s:{...s,badges:[...s.badges,id],points:s.points+20}),[]);
  return{...state,togglePlace,toggleEmirate,completeQuiz,unlockStamp,addBadge};
}