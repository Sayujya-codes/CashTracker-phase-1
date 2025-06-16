import formatNumber from "../../../../../utils";
import getFinancialAdvice from "../../../../../utils/getFinancialAdvice";
import getAlgorithmicInsights from "../../../../../utils/expenseInsightEngine";
import getKMeansInsights from "../../../../../utils/getKMeansInsights";
import React, { useEffect, useState } from "react";

function CardInfo({ budgetList, incomeList }) {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  const [financialAdvice, setFinancialAdvice] = useState("");
  const [prediction, setPrediction] = useState("");

  const [algoAdvice, setAlgoAdvice] = useState("");
  const [algoPrediction, setAlgoPrediction] = useState("");

  // K-Means state
  const [kMeansLabel, setKMeansLabel] = useState("");
  const [kMeansAdvice, setKMeansAdvice] = useState("");
  const [kMeansPrediction, setKMeansPrediction] = useState("");

  useEffect(() => {
    if (budgetList.length > 0 || incomeList.length > 0) {
      CalculateCardInfo();
    }
  }, [budgetList, incomeList]);

  useEffect(() => {
    if (totalBudget > 0 || totalIncome > 0 || totalSpend > 0) {
      const fetchAIAdvice = async () => {
        const { advice, prediction } = await getFinancialAdvice(
          totalBudget,
          totalIncome,
          totalSpend
        );
        setFinancialAdvice(advice);
        setPrediction(prediction);
      };

      const fetchAlgoAdvice = () => {
        const { advice, prediction } = getAlgorithmicInsights(
          totalBudget,
          totalIncome,
          totalSpend
        );
        setAlgoAdvice(advice);
        setAlgoPrediction(prediction);
      };

      const fetchKMeansAdvice = () => {
        const { label, advice, prediction } = getKMeansInsights(
          totalBudget,
          totalIncome,
          totalSpend
        );
        setKMeansLabel(label);
        setKMeansAdvice(advice);
        setKMeansPrediction(prediction);
      };

      fetchAIAdvice();
      fetchAlgoAdvice();
      fetchKMeansAdvice();
    }
  }, [totalBudget, totalIncome, totalSpend]);

  const CalculateCardInfo = () => {
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    let totalIncome_ = 0;

    budgetList.forEach((element) => {
      totalBudget_ += Number(element.amount);
      totalSpend_ += element.totalSpend;
    });

    incomeList.forEach((element) => {
      totalIncome_ += element.totalAmount;
    });

    setTotalIncome(totalIncome_);
    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
  };

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div>
          {/* AI Insights */}
          <div className="p-7 border mt-4 mb-6 rounded-2xl space-y-4 shadow-md bg-white">
            <h2 className="text-xl font-bold text-red-600 mb-2">AI Insights</h2>

            <div>
              <h3 className="text-lg font-semibold text-red-500">
                What AI Says
              </h3>
              <p className="font-light text-md">
                {financialAdvice || "Loading financial advice..."}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-green-600">
                What AI Predicts
              </h3>
              <p className="font-light text-md">
                {prediction || "Loading prediction..."}
              </p>
            </div>
          </div>

          {/* Algorithmic Insights */}
          <div className="p-7 border mb-10 rounded-2xl space-y-4 shadow-md bg-white">
            <h2 className="text-xl font-bold text-blue-600 mb-2">
              Algorithmic Insights
            </h2>

            <div>
              <h3 className="text-lg font-semibold text-blue-500">
                What Algorithm Says
              </h3>
              <p className="font-light text-md">{algoAdvice}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-purple-500">
                Predicted by Algorithm
              </h3>
              <p className="font-light text-md">{algoPrediction}</p>
            </div>
          </div>

          {/* K-Means Insights */}
          <div className="p-7 border mb-10 rounded-2xl space-y-4 shadow-md bg-white">
            <h2
              className={`text-xl font-bold mb-2 ${
                kMeansLabel === "High Spender"
                  ? "text-red-600"
                  : kMeansLabel === "On Budget"
                  ? "text-yellow-600"
                  : "text-green-600"
              }`}
            >
              K-Means Insights - {kMeansLabel || "Loading..."}
            </h2>

            <div>
              <h3 className="text-lg font-semibold">What K-Means Says</h3>
              <p className="font-light text-md">
                {kMeansAdvice || "Loading advice..."}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Prediction</h3>
              <p className="font-light text-md">
                {kMeansPrediction || "Loading prediction..."}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Total Budget</h2>
                <h2 className="font-bold text-2xl">
                  <span className="text-red-300">Rs </span>
                  {formatNumber(totalBudget)}
                </h2>
              </div>
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Total Spend</h2>
                <h2 className="font-bold text-2xl">
                  <span className="text-red-300">Rs </span>
                  {formatNumber(totalSpend)}
                </h2>
              </div>
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">No. Of Budget</h2>
                <h2 className="font-bold text-2xl">{budgetList?.length}</h2>
              </div>
            </div>
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Sum of Income Streams</h2>
                <h2 className="font-bold text-2xl">
                  <span className="text-red-300">Rs </span>
                  {formatNumber(totalIncome)}
                </h2>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((item, index) => (
            <div
              className="h-[110px] w-full bg-slate-200 animate-pulse rounded-lg"
              key={index}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CardInfo;
