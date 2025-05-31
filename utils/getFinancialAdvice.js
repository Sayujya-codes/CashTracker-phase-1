const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
  try {
    const res = await fetch("/api/advice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalBudget, totalIncome, totalSpend }),
    });

    const data = await res.json();
    return data.advice || "No advice received.";
  } catch (error) {
    console.error("Frontend fetch error:", error);
    return "Sorry, I couldn't fetch the financial advice at this moment. Please try again later.";
  }
};

export default getFinancialAdvice;
