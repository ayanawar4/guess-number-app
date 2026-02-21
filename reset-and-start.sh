#!/bin/bash
echo "Cleaning all caches..."
rm -rf node_modules/.cache
rm -rf .expo
rm -rf /tmp/metro-*
echo "Starting Metro with clean cache..."
npx expo start --clear
