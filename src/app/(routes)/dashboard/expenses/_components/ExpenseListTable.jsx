import { Button } from "@/components/ui/button";
import { db } from "../../../../../../utils/dbconfig";
import { Expenses } from "../../../../../../utils/schema";
import { eq, and, gte } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const MS_24H = 24 * 60 * 60 * 1000;

// Safely coerce various createdAt shapes → Date
function toDate(raw) {
  if (!raw) return null;

  // Already a Date?
  if (raw instanceof Date) return raw;

  // Drizzle/SQL may return string/number
  if (typeof raw === "number") {
    // If in seconds, upscale to ms
    return new Date(raw < 1e12 ? raw * 1000 : raw);
  }

  if (typeof raw === "string") {
    // Numeric string?
    const asNum = Number(raw);
    if (!Number.isNaN(asNum)) {
      return new Date(asNum < 1e12 ? asNum * 1000 : asNum);
    }

    // ISO or browser-parseable?
    const iso = new Date(raw);
    if (!Number.isNaN(iso.getTime())) return iso;

    // dd-mm-yyyy or dd/mm/yyyy
    const m = raw.match(/^(\d{2})[\/\-](\d{2})[\/\-](\d{4})$/);
    if (m) {
      const [, dd, mm, yyyy] = m;
      return new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    }

    // yyyy-mm-dd (date-only) → treat as midnight local
    const ymd = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (ymd) {
      const [, y, m2, d2] = ymd;
      return new Date(Number(y), Number(m2) - 1, Number(d2));
    }
  }

  return null;
}

function getCreatedDate(expense) {
  // Try common field names
  const raw =
    expense.createdAt ??
    expense.created_at ??
    expense.createdat ??
    expense.date ??
    expense.createdOn ??
    expense.created_on;

  return toDate(raw);
}

function ExpenseListTable({ expensesList, refreshData }) {
  const isDeletable = (expense) => {
    const created = getCreatedDate(expense);
    if (!created) {
      // If we cannot parse, don't block the user.
      console.warn("Unparseable createdAt; allowing delete for:", expense);
      return true;
    }
    const ageMs = Date.now() - created.getTime();

    // Allow small negative ages (server/client clock skew up to 5 minutes)
    if (ageMs < -5 * 60 * 1000) return true;

    return ageMs <= MS_24H;
  };

  const deleteExpense = async (expense) => {
    // Client-side guard (in case UI is stale)
    if (!isDeletable(expense)) {
      toast("Deletion window (24h) has expired.");
      return;
    }

    await db.delete(Expenses).where(eq(Expenses.id, expense.id));
    toast("Expense Deleted!");
    refreshData();
  };

  if (!expensesList || expensesList.length === 0)
    return <p className="text-sm text-gray-500 mt-2">No expenses yet</p>;

  return (
    <div className="mt-3 border rounded-xl overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-4 bg-slate-200 p-2 font-bold">
        <span>Name</span>
        <span>Amount</span>
        <span>Date</span>
        <span>Action</span>
      </div>

      {/* Expense Rows */}
      {expensesList.map((expense) => (
        <div
          key={expense.id}
          className="grid grid-cols-4 bg-slate-50 p-2 border-t items-center"
        >
          <span>{expense.name}</span>
          <span>Rs.{expense.amount}</span>
          <span>{String(expense.createdAt ?? expense.created_at)}</span>
          <span>
            {isDeletable(expense) ? (
              <span
                className="text-red-500 cursor-pointer"
                onClick={() => deleteExpense(expense)}
              >
                <Trash className="inline w-4" /> Delete
              </span>
            ) : (
              <span className="text-gray-500 font-medium">
                <Button
                  variant="destructive"
                  className="flex items-center gap-1 bg-transparent text-gray-500 hover:text-gray-700 shadow-none"
                  disabled={!isDeletable(expense)}
                >
                  <Trash /> Delete
                </Button>
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}

export default ExpenseListTable;
