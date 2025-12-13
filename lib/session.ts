const SESSION_ID_KEY = "cart-session-id";

/**
 * Get or create a session ID for cart operations.
 * Returns empty string during SSR (when localStorage is unavailable).
 */
export function getSessionId(): string {
  // Check if we're in a browser environment
  if (typeof window === "undefined" || typeof localStorage === "undefined") {
    return "";
  }

  try {
    // Check for existing session ID
    let sessionId = localStorage.getItem(SESSION_ID_KEY);

    // Generate new session ID if none exists
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem(SESSION_ID_KEY, sessionId);
    }

    return sessionId;
  } catch (error) {
    console.error("Failed to get/set session ID:", error);
    return "";
  }
}
