---
title: Order of volatility, and why disk can wait
summary: The sequence you collect evidence in decides what evidence you still have. A practical walk through the order of volatility and the mistakes that cost me data in the lab.
published: 2025-03-18
tags: ['Forensics', 'Incident Response', 'Volatility']
readingTime: 6
---

The first time I worked a simulated incident I did the obvious thing: powered the
machine down cleanly, imaged the disk, and started analysis. It felt careful. It
was, in fact, the single most destructive thing I could have done.

## What volatility means in practice

Evidence has a half-life. Some of it survives a power cut indefinitely; some of
it is gone the instant the process exits. RFC 3227 sets out the ordering, and it
is worth internalising rather than looking up:

1. CPU registers and cache
2. Routing tables, ARP cache, process table, kernel statistics, RAM
3. Temporary filesystems
4. Disk
5. Remote logging and monitoring data
6. Physical configuration and network topology
7. Archival media

The rule is simply: **collect in decreasing order of volatility.** Anything above
the thing you are currently collecting is being lost while you work.

## What I actually lost

Powering that machine down cost me, in order of how much it hurt:

- **The process list.** A process that never wrote to disk left no trace once
  memory was gone. The disk image showed no evidence it had ever run.
- **Network connections.** Active connections to a command-and-control address.
  There is no disk artefact for a socket.
- **Injected code.** Anything living only in another process's address space
  simply ceased to exist.
- **Keys and credentials.** Whatever had been decrypted into memory went with it.

I found the *dropper* on disk. I could not show what it had done, because the
part that did things had never touched the filesystem.

## The order I use now

For a machine that is still running and suspected of compromise:

```
1. Photograph the screen; note the time and any visible state
2. Capture RAM               (before anything else touches the machine)
3. Capture volatile network + process state
4. Only then: shut down and image the disk
5. Pull logs from remote systems, which are not under the attacker's control
```

The awkward part is step 2. Taking a memory capture requires running a tool on
the machine, which changes the machine. There is no way around this — you are
choosing between a small, documented change and losing the evidence entirely.
So you document it: which tool, which version, what it touched, at what time.

## Documenting the compromise you chose

This is the bit that separates a finding from a story. For every acquisition I
record:

- **Tool and version** used, and the hash of the tool binary itself
- **Timestamp** of the start and end of acquisition
- **Hash of the output**, computed immediately and re-verified before analysis
- **What the tool is known to alter** on the target

If someone later asks "how do you know the attacker did not plant this?", the
answer has to be evidence, not assurance. The hashes are the answer.

## The shutdown question

Pulling the plug versus a clean shutdown is a genuine trade-off, not a
best-practice question with one answer:

- **Clean shutdown** lets the OS flush buffers, so the filesystem is consistent —
  but it also runs shutdown scripts, which is exactly where anti-forensic
  cleanup lives.
- **Pulling the plug** freezes the disk mid-state and denies anything the chance
  to clean up — at the cost of a possibly inconsistent filesystem and any
  unflushed data.

For a suspected compromise, after the memory capture is safely taken, I pull the
plug. The filesystem inconsistency is recoverable. Cleanup scripts are not.

## The short version

Collect memory before disk. Document the changes your own tools make. Hash
everything immediately. And do not power down a machine to "preserve" it — that
sentence contains its own contradiction.
