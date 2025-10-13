// RAG (Retrieval Augmented Generation) system for Ask New Life chatbot
// This dramatically reduces token usage by only sending relevant knowledge base sections

import { FULL_KNOWLEDGE_BASE } from '../data/knowledgeBase.js';

// Parse the knowledge base into searchable chunks
class KnowledgeBaseRAG {
  constructor() {
    this.chunks = this.parseKnowledgeBase();
  }

  parseKnowledgeBase() {
    const chunks = [];
    const lines = FULL_KNOWLEDGE_BASE.split('\n');

    let currentChunk = null;
    let currentContent = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Detect document boundaries
      if (line.includes('========================================')) {
        // Save previous chunk if exists
        if (currentChunk && currentContent.length > 0) {
          chunks.push({
            title: currentChunk,
            content: currentContent.join('\n').trim(),
            keywords: this.extractKeywords(currentChunk, currentContent.join('\n'))
          });
        }

        // Start new chunk - next line contains the title
        if (i + 1 < lines.length) {
          currentChunk = lines[i + 1].trim();
          currentContent = [lines[i], lines[i + 1]]; // Include separator and title
          i++; // Skip the title line
        }
      } else if (currentChunk) {
        currentContent.push(line);
      }
    }

    // Add the last chunk
    if (currentChunk && currentContent.length > 0) {
      chunks.push({
        title: currentChunk,
        content: currentContent.join('\n').trim(),
        keywords: this.extractKeywords(currentChunk, currentContent.join('\n'))
      });
    }

    // Also create a general info chunk (always included)
    const generalInfo = `
CONTACT INFORMATION:
* Phone: (302)945-8145
* Email: office@newlifebfcde.org
* Address: 24771 Cannon Rd, Long Neck, Delaware 19966
* Office Hours: Monday-Thursday, 9:00 AM - 1:00 PM

SERVICE TIMES:
* Adult Sunday School: 9:30 AM
* Sunday Worship: 10:30 AM

LEADERSHIP:
* Lead Pastor: Richard (Dick) Bickings
* Elders: Richard Petrecca, Tom Lioy
* Deacons: Roger Bishop, Steve Hillriegel, Allen Lavoie

VISION: To pursue God's glory in all things among all people.
MISSION: To build the body of Christ through biblical maturity.
DENOMINATION: Bible Fellowship Church (similar to reformed Baptist)
`;

    chunks.unshift({
      title: 'GENERAL CHURCH INFORMATION',
      content: generalInfo,
      keywords: ['contact', 'phone', 'email', 'address', 'service', 'time', 'pastor', 'location', 'when', 'where', 'who', 'hours', 'sunday', 'worship', 'school']
    });

