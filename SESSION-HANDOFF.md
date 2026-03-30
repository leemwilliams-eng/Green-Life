# Session Handoff

## Project

Green Life - Expo / React Native application for helping users understand the environmental and trust implications of the world around them.

Workspace: `C:\Users\leew\OneDrive\Documents\Playground\green-life`

---

## Important: Current Runtime Structure

The active app runtime now lives in the `src/` layer.

Primary entry path:

- `App.tsx`
- `src/navigation/RootNavigator.tsx`
- `src/navigation/MainTabs.tsx`
- `src/screens/*`

The older root-level `screens/` and `navigation/` directories are no longer the active product surface and should not be treated as the source of truth for the current UI direction.

There is also a duplicate `src/src/` tree on disk that should be treated as legacy material, not the active runtime.

---

## Current Stack

- Expo SDK 54
- React Native 0.81.5
- React 19.1.0
- TypeScript
- React Navigation
- TanStack Query
- Zustand
- expo-av, expo-speech, expo-camera, expo-image-picker
- react-native-safe-area-context

---

## Current State

### Product Direction

The app has been actively migrated toward the newer Green Life design system and brand language.

The design system is now being treated as the authoritative direction for:

- typography
- spacing
- surfaces and card rhythm
- brand footer treatment
- badges and trust states
- higher-level platform portability

### Active UI Status

The active runtime now reflects the tokenized `src/` implementation across:

- Splash
- Login
- Home
- Search
- Scan
- Community
- Profile
- onboarding and permissions
- candidate results
- item detail
- metric detail
- source detail
- no match
- voice ask
- barcode and photo capture flows

The Community screen now includes a bottom horizontal placeholder rail for future panels such as Share, Rankings, Nearby, and Featured.

The Splash screen has also been updated to better match the new Green Life brand voice, including:

- centered hero copy
- updated headline and subhead
- quote card rebalanced vertically
- footer and prompt spacing cleaned up

### Shared UI Work Completed

Notable alignment work includes:

- shared surface/card primitives
- consistent brand footer usage across tab screens
- cleaned tab bar behavior and bottom spacing
- updated badges, buttons, search bar, cards, and detail rows
- stronger visual rhythm across primary and secondary screens

---

## Testing Workflow

The current testing model is:

### Phone

Use Expo Go.

Commands:

```powershell
npm run start
```

or

```powershell
npm run start:go
```

### Android Emulator

Use the installed native `Green Life` app, not Expo Go.

Commands:

```powershell
npm run start:native
```

Then launch the installed `Green Life` app on the emulator.

If the native app needs to be rebuilt or reinstalled:

```powershell
npm run android
```

### Important Notes

- `npm run android` now sets `JAVA_HOME` to the Android Studio JBR in `package.json`
- the emulator may show an Android compatibility warning about 16 KB page support; this is platform-side noise and can be dismissed
- Metro can still open Expo Go if the wrong command is used, so keep phone and emulator flows separate

---

## Environment Variables

Current env expectations include:

```powershell
EXPO_PUBLIC_ANTHROPIC_API_KEY=...
EXPO_PUBLIC_API_BASE_URL=...
```

The app still supports mock behavior where applicable, but ongoing work is increasingly oriented toward real backend/API integration.

---

## Documentation Added or Updated

The product and platform direction has been captured in:

- `docs/product/Platform-Roadmap.md`
- `docs/product/Founder-Platform-Brief.md`
- `docs/product/Execution-Compass.md`
- `docs/product/Engineering-Backlog.md`

These documents now tie the design-system work, platform direction, trust-layer framing, and execution backlog together.

---

## Recommended Next Priorities

1. Continue polish on active high-traffic screens while preserving design-system consistency.
2. Keep reducing drift between the active runtime and any dormant legacy UI paths.
3. Harden backend and API contracts around the real product model.
4. Define the trust layer explicitly: badges, provenance, confidence, methodology, and community signal.
5. Identify the first portable web-ready product flows.
6. Prepare the platform for future service and agent-oriented interfaces.

---

## Git Status Guidance

As of this handoff, the recent design-system migration and platform-documentation work exists locally and should be reviewed, committed, and pushed intentionally rather than assumed to be published.

Recommended publish path:

1. create a checkpoint branch
2. commit current design-system and documentation work
3. push to GitHub
4. open a draft PR for review and continuity

---

## Behavior Notes

- The app is now much closer to the intended Green Life design language and product voice.
- The current work should be understood as platform-shaping, not only UI refinement.
- Future work should continue to favor reusable system decisions over one-off screen exceptions.
