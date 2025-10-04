// YouTube API Configuration
// Adjust these settings to optimize quota usage

export const youtubeConfig = {
  // Live stream refresh settings
  liveStream: {
    // Set to 0 to disable auto-refresh and save quota
    // Set to higher values (in milliseconds) for less frequent checks
    refreshInterval: 10 * 60 * 1000, // 10 minutes (was 30 seconds)

    // Alternative options:
    // refreshInterval: 0,                    // Disable auto-refresh (saves most quota)
    // refreshInterval: 5 * 60 * 1000,       // 5 minutes
    // refreshInterval: 30 * 60 * 1000,      // 30 minutes
  },

  // Video fetching settings
  videos: {
    maxResults: 10, // Reduce from 30 to 10 to save quota
    enableVideoDetails: true, // Set to false to skip detailed video info
    detailsLimit: 6, // Only get details for first N videos
  },

  // Quota usage tracking
  quotaTracking: {
    enabled: true,
    dailyLimit: 10000, // Default YouTube API daily quota
    warningThreshold: 8000, // Warn when 80% of quota is used
  },
};

// Calculate estimated daily quota usage
export const estimateQuotaUsage = () => {
  const estimates = {
    // Live stream checks (2 API calls per check)
    liveStreamChecks:
      youtubeConfig.liveStream.refreshInterval > 0
        ? Math.ceil(
            (24 * 60 * 60 * 1000) / youtubeConfig.liveStream.refreshInterval
          ) * 2
        : 2, // Just initial check

    // Video fetching (search + details)
    videoFetching:
      100 +
      (youtubeConfig.videos.enableVideoDetails
        ? youtubeConfig.videos.detailsLimit
        : 0),

    // Estimated page loads per day
    estimatedPageLoads: 50, // Conservative estimate
  };

  const totalEstimate =
    estimates.liveStreamChecks +
    estimates.videoFetching * estimates.estimatedPageLoads;

  return {
    ...estimates,
    totalEstimate,
    percentageOfQuota:
      (totalEstimate / youtubeConfig.quotaTracking.dailyLimit) * 100,
  };
};

// Quota optimization recommendations
export const getOptimizationRecommendations = () => {
  const usage = estimateQuotaUsage();
  const recommendations = [];

  if (usage.totalEstimate > youtubeConfig.quotaTracking.warningThreshold) {
    recommendations.push(
      "Consider disabling live stream auto-refresh (set refreshInterval to 0)"
    );
    recommendations.push("Reduce maxResults for video fetching");
    recommendations.push("Implement caching to reduce repeated API calls");
  }

  if (
    youtubeConfig.liveStream.refreshInterval < 5 * 60 * 1000 &&
    youtubeConfig.liveStream.refreshInterval > 0
  ) {
    recommendations.push("Increase live stream refresh interval to 5+ minutes");
  }

  if (youtubeConfig.videos.maxResults > 15) {
    recommendations.push("Consider reducing video count to 10-15 per request");
  }

  return recommendations;
};
