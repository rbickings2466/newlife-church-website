/**
 * Church Website Configuration
 *
 * This file contains all customizable content for your church website.
 * Update the values below to match your church's information.
 *
 * For a new church setup:
 * 1. Copy this file and update all values
 * 2. Replace images in /public and /src/assets folders
 * 3. Update .env.local with your API keys (see .env.example)
 * 4. Update index.html meta tags
 */

// =============================================================================
// CHURCH IDENTITY
// =============================================================================

export const churchInfo = {
  // Basic Information
  name: "New Life Bible Fellowship Church",
  shortName: "New Life",
  tagline: "To pursue God's glory in all things among all people",

  // Location
  address: {
    street: "24771 Cannon Rd",
    city: "Millsboro",
    state: "DE",
    zip: "19966",
    full: "24771 Cannon Rd, Millsboro, DE 19966",
  },

  // Contact
  phone: "(302) 945-8145",
  phoneLink: "tel:+13029458145",
  email: "office@newlifebfcde.org",
  website: "https://www.newlifebfcde.org",

  // Maps
  googleMapsQuery: "24771+Cannon+Rd+Millsboro+DE+19966",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3132.845!2d-75.29062!3d38.5873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b8e5a1b2c3d4e5%3A0xabcdef1234567890!2s24771%20Cannon%20Rd%2C%20Millsboro%2C%20DE%2019966!5e0!3m2!1sen!2sus!4v1694182800000!5m2!1sen!2sus",

  // Giving
  givingPortalUrl: "https://newlifebfcde.churchcenter.com/giving",
  checkPayableTo: "New Life Bible Fellowship Church",
};

// =============================================================================
// BRANDING & ASSETS
// =============================================================================

export const branding = {
  // Logo paths (relative to public folder or imported assets)
  logo: "/NL_Logo_300.jpg",
  logoAlt: `${churchInfo.name} Logo`,

  // Hero background image (import from assets)
  // heroBackground is imported in HeroSection.jsx from "../assets/nl_santuary_wide.jpg"

  // Giving QR codes (import from assets)
  // These are imported in GivingSection.jsx
};

// =============================================================================
// SOCIAL MEDIA
// =============================================================================

export const socialMedia = {
  youtube: {
    enabled: true,
    url: "https://www.youtube.com/channel/UChfYNpsG6ciJa_N6aBryi_Q",
    channelName: churchInfo.name,
  },
  facebook: {
    enabled: true,
    url: "https://www.facebook.com/newlifebfc",
  },
  instagram: {
    enabled: true,
    url: "https://www.instagram.com/newlifebiblefellowshipchurch/",
  },
  twitter: {
    enabled: false,
    url: "",
  },
};

// =============================================================================
// SERVICE TIMES
// =============================================================================

export const serviceTimes = {
  sundaySchool: {
    time: "9:30 AM",
    endTime: "10:15 AM",
    description: "Join us for age-appropriate Bible study classes. Adults meet in the Fellowship Hall while children have their own class midway through the Worship Service.",
  },
  worship: {
    time: "10:30 AM",
    duration: "75-90 minutes",
    description: "Our service includes congregational singing, prayer, Scripture reading, and expository preaching (typically 45-60 minutes).",
  },
  fellowship: {
    time: "12:00 PM",
    description: "Stay after service for refreshments and fellowship. This is a great time to meet our members and ask questions.",
  },
};

// =============================================================================
// ABOUT & THEOLOGY
// =============================================================================

export const aboutContent = {
  // Heritage section
  heritage: {
    title: "Our Reformed Heritage",
    description: "As a reformed Bible church, we hold to the historic Christian faith as articulated in the great confessions of the Reformation. We believe in the sovereignty of God, the authority of Scripture, salvation by grace alone through faith alone in Christ alone, and the glory of God as the ultimate purpose of all things.",
  },

  // Purpose of the Church
  purposes: [
    {
      title: "Glorify God",
      description: "Everything we do as a church is for the glory of God, acknowledging His supremacy in all things.",
      icon: "sparkles",
      verse: "1 Corinthians 10:31",
    },
    {
      title: "Edify the Saints",
      description: "Building up believers in the faith through teaching, encouragement, and spiritual growth together.",
      icon: "building",
      verse: "Ephesians 4:11-16",
    },
    {
      title: "Evangelize the Lost",
      description: "Sharing the gospel with those who do not know Christ, making disciples of all nations.",
      icon: "globe",
      verse: "Matthew 28:19-20",
    },
  ],

  // Means of Grace
  meansOfGrace: [
    {
      title: "Worship",
      description: "Gathering together to praise and honor God through song, prayer, and fellowship in spirit and truth.",
      verse: "John 4:24",
    },
    {
      title: "Ordinances",
      description: "Baptism and Communion as commanded by Christ for the church to observe and practice.",
      verse: "Matthew 28:19",
    },
    {
      title: "Preaching",
      description: "Expository preaching that faithfully explains and applies God's Word to our lives.",
      verse: "2 Timothy 4:2",
    },
    {
      title: "Fellowship",
      description: "Biblical community where believers encourage and support one another in love.",
      verse: "Hebrews 10:24-25",
    },
  ],
};

