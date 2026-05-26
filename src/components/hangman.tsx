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
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchWord = (diff: string) => {
    const length = wordLengths[diff as keyof typeof wordLengths] || 4;
    setLoading(true);
    setWord("");
    setGuesses([]);
    setWrongGuesses([]);
    setAttemptsLeft(7);
    setGameOver(false);
    setGameWon(false);
    setMessage("");

    // Datamuse: sp=???? matches words of exactly `length` letters
    const pattern = "?".repeat(length);
    fetch(`https://api.datamuse.com/words?sp=${pattern}&max=10`)
      .then((res) => res.json())
      .then((data: { word: string }[]) => {
        if (!data || data.length === 0) throw new Error("No words returned");
        const validWords = data
          .map((item) => item.word)
          .filter((w) => /^[a-zA-Z]+$/.test(w));
        if (validWords.length === 0) throw new Error("No valid words in batch");
        const randomWord =
          validWords[Math.floor(Math.random() * validWords.length)].toUpperCase();
        setWord(randomWord);
      })
      .catch((err) => {
        console.error("Error fetching word:", err);
        setWord("REACT");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Fetch word only once when component mounts
  useEffect(() => {
    fetchWord(difficulty);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Focus to input element if game is not over and not won
  useEffect(() => {
    if (!gameOver && !gameWon) inputRef.current?.focus();
  }, [inputValue, gameOver, gameWon]);

  // Check win/loss condition
  useEffect(() => {
    if (!word) return;

    if (attemptsLeft <= 0) {
      setGameOver(true);
    }

    const uniqueLetters = [...new Set(word.split(""))];
    if (uniqueLetters.every((l) => guesses.includes(l))) {
      setGameWon(true);
    }
  }, [guesses, attemptsLeft, word]);

  // Auto-clear the feedback message after 1.5 s
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 1500);
    return () => clearTimeout(timer);
  }, [message]);

  // Handle guesses
  const handleGuess = () => {
    const letter = inputValue.toUpperCase();

    if (!letter.match(/^[A-Z]$/)) {
      setMessage("Please enter a valid letter (A–Z).");
      setInputValue("");
      return;
    }

    if (guesses.includes(letter) || wrongGuesses.includes(letter)) {
      setMessage(`You already guessed "${letter}".`);
      setInputValue("");
      return;
    }

    if (word.includes(letter)) {
      setGuesses((prev) => [...prev, letter]);
    } else {
      setWrongGuesses((prev) => [...prev, letter]);
      setAttemptsLeft((prev) => prev - 1);
    }

    setInputValue("");
    setMessage("");
  };

  const resetGame = () => {
    fetchWord(difficulty);
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

      {loading && <p>Loading word…</p>}

      {!loading && !gameOver && !gameWon && (
        <div className="word-container">
          <p>
            {word
              .split("")
              .map((l) => (guesses.includes(l) ? l : "_"))
              .join(" ")}
          </p>
          <p>Wrong letters: {wrongGuesses.join(", ")}</p>

          {message && <p className="text-warning">{message}</p>}

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
