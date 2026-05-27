# FAQ Search App

## Overview
This is a simple FAQ search application built with React and Vite.
Users can type a question into the search box and the app finds the top 3 most relevant FAQ entries using keyword matching.
The app displays the question, answer, and category for each result.

## How to Run

### Prerequisites
- Node.js (v18 or higher)
- npm

### Steps
```bash
npm install
npm run dev
```
Then open your browser at: http://localhost:5173

## How to Run Tests
```bash
npm test
```

## Search Approach
The app uses keyword overlap matching:
1. The query is split into individual words e.g. "reset password" becomes ["reset", "password"]
2. Each word is checked against the FAQ question and answer text
3. A score is given based on how many words match
4. FAQs are sorted by score (highest first)
5. The top 3 results are shown

## Screenshots

### Initial Page (Empty State)
![Home](./screenshots/home.png)

### Search Results
![Results](./screenshots/results.png)

## Sample Queries
- `reset password`
- `billing`
- `app slow`

## Known Limitations
- Uses simple keyword matching, does not understand synonyms or sentence meaning
- No category filter dropdown
- No backend REST API
- Case sensitive partial matches only

## How I Would Upgrade This
- Use sentence embeddings (e.g. OpenAI or HuggingFace) for semantic search
- Add a vector database like Pinecone to store and retrieve embeddings
- Add a REST API (POST /api/search) for the search logic
- Add category filter dropdown on the UI

## Hours Spent
Approximately 4 hours