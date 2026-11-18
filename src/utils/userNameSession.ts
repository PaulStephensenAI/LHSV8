export const SESSION_USER_NAME_KEY = 'lavender_session_user_name';

/**
 * Retrieve the current visitor name stored for this session
 */
export function getStoredSessionUserName(): string {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return window.sessionStorage.getItem(SESSION_USER_NAME_KEY) || '';
    }
  } catch {
    // Ignore private browsing or cross-origin restrictions
  }
  return '';
}

/**
 * Save or clear the visitor name stored for this session
 */
export function saveStoredSessionUserName(name: string): void {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const trimmed = name.trim();
      if (trimmed) {
        window.sessionStorage.setItem(SESSION_USER_NAME_KEY, trimmed);
      } else {
        window.sessionStorage.removeItem(SESSION_USER_NAME_KEY);
      }
    }
  } catch {
    // Ignore
  }
}

/**
 * Robust natural language detector for visitor self introductions in chat messages.
 * Matches: "Hi, my name is Paul", "My name is Sarah", "G'day, I'm Alex", "Call me Sam", etc.
 * Filters out stop words and false positives like "I'm wondering", "I'm interested".
 */
export function extractUserNameFromMessage(text: string): string | null {
  if (!text || typeof text !== 'string') return null;
  const clean = text.trim();

  const introPatterns = [
    /(?:my name is|call me|you can call me|name's)\s+([A-Za-z][A-Za-z'-]*(?:\s+[A-Za-z][A-Za-z'-]*)?)/i,
    /(?:^|[.!?]\s*|\b(?:hi|hello|hey|g'day|gday)[,\s]+)(?:i am|i'm|this is)\s+([A-Za-z][A-Za-z'-]*(?:\s+[A-Za-z][A-Za-z'-]*)?)/i,
  ];

  const stopWords = new Set([
    'a', 'an', 'the', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'from',
    'and', 'or', 'but', 'because', 'if', 'as', 'that', 'this', 'it', 'we', 'you',
    'i', 'im', 'ive', 'id', 'can', 'could', 'would', 'should', 'will', 'do', 'does', 'did',
    'is', 'are', 'was', 'were', 'what', 'where', 'when', 'why', 'how', 'who', 'which',
    'just', 'here', 'now', 'wondering', 'looking', 'asking', 'interested',
    'trying', 'thinking', 'ready', 'back', 'new', 'good', 'fine', 'okay',
    'so', 'also', 'working', 'exploring', 'writing', 'using', 'curious',
    'happy', 'glad', 'sorry', 'sure', 'not', 'very', 'really', 'able',
    'excited', 'planning', 'hoping', 'seeking', 'testing', 'feeling',
    'going', 'having', 'doing', 'wonder', 'inquiring', 'wanting',
    'nice', 'pleased', 'please', 'thanks', 'thank', 'hello', 'hi', 'hey'
  ]);

  for (const pattern of introPatterns) {
    const match = clean.match(pattern);
    if (match && match[1]) {
      const candidateWords = match[1]
        .split(/[\s,.;:!?]+/)
        .filter(Boolean)
        .map(w => w.trim());

      if (candidateWords.length === 0) continue;

      const firstWord = candidateWords[0].toLowerCase();
      if (stopWords.has(firstWord) || firstWord.length < 2) continue;

      const validNameWords: string[] = [];
      for (const word of candidateWords.slice(0, 2)) {
        if (stopWords.has(word.toLowerCase())) break;
        if (/^[A-Za-z][A-Za-z'-]*$/.test(word)) {
          validNameWords.push(word.charAt(0).toUpperCase() + word.slice(1));
        } else {
          break;
        }
      }

      if (validNameWords.length > 0) {
        return validNameWords.join(' ');
      }
    }
  }

  return null;
}

/**
 * Determine whether a visitor message is purely a greeting or self introduction
 * without a separate question, so companions reply in warm conversational prose.
 */
export function isPureIntroductionOrGreeting(text: string): boolean {
  const clean = (text || '').trim();
  if (!clean) return false;
  const hasQuestion = clean.includes('?');
  const wordCount = clean.split(/\s+/).length;
  const isSimpleGreeting = /^(?:g'?day|hi|hello|hey|good\s*(?:morning|afternoon|evening)|howdy|greetings|welcome)[,!.\s]*(?:there|everyone|team|folks|friends|toni|elysian|phoebe|holly|ari|kenny)?[!.]*$/i.test(clean);
  if (isSimpleGreeting) return true;
  const introName = extractUserNameFromMessage(clean);
  return Boolean(introName && !hasQuestion && wordCount <= 12);
}
