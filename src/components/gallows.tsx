const Gallows = ({
  wrongGuesses,
  gameWon,
  gameOver,
}: {
  wrongGuesses: number;
  gameWon: boolean;
  gameOver: boolean;
}) => {
  const gallowsStages = [
    "  +---+\n  |   |\n      |\n      |\n      |\n      |\n=========",
    "  +---+\n  |   |\n  O   |\n      |\n      |\n      |\n=========",
    "  +---+\n  |   |\n  O   |\n  |   |\n      |\n      |\n=========",
    "  +---+\n  |   |\n  O   |\n /|   |\n      |\n      |\n=========",
    "  +---+\n  |   |\n  O   |\n /|\\  |\n      |\n      |\n=========",
    "  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========",
    "  +---+\n  |   |\n  O   |\n /|\\  |\n / \\  |\n      |\n=========",
  ];

  if (gameOver) {
    return <pre>{gallowsStages[6]}</pre>;
  }

  return <pre>{gallowsStages[wrongGuesses]}</pre>;
};

export default Gallows;
// This component renders the gallows for the Hangman game. It takes the number of wrong guesses as a prop and displays the corresponding stage of the gallows using ASCII art. The gallows stages are defined in an array, and the correct stage is selected based on the number of wrong guesses.
