// Test script for RAG system
// Run with: node test-rag.js

import { knowledgeBaseRAG, getRelevantKnowledge } from './src/utils/ragSystem.js';

console.log('=== Testing RAG System ===\n');

// Test queries
const testQueries = [
  'What time is the Sunday service?',
  'What does the church believe about marriage?',
  'Tell me about the history of the church',
  'What are the roles of men and women?',
  'How can I get saved?',
  'What is the gospel?',
  'Does the church have a youth ministry?',
  'What is the church\'s phone number?',
  'Who is the pastor?',
  'What does the church teach about baptism?'
];

console.log(`Total chunks in knowledge base: ${knowledgeBaseRAG.chunks.length}\n`);

for (const query of testQueries) {
  console.log(`\n${'='.repeat(80)}`);
  console.log(`QUERY: "${query}"`);
  console.log('='.repeat(80));

  const relevantContext = getRelevantKnowledge(query);
  const tokenEstimate = knowledgeBaseRAG.getTokenEstimate(relevantContext);
  const fullKBTokens = 19006; // Full knowledge base is 19,006 tokens

  console.log(`\nToken usage: ${tokenEstimate} tokens (vs ${fullKBTokens} for full KB)`);
  console.log(`Savings: ${Math.round((1 - tokenEstimate / fullKBTokens) * 100)}%`);

  const chunks = knowledgeBaseRAG.search(query);
  console.log(`\nRetrieved ${chunks.length} chunks:`);
  chunks.forEach((chunk, i) => {
    console.log(`  ${i + 1}. ${chunk.title}`);
  });

  console.log(`\nFirst 200 characters of context:`);
  console.log(relevantContext.substring(0, 200).replace(/\n/g, ' ') + '...');
}

console.log('\n\n=== Test Complete ===');
