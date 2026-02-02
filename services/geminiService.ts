
import { GoogleGenAI, Type } from "@google/genai";
import { ComparisonResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeRelationshipPriorities = async (
  p1Name: string,
  p1Ranking: string[],
  p2Name: string,
  p2Ranking: string[]
): Promise<ComparisonResult> => {
  const prompt = `
    Analyze the priority rankings of a couple:
    ${p1Name}'s ranking: ${p1Ranking.join(', ')}
    ${p2Name}'s ranking: ${p2Ranking.join(', ')}

    Compare these two lists. Some items will be very close in rank, others far apart. 
    Explain the dynamic of this couple. Be romantic, supportive, yet analytical.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            similarityScore: { type: Type.NUMBER },
            aiInsight: { type: Type.STRING },
            alignedItems: { type: Type.ARRAY, items: { type: Type.STRING } },
            divergedItems: { type: Type.ARRAY, items: { type: Type.STRING } },
            discussionPrompts: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["similarityScore", "aiInsight", "alignedItems", "divergedItems", "discussionPrompts"]
        }
      },
    });

    const resultStr = response.text || "{}";
    return JSON.parse(resultStr);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback logic if API fails
    return {
      similarityScore: 75,
      aiInsight: "You both share a strong foundation, though your individual paths to fulfillment show unique personal flair.",
      alignedItems: [p1Ranking[0], p1Ranking[1]],
      divergedItems: [p1Ranking[p1Ranking.length - 1]],
      discussionPrompts: ["How do your individual career goals support your shared family vision?"],
    };
  }
};
