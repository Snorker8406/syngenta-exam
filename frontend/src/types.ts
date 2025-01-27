export type Word = [string, number];

export type FileAnalisysResponse = {
  message: string;
  file: string;
  words: Word[];
};