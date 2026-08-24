import { useEffect, useState, useCallback } from 'react';

const KEY='rihla-journey-v2';
const initialState={exploredPlaces:[],exploredEmirates:[],completedQuizzes:[],points:0,badges:[],stamps:[],topicScores:{},crosswordCompleted:[],wordGamesCompleted:[]};

const addPointsToState=(state,amount)=>({...state,points:state.points+amount});

export default function useJourney(){
  const [state,setState]=useState(()=>{try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');return{...initialState,...saved,crosswordCompleted:Array.isArray(saved?.crosswordCompleted)?saved.crosswordCompleted:[],wordGamesCompleted:Array.isArray(saved?.wordGamesCompleted)?saved.wordGamesCompleted:[],topicScores:saved?.topicScores&&typeof saved.topicScores==='object'?saved.topicScores:{}}}catch{return initialState}});
  useEffect(()=>localStorage.setItem(KEY,JSON.stringify(state)),[state]);
  const togglePlace=useCallback((id)=>setState(s=>({...s,exploredPlaces:s.exploredPlaces.includes(id)?s.exploredPlaces.filter(x=>x!==id):[...s.exploredPlaces,id]})),[]);
  const toggleEmirate=useCallback((id)=>setState(s=>({...s,exploredEmirates:s.exploredEmirates.includes(id)?s.exploredEmirates.filter(x=>x!==id):[...s.exploredEmirates,id]})),[]);
  const addPoints=useCallback((amount)=>setState(s=>addPointsToState(s,amount)),[]);
  const completeQuiz=useCallback((id)=>setState(s=>s.completedQuizzes.includes(id)?s:{...s,completedQuizzes:[...s.completedQuizzes,id]}),[]);
  const saveTopicScore=useCallback((topicId,score,total)=>setState(s=>({...s,topicScores:{...s.topicScores,[topicId]:{score,total}}})),[]);
  const completeCrossword=useCallback((id)=>setState(s=>s.crosswordCompleted.includes(id)?s:addPointsToState({...s,crosswordCompleted:[...s.crosswordCompleted,id]},10)),[]);
  const completeWordGame=useCallback((id)=>setState(s=>s.wordGamesCompleted.includes(id)?s:addPointsToState({...s,wordGamesCompleted:[...s.wordGamesCompleted,id]},10)),[]);
  const unlockStamp=useCallback((id)=>setState(s=>s.stamps.includes(id)?s:addPointsToState({...s,stamps:[...s.stamps,id]},50)),[]);
  const addBadge=useCallback((id)=>setState(s=>s.badges.includes(id)?s:addPointsToState({...s,badges:[...s.badges,id]},20)),[]);
  return{...state,togglePlace,toggleEmirate,addPoints,completeQuiz,saveTopicScore,completeCrossword,completeWordGame,unlockStamp,addBadge};
}