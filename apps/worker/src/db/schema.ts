/** D1 row shape for the word_clouds table. */
export type WordCloudRow = {
  id: string;
  title: string;
  prompt: string | null;
  language: string;
  join_code: string;
  expires_at: string | null;
  max_words_per_client: number;
  live_enabled: number; // stored as 0/1 in SQLite
  created_at: string;
  theme_id: string;
  shape_id: string;
};

/** D1 row shape for the word_submissions table. */
export type WordSubmissionRow = {
  id: string;
  word_cloud_id: string;
  client_id: string;
  word: string;
  normalized_word: string;
  created_at: string;
};
