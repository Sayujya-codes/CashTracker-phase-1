// Simple K-Means clustering for 1D data (expense amounts)

function kMeans(expenses, k = 3, maxIterations = 100) {
  if (!expenses.length) return [];

  // Initialize centroids: pick k random points from expenses
  let centroids = expenses
    .slice()
    .sort(() => 0.5 - Math.random())
    .slice(0, k);

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
      if (cluster.length === 0) return 0;
      return cluster.reduce((a, b) => a + b, 0) / cluster.length;
    });

    // Check for convergence
    let converged = centroids.every(
      (c, i) => Math.abs(c - newCentroids[i]) < 0.001
    );
    centroids = newCentroids;

    if (converged) break;
  }

  // After clustering, assign each expense to cluster label (0,1,2)
  const labels = expenses.map((expense) => {
    let distances = centroids.map((c) => Math.abs(expense - c));
    return distances.indexOf(Math.min(...distances));
  });

  return { centroids, labels, clusters };
}

export default kMeans;
