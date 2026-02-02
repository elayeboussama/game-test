
import React, { useState } from 'react';
import { encodeGameState, getGameUrl } from '../services/shareService';

interface TransitionStageProps {
  partnerName: string;
  isRemote: boolean;
  p1Name?: string;
  p1Rank?: string[];
  onProceed: () => void;
}

const TransitionStage: React.FC<TransitionStageProps> = ({ partnerName, isRemote, p1Name, p1Rank, onProceed }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const hash = encodeGameState({ p1Name, p1Rank, p2Name: partnerName });
    const url = getGameUrl(hash);
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isRemote) {
    return (
      <div className="text-center p-10 bg-slate-800/40 backdrop-blur-xl rounded-[3rem] border border-slate-700/50 max-w-md w-full shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-indigo-500 opacity-50"></div>
        <div className="text-6xl mb-6">💌</div>
        <h2 className="text-2xl font-bold text-slate-100 mb-4">Invite {partnerName}</h2>
        <p className="text-slate-400 mb-8 text-sm leading-relaxed">
          Your ranking is saved! Copy the link below and send it to your partner to let them take their turn.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={handleCopyLink}
            className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all border ${
              copied 
                ? 'bg-green-500/20 border-green-500 text-green-400' 
                : 'bg-slate-900 hover:bg-slate-950 border-slate-700 text-slate-200'
            }`}
          >
            {copied ? (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Link Copied!
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                Copy Invite Link
              </>
            )}
          </button>
          
          <div className="pt-4 border-t border-slate-700/50">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mb-4">Or stay on this device</p>
            <button
              onClick={onProceed}
              className="text-xs text-rose-400 hover:text-rose-300 font-bold transition flex items-center gap-1 mx-auto"
            >
              Wait, we're sharing a device <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center p-10 bg-slate-800/40 backdrop-blur-xl rounded-[3rem] border border-slate-700/50 max-w-md w-full shadow-2xl">
      <div className="text-6xl mb-6">🔄</div>
      <h2 className="text-2xl font-bold text-slate-100 mb-4">Switch Players!</h2>
      <p className="text-slate-400 mb-8 text-sm">
        Hand the device to <span className="text-indigo-400 font-bold underline">{partnerName}</span>. 
        Don't peek at the previous rankings!
      </p>
      <button
        onClick={onProceed}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-5 rounded-2xl shadow-lg transform transition active:scale-[0.98]"
      >
        I am {partnerName}, Start Ranking
      </button>
    </div>
  );
};

export default TransitionStage;
