/**
 * Alert Banner Configuration
 *
 * Use this for quick announcements like weather cancellations,
 * schedule changes, or important notices.
 *
 * HOW TO USE:
 * 1. Set enabled: true
 * 2. Choose a type: 'urgent', 'warning', 'info', or 'success'
 * 3. Add your message
 * 4. Set enabled: false when you want to remove it
 *
 * EXAMPLES:
 *
 * Weather Cancellation:
 * {
 *   enabled: true,
 *   type: 'urgent',
 *   title: 'Service Canceled',
 *   message: 'Due to winter weather, all Sunday services are canceled. Stay safe!',
 * }
 *
 * Schedule Change:
 * {
 *   enabled: true,
 *   type: 'warning',
 *   title: 'Time Change',
 *   message: 'This Sunday, worship begins at 11:00 AM instead of 10:30 AM.',
 * }
 *
 * Special Announcement:
 * {
 *   enabled: true,
 *   type: 'info',
 *   title: 'Guest Speaker',
 *   message: 'Join us this Sunday as we welcome Pastor John Smith.',
 *   link: { text: 'Learn More', url: '#about' }
 * }
 *
 * Good News:
 * {
 *   enabled: true,
 *   type: 'success',
 *   title: 'Baptism Sunday',
 *   message: 'Celebrate with us as 5 new believers are baptized this Sunday!',
 * }
 */

export const alertConfig = {
  // Set to true to show the alert, false to hide it
  enabled: false,

  // Alert type: 'urgent' (red), 'warning' (yellow), 'info' (blue), 'success' (green)
  type: "urgent",

  // Alert content
  title: "Weather Cancellation", // Optional - bold text at the start
  message:
    "Due to winter weather, all Sunday services are canceled. Stay safe!", // Main message text

  // Optional link
  link: null,
  // Example: link: { text: 'Learn More', url: '#events' }

  // Behavior
  dismissible: true, // Allow users to close the alert
};

export default alertConfig;
