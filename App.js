import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [scrambledWord, setScrambledWord] = useState('');
  const [originalWord, setOriginalWord] = useState('');
  const [guess, setGuess] = useState('');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(10);
  const [message, setMessage] = useState('');  

  useEffect(() => {
    fetchWord();
  }, []);

  // A GET request to the backend server
  // Receives a JSON response containing a scrambled word and its original version 
  // Updates the state of the React component with the data
  const fetchWord = async () => {
    const response = await fetch('http://localhost:3000/word');
    const data = await response.json();
    setScrambledWord(data.scrambled);
    setOriginalWord(data.original);
    setMessage('');  
  };

  // Checks to see if the word guessed is the same as the original word
  // Gives a message based on the correctness
  const checkAnswer = () => {
    if (attempts <= 0) return;

    if (guess === originalWord) {
      setScore(score + 1);
      setMessage('Correct!');  
  
    } else {
      setAttempts(attempts - 1);
      setMessage('Incorrect!');  
      if (attempts - 1 === 0) {  
        setMessage(`Final score: ${score}`);
      }
    }

    setGuess('');
  };

  // Front-end part that displays the interface for the Ekreb game
  return (
    <div className="App">
      <div className="App-header">
        <h1>Welcome to the Game of Ekreb</h1>
        <div>Guess the scrambled word:</div>
        <div>
          <p>{scrambledWord}</p>
          <input value={guess} onChange={(e) => setGuess(e.target.value)} />
          <button onClick={checkAnswer}>Check Answer</button>
          <button onClick={fetchWord}>New Word</button>
          <p>Score: {score}</p>
          <p>Attempts left: {attempts}</p>
          <p>{message}</p>  {}
        </div>
      </div>
    </div>
  );
}

export default App;
