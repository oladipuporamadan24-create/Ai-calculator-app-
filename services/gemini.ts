import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
// The API key is injected from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const solveMathWithGemini = async (input: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: input,
      config: {
        systemInstruction: `You are an advanced AI Math Tutor and Calculator. 
        Your goal is to solve mathematical problems provided by the user in natural language or mathematical notation.
        
        Rules:
        1. If the user asks to "Solve", "Differentiate", "Integrate", or "Simplify", perform the operation.
        2. Provide the final answer clearly at the beginning, labeled "Answer:".
        3. Follow with a concise "Step-by-step Explanation".
        4. Use Markdown for formatting (bold, code blocks for math).
        5. If the input is conversational (e.g., "Hello"), respond politely but briefly and ask for a math problem.
        6. Be accurate.
        
        Example Response format:
        **Answer:** 42
        
        **Explanation:**
        1. First, we...
        2. Then...
        `,
      },
    });

    return response.text || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error connecting to the AI service. Please check your network or API key.";
  }
};
