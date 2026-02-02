
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-500 drop-shadow-sm mb-2">
        Priority Pulse
      </h1>
      <div className="h-1 w-20 bg-rose-500 mx-auto rounded-full opacity-50 mb-4"></div>
      <p className="text-slate-400 uppercase tracking-widest text-xs font-semibold">
        The Alignment Game for Couples
      </p>
    </header>
  );
};

export default Header;
