# Session Handoff

## Project

Green Life — React Native mobile app for scanning/searching products and returning source-backed environmental impact data.

Workspace: `C:\Users\leew\OneDrive\Documents\Playground\green-life`

---

## Important: Project Structure

The **running app** uses root-level directories only:
- `screens/` — all active screens
- `navigation/AppNavigator.tsx` — navigation root
- `App.tsx` → `index.js` → `navigation/AppNavigator.tsx`

The `src/` directory is a disconnected parallel structure — Metro does **not** load it. Do not edit files in `src/` expecting them to appear in the app.

---

## Current Stack

- Expo SDK 54
- React Native 0.81.5
- React 19.1.0
- TypeScript
- React Navigation (native stack + bottom tabs)
- Ionicons (`@expo/vector-icons`)
- expo-av, expo-speech, expo-camera, expo-image-picker
- react-native-safe-area-context

---

## Current State (as of 2026-03-29)

All screens running on device with mock/placeholder data. Voice Ask feature live.

### Screens

| Screen | File | Status |
|--------|------|--------|
| Splash | `screens/SplashScreen.tsx` | Done |
| Login | `screens/LoginScreen.tsx` | Done |
| Home | `screens/HomeScreen.tsx` | Done |
| Search | `screens/SearchScreen.tsx` | Done — mic icon in search bar opens Voice Ask |
| Scan | `screens/ScanScreen.tsx` | Done — Food / Material / Barcode modes |
| Result | `screens/ResultScreen.tsx` | Done — all 3 data shapes (food, material, product) |
| Community | `screens/CommunityScreen.tsx` | Done |
| Profile | `screens/ProfileScreen.tsx` | Done |
| Voice Ask | `screens/VoiceAskScreen.tsx` | Done — text → Claude API → expo-speech TTS |

### Navigation

- `navigation/AppNavigator.tsx` — root stack: Splash → Login → MainTabs → Result → VoiceAsk
- Bottom tabs: Home, Search, Scan, Community, Profile
- VoiceAsk opens as modal (`slide_from_bottom`) from mic icon in Search bar

### Voice Ask

- Entry: mic icon (gold circle) in Search screen search bar
- Flow: type question → Claude API (claude-haiku-4-5-20251001) → spoken response via expo-speech
- No OpenAI / Whisper dependency — removed. Only `EXPO_PUBLIC_ANTHROPIC_API_KEY` needed.
- Needs Anthropic account credits to function (console.anthropic.com → Billing)

### Design System

- `DESIGN.md` — full design contract, source of truth
- Design system reference: https://v0-design-system-eta-jade.vercel.app/
- Dark Forest palette: `#0E1A0F` bg, `#4A9B5F` green, `#C8A96E` gold
- Plus Jakarta Sans (self-hosted: Light, Regular, Medium, SemiBold)
- Icons: Ionicons (`@expo/vector-icons`)

---

## Environment Variables

```
# Required for Voice Ask
EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-...

# No longer needed — Whisper removed
# EXPO_PUBLIC_OPENAI_API_KEY=...

# For live backend (not yet deployed)
EXPO_PUBLIC_USE_MOCK_API=false
EXPO_PUBLIC_API_BASE_URL=https://your-api.render.com/api/v1
```

---

## Run Instructions

```powershell
npm.cmd start
```

If you see unexpected behavior that doesn't match recent changes, clear Metro cache:

```powershell
npx expo start --clear
```

---

## Next Steps (Priority Order)

1. **Deploy backend API** — Render or Railway. Primary blocker for all live data below.
   - Backend scaffolded in `server/`
   - DB migrations 001, 002, 003 ready to run
   - Service specs written: `visionService`, `foodEmissionService`, `materialImpactService`, `sparksService`, `usdaService`, `climatiqService`

2. **Wire authentication** — Supabase Auth recommended. Guest login path already set up in Onboarding.

3. **Run DB migrations** — run 001, 002, 003 in order after deploy. Then add Google Vision API key.

4. **Wire Scan → Result (photo flow)** — food and material image lookup via visionService + emission services.

5. **Wire Scan → Result (barcode + text search)** — barcode lookup and text search flows.

6. **Wire Profile** — real user stats + sign out.

7. **Wire Community / Sparks feed** — live leaderboard and Sparks feed.

8. **Guest login / freemium path** — Onboarding already sets this up naturally.

9. **Design system audit** — run after integration to catch any screens that diverged from DESIGN.md.

---

## Behavior Notes

- App defaults to placeholder data. Set `EXPO_PUBLIC_USE_MOCK_API=false` + `EXPO_PUBLIC_API_BASE_URL` to use live backend.
- Metro cache issues are common after multiple rapid edits — `npx expo start --clear` fixes them.
- `src/` directory exists but is not loaded by Metro. All active code is at the project root.
