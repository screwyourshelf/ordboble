export type SubmitWordsRequest = {
  clientId: string;
  words: string[];
};

export type SubmittedWordResponse = {
  id: string;
  cloudId: string;
  clientId: string;
  word: string;
  normalizedWord: string;
  createdAt: string;
};
