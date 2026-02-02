
import React, { useState } from 'react';

interface LandingPageProps {
  onStart: (name1: string, name2: string, isRemote: boolean) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [isRemote, setIsRemote] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name1.trim() && name2.trim()) {
      onStart(name1.trim(), name2.trim(), isRemote);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-800/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-700/50 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Start Your Journey</h2>
        <p className="text-slate-400 text-sm">Discover how aligned your life visions are.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block ml-1">You</label>
            <input
              required
              type="text"
              placeholder="Your Name"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-rose-500/30 transition-all"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block ml-1">Your Partner</label>
            <input
              required
              type="text"
              placeholder="Partner's Name"
              className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-5 py-4 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-900/40 rounded-2xl border border-slate-700/50">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-slate-200">Play Remotely</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Share link with partner</span>
          </div>
          <button
            type="button"
            onClick={() => setIsRemote(!isRemote)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isRemote ? 'bg-rose-500' : 'bg-slate-700'}`}
          >
            <span
              className={`${isRemote ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-5 rounded-2xl shadow-xl shadow-rose-900/20 transform transition active:scale-[0.98] mt-2"
        >
          Begin Game
        </button>
      </form>
    </div>
  );
};

export default LandingPage;
