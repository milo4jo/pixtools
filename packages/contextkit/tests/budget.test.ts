/**
 * Budget Fitting Tests
 *
 * Tests for token budget management and chunk selection.
 */

import { describe, it, expect } from 'vitest';
import { fitToBudget, mergeAdjacentChunks, type BudgetResult } from '../src/selector/budget.js';
import type { RankedChunk } from '../src/selector/scoring.js';

// Helper to create mock ranked chunks
function createRankedChunk(
  filePath: string,
  tokens: number,
  startLine: number = 1,
  endLine: number = 10,
  score: number = 0.8
): RankedChunk {
  return {
    id: `chunk_${Math.random().toString(36).slice(2)}`,
    sourceId: 'test-source',
    filePath,
    content: `test content (${tokens} tokens)`,
    startLine,
    endLine,
    tokens,
    similarity: score,
    score,
    scoreBreakdown: {
      similarity: score,
      recency: 0.5,
      pathMatch: 0,
    },
  };
}

describe('fitToBudget', () => {
  it('should select chunks that fit within budget', () => {
    const chunks: RankedChunk[] = [
      createRankedChunk('src/a.ts', 100),
      createRankedChunk('src/b.ts', 100),
      createRankedChunk('src/c.ts', 100),
    ];

    const result = fitToBudget(chunks, 250);

    expect(result.chunks).toHaveLength(2);
    expect(result.totalTokens).toBe(200);
    expect(result.excluded).toBe(1);
  });

  it('should respect exact budget limit', () => {
    const chunks: RankedChunk[] = [
      createRankedChunk('src/a.ts', 100),
      createRankedChunk('src/b.ts', 100),
    ];

    const result = fitToBudget(chunks, 200);

    expect(result.chunks).toHaveLength(2);
    expect(result.totalTokens).toBe(200);
    expect(result.excluded).toBe(0);
  });

  it('should exclude chunk that would exceed budget', () => {
    const chunks: RankedChunk[] = [
      createRankedChunk('src/a.ts', 100),
      createRankedChunk('src/b.ts', 150), // Would exceed 200
      createRankedChunk('src/c.ts', 50), // Can still fit
    ];

    const result = fitToBudget(chunks, 200);

    expect(result.chunks).toHaveLength(2);
    expect(result.chunks[0].tokens).toBe(100);
    expect(result.chunks[1].tokens).toBe(50);
    expect(result.totalTokens).toBe(150);
    expect(result.excluded).toBe(1);
  });

  it('should handle empty input', () => {
    const result = fitToBudget([], 1000);

    expect(result.chunks).toHaveLength(0);
    expect(result.totalTokens).toBe(0);
    expect(result.excluded).toBe(0);
  });

  it('should handle zero budget', () => {
    const chunks: RankedChunk[] = [createRankedChunk('src/a.ts', 100)];

    const result = fitToBudget(chunks, 0);

    expect(result.chunks).toHaveLength(0);
    expect(result.excluded).toBe(1);
  });

  it('should sort output by file path then line number', () => {
    const chunks: RankedChunk[] = [
      createRankedChunk('src/b.ts', 50, 1, 10, 0.9),
      createRankedChunk('src/a.ts', 50, 20, 30, 0.8),
      createRankedChunk('src/a.ts', 50, 1, 10, 0.7),
    ];

    const result = fitToBudget(chunks, 200);

    expect(result.chunks[0].filePath).toBe('src/a.ts');
    expect(result.chunks[0].startLine).toBe(1);
    expect(result.chunks[1].filePath).toBe('src/a.ts');
    expect(result.chunks[1].startLine).toBe(20);
    expect(result.chunks[2].filePath).toBe('src/b.ts');
  });

  it('should handle single chunk larger than budget', () => {
    const chunks: RankedChunk[] = [createRankedChunk('src/a.ts', 1000)];

    const result = fitToBudget(chunks, 500);

    expect(result.chunks).toHaveLength(0);
    expect(result.excluded).toBe(1);
  });

  it('should preserve chunk properties', () => {
    const chunk = createRankedChunk('src/test.ts', 100, 5, 15, 0.85);
    chunk.content = 'specific content';
    chunk.sourceId = 'custom-source';

    const result = fitToBudget([chunk], 200);

    expect(result.chunks[0].content).toBe('specific content');
    expect(result.chunks[0].sourceId).toBe('custom-source');
    expect(result.chunks[0].score).toBe(0.85);
    expect(result.chunks[0].startLine).toBe(5);
    expect(result.chunks[0].endLine).toBe(15);
  });
});

