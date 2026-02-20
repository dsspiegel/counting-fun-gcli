import { useState, useEffect } from 'react';
import './App.css';
import confetti from 'canvas-confetti';

const EMOJIS = ['🍎', '🚗', '🐶', '🌟', '🐱', '🦋', '🧸', '🍦', '🎈', '🐣'];
const NUMBERS = [1, 2, 3, 4, 5];

function App() {
  const [count, setCount] = useState(1);
  const [emoji, setEmoji] = useState('🍎');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const startNewRound = () => {
    const newCount = Math.floor(Math.random() * 5) + 1;
    const newEmoji = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
    setCount(newCount);
    setEmoji(newEmoji);
    setFeedback(null);
  };

  useEffect(() => {
    startNewRound();
  }, []);

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

  return (
    <div className="game-container">
      <h1 className="title">How many?</h1>
      
      <div className={`emoji-display ${feedback === 'incorrect' ? 'shake' : ''}`}>
        {Array.from({ length: count }).map((_, i) => (
          <span key={i} className="emoji-item">{emoji}</span>
        ))}
      </div>

      <div className="button-container">
        {NUMBERS.map((num) => (
          <button
            key={num}
            onClick={() => handleChoice(num)}
            className={`number-button color-${num}`}
          >
            {num}
          </button>
        ))}
      </div>

      {feedback === 'correct' && <div className="feedback-overlay">Great job! 🎉</div>}
    </div>
  );
}

export default App;
