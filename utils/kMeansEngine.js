// K-Means clustering for 1D data with K-Means++ initialization
function kMeans(expenses, k = 3, maxIterations = 100) {
  if (!expenses.length) return [];

  // --- K-Means++ Initialization ---
  let centroids = [];
  // Pick first centroid randomly
  centroids.push(expenses[Math.floor(Math.random() * expenses.length)]);

  while (centroids.length < k) {
    // Calculate distance of each point to nearest existing centroid
    let distances = expenses.map((exp) => {
      return Math.min(...centroids.map((c) => Math.abs(exp - c)));
    });

    // Weighted random selection based on distance
    let sum = distances.reduce((a, b) => a + b, 0);
    let r = Math.random() * sum;
    let cumulative = 0;
    for (let i = 0; i < expenses.length; i++) {
      cumulative += distances[i];
      if (cumulative >= r) {
        centroids.push(expenses[i]);
        break;
      }
    }
  }

  let clusters = new Array(k).fill().map(() => []);

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    // Assign points to nearest centroid
    clusters = new Array(k).fill().map(() => []);
    for (let expense of expenses) {
      let distances = centroids.map((c) => Math.abs(expense - c));
      let minDistanceIndex = distances.indexOf(Math.min(...distances));
      clusters[minDistanceIndex].push(expense);
    }

    // Update centroids
    let newCentroids = clusters.map((cluster) => {
      if (cluster.length === 0) return 0; // Handle empty cluster
      return cluster.reduce((a, b) => a + b, 0) / cluster.length;
    });

    // Check for convergence
    let converged = centroids.every(
      (c, i) => Math.abs(c - newCentroids[i]) < 0.001
    );
    centroids = newCentroids;

    if (converged) break;
  }

  // Assign each expense to cluster
  const labels = expenses.map((expense) => {
    let distances = centroids.map((c) => Math.abs(expense - c));
    return distances.indexOf(Math.min(...distances));
  });

  return { centroids, labels, clusters };
}

export default kMeans;
