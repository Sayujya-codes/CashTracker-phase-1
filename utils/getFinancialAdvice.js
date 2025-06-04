const getFinancialAdvice = async (totalBudget, totalIncome, totalSpend) => {
  try {
    const res = await fetch("/api/advice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalBudget, totalIncome, totalSpend }),
    });

    const data = await res.json();
    return {
      advice: data.advice || "No advice received.",
      prediction: data.prediction || "No prediction available.",
    };
  } catch (error) {
    console.error("Frontend fetch error:", error);
    return {
      advice: "Sorry, couldn't fetch advice.",
      prediction: "Sorry, couldn't fetch prediction.",
    };
  }
};

export default getFinancialAdvice;
