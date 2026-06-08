export type CreateSessionRequest = {
  title: string;
  prompt?: string;
  language?: string;
  maxWordsPerClient?: number;
  liveEnabled?: boolean;
  themeId?: string;
  shapeId?: string;
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
  themeId: string;
  shapeId: string;
};
