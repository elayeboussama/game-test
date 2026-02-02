
import React, { useState } from 'react';
import { PlayerData, ComparisonResult, Priority } from '../types';
import { PRIORITIES } from '../constants';
import { encodeGameState, getGameUrl } from '../services/shareService';

interface ResultsStageProps {
  p1: PlayerData;
  p2: PlayerData;
  result: ComparisonResult;
  onReset: () => void;
}

const ResultsStage: React.FC<ResultsStageProps> = ({ p1, p2, result, onReset }) => {
  const [copied, setCopied] = useState(false);
  const getPriorityById = (id: string): Priority | undefined => PRIORITIES.find(p => p.id === id);

  const handleShareResult = () => {
    const hash = encodeGameState({ 
      p1Name: p1.name, 
      p1Rank: p1.ranking, 
      p2Name: p2.name, 
      p2Rank: p2.ranking,
      results: result 
    });
    const url = getGameUrl(hash);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-12 pb-12 animate-in fade-in duration-700">
      {/* Hero Result Section */}
      <div className="text-center bg-slate-800/30 backdrop-blur-xl p-10 rounded-[3.5rem] border border-slate-700/50 relative overflow-hidden shadow-inner">
        <div className="absolute top-0 right-0 p-6">
           <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black">Synergy Analysis</span>
        </div>
        
        <div className="relative z-10 py-4">
          <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-rose-400 via-rose-500 to-indigo-600 mb-6 drop-shadow-2xl">
            {result.similarityScore}%
          </div>
          <p className="text-lg md:text-xl text-slate-200 max-w-lg mx-auto leading-relaxed italic font-serif px-4">
            "{result.aiInsight}"
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-rose-500/10 rounded-full blur-[80px]"></div>
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/10 rounded-full blur-[80px]"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Alignment Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-rose-400 uppercase tracking-widest flex items-center gap-3 ml-2">
             <span className="bg-rose-500/20 w-8 h-8 rounded-lg flex items-center justify-center text-lg">✨</span> Shared Vision
          </h3>
          <div className="space-y-3">
            {result.alignedItems.map(id => {
              const p = getPriorityById(id);
              return p ? (
                <div key={id} className="bg-slate-800/40 backdrop-blur-sm p-5 rounded-3xl flex items-center gap-4 border border-slate-700/30 group hover:border-rose-500/30 transition-all">
                  <span className="text-3xl group-hover:scale-110 transition-transform">{p.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-100">{p.label}</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Strongly Aligned</p>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>

        {/* Divergence Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-black text-indigo-400 uppercase tracking-widest flex items-center gap-3 ml-2">
             <span className="bg-indigo-500/20 w-8 h-8 rounded-lg flex items-center justify-center text-lg">🌱</span> Individual Flare
          </h3>
          <div className="space-y-3">
            {result.divergedItems.map(id => {
              const p = getPriorityById(id);
              return p ? (
                <div key={id} className="bg-slate-800/40 backdrop-blur-sm p-5 rounded-3xl flex items-center gap-4 border border-slate-700/30 group hover:border-indigo-500/30 transition-all">
                  <span className="text-3xl group-hover:scale-110 transition-transform">{p.icon}</span>
                  <div>
                    <h4 className="font-bold text-slate-100">{p.label}</h4>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Unique Perspective</p>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>

      {/* Discussion Prompts */}
      <div className="bg-gradient-to-br from-slate-900/80 to-indigo-950/20 p-10 rounded-[3rem] border border-indigo-500/20 shadow-2xl">
        <h3 className="text-xl font-black text-slate-100 mb-8 flex items-center gap-3">
          <span className="text-2xl">🗣️</span> Deep Dive Topics
        </h3>
        <div className="grid gap-6">
          {result.discussionPrompts.map((prompt, idx) => (
            <div key={idx} className="bg-slate-950/40 p-6 rounded-2xl text-slate-300 border-l-4 border-rose-500 italic relative group hover:bg-slate-950/60 transition-all">
               <span className="absolute -top-3 -right-2 text-4xl opacity-5 font-serif text-white">"</span>
              <p className="relative z-10 leading-relaxed text-sm md:text-base">"{prompt}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
        <button
          onClick={handleShareResult}
          className={`w-full sm:w-auto px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 ${
            copied 
              ? 'bg-green-500 text-white' 
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-900/20'
          }`}
        >
          {copied ? (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Result Link Copied!
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              Share Results
            </>
          )}
        </button>
        <button
          onClick={onReset}
          className="w-full sm:w-auto px-10 py-5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-2xl transition border border-slate-700"
        >
          New Game
        </button>
      </div>
    </div>
  );
};

export default ResultsStage;
