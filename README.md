# Hangman App

This is a simple and interactive Hangman game built using React, TypeScript, and Vite. Users select a difficulty level and then try to guess the randomly selected word one letter at a time. The game features real-time visual feedback and support for dark mode.

---

## How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/hangman-app.git
cd hangman-app
```

### 2. Install Dependencies
Make sure you have Node.js installed. Then run:
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
  - Once started, open your browser and go to:
    - http://localhost:5173

# Features
- Selectable difficulty levels: Easy (4-letter), Medium (7-letter), Hard (10-letter)
- Dynamic gallows drawing updates as you guess
- Dark mode support (automatically enabled based on system settings)
- Win/loss tracking with "Play Again" and "Change Difficulty" buttons
- Words fetched from an external word API


# API Used
This app uses the following public API to fetch random words:
https://random-word.ryanrk.com/api/en/word/random/10/?length=7
- The word length is adjusted dynamically based on the selected difficulty.


# Notes
- You can emulate dark mode using browser DevTools:
  - Chrome: Open DevTools → Command Palette (Ctrl+Shift+P) → "Show Rendering" → Select dark mode under "Emulate CSS media feature prefers-color-scheme"
- The project uses Bootstrap for layout and styling.
- If the API is unavailable, the app falls back to a default word.


# Acknowledgments
This app was developed as a learning project using React and TypeScript. Special thanks to the creators of the random-word API used in this project.
