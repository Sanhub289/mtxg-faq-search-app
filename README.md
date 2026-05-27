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
The app uses TF-IDF (Term Frequency-Inverse Document Frequency) with Cosine Similarity:
1. Each FAQ question and answer is tokenized into individual words
2. TF (Term Frequency) measures how often a word appears in a single FAQ
3. IDF (Inverse Document Frequency) rewards rare words and penalizes common words
4. A TF-IDF vector is built for both the query and each FAQ
5. Cosine Similarity measures how closely the query vector matches each FAQ vector
6. FAQs are sorted by similarity score (highest first)
7. The top 3 results are shown

## Screenshots

### Initial Page (Empty State)
![Home](./screenshots/home.png)

### Search Results
![Results](./screenshots/results.png)

### No Results Found
![No Results](./screenshots/no-results.png)

## Sample Queries
- `reset password`
- `billing`
- `app slow`

## Known Limitations
- TF-IDF does not understand synonyms or semantic meaning
- No backend REST API
- No GitHub Actions workflow
- Case sensitive partial matches only

## How I Would Upgrade This
- Use sentence embeddings (e.g. OpenAI or HuggingFace) for semantic search
- Add a vector database like Pinecone to store and retrieve embeddings
- Add a REST API (POST /api/search) for the search logic
- Add category filter dropdown on the UI

## Hours Spent
Approximately 5 hours