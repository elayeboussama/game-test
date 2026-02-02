
import React, { useState } from 'react';
import { PRIORITIES } from '../constants';
import { Priority } from '../types';

interface RankingStageProps {
  playerName: string;
  partnerName: string;
  onComplete: (ranking: string[]) => void;
}

const RankingStage: React.FC<RankingStageProps> = ({ playerName, partnerName, onComplete }) => {
  const [ranking, setRanking] = useState<Priority[]>([...PRIORITIES]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newRanking = [...ranking];
    [newRanking[index - 1], newRanking[index]] = [newRanking[index], newRanking[index - 1]];
    setRanking(newRanking);
  };

  const moveDown = (index: number) => {
    if (index === ranking.length - 1) return;
    const newRanking = [...ranking];
    [newRanking[index + 1], newRanking[index]] = [newRanking[index], newRanking[index + 1]];
    setRanking(newRanking);
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif text-slate-100 italic mb-2">
          {playerName}'s Turn
        </h2>
        <p className="text-slate-400">
          Rank your priorities from top (Highest) to bottom. 
          <span className="block text-xs mt-1 text-slate-500 italic">(Keep this hidden from {partnerName}!)</span>
        </p>
      </div>

      <div className="space-y-3 mb-10">
        {ranking.map((item, index) => (
          <div 
            key={item.id}
            className={`flex items-center gap-4 bg-slate-800/40 p-4 rounded-2xl border ${index === 0 ? 'border-rose-500/50 bg-rose-500/5' : 'border-slate-700'} hover:border-slate-500 transition-colors group`}
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-slate-400">
              {index + 1}
            </div>
            
            <div className="text-2xl mr-2">{item.icon}</div>
            
            <div className="flex-grow">
              <h3 className="font-bold text-slate-100 leading-tight">{item.label}</h3>
              <p className="text-xs text-slate-400">{item.description}</p>
            </div>

            <div className="flex flex-col gap-1">
              <button 
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className={`p-1 rounded bg-slate-900 hover:bg-slate-700 transition disabled:opacity-30`}
                title="Move Up"
              >
                <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                </svg>
              </button>
              <button 
                onClick={() => moveDown(index)}
                disabled={index === ranking.length - 1}
                className={`p-1 rounded bg-slate-900 hover:bg-slate-700 transition disabled:opacity-30`}
                title="Move Down"
              >
                <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => onComplete(ranking.map(r => r.id))}
        className="w-full sticky bottom-8 bg-rose-500 hover:bg-rose-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-rose-900/40 transform transition active:scale-95 z-10"
      >
        I'm Done, Next!
      </button>
    </div>
  );
};

export default RankingStage;
