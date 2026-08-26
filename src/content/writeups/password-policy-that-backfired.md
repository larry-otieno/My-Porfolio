---
title: The password policy that backfired
summary: A strict policy on the Secure Farm Database made the system measurably less secure. What went wrong, and the controls I replaced it with.
published: 2024-11-09
tags: ['Usability', 'Authentication', 'Threat Modelling']
readingTime: 5
---

While building the [Secure Farm Database](/My-Porfolio/projects/secure-farm-database)
I wrote what I thought was a responsible password policy: sixteen characters
minimum, upper and lower case, a digit, a symbol, and a forced rotation every
sixty days.

At the first pilot visit there was a sticky note on the laptop with the password
written on it. In handwriting. On the machine the password protected.

## What I had actually optimised for

My policy defended well against an offline brute-force attack on a stolen
password hash. That was the threat I had in my head, because it is the threat
the textbook chapter is about.

The threat that actually existed was different. This was a **shared laptop in a
co-operative office**, used by people who were not going to memorise a
sixteen-character random string, rotating every two months, for a system they
used twice a week. The realistic adversary was someone with physical access to
the room.

Against that adversary, my policy did not just fail to help. It actively
manufactured the vulnerability, by making the secure path impossible to follow.

## The general shape of the mistake

A control people cannot comply with does not produce compliance. It produces a
workaround, and the workaround is now your actual security posture — except you
did not design it, you cannot see it, and it was chosen for convenience rather
than safety.

Some familiar examples of the same pattern:

- Rotation policies that produce `Summer2024!` → `Autumn2024!`
- Blanket USB blocks that produce personal cloud accounts for file transfer
- Alert thresholds so noisy the team stops reading the alerts

In each case a reasonable-sounding rule pushed behaviour somewhere worse and
less visible.

## What I replaced it with

Aligned closer to what NIST SP 800-63B actually recommends, and to the real
threat model:

| Removed | Added |
|---|---|
| 16-character complexity rules | 12-character minimum, no composition rules |
| 60-day forced rotation | Rotation only on suspected compromise |
| — | Blocklist of common and breached passwords |
| — | Account lockout after repeated failures |
| — | Passphrase guidance with concrete examples |
| — | Per-user accounts, so the audit log means something |

The passphrase guidance mattered more than any of the rules. Once people saw
that four unrelated words were both acceptable and memorable, they stopped
writing anything down.

## The control that actually addressed the threat

None of the above defends against someone sitting at the shared laptop. What
does:

- **Encryption at rest**, so a stolen machine is not a stolen ledger.
- **Short idle timeout**, so an unattended session closes itself.
- **Append-only audit log**, so actions are attributable after the fact.

The audit log turned out to be the feature the pilot users valued most, which I
did not predict. It resolved disputes about who entered what. A security control
they wanted to use, rather than one they had to.

## What I take from it

Threat-model the deployment you actually have. The textbook adversary is remote,
patient and computationally well-resourced; the adversary in a shared office is
none of those things and is standing next to the machine.

And check what your policy does to behaviour. If the secure path is the hard
path, you have not secured anything — you have just moved the problem somewhere
you cannot see it.
