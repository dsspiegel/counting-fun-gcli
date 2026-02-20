import { useState, useEffect, useCallback } from 'react';
import './App.css';
import confetti from 'canvas-confetti';

const EMOJIS = ['🍎', '🚗', '🐶', '🌟', '🐱', '🦋', '🧸', '🍦', '🎈', '🐣'];

function App() {
  const [maxNumber, setMaxNumber] = useState(5);
  const [count, setCount] = useState(1);
  const [emoji, setEmoji] = useState('🍎');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const startNewRound = useCallback(() => {
    setCount((prevCount) => {
      let newCount;
      // If the maxNumber is 1 (unlikely but safe), just return 1
      if (maxNumber <= 1) return 1;
      
      do {
        newCount = Math.floor(Math.random() * maxNumber) + 1;
      } while (newCount === prevCount);
      return newCount;
    });
    
    setEmoji(EMOJIS[Math.floor(Math.random() * EMOJIS.length)]);
    setFeedback(null);
  }, [maxNumber]);

  useEffect(() => {
    startNewRound();
  }, [startNewRound]);

  const handleChoice = (choice: number) => {
    if (choice === count) {
      setFeedback('correct');
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FF69B4', '#00CED1', '#ADFF2F']
      });
      setTimeout(startNewRound, 1500);
    } else {
      setFeedback('incorrect');
      setTimeout(() => setFeedback(null), 500);
    }
  };

  const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);

  return (
    <div className="game-container">
      <h1 className="title">How many?</h1>
      
      <div className={`emoji-display ${feedback === 'incorrect' ? 'shake' : ''}`}>
        {Array.from({ length: count }).map((_, i) => (
          <span key={i} className="emoji-item">{emoji}</span>
        ))}
      </div>

      <div className="button-container">
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => handleChoice(num)}
            className={`number-button color-${num}`}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="settings-panel">
        <label htmlFor="max-number">Max Number: </label>
        <select 
          id="max-number" 
          value={maxNumber} 
          onChange={(e) => setMaxNumber(Number(e.target.value))}
        >
          <option value={3}>3</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
        </select>
      </div>

      {feedback === 'correct' && <div className="feedback-overlay">Great job! 🎉</div>}
    </div>
  );
}

export default App;
