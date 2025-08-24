import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  console.log("Gemini API route hit");

  try {
    const { totalBudget, totalIncome, totalSpend } = await req.json();
    // console.log({ totalBudget, totalIncome, totalSpend });

    if (!totalBudget || !totalIncome || !totalSpend) {
      return NextResponse.json(
        { error: "Missing financial input data" },
        { status: 400 }
      );
    }

    const userPrompt = `
      Based on the following financial data:
      - Total Budget: Rs.${totalBudget}
      - Expenses: Rs.${totalSpend}
      - Incomes: Rs.${totalIncome}

      Provide clear and practical financial advice in simple language to help the user manage their finances better in brief.
      Then, estimate the user's potential monthly savings assuming this income and expense pattern continues. 
      Start this part with "Predicted Savings:" 
      followed by a short explanation of how this prediction was made.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const fullText = response.text();

    const predictionMatch = fullText.match(/Predicted Savings:\s*([^\n\r]*)/i);
    const prediction = predictionMatch
      ? predictionMatch[1].trim()
      : "Not available";
    const advice = fullText.replace(/Predicted Savings:.*$/is, "").trim();

    return NextResponse.json({ advice, prediction });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { advice: null, prediction: null, error: "Failed to fetch data." },
      { status: 500 }
    );
  }
}
