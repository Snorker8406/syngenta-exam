import { createReadStream } from 'fs';
import { createInterface } from 'readline';

/*
* with this function we can count the words in a file using streams
* this increase performance and reduce memory usage in case of a big file
*/
export async function textWordsAnalisys(path: string): Promise<[string, number][]> {
  return new Promise((resolve, reject) => {
    const wordsCount = new Map(); 

    const fileStream = createReadStream(path, { encoding: 'utf-8' });
    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity, 
    });

    rl.on('line', (line) => { // process line by line instead of loading the whole file into memory
        const words = line.toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/);
      for (const word of words) {
        if (word) {
          wordsCount.set(word, (wordsCount.get(word) || 0) + 1);
        }
      }
    });

    rl.on('close', () => {
      resolve(Array.from(wordsCount.entries()).sort((a, b) => b[1] - a[1])); // desc order by count
    });

    rl.on('error', (err) => {
      reject(new Error(`error at processing text: ${err.message}`));
    });
  });
}


(async () => {
  try {
    const result = await textWordsAnalisys('sampleText.txt');
    console.log("word's list: ");
    console.log(result);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
})();