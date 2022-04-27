import { useState } from 'react';
import { useEffect } from 'react';

export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    // console.log(history);
    if (!replace) {
      return setHistory((prev) => [...prev, mode]);
    } 
    setHistory(prev => {
      return [...prev.slice(0, -1), mode];
    })  
  }
  
  useEffect(() => {
    console.log(history);
  }, [history])


  function back() {
    if (history.length === 1) {
      return history;
    }

    setHistory(prev => {
      return [...prev.slice(0, -1)]
    })
  }

  return { 
    mode: history[history.length-1],
    transition,
    back 
  };
  
}

