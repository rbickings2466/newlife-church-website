import { youtubeAPI } from "../src/lib/youtube.js";

// We need to polyfill fetch and mock import.meta.env
// It is easier to just write an isolated node script using native fetch.
