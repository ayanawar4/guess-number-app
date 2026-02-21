# Quick Start Guide

## What Was Built

A complete React Native mobile app with the following features:

✅ **Authentication System**
- Registration with username, email, and password
- Login/Logout functionality
- Encrypted local storage for credentials (MMKV)
- Auto-login on app restart

✅ **Guess the Number Game**
- Random number generation (1-43)
- Real-time feedback (too high/low/correct)
- Guess count tracking
- Best score persistence
- Play again functionality

✅ **Multi-language Support**
- English and Arabic translations
- RTL support for Arabic
- Language toggle button on game screen

✅ **Modern Tech Stack**
- Expo with file-based routing (Expo Router)
- TypeScript for type safety
- TailwindCSS with NativeWind for styling
- Zustand for state management
- React Hook Form + Zod for form validation
- MMKV for encrypted storage

## Project Structure

```
guess-number-app/
├── src/
│   ├── app/                    # Expo Router screens
│   │   ├── (auth)/            # Login & Register
│   │   ├── (app)/             # Game screen
│   │   └── _layout.tsx        # Root layout
│   ├── state/stores/          # Zustand stores
│   │   ├── auth/              # Authentication state
│   │   └── game/              # Game state
│   ├── core/
│   │   ├── @types/            # TypeScript types
│   │   ├── schema/            # Zod validation schemas
│   │   ├── locales/           # Translations (en/ar)
│   │   └── i18n.ts            # i18n config
│   └── common/utils/          # Storage utilities
├── CLAUDE.md                  # Project documentation
└── README.md                  # Full documentation
```

## How to Run

### 1. Start the Development Server

```bash
cd /Users/ayanawar/BIMProjects/guess-number-app
yarn start
```

### 2. Run on iOS (Mac only)

```bash
yarn ios
```

### 3. Run on Android

```bash
yarn android
```

## How to Use the App

### First Time

1. **Register**: Open the app → Click "Register now"
2. **Fill Form**: Enter username, email, password
3. **Play Game**: After registration, you'll see the game screen

### Playing the Game

1. **Guess**: Enter a number between 1-43
2. **Feedback**: App tells you if too high/low
3. **Win**: Keep guessing until correct
4. **Best Score**: Your lowest guess count is saved

### Features to Try

- **Language Toggle**: Click "EN"/"AR" button to switch languages
- **Logout**: Click logout button to sign out
- **Play Again**: After winning, click "Play Again"
- **Best Score**: Your best score persists even after logout

## Test Accounts

Since this is local-only auth, you can create any test account:

- Username: testuser
- Email: test@example.com
- Password: password123

## Common Commands

```bash
# Start development server
yarn start

# Run on iOS
yarn ios

# Run on Android
yarn android

# Format code
yarn format:write

# Check formatting
yarn format:check
```

## File Locations

- **Auth Logic**: `src/state/stores/auth/auth-store.ts`
- **Game Logic**: `src/state/stores/game/game-store.ts`
- **Storage**: `src/common/utils/storage.ts`
- **Screens**: `src/app/(auth)/` and `src/app/(app)/`
- **Translations**: `src/core/locales/en/` and `src/core/locales/ar/`

## Architecture Highlights

### Same Structure as Wafra

This app follows the exact same architecture as the wafra-mobile-app:

- ✅ File-based routing with Expo Router
- ✅ TypeScript with path aliases (@/*, #/*)
- ✅ Zustand for state management
- ✅ MMKV for encrypted storage
- ✅ TailwindCSS via NativeWind
- ✅ i18n with react-i18next
- ✅ Form validation with Zod + React Hook Form
- ✅ Same directory structure (src/app, src/state, src/core, etc.)

### Key Differences

- **No Backend**: All auth is local (no API calls)
- **Simpler**: Focused on one feature (the game)
- **No Firebase**: No analytics or crash reporting

## Next Steps

If you want to enhance the app:

1. **Add Password Hashing**: Use bcrypt or argon2 instead of plain text
2. **Add Backend**: Connect to a real API for authentication
3. **Add Features**: Leaderboards, achievements, difficulty levels
4. **Add Analytics**: Firebase Analytics, Crashlytics
5. **Add Testing**: Jest for unit tests, Detox for E2E tests

## Troubleshooting

### Metro Bundler Issues

```bash
# Clear Metro cache
yarn start --clear
```

### iOS Build Issues

```bash
cd ios && pod install && cd ..
yarn ios
```

### Android Build Issues

```bash
yarn android --reset-cache
```

## Documentation

- Full README: `README.md`
- Project Guide for Claude: `CLAUDE.md`
- This guide: `QUICKSTART.md`

Enjoy your new app! 🎮
