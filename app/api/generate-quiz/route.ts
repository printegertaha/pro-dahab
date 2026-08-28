import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const quizSchema = {
  type: "object",
  properties: {
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          options: {
            type: "array",
            items: { type: "string" },
          },
          correctAnswer: { type: "integer" },
          explanation: { type: "string" },
        },
        required: ["question", "options", "correctAnswer", "explanation"],
      },
    },
  },
  required: ["questions"],
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { topic, difficulty = "medium", questionCount = 5, previousQuestions = [] } = body;

    if (!topic?.trim()) {
      return Response.json({ error: "اكتب موضوع الأول" }, { status: 400 });
    }

    const previousText =
      previousQuestions.length > 0
        ? `Avoid these previous questions:\n${previousQuestions.slice(-10).map((q: string) => `- ${q}`).join("\n")}`
        : "";

    const prompt = `Generate ${questionCount} MCQs about "${topic}". Difficulty: ${difficulty}. 
    Rules: 4 options, exact 1 correct index (0-3), brief explanation.
    ${previousText}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: quizSchema,
        temperature: 0.3,
        maxOutputTokens: 8192, // رفعنا الحد الأقصى عشان الـ JSON مايتقطعش أبداً
      },
    });

    if (!response.text) {
      throw new Error("No response text returned from AI");
    }

    // تنظيف نص الـ JSON لو فيه أي وايت سبيس زيادة
    const rawText = response.text.trim();
    const result = JSON.parse(rawText);

    if (!result.questions?.length) {
      throw new Error("No questions generated");
    }

    return Response.json(result);
  } catch (error: any) {
    console.error("API Error Details:", error);

    return Response.json(
      {
        error: error?.message || "حصل خطأ أثناء توليد الأسئلة",
      },
      { status: 500 },
    );
  }
}