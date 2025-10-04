// YouTube API Optimization Strategies
// Use these techniques to reduce quota usage

export const optimizationConfig = {
  // Cache duration in milliseconds (30 minutes)
  CACHE_DURATION: 30 * 60 * 1000,

  // Reduce number of videos fetched
  DEFAULT_MAX_RESULTS: 10,

  // Only fetch video details for the first few videos
  DETAILED_VIDEOS_LIMIT: 6,
};

// Simple cache implementation
class SimpleCache {
  constructor() {
    this.cache = new Map();
  }

  set(key, value, ttl = optimizationConfig.CACHE_DURATION) {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { value, expiry });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  clear() {
    this.cache.clear();
  }
}

export const videoCache = new SimpleCache();

// Quota usage calculator
export const calculateQuotaUsage = (operations) => {
  const costs = {
    search: 100,
    videos: 1,
    channels: 1,
    playlistItems: 1,
  };

  return operations.reduce((total, op) => {
    return total + (costs[op.type] || 0) * (op.count || 1);
  }, 0);
};

// Tips for reducing quota usage
export const quotaOptimizationTips = [
  "Use playlist API instead of search API when possible (lower cost)",
  "Cache video data to avoid repeated API calls",
  "Fetch fewer videos at once",
  "Only get detailed video info for videos that will be displayed",
  "Use static fallback content during high-traffic periods",
  "Consider upgrading to YouTube API v3 paid tier for higher quotas",
];
