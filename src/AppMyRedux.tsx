import React, { useEffect, useState } from 'react';
import './App.css';
type Listener = Record<string, Set<any>>;
const rx = (() => {
  const listeners: Listener = {};
  const payloads: Record<string, any> = {};

  // for statistics...
  const all = new Set();
  let initCounter = 0;
  let deregisterCounter = 0;
  let registerCounter = 0;

  return {
    register,
    deregister,
    publish,
    stats: () =>
      `size: ${all.size}, init: ${initCounter}, registerCounter: ${registerCounter}, deregisterCounter: ${deregisterCounter}`,
    init
  };

  function init(topic: string) {
    initCounter++;
    return payloads[topic];
  }

  function register(topic: string, listener: any) {
    registerCounter++;
    let l = (listeners[topic] = listeners[topic] || new Set());
    l.add(listener);
    all.add(listener);
    return () => deregister(topic, listener);
  }

  function deregister(topic: string, listener: Listener) {
    deregisterCounter++;
    all.delete(listener);
    let a = listeners[topic] ? listeners[topic].delete(listener) : '';
  }

  function publish(topic: string, payload: any) {
    payloads[topic] = payload;
    if (listeners[topic]) {
      listeners[topic].forEach((listener, index) => {
        try {
          listener(payload, topic);
        } catch (error) {
          console.error(error);
        }
      });
    }
  }
})();

export function AppMyRedux() {
  console.log('render APP');

  const [c, setC] = useState();

  useEffect(() => rx.register('counter', setC), []);

  return (
    <div className="App">
      <div>
        Counter {c} / Number of listeners {rx.stats()}
      </div>
      <div>
        Counter {c} / Number of listeners {rx.stats()}
      </div>
      <div>
        Counter {c} / Number of listeners {rx.stats()}
      </div>
      <Child key={1} name={'child1'} />
      <Child key={Math.random()} name={'child2'} />
    </div>
  );
}

function Child({ name }: { name: string }) {
  console.log('render Child ' + name);

  const [c, setC] = useState(rx.init('counter'));

  useEffect(() => rx.register('counter', setC), []);

  return (
    <div>
      <div>{name}</div>
      <div>Counter data {c}</div>
      <button
        onClick={() => {
          rx.publish('counter', (c || 0) + 1);
        }}
      >
        incr counter
      </button>
      <div>
        Counter {c} / Number of listeners {rx.stats()}
      </div>
    </div>
  );
}

export default AppMyRedux;
