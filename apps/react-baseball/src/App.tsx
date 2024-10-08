import createController, { GameResult } from '@ibfu/number-baseball';
import { useEffect, useMemo, useState } from 'react';
import './App.css';

function App() {
  const a = useMemo(
    () =>
      createController({
        digitCount: 4,
        maxAttemptCount: -1,
        maxNumberOfRange: 9,
        minNumberOfRange: 0,
      }),
    []
  );
  const [input, setInput] = useState('');
  useEffect(() => {
    a.start();
  }, []);

  const [result, setResult] = useState<GameResult | null>(null);
  useState('');

  return (
    <>
      <h1>Vite + React</h1>
      <div className='card'>
        <input onChange={(e) => setInput(e.target.value)} />
        <button onClick={() => setResult(a.getResult(input))}>go!</button>
        <button onClick={() => a.restart()}>restart</button>
        <h3>result</h3>
        <p>{JSON.stringify(result)}</p>

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
