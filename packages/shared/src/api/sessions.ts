export type CreateSessionRequest = {
  title: string;
  prompt?: string;
  language?: string;
  maxWordsPerClient?: number;
  liveEnabled?: boolean;
};

export type SessionResponse = {
  id: string;
  title: string;
  prompt?: string;
  language: string;
  joinCode: string;
  maxWordsPerClient: number;
  liveEnabled: boolean;
  createdAt: string;
  expiresAt?: string;
};
