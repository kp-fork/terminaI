# Voice Implementation — Status + Next Improvements

## Status (v1 complete)

- ✅ **Desktop (Tauri)**: offline STT+TTS (download once → offline) with
  barge‑in and natural turn-taking
- ✅ **Desktop**: speaks assistant replies and tool confirmation prompts
  (including Level C PIN prompts)
- ✅ **CLI**: TTS spoken replies and spoken confirmations (`terminai --voice`)
- ✅ **Installer**: `terminai voice install` downloads + installs
  `whisper.cpp` + model + `piper` + voice model into `~/.terminai/voice`
  (auto-extracts archives)
- ✅ **Linux-first**: Linux supported; Windows/macOS supported where binaries
  are available

## What’s intentionally not in v1

- CLI microphone capture + true press-and-hold PTT (terminal limitations make
  this unreliable)

## Next improvements (optional)

1. **Deeper/male voice selection**
   - Add a Desktop setting to choose a piper `.onnx` model from
     `~/.terminai/voice`
   - Optionally expand `terminai voice install` to download additional curated
     voices
2. **Voice-driven confirmations**
   - After speaking a confirmation prompt, listen for a short “yes/no” and send
     the tool outcome automatically
   - Always keep click/PIN as the backstop (voice is convenience, not security)
3. **Spoken text rewriting**
   - Optional pre-processing step to rewrite long markdown answers into a 1–2
     sentence spoken summary
4. **Voice UX polish**
   - Better interruption (“barge-in”) tuning, latency metrics, and clearer
     on-screen states for Listening/Thinking/Speaking
