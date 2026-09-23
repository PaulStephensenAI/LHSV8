import { FAQItem, FAQCategory, FAQSearchResult } from '../types';
import { FAQ_KNOWLEDGE_BASE } from '../data/faqKnowledgeData';

/**
 * Tokenize and normalize query strings for fuzzy/prefix scoring.
 */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ')
    .split(/\s+/)
    .filter(token => token.length > 1);
}

/**
 * Search the FAQ Knowledge Base with field-weighting and relevance scoring.
 */
export function searchFAQIndex(
  query: string,
  categoryFilter: FAQCategory = 'all',
  options: { limit?: number; threshold?: number } = {}
): FAQSearchResult[] {
  const { limit = 10, threshold = 0.5 } = options;
  const trimmed = query.trim();

  // If query is empty, return all category filtered items sorted by default order
  if (!trimmed) {
    const filtered = categoryFilter === 'all' 
      ? FAQ_KNOWLEDGE_BASE 
      : FAQ_KNOWLEDGE_BASE.filter(item => item.category === categoryFilter);

    return filtered.slice(0, limit).map(item => ({
      item,
      score: 1.0,
      matchedFields: ['default'],
      matchedKeywords: []
    }));
  }

  const queryTokens = tokenize(trimmed);
  const results: FAQSearchResult[] = [];

  for (const item of FAQ_KNOWLEDGE_BASE) {
    if (categoryFilter !== 'all' && item.category !== categoryFilter) {
      continue;
    }

    let score = 0;
    const matchedFields: string[] = [];
    const matchedKeywords: string[] = [];

    const questionLower = item.question.toLowerCase();
    const shortAnsLower = item.shortAnswer.toLowerCase();
    const detailedAnsLower = item.detailedAnswer.toLowerCase();
    const catLower = item.categoryLabel.toLowerCase();

    // Exact full query match boosts
    if (questionLower.includes(trimmed.toLowerCase())) {
      score += 40;
      matchedFields.push('question_exact');
    }

    // Token-level scoring
    for (const token of queryTokens) {
      // 1. Question Title (Weight: 15)
      if (questionLower.includes(token)) {
        score += 15;
        if (!matchedFields.includes('question')) matchedFields.push('question');
      }

      // 2. Keywords Array (Weight: 12)
      for (const kw of item.keywords) {
        if (kw.toLowerCase().includes(token)) {
          score += 12;
          if (!matchedKeywords.includes(kw)) matchedKeywords.push(kw);
          if (!matchedFields.includes('keywords')) matchedFields.push('keywords');
        }
      }

      // 3. Category Label (Weight: 8)
      if (catLower.includes(token)) {
        score += 8;
        if (!matchedFields.includes('category')) matchedFields.push('category');
      }

      // 4. Short Answer (Weight: 6)
      if (shortAnsLower.includes(token)) {
        score += 6;
        if (!matchedFields.includes('shortAnswer')) matchedFields.push('shortAnswer');
      }

      // 5. Detailed Body (Weight: 3)
      if (detailedAnsLower.includes(token)) {
        score += 3;
        if (!matchedFields.includes('detailedAnswer')) matchedFields.push('detailedAnswer');
      }
    }

    if (score >= threshold) {
      results.push({
        item,
        score,
        matchedFields,
        matchedKeywords
      });
    }
  }

  // Sort descending by score
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, limit);
}

/**
 * Helper to match user chat input against FAQ index for proactive instant answers.
 */
export function getProactiveFAQSuggestion(userText: string): FAQItem | null {
  if (!userText || userText.trim().length < 4) return null;
  const results = searchFAQIndex(userText, 'all', { limit: 1, threshold: 25 });
  return results.length > 0 ? results[0].item : null;
}

/**
 * Format an FAQ Item as an authoritative, grounded chat message with citations.
 */
export function formatFAQAsChatMessage(item: FAQItem, personaName: string = 'Elysian'): string {
  return `### Grounded Studio Knowledge • ${item.question}

${item.detailedAnswer}

---

**Knowledge Source & Citation**:
*   📁 **Document**: \`${item.groundedCitation.filename}\`
*   📑 **Section**: *${item.groundedCitation.section}*
*   🏛️ **Authoritative Standard**: Studio Handover Policy (Zero SaaS Subscription • Local Data Dignity)`;
}
