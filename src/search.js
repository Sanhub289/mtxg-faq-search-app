// TF-IDF Search Logic

// STEP 1: Convert text into individual words (tokens)
function tokenize(text) {
    return text.toLowerCase().match(/\b\w+\b/g) || [];
}

// STEP 2: Calculate TF (Term Frequency)
// How often a word appears in ONE document
// Example: "password" appears 2 times in 10 words → TF = 0.2
function computeTF(tokens) {
    const tf = {};
    tokens.forEach((token) => {
        tf[token] = (tf[token] || 0) + 1;
    });
    Object.keys(tf).forEach((token) => {
        tf[token] = tf[token] / tokens.length;
    });
    return tf;
}

// STEP 3: Calculate IDF (Inverse Document Frequency)
// How RARE a word is across ALL documents
// Rare word = high score, Common word = low score
function computeIDF(faqTokens) {
    const idf = {};
    const totalDocs = faqTokens.length;

    faqTokens.forEach((tokens) => {
        const uniqueTokens = new Set(tokens);
        uniqueTokens.forEach((token) => {
            idf[token] = (idf[token] || 0) + 1;
        });
    });

    Object.keys(idf).forEach((token) => {
        idf[token] = Math.log(totalDocs / idf[token]);
    });

    return idf;
}

// STEP 4: Calculate Cosine Similarity
// How similar is the query to each FAQ?
// Score between 0 (no match) and 1 (perfect match)
function cosineSimilarity(vecA, vecB) {
    const allKeys = new Set([
        ...Object.keys(vecA),
        ...Object.keys(vecB),
    ]);

    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    allKeys.forEach((key) => {
        const a = vecA[key] || 0;
        const b = vecB[key] || 0;
        dotProduct += a * b;
        magnitudeA += a * a;
        magnitudeB += b * b;
    });

    if (magnitudeA === 0 || magnitudeB === 0) return 0;

    return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

// STEP 5: Build TF-IDF vector for a document
function buildTFIDFVector(tokens, idf) {
    const tf = computeTF(tokens);
    const tfidf = {};
    Object.keys(tf).forEach((token) => {
        tfidf[token] = tf[token] * (idf[token] || 0);
    });
    return tfidf;
}

// MAIN FUNCTION: Search FAQs using TF-IDF + Cosine Similarity
export function searchFaqs(query, faqs) {
    // Return empty if query is blank
    if (!query.trim()) return [];

    // Tokenize all FAQs
    const faqTokens = faqs.map((faq) =>
        tokenize(`${faq.question} ${faq.answer}`)
    );

    // Tokenize the query
    const queryTokens = tokenize(query);

    // Compute IDF across all FAQs
    const idf = computeIDF(faqTokens);

    // Build TF-IDF vector for query
    const queryVector = buildTFIDFVector(queryTokens, idf);

    // Score each FAQ against the query
    return faqs
        .map((faq, index) => {
            const faqVector = buildTFIDFVector(faqTokens[index], idf);
            const score = cosineSimilarity(queryVector, faqVector);
            return { ...faq, score };
        })
        .filter((faq) => faq.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
}