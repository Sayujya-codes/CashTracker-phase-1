import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function BarChartDashboard({ budgetList }) {
  return (
    <div className="border p-5">
      <h2 className="font-bold text-lg">Activity</h2>
      <ResponsiveContainer width={"80%"} height={300}>
        <BarChart
          data={budgetList}
          margin={{
            top: 7,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalSpend" stackId="a">
            {budgetList.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.totalSpend >= entry.amount * 0.9 ? "#FF0000" : "#000000"}
              />
            ))}
          </Bar>
          <Bar dataKey="amount" stackId="a" fill="#808080" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default BarChartDashboard;
