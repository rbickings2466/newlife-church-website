import React from "react";
import { estimateQuotaUsage } from "../config/youtubeConfig";

const QuotaMonitor = ({ className = "" }) => {
  const quotaEstimate = estimateQuotaUsage();

  const getQuotaColor = (percentage) => {
    if (percentage < 50) return "text-green-600 bg-green-50";
    if (percentage < 80) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const quotaColorClass = getQuotaColor(quotaEstimate.percentageOfQuota);

  return (
    <div
      className={`p-3 rounded-lg border text-sm ${quotaColorClass} ${className}`}
    >
      <div className='font-medium mb-1'>
        📊 YouTube API Quota Usage (Estimated)
      </div>
      <div className='space-y-1 text-xs'>
        <div>
          Daily estimate: {quotaEstimate.totalEstimate.toLocaleString()} /
          10,000 units ({Math.round(quotaEstimate.percentageOfQuota)}%)
        </div>
        <div>Live stream checks: {quotaEstimate.liveStreamChecks}/day</div>
        <div>Video fetching: {quotaEstimate.videoFetching} per page load</div>
      </div>
      {quotaEstimate.percentageOfQuota > 80 && (
        <div className='mt-2 text-xs font-medium'>
          ⚠️ High usage! Consider optimizations to avoid quota exceeded errors.
        </div>
      )}
    </div>
  );
};

export default QuotaMonitor;
