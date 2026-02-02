
import { Priority } from './types';

export const PRIORITIES: Priority[] = [
  { id: 'career', label: 'Career Growth', description: 'Professional success and ambition.', icon: '💼' },
  { id: 'family', label: 'Family & Roots', description: 'Building a home and nurturing relatives.', icon: '🏠' },
  { id: 'intimacy', label: 'Intimacy', description: 'Emotional and physical connection.', icon: '❤️' },
  { id: 'finance', label: 'Financial Security', description: 'Saving, investing, and wealth building.', icon: '💰' },
  { id: 'adventure', label: 'Adventure', description: 'Travel, exploration, and new experiences.', icon: '🌍' },
  { id: 'health', label: 'Wellness', description: 'Physical fitness and mental health.', icon: '🧘' },
  { id: 'social', label: 'Social Circle', description: 'Friends, community, and networking.', icon: '🤝' },
  { id: 'learning', label: 'Personal Growth', description: 'Continuous learning and self-improvement.', icon: '📚' },
  { id: 'spirituality', label: 'Spirituality', description: 'Inner peace and philosophical grounding.', icon: '✨' },
  { id: 'legacy', label: 'Legacy', description: 'Making an impact that outlasts us.', icon: '🏆' },
];

export const INITIAL_AI_PROMPT = `
Analyze the priority rankings of two individuals in a relationship.
Player 1: [P1_RANK]
Player 2: [P2_RANK]

Provide a relationship synergy report in JSON format:
{
  "similarityScore": (0-100),
  "aiInsight": "A thoughtful 3-sentence summary of their alignment.",
  "alignedItems": ["list of ids that are ranked closely"],
  "divergedItems": ["list of ids that have large rank gaps"],
  "discussionPrompts": ["3 questions to spark deep conversation based on their differences"]
}
`;
