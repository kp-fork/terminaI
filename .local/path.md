# TermAI Build Path

> Quick 1-hour vibe coding approach to get TermAI working

---

## The Approach

1. **Fork gemini-cli** (TypeScript, Node.js) — it already has:
   - Native OAuth authentication (your $20/month subscription)
   - Tool calling (shell, grep, web search, file editing)
   - Agentic behavior (executes commands, confirms destructive actions)
   - Context/memory management

2. **Modify the system prompt** to make it a general terminal agent (not
   coding-specific)

3. **Add voice mode** (Whisper STT + edge-tts TTS) as a wrapper

---

## Key Insight

The gemini-cli source code at `packages/core/src/core/prompts.ts` line 138 says:

```typescript
preamble: `You are an interactive CLI agent specializing in software engineering tasks.
```

We change this to:

```typescript
preamble: `You are TermAI, the AI that IS your terminal. You own this shell like a human operator — you can run any command, monitor any process, and handle any task.
```

And modify the workflows to be general-purpose.

---

## Prerequisites

- Node.js 20+
- Your existing `gemini` login (OAuth credentials in `~/.gemini/`)
- For voice (later): Python 3.12+, ffmpeg, portaudio

---

## Build Steps

### Step 1: Clone (Done)

```bash
cd /home/profharita/Code/termAI
# Already contains gemini-cli source
```

### Step 2: Modify System Prompt

Edit `packages/core/src/core/prompts.ts`:

- Change preamble to general terminal agent
- Remove coding-specific mandates
- Add system awareness

### Step 3: Build and Test

```bash
npm ci
npm run build
npm run start
```

### Step 4: Test Core Flows

- "What's eating my CPU?"
- "Install htop"
- "What's the weather in Austin?"
- "Kill process 1234"

### Step 5: Add Voice (Phase 2)

- Create voice wrapper with Whisper + edge-tts
- Add `--voice` flag to CLI

---

## Voice Implementation (Phase 2)

```typescript
// packages/cli/src/voice/stt.ts
// Spawn Whisper subprocess for speech-to-text

// packages/cli/src/voice/tts.ts
// Spawn edge-tts subprocess for text-to-speech

// packages/cli/src/voice/voice-mode.ts
// Main voice loop: listen → transcribe → process → speak
```

---

## Alias (After Working)

```bash
alias jarvis='cd /home/profharita/Code/termAI && npm run start -- --voice'
```
