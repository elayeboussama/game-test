
import React from 'react';
import { PlayerData, ComparisonResult, Priority } from '../types';
import { PRIORITIES } from '../constants';

interface ResultsStageProps {
  p1: PlayerData;
  p2: PlayerData;
  result: ComparisonResult;
  onReset: () => void;
}

const ResultsStage: React.FC<ResultsStageProps> = ({ p1, p2, result, onReset }) => {
  const getPriorityById = (id: string): Priority | undefined => PRIORITIES.find(p => p.id === id);

  return (
    <div className="w-full space-y-12 pb-12">
      {/* Hero Result Section */}
      <div className="text-center bg-slate-800/30 p-10 rounded-[3rem] border border-slate-700 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
           <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Synergy Score</span>
        </div>
        
        <div className="relative z-10">
          <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-rose-400 via-rose-500 to-indigo-600 mb-4">
            {result.similarityScore}%
          </div>
          <p className="text-xl text-slate-200 max-w-lg mx-auto leading-relaxed italic font-serif">
            "{result.aiInsight}"
          </p>
        </div>

        {/* Decorative circle */}
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Alignment Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
             <span className="bg-rose-500/20 p-2 rounded-lg">✨</span> Your Shared Heart
          </h3>
          <div className="space-y-2">
            {result.alignedItems.map(id => {
              const p = getPriorityById(id);
              return p ? (
                <div key={id} className="bg-slate-800/50 p-4 rounded-2xl flex items-center gap-4 border border-slate-700/50">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <h4 className="font-semibold text-slate-200">{p.label}</h4>
                    <p className="text-xs text-slate-400">Strongly aligned</p>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>

        {/* Divergence Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-indigo-400 flex items-center gap-2">
             <span className="bg-indigo-500/20 p-2 rounded-lg">🌱</span> Unique Perspectives
          </h3>
          <div className="space-y-2">
            {result.divergedItems.map(id => {
              const p = getPriorityById(id);
              return p ? (
                <div key={id} className="bg-slate-800/50 p-4 rounded-2xl flex items-center gap-4 border border-slate-700/50">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <h4 className="font-semibold text-slate-200">{p.label}</h4>
                    <p className="text-xs text-slate-400">Room for conversation</p>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>

      {/* Discussion Prompts */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-900/20 p-8 rounded-3xl border border-indigo-500/30 shadow-2xl">
        <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
          🗣️ Deep Dive Conversation
        </h3>
        <ul className="space-y-4">
          {result.discussionPrompts.map((prompt, idx) => (
            <li key={idx} className="bg-slate-950/50 p-5 rounded-xl text-slate-300 border-l-4 border-indigo-500 italic">
              "{prompt}"
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <button
          onClick={() => window.print()}
          className="w-full sm:w-auto px-10 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-2xl transition shadow-lg"
        >
          Save our Report
        </button>
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-10 py-4 bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-2xl transition shadow-lg shadow-rose-900/20"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultsStage;
