# Guess Number Game

A React Native mobile application built with Expo that features a number guessing game with user authentication.

## Features

- **Authentication**: Local-only registration, login, and logout with encrypted storage
- **Guess the Number Game**: Try to guess a random number between 1 and 43
- **Best Score Tracking**: Automatically tracks and displays your lowest number of guesses
- **Multi-language Support**: Full i18n support for English and Arabic with RTL
- **Encrypted Storage**: User credentials and game data stored securely using MMKV

## Tech Stack

- **React Native** with **Expo** for cross-platform mobile development
- **Expo Router** for file-based routing
- **TypeScript** for type safety
- **React Native StyleSheet** with custom theme system for styling
- **Moti** for smooth animations
- **Zustand** for state management
- **React Native MMKV** for encrypted local storage
- **React Hook Form** + **Zod** for form validation
- **i18next** for internationalization

## Project Structure

```
src/
├── app/                    # Expo Router file-based routing
│   ├── (auth)/            # Authentication screens
│   ├── (app)/             # Main app screens
│   └── _layout.tsx        # Root layout
├── components/            # React components
│   ├── screens/          # Screen-specific components
│   └── common/           # Shared components
├── core/                 # Core utilities
│   ├── @types/          # TypeScript types
│   ├── hooks/           # Custom hooks
│   ├── schema/          # Validation schemas
│   ├── locales/         # Translation files
│   └── i18n.ts          # i18n configuration
├── state/               # Zustand state management
│   └── stores/          # State stores (auth, game)
└── common/              # Shared utilities
    └── utils/           # Utility functions
```

## Getting Started

### Prerequisites

- Node.js >= 20.19.4
- Yarn or npm
- Expo CLI
- iOS Simulator (Mac) or Android Emulator

### Installation

1. Install dependencies:

```bash
yarn install
```

2. **IMPORTANT**: Run prebuild before first run:

```bash
npx expo prebuild --clean
```

3. **(Mac Only - Android)**: Create `local.properties` file:

After running prebuild, if you're running on Android on a Mac, you need to create a `local.properties` file in the `android/` folder:

```bash
# Create the file
touch android/local.properties

# Add your Android SDK path (replace with your actual path)
echo "sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk" >> android/local.properties
```

**⚠️ Important**: This file gets deleted every time you run `npx expo prebuild --clean`, so you'll need to recreate it after each prebuild.

To find your Android SDK path:
```bash
echo $ANDROID_HOME
# OR
which adb
```

4. Start the development server:

```bash
yarn start
```

5. Run on iOS:

```bash
yarn ios
```

6. Run on Android:

```bash
yarn android
```

## How to Play

### First Time Setup

**⚠️ IMPORTANT**: You **MUST register** before you can login!

1. **Register an Account**:
   - Open the app (you'll see the Login screen)
   - Click **"Register Now"** at the bottom
   - Fill in: Username, Email, Password, Confirm Password
   - Click **"Register"**
   - You'll be automatically logged in

2. **Subsequent Logins**:
   - Use the same username and password you registered with
   - The app uses **local-only authentication** (no backend)
   - Your account exists only on this device

### Playing the Game

1. **Start Game**: The app generates a random number between 1 and 43
2. **Make Guesses**: Enter your guess (1-43) and submit
3. **Get Feedback**: The app tells you if your guess is too high or too low
4. **Win**: Guess the correct number to win!
5. **Track Progress**: Your best score (lowest number of guesses) is saved automatically
6. **Play Again**: Click "Play Again" to start a new round
7. **Switch Language**: Toggle between English and Arabic (with RTL support)

## Authentication

This app uses **local-only authentication** with encrypted storage:

- **You MUST register before you can login** - there are no pre-existing accounts
- User credentials are stored locally using MMKV with encryption
- No backend server required
- Accounts are device-specific (not synced to cloud)
- Passwords are stored in plain text (⚠️ in production, use proper hashing like bcrypt or argon2)

### Troubleshooting Authentication

**"Invalid username or password" error?**
- This means you haven't registered yet
- Click "Register Now" to create an account first
- Then you can login with those credentials

## Scripts

- `yarn start` - Start Expo development server
- `yarn ios` - Run on iOS simulator
- `yarn android` - Run on Android emulator
- `yarn format:check` - Check code formatting
- `yarn format:write` - Auto-format code

## Architecture Highlights

### State Management

- **Zustand** stores for auth and game state
- Persistent storage with MMKV

### Routing

- File-based routing with Expo Router
- Route groups for auth and app screens

### Styling

- React Native StyleSheet with custom theme system
- Professional design with shadows, spacing, and typography
- Moti animations for smooth transitions
- Responsive design

### Internationalization

- English and Arabic support
- RTL layout support for Arabic
- Easy to add more languages

## License

MIT
