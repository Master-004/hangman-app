import { useState } from "react";
import { useNavigate } from "react-router-dom";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState("easy");

  return (
    <div className="welcome">
      <h1>Welcome to the Hangman Game!</h1>
      <p>Get ready to guess the word letter by letter.</p>
      <p>Good luck!</p>

      <div className="hangman">
       <br />
        <h2>Select Difficulty Level</h2>
        <select
          id="difficulty"
          className="form-select"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy (4 letters)</option>
          <option value="medium">Medium (7 letters)</option>
          <option value="hard">Hard (10 letters)</option>
        </select>
        <br />
        <button
          className="btn btn-primary start-button"
          onClick={() => navigate(`/hangman/?difficulty=${difficulty}`)}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};
export default WelcomeScreen;
// This component is a simple welcome screen for the Hangman game. It includes a title, some instructions, and a button to start the game. The button can be linked to the game logic in the main App component.
