"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
// import { db } from "../../../../../utils/dbconfig";
import { db } from "../../../../../utils/dbconfig";
import { Budgets, Expenses } from "../../../../../utils/schema";
import { eq, desc, getTableColumns } from "drizzle-orm";
// import ExpenseListTable from "../_components/ExpenseListTable";
import ExpenseListTable from "../expenses/_components/ExpenseListTable";

function Upgrade() {
  const { user } = useUser();
  const [budgetsWithExpenses, setBudgetsWithExpenses] = useState([]);

  useEffect(() => {
    if (user) fetchBudgetsWithExpenses();
  }, [user]);

  const fetchBudgetsWithExpenses = async () => {
    const budgets = await db
      .select(getTableColumns(Budgets))
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(Budgets.id));

    const budgetsData = await Promise.all(
      budgets.map(async (budget) => {
        const expenses = await db
          .select()
          .from(Expenses)
          .where(eq(Expenses.budgetId, budget.id))
          .orderBy(desc(Expenses.id));
        return { ...budget, expenses };
      })
    );

    setBudgetsWithExpenses(budgetsData);
  };

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">Budget & Expenses Overview</h2>

      {budgetsWithExpenses.length === 0 ? (
        <p className="text-gray-500">No budgets or expenses found.</p>
      ) : (
        budgetsWithExpenses.map((budget) => (
          <div
            key={budget.id}
            className="mb-8 border rounded-xl p-5 shadow-sm bg-white"
          >
            {/* Budget Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {budget.icon} {budget.name}
              </h2>
              <p className="text-lg font-bold text-primary">
                Rs.{budget.amount}
              </p>
            </div>

            {/* Expense List */}
            <ExpenseListTable
              expensesList={budget.expenses}
              refreshData={fetchBudgetsWithExpenses}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default Upgrade;
