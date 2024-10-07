import createController from '@ibfu/number-baseball';
import { useMemo, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const a = useMemo(
    () =>
      createController({
        digitCount: (new Date().getSeconds() % 3) + 1,
        maxAttemptCount: -1,
        maxNumberOfRange: 9,
        minNumberOfRange: 0,
      }),
    []
  );

  return (
    <>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
