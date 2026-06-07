export type ConnectedEvent = {
  type: 'connected';
  cloudId: string;
};

export type HeartbeatEvent = {
  type: 'heartbeat';
};

export type WordAddedPayload = {
  id: string;
  word: string;
  createdAt: string;
};

export type WordAddedEvent = {
  type: 'word_added';
  cloudId: string;
  word: WordAddedPayload;
};

export type CloudEvent = ConnectedEvent | HeartbeatEvent | WordAddedEvent;
