import Link from "next/link";
import React from "react";

function BudgetItem({ budget }) {
  const progressPerc = (budget.totalSpend / budget.amount) * 100;

  // Cap percentage at 100 for bar width
  const widthPerc = progressPerc > 100 ? 100 : progressPerc;

  // Change color to red if 90% or more spent
  const progressColor = progressPerc >= 90 ? "bg-red-600" : "bg-primary";

  const remainingAmount = budget.amount - budget.totalSpend;

  return (
    <Link href={"/dashboard/expenses/" + budget?.id}>
      <div
        className="p-5 border rounded-2xl
        hover:shadow-md cursor-pointer h-[170px]"
      >
        <div className="flex gap-2 items-center justify-between">
          <div className="flex gap-2 items-center">
            <h2
              className="text-2xl p-3 px-4
              bg-slate-100 rounded-full"
            >
              {budget?.icon}
            </h2>
            <div>
              <h2 className="font-bold">{budget.name}</h2>
              <h2 className="text-sm text-gray-500">{budget.totalItem} Item</h2>
            </div>
          </div>
          <h2 className="font-bold text-primary text-lg">Rs.{budget.amount}</h2>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs text-slate-400">
              Rs.{budget.totalSpend ? budget.totalSpend : 0} Spend
            </h2>
            <h2 className="text-xs text-slate-400">
              {remainingAmount >= 0
                ? `Rs.${remainingAmount} Remaining`
                : `Rs.${Math.abs(remainingAmount)} Above Budget`}
            </h2>
          </div>
          <div className="w-full bg-slate-300 h-2 rounded-full">
            <div
              className={`${progressColor} h-2 rounded-full`}
              style={{ width: `${widthPerc}%` }}
            ></div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BudgetItem;
