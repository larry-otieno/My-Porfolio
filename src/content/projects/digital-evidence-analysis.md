---
title: Oasis of Peace
summary: Full-stack platform for a school and children’s home, serving a public marketing site, parent portal and role-based staff dashboard from one codebase.
order: 5
featured: true
year: '2026'
status: complete
category: security
tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'RBAC', 'Paystack', 'CI/CD']
hue: 190
---

## The problem

St. Mary Magdalene Oasis of Peace needed a single platform to serve three different audiences without fragmenting the experience: the public, parents, and staff with role-specific responsibilities. The system also had to include security-sensitive workflows such as donations, role-based access, and two-factor authentication.

## Approach

I owned the frontend end-to-end and contributed significantly to the backend architecture in a two-person team:

- **Frontend architecture** — built the full Next.js 16 / React 19 / TypeScript interface across 17 feature modules, 52 routes, 26 dashboard pages and roughly 200 components.
- **User-scoped experience** — implemented dark mode and cookie-consent-gated GA4 analytics, making the product usable without compromising privacy expectations.
- **Security-by-default** — co-designed a six-role RBAC + ABAC policy engine covering 31 guarded resources and helped implement email OTP two-factor authentication, refresh-token rotation, and a CSP with per-request nonces.
- **Payments and finance** — integrated Paystack donations with server-side verification and idempotent webhooks, then built fee and balance dashboards that calculate live per-parent financial status.
- **Delivery pipeline** — set up GitHub Actions CI/CD with ESLint, TypeScript checks and PHP quality gates as merge protection.

## What I learned

- **Security controls must be invisible and usable.** The controls were only valuable when they fit real workflows rather than forcing users around them.
- **Frontend architecture affects trust.** Clean data boundaries, clear permissions, and consistent UX make a platform feel secure even before the backend logic is reviewed.
- **Product work is operational work.** Finance dashboards and donation flows required the same attention to correctness and auditing as the authentication layer.

## Status

Completed as a full-stack production-style platform for a real organisation. The code is in a private repository, but the architecture and security model can be demonstrated on request.
