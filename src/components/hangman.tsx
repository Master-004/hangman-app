import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Gallows from "./gallows";

const wordLengths = {
  easy: 4,
  medium: 7,
  hard: 10,
};

const Hangman = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const difficulty = searchParams.get("difficulty") || "easy";
  const [word, setWord] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState(7);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch word only once when component mounts
  useEffect(() => {
    const length = wordLengths[difficulty as keyof typeof wordLengths] || 4;

    fetch(
      `https://random-word.ryanrk.com/api/en/word/random/10/?length=${length}`
    )
      .then((res) => res.json())
      .then((data) => {
        const randomWord =
          data[Math.floor(Math.random() * data.length)].toUpperCase();
        setWord(randomWord);
        setGuesses([]);
        setWrongGuesses([]);
        setAttemptsLeft(7);
        setGameOver(false);
        setGameWon(false);
      })
      .catch((err) => {
        console.error("Error fetching word:", err);
        setWord("REACT"); // fallback word
      });
  }, []); // only once

  // Focus to input element if game is not over and not won
  useEffect(() => {
    if (!gameOver && !gameWon) inputRef.current?.focus();
  }, [inputValue, gameOver, gameWon]);

  // Check win/loss condition
  useEffect(() => {
    if (attemptsLeft <= 0) {
      setGameOver(true);
    }

    const uniqueLetters = [...new Set(word.split(""))];
    if (uniqueLetters.every((l) => guesses.includes(l))) {
      setGameWon(true);
    }
  }, [guesses, attemptsLeft, word]);

  // Handle guesses
  const handleGuess = () => {
    const letter = inputValue.toUpperCase(); // Convert to uppercase

    if (!letter.match(/^[A-Z]$/)) return; // Only allow letters A-Z

    if (word.includes(letter)) {
      if (!guesses.includes(letter)) {
        setGuesses((prev) => [...prev, letter]); // Add to correct guesses
      }
    } else {
      if (!wrongGuesses.includes(letter)) {
        setWrongGuesses((prev) => [...prev, letter]); // Add to wrong guesses
        setAttemptsLeft((prev) => prev - 1);
      }
    }

    setInputValue("");
  };

  // Reset the game (same difficulty)
  const resetGame = () => {
    window.location.reload(); // refetch from API with same difficulty
  };

  return (
    <div className="hangman">
      <h1>Hangman Game</h1>

      <p>
        Attempts left:{" "}
        <span
          className={`badge ${
            attemptsLeft > 4
              ? "bg-success"
              : attemptsLeft > 2
              ? "bg-warning"
              : "bg-danger"
          }`}
        >
          {attemptsLeft}
        </span>
      </p>

      <Gallows wrongGuesses={wrongGuesses.length} gameOver={gameOver} />

      {!gameOver && !gameWon && (
        <div className="word-container">
          <p>
            {word
              .split("")
              .map((l) => (guesses.includes(l) ? l : "_"))
              .join(" ")}
          </p>
          <p>Wrong letters: {wrongGuesses.join(", ")}</p>

          <input
            ref={inputRef}
            type="text"
            maxLength={1}
            value={inputValue}
            placeholder="Enter a letter"
            onChange={(e) => setInputValue(e.target.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputValue) {
                handleGuess();
              }
            }}
          />
        </div>
      )}

      {gameOver && (
        <p>
          Game Over! The word was: <b>{word}</b>
        </p>
      )}
      {gameWon && (
        <p>
          Congratulations! You've guessed the word! <br />
          <b>{word}</b>
        </p>
      )}

      {(gameOver || gameWon) && (
        <>
          <button className="btn btn-primary" onClick={resetGame}>
            Play Again
          </button>
          <br />
          <br />
          <button className="btn btn-secondary" onClick={() => navigate("/")}>
            Change Difficulty
          </button>
        </>
      )}
    </div>
  );
};

export default Hangman;
// // This component is the main game logic for the Hangman game. It fetches a random word based on the selected difficulty level, handles user input for letter guesses, and manages the game state (win/loss). It also provides visual feedback through the Gallows component and allows users to reset or change difficulty after the game ends.
