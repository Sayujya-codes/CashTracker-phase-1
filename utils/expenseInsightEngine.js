function getExpenseInsight(totalBudget, totalIncome, totalSpend) {
  // Basic calculations
  const savings = totalIncome - totalSpend;
  const savingsRate = totalIncome ? (savings / totalIncome) * 100 : 0;
  const expenseToIncomeRatio = totalIncome
    ? (totalSpend / totalIncome) * 100
    : 0;

  // Savings Health evaluation
  let savingsHealth = "";
  if (savingsRate < 10) savingsHealth = "low";
  else if (savingsRate < 20) savingsHealth = "moderate";
  else savingsHealth = "healthy";

  // Budget status evaluation
  let budgetStatus = "";
  if (totalSpend > totalBudget) budgetStatus = "over";
  else if (totalSpend < totalBudget) budgetStatus = "under";
  else budgetStatus = "balanced";

  // Expense to income ratio risk level
  let expenseRisk = "";
  if (expenseToIncomeRatio < 50) expenseRisk = "controlled";
  else if (expenseToIncomeRatio < 75) expenseRisk = "needs watch";
  else expenseRisk = "high risk";

  // Emergency fund suggestion (3x expenses)
  const emergencyFundGoal = totalSpend * 3;

  // Generate advice text based on above evaluations
  const advice = generateAdvancedAdvice(
    savingsHealth,
    budgetStatus,
    expenseRisk,
    emergencyFundGoal
  );

  // Prediction string with savings and savings rate
  const prediction = `Rs. ${savings.toFixed(
    2
  )} (Savings rate: ${savingsRate.toFixed(1)}%)`;

  return {
    advice,
    prediction,
  };
}

function generateAdvancedAdvice(
  savingsHealth,
  budgetStatus,
  expenseRisk,
  emergencyFundGoal
) {
  const suggestions = [];

  // Savings health advice
  if (savingsHealth === "low") {
    suggestions.push(
      "Your savings rate is low. Try to reduce non-essential expenses."
    );
  } else if (savingsHealth === "moderate") {
    suggestions.push(
      "You're saving moderately. Aim to increase your savings rate to at least 20%."
    );
  } else {
    suggestions.push("Great job! You have a healthy savings rate.");
  }

  // Budget status advice
  if (budgetStatus === "over") {
    suggestions.push(
      "You're spending more than your budget. Consider cutting costs."
    );
  } else if (budgetStatus === "under") {
    suggestions.push(
      "You're spending under your budget. Keep up the good discipline!"
    );
  } else {
    suggestions.push("You're right on budget. Maintain this consistency.");
  }

  // Expense-to-income risk advice
  if (expenseRisk === "controlled") {
    suggestions.push(
      "Your expenses are well-controlled relative to your income."
    );
  } else if (expenseRisk === "needs watch") {
    suggestions.push(
      "Your expenses are moderately high compared to your income. Keep an eye on unnecessary spending."
    );
  } else {
    suggestions.push(
      "Your expenses are very high relative to your income. Take urgent steps to reduce spending."
    );
  }

  // Emergency fund advice
  suggestions.push(
    `Based on your current expenses, aim to build an emergency fund of at least Rs. ${emergencyFundGoal.toFixed(
      0
    )} (3 months of expenses).`
  );

  return suggestions.join(" ");
}

export default getExpenseInsight;
