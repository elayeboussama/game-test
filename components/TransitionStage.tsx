
import React from 'react';

interface TransitionStageProps {
  partnerName: string;
  onProceed: () => void;
}

const TransitionStage: React.FC<TransitionStageProps> = ({ partnerName, onProceed }) => {
  return (
    <div className="text-center p-8 bg-slate-800/40 rounded-3xl border border-slate-700 max-w-md w-full">
      <div className="text-6xl mb-6">🔄</div>
      <h2 className="text-2xl font-bold text-slate-100 mb-4">Switch Players!</h2>
      <p className="text-slate-400 mb-8">
        Hand the device to <span className="text-indigo-400 font-bold underline">{partnerName}</span>. 
        Don't peek at the previous rankings!
      </p>
      <button
        onClick={onProceed}
        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg transform transition active:scale-95"
      >
        I am {partnerName}, Start Ranking
      </button>
    </div>
  );
};

export default TransitionStage;
