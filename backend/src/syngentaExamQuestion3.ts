import { createReadStream } from 'fs';
import { createInterface } from 'readline';

/*
* in this excersice we are going to find the most repeated word in a file
* removing sorting to avoid unnecessary processing and leaveraging the stream to process the file
*/

export async function mostRepeatedWord(path: string): Promise<{ word: string; count: number }> {
  return new Promise((resolve, reject) => {
    const wordsCount: Map<string, number> = new Map();
    let mostRepetedWord = '';
    let maxCount = 0;

    const stream = createReadStream(path, { encoding: 'utf-8' });
    const rl = createInterface({
      input: stream,
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => { // process line by line instead of loading the whole file into memory
      const words = line.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/);
      for (const word of words) {
        if (word) {
          const newCount = (wordsCount.get(word) || 0) + 1;
          wordsCount.set(word, newCount);
            
          // Check if this word is now the most repited
          if (newCount > maxCount) {
            maxCount = newCount;
            mostRepetedWord = word;
          }
        }
      }
    });

    rl.on('close', () => {
      resolve({ word: mostRepetedWord, count: maxCount });
    });

    rl.on('error', (err) => {
      reject(new Error(`Error processing the file: ${err.message}`));
    });
  });
}

// test the function
(async () => {
  try {
    const result = await mostRepeatedWord('sampleText.txt');
    console.log(`The most repeated word is "${result.word}" with ${result.count} occurrences.`);
  } catch (error) {
    console.error((error as Error).message);
  }
})();