import React, { useState, useEffect } from "react";
import "./App.css"; // Import CSS for animations

const terms = [
  {
    term: "Artificial Intelligence",
    definition: "Simulating human intelligence in machines.",
  },
  {
    term: "Machine Learning",
    definition: "Training machines to learn from data.",
  },
  {
    term: "Neural Network",
    definition: "A series of algorithms mimicking the human brain.",
  },
  {
    term: "Augmented Reality",
    definition: "Overlaying virtual content in the real world.",
  },
  { term: "Big Data", definition: "Large datasets analyzed computationally." },
];

const App = () => {
  const [currentTerm, setCurrentTerm] = useState(null);
  const [definitions, setDefinitions] = useState([]);
  const [timer, setTimer] = useState(20);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [scoreChange, setScoreChange] = useState(null);

  useEffect(() => {
    if (gameActive && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      alert("Time's up! Try again.");
      resetGame();
    }
  }, [gameActive, timer]);

  const handleCardFlip = () => {
    if (!cardFlipped) {
      const randomTerm = terms[Math.floor(Math.random() * terms.length)];
      setCurrentTerm(randomTerm);

      const randomDefinitions = [
        ...terms
          .filter((t) => t.term !== randomTerm.term)
          .map((t) => t.definition)
          .slice(0, 4),
        randomTerm.definition,
      ].sort(() => Math.random() - 0.5);

      setDefinitions(randomDefinitions);
      setTimer(20);
      setGameActive(true);
      setCardFlipped(true);
    }
  };

  const handleDefinitionClick = (definition) => {
    let points;
    if (definition === currentTerm.definition) {
      points = timer * 10;
      setScore(score + points);
      setScoreChange(`+${points}`);
    } else {
      points = -50;
      setScore(score + points);
      setScoreChange(`${points}`);
    }
    setTimeout(() => setScoreChange(null), 1000);
    resetGame();
  };

  const resetGame = () => {
    setGameActive(false);
    setCurrentTerm(null);
    setDefinitions([]);
    setTimer(20);
    setCardFlipped(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-red-500 text-white flex flex-col items-center">
      <header className="text-center mt-8">
        <h1 className="text-5xl font-extrabold drop-shadow-lg mb-4">
          AI Card Matching Game
        </h1>
        <p className="text-lg text-gray-100 drop-shadow-md">
          Match the term with the correct definition!
        </p>
        <div className="flex justify-center mt-6 space-x-8 relative">
          <span className="text-2xl font-bold bg-white bg-opacity-20 rounded-lg py-2 px-4 shadow-lg">
            Score: {score}
          </span>
          {scoreChange && (
            <span className="score-change text-2xl font-bold absolute">
              {scoreChange}
            </span>
          )}
          <span className="text-2xl font-bold bg-white bg-opacity-20 rounded-lg py-2 px-4 shadow-lg">
            Time Left: {timer}s
          </span>
        </div>
      </header>

      <main className="flex flex-col md:flex-row justify-center items-center mt-12 w-full max-w-5xl">
        <div className="w-full md:w-1/2 flex justify-center items-center mt-10 md:mt-0">
          <div
            className="card w-64 h-96 bg-gradient-to-tl from-indigo-600 via-purple-500 to-pink-500 text-white rounded-xl flex justify-center items-center shadow-xl cursor-pointer"
            onClick={handleCardFlip}
          >
            <p className="text-3xl font-bold px-4">
              {cardFlipped && currentTerm ? currentTerm.term : "Click to Flip"}
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          {definitions.map((def, index) => (
            <button
              key={index}
              className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-left p-6 rounded-lg shadow-md text-lg transition transform hover:scale-105"
              onClick={() => handleDefinitionClick(def)}
            >
              {def}
            </button>
          ))}
        </div>
      </main>

      <footer className="mt-12 text-center text-gray-300 text-sm">
        Made with ❤️ for learning AI, Machine Learning, and AR
      </footer>
    </div>
  );
};

export default App;
