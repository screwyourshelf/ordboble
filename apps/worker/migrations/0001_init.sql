-- Migration 0001: initial schema

CREATE TABLE word_clouds (
  id                   TEXT    PRIMARY KEY,
  title                TEXT    NOT NULL,
  prompt               TEXT,
  language             TEXT    NOT NULL DEFAULT 'no',
  join_code            TEXT    NOT NULL UNIQUE,
  expires_at           TEXT,
  max_words_per_client INTEGER NOT NULL DEFAULT 5,
  live_enabled         INTEGER NOT NULL DEFAULT 1,
  created_at           TEXT    NOT NULL
);

CREATE TABLE word_submissions (
  id              TEXT NOT NULL PRIMARY KEY,
  word_cloud_id   TEXT NOT NULL REFERENCES word_clouds(id),
  client_id       TEXT NOT NULL,
  word            TEXT NOT NULL,
  normalized_word TEXT NOT NULL,
  created_at      TEXT NOT NULL,
  UNIQUE (word_cloud_id, client_id, normalized_word)
);

CREATE INDEX idx_word_submissions_cloud_id ON word_submissions (word_cloud_id);
