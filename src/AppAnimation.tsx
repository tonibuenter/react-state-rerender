import React, { useCallback, useState } from 'react';
import './App.css';

function App() {
  console.log('render APP');
  const [c, setIncr] = useState(0);
  const TableCards = useCallback(
    ({ c, label }: any) => (
      <div className={'animbox'}>
        Hello {label} {c}
      </div>
    ),
    []
  );

  return (
    <div className="App">
      <div>
        <button onClick={() => setIncr((n) => n + 1)}>Incr</button>
      </div>
      {Math.random() > 0.5 ? (
        <TableCards key={'left'} c={c + 2} label={'left'} />
      ) : (
        <TableCards key={'right'} c={c} label={'right'} />
      )}
    </div>
  );
}

export default App;
