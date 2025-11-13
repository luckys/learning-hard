---
title: Design System
description: Build a cohesive Tailwind design system inspired by the forum mockups.
---

# Design System

## Objectives

- Configure Tailwind theme tokens for colors, typography, spacing, and shadows matching the dark UI.
- Create reusable components: buttons, badges, cards, avatars, alerts, pagination controls.
- Document utility classes and component variants for consistency.

## Steps

1. Extend `tailwind.config.ts` with custom color palette (`slate-950`, accent blues/oranges, success/error).
2. Define CSS variables or Tailwind plugin for semantic tokens (e.g., `--surface`, `--surface-muted`).
3. Implement components inside `src/components/ui/` with props typed via discriminated unions (e.g., `variant`, `size`).
4. Showcase components in Storybook or a local style guide route (`/styleguide`).

## Deliverables

- Tailwind configuration file with documented tokens.
- Component stories/examples demonstrating states (hover, focus, disabled).
- Accessibility checklist ensuring contrast ratios and focus outlines.

Next: ensure quality with [Testing Strategy](../9.testing-and-quality/testing-strategy).
