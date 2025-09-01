import kMeans from "./kMeansEngine";

const labels = ["Good Saver", "On Budget", "High Spender"];

const adviceMap = {
  "High Spender":
    "You tend to spend more than your budget. Consider cutting down on unnecessary expenses.",
  "On Budget":
    "You are managing your expenses well and staying within budget. Keep it up!",
  "Good Saver":
    "Excellent saving habits! You're spending less and saving more.",
};

const predictionMap = {
  "High Spender": "Warning: Your expenses may exceed your budget next month.",
  "On Budget": "Your spending is stable and predictable.",
  "Good Saver": "You are likely to save more money next month.",
};

function getKMeansInsights(totalBudget, totalIncome, totalSpend) {
  // Create sample expense dataset including variations of totalSpend
  const sampleExpenses = [
    totalSpend,
    totalSpend * 0.5,
    totalSpend * 1.5,
    totalSpend * 0.8,
    totalSpend * 1.2,
    totalSpend * 0.3,
  ];

  // Run k-means with k=3
  const { centroids } = kMeans(sampleExpenses, 3);

  // Sort centroids and map clusters to labels
  const sortedCentroids = centroids
    .map((val, idx) => ({ val, idx }))
    .sort((a, b) => a.val - b.val);

  const clusterLabelMap = {};
  clusterLabelMap[sortedCentroids[0].idx] = "Good Saver";
  clusterLabelMap[sortedCentroids[1].idx] = "On Budget";
  clusterLabelMap[sortedCentroids[2].idx] = "High Spender";

  // Find cluster for current totalSpend
  const distancesToCentroids = centroids.map((c) => Math.abs(totalSpend - c));
  const clusterIndex = distancesToCentroids.indexOf(
    Math.min(...distancesToCentroids)
  );

  const label = clusterLabelMap[clusterIndex] || "Unknown";

  return {
    label,
    advice: adviceMap[label] || "No advice available.",
    prediction: predictionMap[label] || "No prediction available.",
  };
}

export default getKMeansInsights;
