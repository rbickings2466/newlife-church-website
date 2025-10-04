import React, { useState } from "react";
import { youtubeAPI } from "../lib/youtube";

const YouTubeApiTest = () => {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runApiTest = async () => {
    setLoading(true);
    setTestResult(null);

    const results = {
      envVars: {},
      apiTest: null,
      error: null,
    };

    try {
      // Check environment variables
      results.envVars = {
        apiKey: import.meta.env.VITE_YOUTUBE_API_KEY
          ? `${import.meta.env.VITE_YOUTUBE_API_KEY.substring(0, 10)}...`
          : "NOT FOUND",
        channelId: import.meta.env.VITE_YOUTUBE_CHANNEL_ID || "NOT FOUND",
        allEnvKeys: Object.keys(import.meta.env).filter((key) =>
          key.startsWith("VITE_")
        ),
      };

      console.log("Environment Variables Test:", results.envVars);

      // Test API call
      const videos = await youtubeAPI.getChannelVideos(3);
      results.apiTest = {
        success: true,
        videoCount: videos.length,
        firstVideoTitle: videos[0]?.title || "No videos found",
        videos: videos.map((v) => ({
          id: v.id,
          title: v.title,
          publishedAt: v.publishedAt,
        })),
      };
    } catch (error) {
      console.error("API Test Error:", error);
      results.error = {
        message: error.message,
        stack: error.stack,
      };
    }

    setTestResult(results);
    setLoading(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        background: "white",
        border: "2px solid #ccc",
        padding: "20px",
        borderRadius: "8px",
        maxWidth: "400px",
        maxHeight: "80vh",
        overflow: "auto",
        zIndex: 1000,
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h3>YouTube API Test</h3>
      <button
        onClick={runApiTest}
        disabled={loading}
        style={{
          background: "#007cba",
          color: "white",
          border: "none",
          padding: "8px 16px",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Testing..." : "Test YouTube API"}
      </button>

      {testResult && (
        <div style={{ marginTop: "20px", fontSize: "12px" }}>
          <h4>Environment Variables:</h4>
          <pre
            style={{
              background: "#f5f5f5",
              padding: "8px",
              borderRadius: "4px",
            }}
          >
            {JSON.stringify(testResult.envVars, null, 2)}
          </pre>

          {testResult.error ? (
            <div>
              <h4 style={{ color: "red" }}>Error:</h4>
              <pre
                style={{
                  background: "#ffe6e6",
                  padding: "8px",
                  borderRadius: "4px",
                  color: "red",
                }}
              >
                {testResult.error.message}
              </pre>
            </div>
          ) : (
            <div>
              <h4 style={{ color: "green" }}>API Test Result:</h4>
              <pre
                style={{
                  background: "#e6ffe6",
                  padding: "8px",
                  borderRadius: "4px",
                }}
              >
                {JSON.stringify(testResult.apiTest, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default YouTubeApiTest;
