/**
 * Promotional Banner Configuration
 *
 * This file controls the promotional video banner that appears on your home page.
 *
 * HOW TO USE:
 * 1. To SHOW a promo video: Set enabled: true and add your video details
 * 2. To HIDE the promo banner: Set enabled: false
 *
 * CONFIGURATION OPTIONS:
 * - enabled: true/false - Controls whether the banner displays
 * - id: Unique identifier for this promo (change when you want a new promo)
 * - videoUrl: YouTube video URL (any format works)
 * - title: Main heading for the banner
 * - subtitle: Optional subheading
 * - description: Text below the video
 * - backgroundColor: Optional custom background (CSS class)
 * - dismissible: true/false - Whether users can close the banner
 * - rememberDismissal: true/false - Remember if user closed it
 * - ctaButton: Optional call-to-action button
 *
 * EXAMPLES:
 *
 * Example 1 - New Sermon Series:
 * {
 *   enabled: true,
 *   id: 'sermon-series-romans-2025',
 *   videoUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID',
 *   title: 'New Sermon Series: Romans',
 *   subtitle: 'Starting This Sunday',
 *   description: 'Join us as we dive deep into Paul\'s letter to the Romans.',
 *   ctaButton: {
 *     text: 'View Series',
 *     link: '#sermons'
 *   }
 * }
 *
 * Example 2 - Special Event:
 * {
 *   enabled: true,
 *   id: 'christmas-service-2025',
 *   videoUrl: 'https://youtu.be/YOUR_VIDEO_ID',
 *   title: 'Christmas Eve Service',
 *   subtitle: 'December 24th at 6:00 PM',
 *   description: 'Celebrate the birth of our Savior with us!',
 *   dismissible: false,
 *   ctaButton: {
 *     text: 'Plan Your Visit',
 *     link: '#visit'
 *   }
 * }
 */

export const promoConfig = {
  // Set to true to display the banner, false to hide it
  enabled: false,

  // Unique ID for this promo (change this when you create a new promo)
  id: 'promo-2025-01',

  // YouTube video URL (supports multiple formats)
  videoUrl: '',

  // Banner content
  title: '',
  subtitle: '',
  description: '',

  // Styling
  backgroundColor: 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50',

  // Behavior
  dismissible: true,              // Allow users to close the banner
  rememberDismissal: true,        // Remember if user closed it (won't show again)

  // Optional call-to-action button
  ctaButton: null,
  // Example CTA:
  // ctaButton: {
  //   text: 'Learn More',
  //   link: '#events'  // or use onClick: () => { /* custom action */ }
  // }
};

export default promoConfig;
