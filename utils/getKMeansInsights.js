import kMeans from "./kMeansEngine";

// Define labels based on centroid order (low to high spend)
const labels = ["Good Saver", "On Budget", "High Spender"];

// Predefined advice messages for each cluster
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
  // For clustering, we can use totalSpend as 1D data.
  // If you want, you can add more features as an array per user.

  // Run k-means on a sample set of expenses for demonstration.
  // In real scenario, you'd run k-means on historical expense data of multiple users.
  // Here we mock a sample expense array including current totalSpend for clustering:

  const sampleExpenses = [
    totalSpend,
    totalSpend * 0.5,
    totalSpend * 1.5,
    totalSpend * 0.8,
    totalSpend * 1.2,
    totalSpend * 0.3,
  ];

  // Run kMeans with k=3 clusters
  const { centroids, labels: assignedLabels } = kMeans(sampleExpenses, 3);

  // Sort centroids ascending to assign consistent labels
  const sortedCentroids = centroids
    .map((val, idx) => ({ val, idx }))
    .sort((a, b) => a.val - b.val);

  // Create mapping from cluster index to label (Good Saver, On Budget, High Spender)
  const clusterLabelMap = {};
  clusterLabelMap[sortedCentroids[0].idx] = "Good Saver";
  clusterLabelMap[sortedCentroids[1].idx] = "On Budget";
  clusterLabelMap[sortedCentroids[2].idx] = "High Spender";

  // Find cluster index for current totalSpend
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
