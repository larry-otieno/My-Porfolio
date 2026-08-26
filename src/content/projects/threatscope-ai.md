---
title: ThreatScope AI
summary: Threat prediction platform that scores open-source signals and surfaces the most relevant indicators before a campaign escalates.
order: 1
featured: true
year: '2025'
status: complete
category: ai-ml
tags: ['Python', 'Machine Learning', 'Threat Intelligence', 'NLP']
hue: 214
---

## The problem

Security teams often discover threats only after the noise has already reached them. Public signals exist earlier than that — social chatter, lookalike domains, paste-site disclosures and suspicious feed activity — but they are scattered and hard to assess consistently.

ThreatScope AI was designed to collect those signals, rank the most relevant ones, and help an analyst understand why they matter.

## Approach

The pipeline runs through a few structured stages:

1. **Collection** — pull public threat-related signals into a normalised event store.
2. **Enrichment** — extract indicators and cross-reference them with known bad sources and context.
3. **Scoring** — rank events by likely relevance and severity using a model trained on threat signal patterns.
4. **Presentation** — display ranked findings with evidence attached so they are credible to a human analyst.

## What I learned

The hard part was not the model itself — it was making the data pipeline trustworthy and explainable:

- **Deduplication and normalisation matter** — the same advisory will appear in multiple forms across different sources.
- **Explainability beats raw accuracy** — an analyst needs to see the evidence behind a score to trust it.
- **Rate limits and reliability shape the design** — collection must be queued and restart-safe, otherwise the timeline becomes unreliable.

## Status

In active development. The collection and enrichment flow is working, and the scoring layer is being refined as the project matures.
