import React, { useState } from "react";
import "./App.css";

function App() {
  const [transcript, setTranscript] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!transcript.trim()) return;
    setLoading(true);
    setResults([]);

    try {
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Backend is not running or unreachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>🎙️ Transcript to Task Analyzer</h2>

      <textarea
        rows="10"
        cols="80"
        placeholder="Paste your meeting transcript here..."
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        style={{ marginBottom: "1rem", padding: "1rem" }}
      />

      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Transcript"}
      </button>

      <hr />

      <h3>📋 Actionable Items:</h3>
      {results.length === 0 && !loading && <p>No tasks yet.</p>}

      <ul>
        {results.map((item, index) => (
          <li key={index}>
            ✅ <strong>{item.task}</strong> — <em>{item.status}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

