# Backend Plan

## Goal

Add collaborative word cloud functionality with minimal backend complexity.

The backend should be:
- lightweight
- simple
- low cost
- easy to deploy
- easy to understand

Backend is planned for a later phase.
Frontend and visual prototype come first.

---

# Planned Stack

Use:
- Cloudflare Workers
- Cloudflare D1
- Server-Sent Events (SSE)

Avoid:
- custom server hosting
- complex backend frameworks
- authentication in first version
- WebSockets in first version
- unnecessary infrastructure

---

# Responsibilities

The backend should handle:
- creating word cloud sessions
- storing word submissions
- enforcing simple limits
- serving cloud data
- streaming live updates
- handling expiration

---

# Data Model

## word_clouds

Stores one collaborative word cloud.

Fields:
- id
- title
- prompt
- language
- expires_at
- max_words_per_client
- live_enabled
- created_at

## word_submissions

Stores submitted words.

Fields:
- id
- word_cloud_id
- client_id
- word
- normalized_word
- created_at

---

# API Endpoints

## Create cloud

POST /api/clouds

Creates a new word cloud.

## Get cloud

GET /api/clouds/:id

Returns cloud metadata.

## Submit words

POST /api/clouds/:id/words

Adds one or more words to a cloud.

## Get words

GET /api/clouds/:id/words

Returns submitted words.

## Live events

GET /api/clouds/:id/events

SSE endpoint for live word updates.

---

# Realtime Strategy

Use SSE for live updates.

Flow:
- contributor submits words using HTTP POST
- backend stores words in D1
- presentation page listens to SSE
- backend streams new word events
- presentation page updates the cloud

SSE is preferred because:
- simple
- browser-native
- enough for one-way live updates
- easier than WebSockets

---

# Client Identity

Use localStorage-based client identity.

The frontend generates a client_id and stores it in localStorage.

The backend uses client_id to:
- prevent duplicate word submissions
- enforce max words per contributor
- prevent same client from submitting same word repeatedly

This is not strong security.
It is good enough for a simple free collaborative tool.

---

# Validation Rules

Backend should validate:
- cloud exists
- cloud is not expired
- word is not empty
- word length is acceptable
- max words per client is not exceeded
- same client cannot submit the same normalized word twice

---

# Normalization

Submitted words should be normalized before comparison.

Basic normalization:
- trim whitespace
- lowercase
- collapse repeated spaces
- remove surrounding punctuation

Do not overcomplicate language processing in first version.

---

# Expiration

Expired clouds should:
- reject new submissions
- remain readable for viewing/export
- be eligible for cleanup later

No complex cleanup required in first version.

---

# Security

First version should be simple.

Use:
- input validation
- basic rate limiting if needed
- safe output encoding
- no secrets in frontend

Do not implement:
- login
- roles
- permissions
- payment
- complex moderation

---

# Future Ideas

Possible later additions:
- admin link
- password-protected clouds
- moderation queue
- banned words
- QR code generation
- export persistence
- WebSockets
- Durable Objects
- AI word grouping
- automatic cleanup jobs