    return chunks;
  }

  extractKeywords(title, content) {
    // Convert to lowercase for case-insensitive matching
    const text = (title + ' ' + content).toLowerCase();

    // Define keyword mappings for common queries
    const keywords = new Set();

    // Extract obvious keywords from title
    const titleWords = title.toLowerCase()
      .split(/\s+/)
      .filter(word => word.length > 3);
    titleWords.forEach(word => keywords.add(word));

    // Topic-based keywords
    const topicMap = {
      'history': ['history', 'origin', 'began', 'founded', 'started', 'heritage', 'background', 'mennonite'],
      'contact': ['contact', 'phone', 'email', 'address', 'location', 'reach', 'hours', 'office'],
      'service': ['service', 'worship', 'time', 'sunday', 'when', 'schedule'],
      'ministries': ['ministry', 'ministries', 'group', 'study', 'children', 'youth', 'women', 'men', 'life group', 'nursery'],
      'beliefs': ['belief', 'believe', 'doctrine', 'faith', 'articles', 'theology', 'teach', 'bfc'],
      'salvation': ['salvation', 'saved', 'gospel', 'jesus', 'christ', 'faith', 'believe', 'repent', 'born again', 'eternal life', 'receive christ'],
      'roles': ['role', 'women', 'men', 'gender', 'leadership', 'pastor', 'elder', 'deacon', 'complementarian', 'egalitarian', 'preaching', 'teaching'],
      'marriage': ['marriage', 'married', 'husband', 'wife', 'spouse', 'wedding', 'divorce', 'remarriage', 'adultery'],
      'family': ['family', 'children', 'parent', 'father', 'mother', 'child', 'parenting'],
      'baptism': ['baptism', 'baptize', 'immersion', 'ordinance'],
      'communion': ['communion', 'lord\'s supper', 'eucharist', 'ordinance'],
      'membership': ['member', 'membership', 'join'],
      'volunteer': ['volunteer', 'serve', 'help', 'involve', 'opportunities'],
      'prayer': ['prayer', 'pray', 'praying'],
      'trinity': ['trinity', 'father', 'son', 'holy spirit', 'godhead'],
      'sin': ['sin', 'sinful', 'transgression', 'fall', 'fallen'],
      'alcohol': ['alcohol', 'drink', 'drinking', 'wine', 'beer', 'drunkenness'],
      'tobacco': ['tobacco', 'smoking', 'cigarette'],
      'drugs': ['drug', 'substance', 'addiction'],
      'abortion': ['abortion', 'unborn', 'pregnancy', 'pro-life'],
      'homosexuality': ['homosexual', 'gay', 'lgbt', 'same-sex', 'sexual immorality'],
      'government': ['government', 'civil', 'authority', 'vote', 'politics'],
      'giving': ['giving', 'tithe', 'offering', 'donate', 'stewardship'],
      'healing': ['healing', 'health', 'sick', 'divine healing'],
      'resurrection': ['resurrection', 'risen', 'eternal life', 'raised'],
      'second coming': ['second coming', 'return', 'rapture', 'millennium', 'christ return'],
      'church': ['church', 'congregation', 'body of christ', 'fellowship']
    };

    // Check which topics are present in this chunk
    for (const [topic, topicKeywords] of Object.entries(topicMap)) {
      for (const keyword of topicKeywords) {
        if (text.includes(keyword)) {
          keywords.add(keyword);
          keywords.add(topic);
        }
      }
    }

    return Array.from(keywords);
  }

  search(query) {
    const queryLower = query.toLowerCase();
    // Remove punctuation and split into words
    const queryWords = queryLower
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2);

    // Expand query words with semantic equivalents
    const expandedQuery = new Set(queryWords);
    const semanticMap = {
      'saved': ['salvation', 'gospel', 'saved', 'save', 'eternal'],
      'service': ['worship', 'sunday', 'service', 'time'],
      'believe': ['belief', 'doctrine', 'faith', 'articles'],
      'pastor': ['pastor', 'elder', 'leader', 'minister'],
      'women': ['women', 'gender', 'role', 'complementarian'],
      'history': ['history', 'origin', 'founded', 'background']
    };

    for (const word of queryWords) {
      if (semanticMap[word]) {
        semanticMap[word].forEach(syn => expandedQuery.add(syn));
      }
    }

    const allQueryWords = Array.from(expandedQuery);

    // Score each chunk based on relevance
    const scoredChunks = this.chunks.map(chunk => {
      let score = 0;

      // Always include general info chunk with base score
      if (chunk.title === 'GENERAL CHURCH INFORMATION') {
        score = 50; // Lower base score so other relevant chunks can outscore it
      }

      // Check if query words match keywords
      for (const word of allQueryWords) {
        for (const keyword of chunk.keywords) {
          if (keyword.includes(word) || word.includes(keyword)) {
            score += 15;
          }
        }
      }

      // Check direct content matches (partial word matching)
      const contentLower = chunk.content.toLowerCase();
      for (const word of allQueryWords) {
        if (contentLower.includes(word)) {
          score += 8;
        }
      }

      // Boost for title matches
      const titleLower = chunk.title.toLowerCase();
      for (const word of allQueryWords) {
        if (titleLower.includes(word)) {
          score += 25;
        }
      }

      return { chunk, score };
    });

    // Sort by score and return top chunks
    scoredChunks.sort((a, b) => b.score - a.score);

    // Return top 3 relevant chunks (or fewer if scores are very low)
    const relevantChunks = scoredChunks
      .filter(item => item.score > 10) // Minimum relevance threshold
      .slice(0, 3) // Maximum 3 chunks
      .map(item => item.chunk);

    return relevantChunks;
  }

  getRelevantContext(query) {
    const chunks = this.search(query);

    if (chunks.length === 0) {
      // Fallback to general info if nothing relevant found
      return this.chunks[0].content;
    }

    // Combine the relevant chunks
    return chunks.map(chunk => chunk.content).join('\n\n');
  }

  getTokenEstimate(text) {
    // Rough estimate: 1 token ≈ 4 characters
    return Math.ceil(text.length / 4);
  }
}

// Export singleton instance
export const knowledgeBaseRAG = new KnowledgeBaseRAG();

// Export function to get relevant context for a query
export function getRelevantKnowledge(query) {
  try {
    const context = knowledgeBaseRAG.getRelevantContext(query);
    const tokenEstimate = knowledgeBaseRAG.getTokenEstimate(context);

    console.log(`RAG: Retrieved ${knowledgeBaseRAG.search(query).length} relevant chunks (~${tokenEstimate} tokens vs ~19,000 full KB)`);

    return context;
  } catch (error) {
    console.error('RAG Error:', error);
    // Fallback: return just the general info if RAG fails
    return `
CONTACT INFORMATION:
* Phone: (302)945-8145
* Email: office@newlifebfcde.org
* Address: 24771 Cannon Rd, Long Neck, Delaware 19966

SERVICE TIMES:
* Sunday School: 9:30 AM
* Sunday Worship: 10:30 AM

PASTOR: Richard (Dick) Bickings
DENOMINATION: Bible Fellowship Church
`;
  }
}
