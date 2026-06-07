// TODO: Expand when SSE realtime is implemented.

export type WordAddedEvent = {
  type: 'word_added';
  sessionId: string;
  word: string;
};

export type HeartbeatEvent = {
  type: 'heartbeat';
};

export type SessionEvent = WordAddedEvent | HeartbeatEvent;
