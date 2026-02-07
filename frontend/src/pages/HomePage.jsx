import React, { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useProblemStore } from '../store/useProblemStore';

import {useState} from 'react'
function HomePage() {
  const {authUser} = useAuthStore();
  const [activeId,setActiveId] = useState(null);
  const {getRevisionProblem,revisionProblems} = useProblemStore();

  useEffect(()=>{
     getRevisionProblem();
  },[getRevisionProblem])
  
  const handleToggle = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const difficultyColor = {
    easy: "text-green-500",
    medium: "text-yellow-400",
    hard: "text-red-500",
  };
  return (
    <>

      {authUser?(
      <div className='max-w-3xl w-full bg-slate-150 flex flex-col gap-10 p-6 justify-center items-center'>
        {/* title */}
        <div className='bg-slate-950 w-full flex max-w-full px-2 py-3'>
              <h1 className='text-white text-5xl font-bold'>Todays Problems</h1>
        </div>
        

        {/* searchbox */}
       <div className="max-h-[70vh] w-full overflow-y-auto">
        {revisionProblems.map((probs, index) => {
          const isOpen = activeId === probs.problemId._id;

          return (
            <div
              key={probs.problemId._id}
              onClick={() => handleToggle(probs.problemId._id)}
              className={`cursor-pointer transition-all duration-300
                border border-slate-900
                ${index !== 0 ? "-mt-px" : ""}
                ${isOpen ? "bg-slate-700 p-5" : "bg-slate-800 p-3"}
                hover:bg-slate-950
              `}
            >
              <div className="flex justify-between items-center">
                <h1 className="font-bold truncate">
                  {probs.problemId.title}
                </h1>
                <p
                  className={`text-sm ${difficultyColor[
                    probs.problemId.difficulty
                  ]}`}
                >
                  {probs.problemId.difficulty}
                </p>
              </div>

              {isOpen && (
                <div className="mt-4 text-sm space-y-4">
                  <div>
                    <p className="text-xs uppercase opacity-70">
                      Problem Link
                    </p>
                    <a
                      href={probs.problemId.problemLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="underline text-blue-400 break-all"
                    >
                      {probs.problemId.problemLink}
                    </a>
                  </div>

                  <div className="flex justify-between">
                    <span className="opacity-70">Revisions</span>
                    <span>{probs.revisionCount}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="opacity-70">Last Revised</span>
                    <span>
                      {probs.lastRevisedDate
                        ? new Date(
                            probs.lastRevisedDate
                          ).toLocaleDateString()
                        : "Never"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      </div>):(<div>hi</div>)}
    </>
  )
}

export default HomePage