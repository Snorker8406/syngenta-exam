import { join } from 'path';
import { textWordsAnalisys } from './syngentaExamQuestion2';

describe('textWordsAnalisys question 2 unit test', () => {
  const sampleFilePath = join(__dirname, './mocks/sampleText.txt');
  const emptyFilePath = join(__dirname, './mocks/emptyFile.txt');
  const invalidFilePath = join(__dirname, '/mocks/nonExistentFile.txt');
  const largeFilePath = join(__dirname, './mocks/largeSampleText.txt');

  it('should count words and return a sorted list of words and their counts', async () => {
    const result = await textWordsAnalisys(sampleFilePath);
    const expected = [
      ['hola', 3],
      ['mundo', 2],
      ['hello', 2],
      ['world', 1],
    ];
    expect(result).toEqual(expected);
  });

  it('should handle empty files', async () => {
    const result = await textWordsAnalisys(emptyFilePath);
    expect(result).toEqual([]);
  });

  it('should throw an error for null or undefined input', async () => {
    await expect(textWordsAnalisys(null as unknown as string)).rejects.toThrow(
      'Error processing the file: Path must be a string'
    );

    await expect(textWordsAnalisys(undefined as unknown as string)).rejects.toThrow(
      'Error processing the file: Path must be a string'
    );
  });

  it('should throw an error for invalid file paths', async () => {
    await expect(textWordsAnalisys(invalidFilePath)).rejects.toThrow(
      'ENOENT: no such file or directory'
    );
  });

  it('should perform well for large files', async () => {
    const start = performance.now();
    const result = await textWordsAnalisys(largeFilePath);
    const end = performance.now();
    const executionTime = end - start;

    console.log(`Execution time for large file: ${executionTime.toFixed(2)}ms`);
    const performanceThreshold = 50; // 50 milliseconds
    expect(executionTime).toBeLessThan(performanceThreshold);
    expect(result.length).toBeGreaterThan(0); // Ensure it processed some words
  });
});