describe('mergeAdjacentChunks', () => {
  it('should merge adjacent chunks from same file', () => {
    const chunks: RankedChunk[] = [
      createRankedChunk('src/a.ts', 50, 1, 10),
      createRankedChunk('src/a.ts', 50, 11, 20),
    ];

    chunks[0].content = 'part 1';
    chunks[1].content = 'part 2';

    const merged = mergeAdjacentChunks(chunks);

    expect(merged).toHaveLength(1);
    expect(merged[0].content).toBe('part 1\npart 2');
    expect(merged[0].startLine).toBe(1);
    expect(merged[0].endLine).toBe(20);
    expect(merged[0].tokens).toBe(100);
  });

  it('should not merge non-adjacent chunks', () => {
    const chunks: RankedChunk[] = [
      createRankedChunk('src/a.ts', 50, 1, 10),
      createRankedChunk('src/a.ts', 50, 20, 30), // Gap between 10 and 20
    ];

    const merged = mergeAdjacentChunks(chunks);

    expect(merged).toHaveLength(2);
  });

  it('should not merge chunks from different files', () => {
    const chunks: RankedChunk[] = [
      createRankedChunk('src/a.ts', 50, 1, 10),
      createRankedChunk('src/b.ts', 50, 1, 10),
    ];

    const merged = mergeAdjacentChunks(chunks);

    expect(merged).toHaveLength(2);
  });

  it('should handle single chunk', () => {
    const chunks: RankedChunk[] = [createRankedChunk('src/a.ts', 50)];

    const merged = mergeAdjacentChunks(chunks);

    expect(merged).toHaveLength(1);
  });

  it('should handle empty array', () => {
    const merged = mergeAdjacentChunks([]);
    expect(merged).toHaveLength(0);
  });

  it('should merge overlapping chunks', () => {
    const chunks: RankedChunk[] = [
      createRankedChunk('src/a.ts', 50, 1, 15),
      createRankedChunk('src/a.ts', 50, 10, 25), // Overlaps with first
    ];

    chunks[0].content = 'first chunk';
    chunks[1].content = 'second chunk';

    const merged = mergeAdjacentChunks(chunks);

    expect(merged).toHaveLength(1);
    expect(merged[0].startLine).toBe(1);
    expect(merged[0].endLine).toBe(25);
  });

  it('should correctly deduplicate overlapping content', () => {
    // Simulating chunks with 6-line overlap (lines 10-15 appear in both)
    const chunks: RankedChunk[] = [
      createRankedChunk('src/a.ts', 50, 1, 15),
      createRankedChunk('src/a.ts', 50, 10, 25),
    ];

    // First chunk: lines 1-15
    chunks[0].content = [
      'line 1',
      'line 2',
      'line 3',
      'line 4',
      'line 5',
      'line 6',
      'line 7',
      'line 8',
      'line 9',
      'line 10', // overlap starts
      'line 11',
      'line 12',
      'line 13',
      'line 14',
      'line 15', // overlap ends
    ].join('\n');

    // Second chunk: lines 10-25 (first 6 lines overlap with chunk 1)
    chunks[1].content = [
      'line 10', // overlapping
      'line 11',
      'line 12',
      'line 13',
      'line 14',
      'line 15', // overlap ends
      'line 16', // new content starts
      'line 17',
      'line 18',
      'line 19',
      'line 20',
      'line 21',
      'line 22',
      'line 23',
      'line 24',
      'line 25',
    ].join('\n');

    const merged = mergeAdjacentChunks(chunks);

    expect(merged).toHaveLength(1);

    // Verify no duplicate lines in merged content
    const lines = merged[0].content.split('\n');
    expect(lines).toHaveLength(25);

    // Verify lines are in order and not duplicated
    for (let i = 1; i <= 25; i++) {
      expect(lines[i - 1]).toBe(`line ${i}`);
    }
  });

  it('should keep highest score when merging', () => {
    const chunks: RankedChunk[] = [
      createRankedChunk('src/a.ts', 50, 1, 10, 0.7),
      createRankedChunk('src/a.ts', 50, 11, 20, 0.9),
    ];

    const merged = mergeAdjacentChunks(chunks);

    expect(merged[0].score).toBe(0.9);
    expect(merged[0].similarity).toBe(0.9);
  });

  it('should handle multiple merge groups', () => {
    const chunks: RankedChunk[] = [
      createRankedChunk('src/a.ts', 50, 1, 10), // Group 1
      createRankedChunk('src/a.ts', 50, 11, 20), // Group 1
      createRankedChunk('src/a.ts', 50, 50, 60), // Group 2 (gap)
      createRankedChunk('src/b.ts', 50, 1, 10), // Different file
    ];

    const merged = mergeAdjacentChunks(chunks);

    expect(merged).toHaveLength(3);
    expect(merged[0].filePath).toBe('src/a.ts');
    expect(merged[0].endLine).toBe(20);
    expect(merged[1].filePath).toBe('src/a.ts');
    expect(merged[1].startLine).toBe(50);
    expect(merged[2].filePath).toBe('src/b.ts');
  });
});
