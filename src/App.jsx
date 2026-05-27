import { useState } from "react";
import faqs from "./data/faq.json";
import { searchFaqs } from "./search";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState("");

  const handleSearch = () => {
    // If empty query, show warning message
    if (!query.trim()) {
      setMessage("⚠️ Please enter a search query.");
      setResults([]);
      return;
    }

    const found = searchFaqs(query, faqs);

    if (found.length === 0) {
      setMessage("❌ No results found.");
      setResults([]);
    } else {
      setMessage("");
      setResults(found);
    }
  };

  // Allow pressing Enter key to search
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px", fontFamily: "Arial" }}>
      <h1>🔍 FAQ Search</h1>
      <p>Type a question to find answers from our FAQ.</p>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. reset password, billing..."
          style={{ flex: 1, padding: "10px", fontSize: "16px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#4f46e5", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          Search
        </button>
      </div>

      {/* Show message if any */}
      {message && (
        <p style={{ color: "red" }}>{message}</p>
      )}

      {/* Show results */}
      {results.map((faq) => (
        <div
          key={faq.id}
          style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "16px", marginBottom: "12px", backgroundColor: "#f9f9f9" }}
        >
          <h3 style={{ margin: "0 0 8px 0" }}>{faq.question}</h3>
          <p style={{ margin: "0 0 8px 0" }}>{faq.answer}</p>
          <span style={{ backgroundColor: "#4f46e5", color: "white", padding: "3px 10px", borderRadius: "20px", fontSize: "12px" }}>
            {faq.category}
          </span>
        </div>
      ))}
    </div>
  );
}

export default App;
