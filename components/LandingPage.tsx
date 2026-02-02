
import React, { useState } from 'react';

interface LandingPageProps {
  onStart: (name1: string, name2: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name1.trim() && name2.trim()) {
      onStart(name1.trim(), name2.trim());
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-lg p-8 rounded-3xl border border-slate-700 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-100 mb-2">Start Your Journey</h2>
        <p className="text-slate-400">Discover how aligned your life visions are.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 block">First Player</label>
          <input
            required
            type="text"
            placeholder="Name"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 block">Second Player</label>
          <input
            required
            type="text"
            placeholder="Name"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-rose-900/20 transform transition active:scale-95"
        >
          Begin Game
        </button>
      </form>
    </div>
  );
};

export default LandingPage;
