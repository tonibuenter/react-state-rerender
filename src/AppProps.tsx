import React, { useState } from 'react';
import './AppProps.css';

let appRenderCounter = 0;
export default function AppProps() {
  appRenderCounter++;
  const [incr, setIncr] = useState({ counter: 0 });

  return (
    <div>
      <div>{'AppProps renderCounter: ' + appRenderCounter}</div>
      <div>{'incr: ' + incr.counter}</div>
      <div>
        <button onClick={() => setIncr(incr)}>A) incr (parent)</button>
      </div>
      <div>
        <button onClick={() => setIncr((incr) => incr)}>B) incr (parent)</button>
      </div>
      <div>
        <button onClick={() => setIncr({ ...incr })}>B) incr (parent)</button>
      </div>
      <hr />
      <Child key={'Child'} name={'Child'} action={action} />
    </div>
  );

  function action() {
    setIncr({ counter: incr.counter + 1 });
  }
}

let renderCounter = 0;
const clientActions = new Set();
type ChildProps = { name: string; action: any };

function Child({ name, action }: ChildProps) {
  renderCounter++;
  clientActions.add(action);

  return (
    <div>
      <div>
        <button onClick={() => action()}>incr</button>
      </div>
      <div>{'renderCounter: ' + renderCounter}</div>
      <div>{'clientActions: ' + clientActions.size}</div>
    </div>
  );
}
