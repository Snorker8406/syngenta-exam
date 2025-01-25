import { readFile } from 'fs/promises';


export async function testWordsAnalisys(testFilePath) {
  try {
    const contentText = await readFile(testFilePath, 'utf-8');

    const words = contentText.toLowerCase() // key insensitive
      .replace(/[^a-z0-9\s]/g, '') //regex to remove special characters
      .split(/\s+/); // regex to split by spaces

    const count: Map<string, number> = new Map(); // Map to store the count of each word ['word', count]

    for (const word of words) {
      if (word) {
        count.set(word, (Number(count.get(word)) || 0) + 1); // if word already exists, increment count
      }
    }
    const wordsList = Array.from(count.entries());
    return wordsList.sort((a, b) => b[1] - a[1]); // desc order by count
  } catch (err) {
    throw new Error(`error at processing text: ${err.message}`);
  }
}

// Ejecución principal para probar la función
(async () => {
  try {
    const result = await testWordsAnalisys('sampleText.txt');
    console.log("word's list: ");
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
})();