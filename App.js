import React, { useState } from 'react';
import './App.css';
import rockImage from './rock.png'; // Example path to your image
import paperImage from './paper.png';
import scissorImage from './scissor.png'; // Corrected filename

const choices = ['rock', 'paper', 'scissors'];

const getResult = (playerChoice, computerChoice) => {
  if (playerChoice === computerChoice) return "It's a tie!";
  if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'scissors' && computerChoice === 'paper') ||
    (playerChoice === 'paper' && computerChoice === 'rock')
  ) {
    return 'You win!';
  } else {
    return 'You lose!';
  }
};

function App() {
  const [playerChoice, setPlayerChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [history, setHistory] = useState([]);

  const handleChoice = (choice) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const result = getResult(choice, computerChoice);

    setPlayerChoice(choice);
    setComputerChoice(computerChoice);
    setResult(result);

    if (result === 'You win!') {
      setPlayerScore(playerScore + 1);
    } else if (result === 'You lose!') {
      setComputerScore(computerScore + 1);
    }

    setHistory([...history, { playerChoice: choice, computerChoice, result }]);
  };

  const resetGame = () => {
    setPlayerChoice('');
    setComputerChoice('');
    setResult('');
    setPlayerScore(0);
    setComputerScore(0);
    setHistory([]);
  };

  return (
    <div className="App">
      <h1>Rock-Paper-Scissors</h1>
      <div className="choices">
        {choices.map(choice => (
          <button key={choice} onClick={() => handleChoice(choice)}>
            {choice.charAt(0).toUpperCase() + choice.slice(1)}
          </button>
        ))}
      </div>
      <div className="scores">
        <p className="player-score">Player Score: {playerScore}</p>
        <p className="computer-score">Computer Score: {computerScore}</p>
      </div>
      {playerChoice && (
        <div>
          <p>Your choice: <img src={rockImage} alt="Rock" /></p>
          <p>Computer's choice: <img src={paperImage} alt="Paper" /></p>
          <h2 className="result">{result}</h2>
        </div>
      )}
      <button onClick={resetGame}>Reset Game</button>
      {history.length > 0 && (
        <div className="history">
          <h3>Game History</h3>
          <ul>
            {history.map((round, index) => (
              <li key={index}>
                Round {index + 1}: You chose <img src={scissorImage} alt="Scissor" />,
                Computer chose <img src={paperImage} alt="Paper" /> - {round.result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
