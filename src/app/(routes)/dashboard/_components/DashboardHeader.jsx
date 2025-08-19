"use client";
import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { db } from "../../../../../utils/dbconfig";
import { desc, eq, gte } from "drizzle-orm";
import { Budgets, Expenses } from "../../../../../utils/schema";

function DashboardHeader() {
  const { user } = useUser();
  const [expensesList, setExpensesList] = useState([]);

  // Fetch all expenses for the past month for the current user
  const getAllExpenses = async () => {
    if (!user) return;

    try {
      const now = new Date();
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const result = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt,
        })
        .from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(
          eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress),
          gte(Expenses.createdAt, firstDayOfMonth) // only past month
        )
        .orderBy(desc(Expenses.id));

      setExpensesList(result);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  useEffect(() => {
    if (user) getAllExpenses();
  }, [user]);

  // Download CSV
  const downloadExpenseList = () => {
    if (!expensesList.length) {
      alert("No expenses to download for the past month!");
      return;
    }

    const csvHeader = "Name,Amount\n";
    const csvRows = expensesList.map((expense) => `${expense.name},${expense.amount}`);

    // Calculate total
    const total = expensesList.reduce((sum, expense) => sum + Number(expense.amount), 0);
    csvRows.push(`Total,${total}`);

    const csvContent = csvHeader + csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "expenses_past_month.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-5 shadow-sm border-b flex justify-between items-center">
      <div>
        <button
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-blue-600 hidden md:inline-block"
          onClick={downloadExpenseList}
        >
          Download Expenses
        </button>
      </div>
    </div>
  );
}

export default DashboardHeader;
