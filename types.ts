
export interface Priority {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface PlayerData {
  name: string;
  ranking: string[];
}

export enum GameStage {
  LANDING = 'LANDING',
  PLAYER1_INPUT = 'PLAYER1_INPUT',
  TRANSITION = 'TRANSITION',
  PLAYER2_INPUT = 'PLAYER2_INPUT',
  CALCULATING = 'CALCULATING',
  RESULTS = 'RESULTS'
}

export interface ComparisonResult {
  similarityScore: number;
  aiInsight: string;
  alignedItems: string[];
  divergedItems: string[];
  discussionPrompts: string[];
}