// =============================================================================
// WORSHIP STYLE
// =============================================================================

export const worshipStyle = {
  description: "Our worship is reverent and traditional, featuring hymns and contemporary worship songs accompanied by piano and/or acoustic instruments. We emphasize congregational singing and biblical preaching.",
  instruments: ["piano", "acoustic instruments"],
  style: "traditional with contemporary elements",
};

// =============================================================================
// CHILDREN'S MINISTRY
// =============================================================================

export const childrenMinistry = {
  nurseryAvailable: true,
  nurseryAges: "infants and toddlers",
  childrensChurch: {
    available: true,
    ages: "3-12",
    timing: "midway through the service",
  },
};

// =============================================================================
// GIVING INFORMATION
// =============================================================================

export const givingInfo = {
  // Tax status
  is501c3: true,
  taxDeductible: true,

  // Giving areas/funds
  funds: [
    {
      name: "General Fund",
      description: "Supports the ongoing ministry, operations, and mission of our church including salaries, facilities, and programs.",
      icon: "Heart",
    },
    {
      name: "Missions",
      description: "Supports local and international mission work, spreading the Gospel worldwide and serving communities in need.",
      icon: "Globe",
    },
    {
      name: "Building Fund",
      description: "Designated for facility maintenance, improvements, and future expansion projects.",
      icon: "Building",
    },
    {
      name: "Benevolence",
      description: "Helps members and community members in financial crisis with practical assistance and support.",
      icon: "Users",
    },
  ],

  // Biblical basis for giving
  whyWeGive: [
    {
      title: "Worship",
      verse: "2 Corinthians 9:7",
      description: "Giving is an act of worship, reflecting gratitude to God for His abundant provision and grace.",
    },
    {
      title: "Obedience",
      verse: "Malachi 3:10",
      description: "Biblical giving demonstrates our trust in God and obedience to His Word.",
    },
    {
      title: "Kingdom Work",
      verse: "Matthew 6:19-21",
      description: "Our gifts support the proclamation of the Gospel and the building of God's kingdom.",
    },
  ],
};

// =============================================================================
// VISITOR INFORMATION
// =============================================================================

export const visitorInfo = {
  parkingInfo: "Free parking is available in our lot. Handicap accessible spaces are near the main entrance.",
  dressCode: "Come as you are! We welcome you whether you dress up or dress casual. You'll see both in our congregation.",
  visitorWelcome: "We won't ask you to stand or raise your hand. We'll warmly welcome you, but you won't be put on the spot. Feel free to participate as much or as little as you're comfortable with.",

  // FAQs
  faqs: [
    {
      question: "What's the worship style?",
      answer: worshipStyle.description,
    },
    {
      question: "How long is the service?",
      answer: `Our Sunday worship service typically lasts ${serviceTimes.worship.duration}, including music, prayer, Scripture reading, and the sermon.`,
    },
    {
      question: "Will I be singled out as a visitor?",
      answer: "We won't ask you to stand or raise your hand. We'll warmly welcome you, but you won't be put on the spot. Feel free to participate as much or as little as you're comfortable with.",
    },
    {
      question: "What about my kids?",
      answer: `Children are welcome in the worship service. We also offer Children's Church ${childrenMinistry.childrensChurch.timing} for ages ${childrenMinistry.childrensChurch.ages}. A nursery is available for younger children.`,
    },
    {
      question: "What if I'm not a Christian?",
      answer: "You're welcome here! We'd love for you to visit and hear the Gospel. Our services are designed to be understandable even if you're unfamiliar with Christianity or the Bible.",
    },
    {
      question: "How can I become a member?",
      answer: "We'd love to talk with you about membership! After attending for a while, you can meet with our elders to discuss your testimony, beliefs, and desire to join our church family.",
    },
  ],
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get the full Google Maps URL for directions
 */
export const getGoogleMapsUrl = () => {
  return `https://maps.google.com/?q=${churchInfo.googleMapsQuery}`;
};

/**
 * Get mailto link
 */
export const getMailtoLink = () => {
  return `mailto:${churchInfo.email}`;
};

/**
 * Get formatted address for display
 */
export const getFormattedAddress = () => {
  return `${churchInfo.address.street}\n${churchInfo.address.city}, ${churchInfo.address.state} ${churchInfo.address.zip}`;
};

// =============================================================================
// DEFAULT EXPORT
// =============================================================================

const siteConfig = {
  churchInfo,
  branding,
  socialMedia,
  serviceTimes,
  aboutContent,
  worshipStyle,
  childrenMinistry,
  givingInfo,
  visitorInfo,
  getGoogleMapsUrl,
  getMailtoLink,
  getFormattedAddress,
};

export default siteConfig;
