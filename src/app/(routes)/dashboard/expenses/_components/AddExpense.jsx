import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { db } from "@/utils/dbConfig";
import { db } from "../../../../../../utils/dbconfig";
// import { Budgets, Expenses } from "@/utils/schema";
import { Budgets, Expenses } from "../../../../../../utils/schema";
import { Loader } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

function AddExpense({ budgetId, user, refreshData }) {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const [loading, setLoading] = useState(false);

  /**
   * Used to Add New Expense
   */
  const addNewExpense = async () => {
    setLoading(true);

    try {
      const result = await db
        .insert(Expenses)
        .values({
          name: name,
          amount: amount,
          budgetId: budgetId,
          // ✅ store full ISO timestamp instead of "DD/MM/YYYY"
          createdAt: new Date().toISOString(),
        })
        .returning({ insertedId: Budgets.id });

      setAmount("");
      setName("");

      if (result) {
        refreshData();
        toast("New Expense Added!");
      }
    } catch (error) {
      console.error("Error adding expense:", error);
      toast("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-5 rounded-2xl">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <Input
          placeholder="e.g. Expense Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <Input
          placeholder="e.g. 1000"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <Button
        disabled={
          !(name && amount && Number(amount) > 0 && Number(amount) <= 100000) ||
          loading
        }
        onClick={addNewExpense}
        className="mt-3 w-full rounded-full"
      >
        {loading ? <Loader className="animate-spin" /> : "Add New Expense"}
      </Button>
    </div>
  );
}

export default AddExpense;
