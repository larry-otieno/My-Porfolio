---
title: A third of my scanner's findings were wrong
summary: Verifying every automated finding by hand on a lab network assessment, what the false positives had in common, and why unverified output damages a report more than a missed finding.
published: 2025-01-27
tags: ['Security', 'Vulnerability Assessment', 'Reporting']
readingTime: 7
---

On an authorised assessment of a lab network I ran the usual automated scan,
got a satisfying list of high-severity findings, and started writing them up.
Then my supervisor asked a reasonable question: *had I confirmed any of them?*

I had not. When I did, roughly a third did not survive.

## What the false positives had in common

They were not random. Nearly all of them fell into four groups.

### Version banners that lied

The largest group by far. The scanner read a service banner, matched the version
against a CVE list, and reported the vulnerability. But:

- Distributions **backport security patches** without changing the version
  string. A Debian package reporting `1.2.3` may carry every fix from `1.2.9`.
- Some administrators **change the banner deliberately**, which is weak
  obfuscation but does defeat naive matching.

Checking the actual package changelog resolved most of these in minutes.

### Vulnerabilities in code paths that were not reachable

A library was genuinely present and genuinely vulnerable — but the vulnerable
function was in a module the application never loaded. The finding was
technically accurate and practically meaningless.

### Findings that assumed a configuration that was not there

A default-credentials finding on a service where authentication had been moved
behind a reverse proxy. The scanner tested the service directly; nothing else
could reach it that way.

### Duplicate findings wearing different names

The same underlying misconfiguration reported three times under three CVE
identifiers, which inflated the count and made the report look worse than the
network was.

## The verification loop

What I do now, for every automated finding, before it goes anywhere near a report:

1. **Confirm the software and version independently** of the banner — package
   manager, file hashes, or the application's own version output.
2. **Confirm the vulnerable code path is reachable** in this deployment.
3. **Confirm the preconditions hold** — required configuration, required
   privileges, required network position.
4. **Demonstrate it**, if demonstrating is in scope and changes the rating.
5. **Record what I did to verify**, so the reader can check my work.

If a finding cannot pass steps 1–3, it does not appear as a finding. If it is
still worth mentioning, it goes in an observations appendix flagged as
unverified — clearly separated from the things I am asserting.

## Sorting by CVSS was making the report worse

My first draft ranked findings by CVSS score, which is what the scanner
produced. That put a critical-rated flaw at the top which required local
administrative access on a host nobody could reach, and buried a medium-rated
one that was reachable from the guest wireless network with no credentials.

The second draft ranked by **exploitability in this environment**, then impact.
It looked much less impressive — fewer criticals — and it was far more useful.
The remediation order changed completely.

The scanner does not know your network. Its score cannot account for
reachability, compensating controls, or what the host actually does. That
judgment is the part of the job you are being asked for.

## Why this matters more than the missed findings

A missed finding is a gap. A false positive you asserted confidently is
different in kind: it teaches the reader that your report needs checking. Once
they believe that, every real finding you produced costs them verification time,
and the genuinely urgent one competes for attention with noise you created.

The scan takes minutes. The verification took me two days. The two days are the
work.
