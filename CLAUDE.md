# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Guess Number Game is a React Native mobile application built with Expo, using file-based routing (Expo Router) and TypeScript. The app features a number guessing game (1-43) with local-only authentication and encrypted storage. It supports both Arabic and English languages with RTL support for Arabic.

## Development Commands

### Starting the App

```bash
yarn start              # Start Expo dev server
yarn android            # Run on Android
yarn ios                # Run on iOS
```

### Code Quality

```bash
yarn format:check       # Check Prettier formatting
yarn format:write       # Auto-format code with Prettier
```

### Dependencies

```bash
yarn install            # Install dependencies
```

## Architecture & Structure

### Source Organization

The `src/` directory is organized into clear domains:

- **`app/`** - Expo Router file-based routing
  - `(auth)/` - Authentication routes (login, register)
  - `(app)/` - Main app routes (game screen)
  - `_layout.tsx` - Root layout with i18n setup
  - `index.tsx` - Entry point with auth redirect logic

- **`components/`** - React components
  - `screens/` - Screen-specific components (not yet populated)
  - `common/` - Shared components (`ui/`, `providers/`)

- **`core/`** - Core application utilities
  - `@types/` - Shared TypeScript types organized by domain (`auth/`, `game/`)
  - `hooks/ts/` - Custom hooks placeholder (organized by feature)
  - `schema/` - Zod validation schemas (`login-schema.ts`, `register-schema.ts`, `guess-schema.ts`)
  - `styles/` - Global styles (`global.css` for TailwindCSS)
  - `locales/` - i18n locale files (`en/`, `ar/`)
  - `i18n.ts` - i18n configuration

- **`state/`** - Zustand state management
  - `stores/` - State stores organized by domain (`auth/`, `game/`)
    - `auth/auth-store.ts` - Authentication state (login, register, logout)
    - `game/game-store.ts` - Game state (guessing logic, score tracking)
  - `@types/` - State-related types

- **`common/`** - Shared utilities
  - `utils/` - General utility functions (`storage.ts` with MMKV)

### Key Architectural Patterns

1. **Local-Only Authentication**
   - No backend API - all authentication is handled locally
   - User credentials stored in encrypted MMKV storage
   - Simple username/password validation
   - Auth state managed in Zustand store (`src/state/stores/auth/auth-store.ts`)
   - **Note**: Passwords are stored in plain text in this demo. In production, use proper hashing (bcrypt, argon2, etc.)

2. **Routing with Expo Router**
   - File-based routing using the `app/` directory
   - Groups: `(auth)` for authentication, `(app)` for main app screens
   - Root layout (`_layout.tsx`) handles:
     - i18n initialization
     - Auth initialization on app start
     - GestureHandlerRootView wrapper
   - Entry point (`index.tsx`) redirects based on auth state

3. **Internationalization & RTL**
   - Uses `react-i18next` with `expo-localization` for RTL support
   - Language switching button on game screen
   - Supported languages: Arabic (ar) and English (en)
   - Translations in `src/core/locales/{lang}/translation.json`

4. **State Management**
   - Zustand for global state (auth, game)
   - MMKV for persistent encrypted storage
   - No server state management (no API calls)

5. **Styling**
   - TailwindCSS with NativeWind for styling
   - Custom theme configuration in `tailwind.config.js`
   - Global styles in `src/core/styles/global.css`
   - Color scheme: primary (blue), secondary (green), destructive (red)

6. **Game Logic**
   - Random number generation (1-43)
   - Guess tracking and feedback (too high/too low)
   - Best score persistence in MMKV
   - Game state managed in Zustand (`src/state/stores/game/game-store.ts`)

## Important Technical Details

### Path Aliases

TypeScript paths are configured in `tsconfig.json`:

- `@/*` maps to `./src/*`
- `#/*` maps to `./*`

### Storage Configuration

- MMKV used for encrypted local storage
- Storage keys defined in `src/common/utils/storage.ts`
- Key storage items:
  - `user_token` - Authentication token
  - `user_data` - User object (without password)
  - `best_score` - Lowest number of guesses
  - `locale` - Selected language
  - `users` - All registered users (local DB)

### Authentication Flow

- Registration creates user in local MMKV storage
- Login validates against stored users
- Logout clears user data and token from storage
- Auth state initialized on app start from storage

### Game Flow

1. App generates random number (1-43) on game start
2. User enters guess
3. App provides feedback (too high/low/correct)
4. On correct guess, check if new best score
5. Save best score to MMKV if improved
6. User can play again (generates new random number)

## Code Style & Linting

### Prettier Configuration

- Single quotes for strings
- Semi-colons required
- Print width: 100
- Tab width: 2

## Common Development Patterns

### Creating New Screens

- Add route file in `src/app/(auth)/` or `src/app/(app)/`
- Use TailwindCSS classes via `className` prop
- Integrate with Zustand stores for state
- Use react-hook-form + Zod for forms

### Form Validation

- Use Zod schemas defined in `src/core/schema/`
- Integrate with `react-hook-form` using `@hookform/resolvers/zod`
- Display validation errors below input fields

### Adding New Features

- Create screen components in `src/app/` (Expo Router screens are in app directory)
- Create feature-specific stores in `src/state/stores/<feature-name>/` if needed
- Define types in `src/core/@types/<feature-name>/`
- Add validation schemas in `src/core/schema/`

### Working with Navigation

- Use Expo Router navigation hooks (`useRouter`)
- Use `router.replace()` for auth redirects
- Use `router.push()` for navigation
- Use `router.back()` to go back

### Working with Storage

- Import `storageUtils` from `@/common/utils/storage`
- Use type-safe methods: `getString`, `setString`, `getObject`, `setObject`, etc.
- All storage is encrypted by default with MMKV

### Adding Translations

- Add keys to both `src/core/locales/en/translation.json` and `src/core/locales/ar/translation.json`
- Use `useTranslation` hook: `const { t } = useTranslation();`
- Access translations: `t('auth.login')`, `t('validation.required', { field: 'Username' })`

## Node Version Requirement

Node version >= 20.19.4 (recommended to match wafra project)

## Key Differences from Wafra

1. **No Backend**: This app is fully local - no API calls, no backend server
2. **Simpler Structure**: No `apis/` directory since there are no API requests
3. **Local Auth**: Authentication is handled entirely locally with MMKV storage
4. **Single Feature**: Focused on the number guessing game feature
5. **No Firebase**: No analytics, crashlytics, or push notifications
6. **Simpler State**: Only auth and game stores, no network/KYC/assets state

## Future Enhancements

If you need to add features, consider:

- Adding proper password hashing (bcrypt, argon2)
- Adding user profiles with avatars
- Adding game statistics and history
- Adding difficulty levels (different number ranges)
- Adding multiplayer via backend
- Adding social features (leaderboards, achievements)
