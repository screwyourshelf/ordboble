# Iteration Loop

## Goal

Ensure predictable implementation, controlled scope, reviewable changes and consistent quality.

## Role Flow

Small task:
Architect → Developer

Medium task:
Architect → Developer → Reviewer

Large or critical task:
Architect → Developer → Tester → Reviewer → Gatekeeper

## Role Rules

- Only one role active at a time.
- Each role acts independently.
- Do not combine roles.
- Do not skip required roles.
- Each role reads previous outputs.
- Each role writes only its own section.

## Required Order

1. Architect
2. Developer
3. Tester
4. Reviewer
5. Gatekeeper

## Scope Rules

Do not:
- expand scope
- redesign unrelated systems
- add unrelated features
- rewrite architecture without approval

## Documentation Rules

If implementation changes architecture, structure or conventions, update relevant docs.
