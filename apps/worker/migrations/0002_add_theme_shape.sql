-- Migration 0002: add theme_id and shape_id to word_clouds
-- Safe defaults: existing rows will read as 'playful' / 'freeform'

ALTER TABLE word_clouds ADD COLUMN theme_id TEXT NOT NULL DEFAULT 'playful';
ALTER TABLE word_clouds ADD COLUMN shape_id  TEXT NOT NULL DEFAULT 'freeform';
