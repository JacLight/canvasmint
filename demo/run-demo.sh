#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Link the parent project
echo "Linking parent project..."
npm link ..

# Start the development server
echo "Starting development server..."
npm run dev
