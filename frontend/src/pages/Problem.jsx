import React, { useState } from 'react'
import { useEffect } from 'react'
import { useProblemStore } from '../store/useProblemStore';
function Problem() {
  const [squery,setSquery] = useState("");
  
  const {getProblems,problemlist} = useProblemStore();

  useEffect(()=>{
     const timer = setTimeout(()=>{
         getProblems(squery);
     },300)

     return ()=>(clearTimeout(timer));
  },[squery,getProblems])

  return (
    <> 
      <div className='w-full max-w-4xl mx-auto flex flex-col p-6 gap-10'>
        <div>
          <input type="text" value={squery} onChange={(e)=>{setSquery(e.target.value)}} className='px-2 py-2 rounded-md bg-slate-850 text-white focus:outline-none focus:ring-2 focus:ring-purple-500' placeholder='search problems' />
        </div>
        <div>
          {
            problemlist.map((probs,idx) => (
              <div key={idx}>
                <div className='flex w-full rounded-md bg-slate-800 gap-6 px-2 py-3 justify-between items-center border border-slate-900 hover:bg-purple-300 hover:text-black'>
                    <h1 className='truncate font-bold'>{probs.problemId.title}</h1>
                    <p className='text-slate-300'>{probs.problemId.difficulty}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default Problem