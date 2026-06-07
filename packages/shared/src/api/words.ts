// TODO: Expand when word submission API is implemented.

export type SubmitWordsRequest = {
  words: string[];
};

export type SubmittedWordResponse = {
  id: string;
  sessionId: string;
  word: string;
  createdAt: string;
};
