import React, { useRef } from 'react';
import './App.css';
import ParentChild from './ParentChild';

export default function ParentChildApp() {
  const globi = useRef({ init: 1, ParentChild_useEffect: 0, ParentChild_render: 0, Child_render: 0, client: 0 });

  return (
    <div className="App">
      {/*<Counter></Counter>*/}
      <ParentChild globi={globi} />
    </div>
  );
}
