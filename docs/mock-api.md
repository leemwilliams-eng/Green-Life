# Local Mock API

Green Life currently defaults to an in-app mock API for fast UI development.

## In-App Mock Mode

This is already enabled by default through [client.ts](C:/Users/leew/OneDrive/Documents/Playground/green-life/src/api/client.ts).

If you want to force the app to use a real backend later, set:

```powershell
$env:EXPO_PUBLIC_USE_MOCK_API="false"
$env:EXPO_PUBLIC_API_BASE_URL="http://YOUR_HOST:4000/api/v1"
npm.cmd start
```

## Standalone Local Mock Server

A local Node mock server is available at [mock-api-server.js](C:/Users/leew/OneDrive/Documents/Playground/green-life/mock-api-server.js).

Run it in a second terminal:

```powershell
node mock-api-server.js
```

Then start Expo against it:

```powershell
$env:EXPO_PUBLIC_USE_MOCK_API="false"
$env:EXPO_PUBLIC_API_BASE_URL="http://localhost:4000/api/v1"
npm.cmd start
```

## Device Note

If you run Expo Go on a physical Android phone, `localhost` points to the phone, not your computer. In that case use your computer's LAN IP instead of `localhost`.
