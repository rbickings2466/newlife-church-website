// Simple client-side rate limiter to reduce API costs
// Limits: 10 messages per user per hour
const RATE_LIMIT = 10; // messages per window
const TIME_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds

class RateLimiter {
  constructor() {
    this.storage_key = 'askNewLife_rateLimit';
    this.loadState();
  }

  loadState() {
    try {
      const stored = localStorage.getItem(this.storage_key);
      if (stored) {
        const data = JSON.parse(stored);
        // Check if the time window has expired
        if (Date.now() - data.windowStart < TIME_WINDOW) {
          this.messageCount = data.count;
          this.windowStart = data.windowStart;
          return;
        }
      }
    } catch (e) {
      console.error('Error loading rate limit state:', e);
    }
    // Initialize new window
    this.resetWindow();
  }

  saveState() {
    try {
      localStorage.setItem(this.storage_key, JSON.stringify({
        count: this.messageCount,
        windowStart: this.windowStart
      }));
    } catch (e) {
      console.error('Error saving rate limit state:', e);
    }
  }

  resetWindow() {
    this.messageCount = 0;
    this.windowStart = Date.now();
    this.saveState();
  }

  canSendMessage() {
    // Check if window has expired
    if (Date.now() - this.windowStart >= TIME_WINDOW) {
      this.resetWindow();
      return true;
    }

    return this.messageCount < RATE_LIMIT;
  }

  recordMessage() {
    // Check if window has expired
    if (Date.now() - this.windowStart >= TIME_WINDOW) {
      this.resetWindow();
    }

    this.messageCount++;
    this.saveState();
  }

  getRemainingMessages() {
    // Check if window has expired
    if (Date.now() - this.windowStart >= TIME_WINDOW) {
      return RATE_LIMIT;
    }

    return Math.max(0, RATE_LIMIT - this.messageCount);
  }

  getTimeUntilReset() {
    const elapsed = Date.now() - this.windowStart;
    const remaining = TIME_WINDOW - elapsed;

    if (remaining <= 0) return 0;

    // Return minutes remaining
    return Math.ceil(remaining / (60 * 1000));
  }
}

// Export singleton instance
export const rateLimiter = new RateLimiter();
