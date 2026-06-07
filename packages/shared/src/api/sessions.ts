// TODO: Expand when session API is implemented.

export type CreateSessionRequest = {
  title: string;
  prompt?: string;
  language?: string;
};

export type SessionResponse = {
  id: string;
  title: string;
  prompt?: string;
  language: string;
  createdAt: string;
  expiresAt?: string;
};
