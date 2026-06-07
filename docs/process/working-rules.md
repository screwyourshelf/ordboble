# Working Rules

## Goal

Maintain consistency, readability, visual quality, predictable architecture and incremental progress.

## General Rules

Prefer:
- simple solutions
- small reusable components
- readable code
- explicit structure
- incremental changes

Avoid:
- overengineering
- premature abstractions
- large rewrites
- unnecessary dependencies
- hidden magic

## Scope Rules

Implement only what the task requires.

Do not:
- redesign unrelated areas
- refactor unrelated systems
- introduce new architecture without approval
- add features outside scope

Keep changes small, targeted and reviewable.

## Visual Consistency Rules

Do not introduce new visual patterns unless explicitly requested.

Reuse:
- existing components
- existing spacing patterns
- existing gradients
- existing typography
- existing motion styles
- existing design tokens

Avoid visual drift.

## Component Rules

Components should be focused, reusable, small and readable.

Prefer composition over complexity.

## Tailwind Rules

Use Tailwind consistently.

Prefer semantic utility combinations, reusable patterns and token-based styling.

Avoid random inline styles, arbitrary values without reason and inconsistent spacing/colors.

## AI Workflow Rules

Before implementation:
1. Understand the task.
2. Identify impacted files.
3. Minimize scope.
4. Verify consistency with docs.

After implementation:
- review consistency
- review readability
- review visual alignment

## Priority Order

1. Correctness
2. Simplicity
3. Readability
4. Consistency
5. Cleverness
