import { PathLike } from 'fs';
import { FileHandle, readFile } from 'fs/promises';


export async function textWordsAnalisys(textFilePath: string) {
  try {
    const contentText = await readFile(textFilePath, 'utf-8');

    const words = contentText.toLowerCase() // key insensitive
      .replace(/[^a-z0-9\s]/g, '') //regex to remove special characters
      .split(/\s+/); // regex to split by spaces

    const wordsCount: Map<string, number> = new Map(); // Map to store the count of each word ['word', count]

    for (const word of words) {
      if (word) {
        wordsCount.set(word, (Number(wordsCount.get(word)) || 0) + 1); // if word already exists, increment count
      }
    }
    const wordsList = Array.from(wordsCount.entries());
    return wordsList.sort((a, b) => b[1] - a[1]); // desc order by count
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`error at processing text: ${err.message}`);
    } else {
      throw new Error('error at processing text: unknown error');
    }
  }
}

// test the function
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