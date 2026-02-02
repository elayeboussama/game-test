
import React, { useState, useEffect } from 'react';
import { GameStage, PlayerData, ComparisonResult } from './types';
import LandingPage from './components/LandingPage';
import RankingStage from './components/RankingStage';
import ResultsStage from './components/ResultsStage';
import TransitionStage from './components/TransitionStage';
import Header from './components/Header';
import { analyzeRelationshipPriorities } from './services/geminiService';
import { decodeGameState } from './services/shareService';

const App: React.FC = () => {
  const [stage, setStage] = useState<GameStage>(GameStage.LANDING);
  const [p1, setP1] = useState<PlayerData>({ name: '', ranking: [] });
  const [p2, setP2] = useState<PlayerData>({ name: '', ranking: [] });
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [isRemote, setIsRemote] = useState(false);

  // Hydrate session from URL if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionHash = params.get('session');
    
    if (sessionHash) {
      const data = decodeGameState(sessionHash);
      if (data) {
        if (data.results) {
          // It's a completed results link
          setP1({ name: data.p1Name, ranking: data.p1Rank });
          setP2({ name: data.p2Name, ranking: data.p2Rank });
          setResult(data.results);
          setStage(GameStage.RESULTS);
          setIsRemote(true);
        } else if (data.p1Rank) {
          // It's an invitation to play
          setP1({ name: data.p1Name, ranking: data.p1Rank });
          setP2(prev => ({ ...prev, name: data.p2Name }));
          setStage(GameStage.PLAYER2_INPUT);
          setIsRemote(true);
        }
      }
    }
  }, []);

  const startLevel1 = (name1: string, name2: string, remote: boolean) => {
    setP1(prev => ({ ...prev, name: name1 }));
    setP2(prev => ({ ...prev, name: name2 }));
    setIsRemote(remote);
    setStage(GameStage.PLAYER1_INPUT);
  };

  const handleP1Complete = (ranking: string[]) => {
    setP1(prev => ({ ...prev, ranking }));
    setStage(GameStage.TRANSITION);
  };

  const handleP2Complete = async (ranking: string[]) => {
    setP2(prev => ({ ...prev, ranking }));
    setStage(GameStage.CALCULATING);
    
    const analysis = await analyzeRelationshipPriorities(p1.name, p1.ranking, p2.name, ranking);
    setResult(analysis);
    setStage(GameStage.RESULTS);
  };

  const resetGame = () => {
    window.history.pushState({}, '', window.location.pathname);
    setStage(GameStage.LANDING);
    setP1({ name: '', ranking: [] });
    setP2({ name: '', ranking: [] });
    setResult(null);
    setIsRemote(false);
  };

  return (
    <div className="max-w-4xl mx-auto min-h-screen px-4 py-8 flex flex-col">
      <Header />
      
      <main className="flex-grow flex flex-col justify-center items-center mt-12 w-full">
        {stage === GameStage.LANDING && (
          <LandingPage onStart={startLevel1} />
        )}

        {stage === GameStage.PLAYER1_INPUT && (
          <RankingStage 
            playerName={p1.name} 
            onComplete={handleP1Complete} 
            partnerName={p2.name}
          />
        )}

        {stage === GameStage.TRANSITION && (
          <TransitionStage 
            isRemote={isRemote}
            p1Name={p1.name}
            p1Rank={p1.ranking}
            partnerName={p2.name} 
            onProceed={() => setStage(GameStage.PLAYER2_INPUT)} 
          />
        )}

        {stage === GameStage.PLAYER2_INPUT && (
          <RankingStage 
            playerName={p2.name} 
            onComplete={handleP2Complete} 
            partnerName={p1.name}
          />
        )}

        {stage === GameStage.CALCULATING && (
          <div className="text-center space-y-6 animate-pulse">
            <h2 className="text-3xl font-serif text-rose-300 italic">Syncing your hearts...</h2>
            <div className="w-24 h-24 border-t-4 border-rose-500 border-solid rounded-full animate-spin mx-auto"></div>
            <p className="text-slate-400">Gemini AI is analyzing your priorities for deep relationship insights.</p>
          </div>
        )}

        {stage === GameStage.RESULTS && result && (
          <ResultsStage 
            p1={p1} 
            p2={p2} 
            result={result} 
            onReset={resetGame} 
          />
        )}
      </main>
      
      <footer className="mt-auto pt-8 text-center text-slate-500 text-xs uppercase tracking-widest font-medium opacity-60">
        Designed for connections that matter. Powered by Gemini.
      </footer>
    </div>
  );
};

export default App;
