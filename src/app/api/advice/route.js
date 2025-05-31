import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load API key from environment
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  console.log("Gemini API route hit");

  try {
    const { totalBudget, totalIncome, totalSpend } = await req.json();
    console.log({ totalBudget, totalIncome, totalSpend });

    if (!totalBudget || !totalIncome || !totalSpend) {
      return NextResponse.json(
        { error: "Missing financial input data" },
        { status: 400 }
      );
    }

    const userPrompt = `
      Based on the following financial data:
      - Total Budget: ${totalBudget} USD
      - Expenses: ${totalSpend} USD
      - Incomes: ${totalIncome} USD
      Provide detailed financial advice in 2 sentences to help the user manage their finances more effectively.
    `;

    // Use the Gemini-pro model (text-only)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const advice = response.text();

    return NextResponse.json({ advice });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { advice: null, error: "Failed to fetch advice." },
      { status: 500 }
    );
  }
}
