import React, { useState, useEffect } from "react";
import { useProblemStore } from "../store/useProblemStore";

function Problem() {
  const [addProblem, setAddProblem] = useState(false);
  const [squery, setSquery] = useState("");
  const { getProblems, problemlist, add } = useProblemStore();

  const [activeId, setActiveId] = useState(null);
  const [query, setQuery] = useState({
    title: "",
    difficulty: "easy",
    problemLink: "",
    topic: "",
  });

  const difficultyColor = {
    easy: "text-green-500",
    medium: "text-yellow-400",
    hard: "text-red-500",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getProblems(squery);
    }, 300);
    return () => clearTimeout(timer);
  }, [squery, getProblems]);

  const handleToggle = (id) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await add(query);

    setQuery({
      title: "",
      difficulty: "easy",
      problemLink: "",
      topic: "",
    });

    setAddProblem(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col p-6">

      {/* Add problem button */}
      <div className="mb-4 flex justify-center">
        <button
          onClick={() => setAddProblem(true)}
          className="btn btn-xl text-white font-bold"
        >
          Add Problem
        </button>
      </div>

      {/* Add problem modal */}
      {addProblem && (
        <div
          className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center"
          onClick={() => setAddProblem(false)}
        >
          <div
            className="relative z-50 bg-slate-600/90 w-full max-w-xl rounded-md"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-6 p-6"
            >
              <div>
                <label className="text-white font-bold">Title</label>
                <input
                  value={query.title}
                  onChange={(e) =>
                    setQuery({ ...query, title: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 rounded bg-slate-900 text-white"
                  placeholder="e.g. Two Sum"
                />
              </div>

              <div>
                <label className="text-white font-bold">Difficulty</label>
                <select
                  value={query.difficulty}
                  onChange={(e) =>
                    setQuery({ ...query, difficulty: e.target.value })
                  }
                  className={`w-full mt-1 px-3 py-2 rounded bg-slate-900
                    ${difficultyColor[query.difficulty]}`}
                >
                  <option value="easy" className="text-green-500">easy</option>
                  <option value="medium" className="text-yellow-400">medium</option>
                  <option value="hard" className="text-red-500">hard</option>
                </select>
              </div>

              <div>
                <label className="text-white font-bold">Problem Link</label>
                <input
                  value={query.problemLink}
                  onChange={(e) =>
                    setQuery({ ...query, problemLink: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 rounded bg-slate-900 text-white"
                  placeholder="leetcode.com/problems/..."
                />
              </div>

              <div>
                <label className="text-white font-bold">Topic</label>
                <input
                  value={query.topic}
                  onChange={(e) =>
                    setQuery({ ...query, topic: e.target.value })
                  }
                  className="w-full mt-1 px-3 py-2 rounded bg-slate-900 text-white"
                  placeholder="Array, DP, Graph..."
                />
              </div>

              <button
                type="submit"
                className="btn mx-auto hover:bg-purple-500 hover:text-black"
              >
                Add Problem
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Search */}
      <input
        value={squery}
        onChange={(e) => setSquery(e.target.value)}
        className="px-3 py-2 rounded-md bg-slate-850 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Search problems"
      />

      {/* Scrollable list */}
      <div className="max-h-[70vh] overflow-y-auto">
        {problemlist.map((probs, index) => {
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
    </div>
  );
}

export default Problem;
