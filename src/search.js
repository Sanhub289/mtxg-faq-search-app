export function searchFaqs(query, faqs) {
    // If query is empty or just spaces, return nothing
    if (!query.trim()) {
        return [];
    }

    // Split query into individual words
    // Example: "reset password" → ["reset", "password"]
    const searchWords = query.toLowerCase().split(" ");

    return faqs
        .map((faq) => {
            // Combine question + answer into one text to search through
            const text = `${faq.question} ${faq.answer}`.toLowerCase();

            let score = 0;

            // For each word in the query, check if it exists in the FAQ text
            searchWords.forEach((word) => {
                if (text.includes(word)) {
                    score++; // Add 1 point for every matching word
                }
            });

            return { ...faq, score }; // Return FAQ with its score
        })
        .filter((faq) => faq.score > 0)   // Remove FAQs with 0 score
        .sort((a, b) => b.score - a.score) // Sort by highest score first
        .slice(0, 3); // Take only top 3
}