---
title: Secure Farm Database
summary: Offline-first record system for small-scale farmers, designed around shared-device access and limited connectivity with security controls built in.
order: 2
featured: true
year: '2024'
status: complete
category: database
tags: ['Python', 'SQLite', 'Access Control', 'Encryption', 'Audit Logging']
hue: 152
---

## The problem

Small-scale farmers often work in environments where a shared machine and unreliable connectivity are the norm. The challenge was not only to store records, but to preserve accountability and confidentiality in an environment where security assumptions need to be realistic, not idealised.

## Approach

I built a local Python application over SQLite with the real deployment conditions in mind:

- **Per-user access control** — hashed and salted credentials tied to specific responsibilities.
- **Role separation** — owner and worker workflows were separated so access matched actual job functions.
- **Encryption at rest** — protected the database file against theft or unauthorised access on a shared laptop.
- **Audit logging** — tracked changes to records and made accountability visible to the user.
- **Safe query patterns** — parameterised queries to reduce injection risk in text-heavy forms.

## What I learned

- **Real deployments shape the security model.** A shared office laptop is a different threat model from a personal device or cloud-first workflow.
- **Security features must accommodate usability.** A policy that is too strict fails because people work around it.
- **Backup and integrity are part of security.** Data durability matters as much as confidentiality and access control.

## Status

Completed and piloted in a realistic shared-device environment. The design priorities still shape how I approach secure application architecture today.
