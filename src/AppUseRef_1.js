import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const globi = useRef({ childData: 0 });
  const [c, setUpdater] = useState(0);

  console.log('render APP');

  useEffect(() => {}, []);

  return (
    <div className="App">
      {JSON.stringify(globi.current)}
      <Child key={1} globi={globi.current} name={'child1'} globiFun={globiFun} />
      <Child key={2} globi={globi.current} name={'child2'} globiFun={globiFun} />
    </div>
  );

  function globiFun() {
    //setUpdater(c + 1);
    console.log('globiFun ', JSON.stringify(globi.current));
  }
}

function Child({ globi, name, globiFun }) {
  useEffect(() => {
    console.log('child ' + name + ' ' + globi.childData);
  });

  return (
    <div>
      <div>{name}</div>
      <div>Child data {globi.childData}</div>
      <button
        onClick={() => {
          globi.childData++;
          globiFun();
        }}
      >
        incr ChildData
      </button>
    </div>
  );
}

export default App;
