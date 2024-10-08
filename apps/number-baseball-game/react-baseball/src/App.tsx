import createController, { GameResult, parseResult } from '@ibfu/number-baseball';
import { useEffect, useMemo, useState } from 'react';
import './App.css';

function App() {
  const controller = useMemo(
    () =>
      createController({
        digitCount: 3,
        maxAttemptCount: -1,
        maxNumberOfRange: 9,
        minNumberOfRange: 0,
      }),
    []
  );

  useEffect(() => {
    controller.start();
  }, []);

  const [input, setInput] = useState('');
  const [result, setResult] = useState<GameResult | null>(null);

  const onRestart = () => {
    controller.restart();
    setInput('');
    setResult(null);
  };

  return (
    <>
      <div className='card'>
        <input onChange={(e) => setInput(e.target.value)} />
        <button onClick={() => setResult(controller.getResult(input))}>입력</button>
        <button onClick={onRestart}>재시작</button>
        <h3>result</h3>
        <p>{result && parseResult(result)} </p>
        <p>
          시도 횟수: {result?.attemptCount} / 정답: {result?.isCorrect ? 'O' : 'X'}
        </p>
      </div>
    </>
  );
}

export default App;
