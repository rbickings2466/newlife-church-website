// Static sermon data for when YouTube API is unavailable
// This ensures your website always has content to display

export const staticSermons = [
  {
    id: "static-sermon-1",
    title: "Walking in Faith: Trusting God's Plan",
    description:
      "In this powerful message, we explore how to maintain unwavering faith even when we can't see the full picture of God's plan for our lives. Based on Hebrews 11:1 and Proverbs 3:5-6.",
    publishedAt: "2025-09-01T10:00:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1280&h=720&fit=crop&crop=center",
    channelTitle: "New Life Bible Fellowship Church",
    durationMinutes: 45,
    formattedViews: "1.2K",
    formattedLikes: "89",
    viewCount: 1200,
    likeCount: 89,
    duration: "PT45M30S",
    preacher: "Pastor John Smith",
    scripture: "Hebrews 11:1",
    topic: "Faith",
  },
  {
    id: "static-sermon-2",
    title: "The Power of Prayer in Daily Life",
    description:
      "Discover the transformative power of prayer and how it can strengthen your relationship with God. Learn practical ways to incorporate prayer into your daily routine.",
    publishedAt: "2025-08-28T19:00:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1280&h=720&fit=crop&crop=center",
    channelTitle: "New Life Bible Fellowship Church",
    durationMinutes: 35,
    formattedViews: "950",
    formattedLikes: "67",
    viewCount: 950,
    likeCount: 67,
    duration: "PT35M15S",
    preacher: "Pastor Sarah Johnson",
    scripture: "Matthew 6:9-13",
    topic: "Prayer",
  },
  {
    id: "static-sermon-3",
    title: "God's Amazing Grace: Understanding Salvation",
    description:
      "A foundational message about God's grace and the gift of salvation through Jesus Christ. Perfect for new believers and those seeking to understand the Gospel.",
    publishedAt: "2025-08-25T10:30:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=1280&h=720&fit=crop&crop=center",
    channelTitle: "New Life Bible Fellowship Church",
    durationMinutes: 52,
    formattedViews: "2.1K",
    formattedLikes: "156",
    viewCount: 2100,
    likeCount: 156,
    duration: "PT52M20S",
    preacher: "Pastor John Smith",
    scripture: "Ephesians 2:8-9",
    topic: "Salvation",
  },
  {
    id: "static-sermon-4",
    title: "Living as Light in the World",
    description:
      "How Christians are called to be salt and light in our communities. Practical ways to share God's love through our actions and words.",
    publishedAt: "2025-08-21T10:00:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1280&h=720&fit=crop&crop=center",
    channelTitle: "New Life Bible Fellowship Church",
    durationMinutes: 38,
    formattedViews: "875",
    formattedLikes: "72",
    viewCount: 875,
    likeCount: 72,
    duration: "PT38M45S",
    preacher: "Pastor David Miller",
    scripture: "Matthew 5:14-16",
    topic: "Christian Living",
  },
  {
    id: "static-sermon-5",
    title: "The Joy of Worship: Psalms of Praise",
    description:
      "Exploring the Psalms and learning how to worship God with our whole hearts. Understanding the importance of praise in our spiritual lives.",
    publishedAt: "2025-08-18T10:00:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1493962853295-0fd8d5f9b9eb?w=1280&h=720&fit=crop&crop=center",
    channelTitle: "New Life Bible Fellowship Church",
    durationMinutes: 41,
    formattedViews: "1.1K",
    formattedLikes: "94",
    viewCount: 1100,
    likeCount: 94,
    duration: "PT41M20S",
    preacher: "Pastor Sarah Johnson",
    scripture: "Psalm 100",
    topic: "Worship",
  },
  {
    id: "static-sermon-6",
    title: "Overcoming Life's Challenges with Scripture",
    description:
      "Finding strength and guidance in God's Word during difficult times. How the Bible provides comfort and direction for every situation.",
    publishedAt: "2025-08-14T19:00:00Z",
    thumbnail:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1280&h=720&fit=crop&crop=center",
    channelTitle: "New Life Bible Fellowship Church",
    durationMinutes: 43,
    formattedViews: "768",
    formattedLikes: "58",
    viewCount: 768,
    likeCount: 58,
    duration: "PT43M12S",
    preacher: "Pastor David Miller",
    scripture: "2 Timothy 3:16-17",
    topic: "Scripture",
  },
];

// Function to get static sermons with consistent formatting
export const getStaticSermons = () => {
  return staticSermons.map((sermon) => ({
    ...sermon,
    date: sermon.publishedAt.split("T")[0],
    searchableText:
      `${sermon.title} ${sermon.description} ${sermon.preacher} ${sermon.scripture}`.toLowerCase(),
  }));
};
