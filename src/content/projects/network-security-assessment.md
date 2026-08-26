---
title: PhishGuard-AI
summary: Phishing URL detection system that normalises URLs, extracts heuristic features, and runs model inference to identify suspicious links.
order: 4
featured: false
year: '2026'
status: complete
category: ai-ml
tags: ['Python', 'pandas', 'scikit-learn', 'XGBoost', 'Streamlit', 'Flask']
hue: 22
---

## The problem

Phishing campaigns continue to exploit user trust and weak verification habits. A practical detection model should make it easy to assess a URL from a few clear risk signals without requiring a full security investigation every time.

## Approach

I built the backend prediction pipeline and connected it to a user-friendly demo interface:

- **URL normalisation** — cleaned and structured URL inputs before feature extraction.
- **Heuristic feature engineering** — derived 11 meaningful indicators from the URL and metadata.
- **Model inference** — applied trained model and scaler logic for prediction.
- **Demo resilience** — included graceful fallback handling if model artifacts are unavailable, so the demo remains usable and understandable.
- **Frontend delivery** — integrated the pipeline into a Streamlit interface for quick, accessible testing.

## What I learned

- **Prediction is only useful when the pipeline is resilient.** A system that crashes when its model artifacts are missing is not a usable security tool.
- **Feature quality matters more than model glamour.** A few well-understood indicators are often more valuable than a model that is impressive but opaque.
- **The product experience matters.** If the demo feels trusted and understandable, it gives a much stronger signal of practical value.

## Status

Completed as an AI mini-project. The demo is published at phishguard-ai.2026.streamlit.app and the source is available via the project repository.
