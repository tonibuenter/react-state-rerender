import React, { useEffect, useState } from 'react';
import './App.css';

const type = 'State1';

let appRenderCounter = 0;
export default function App(props) {
  appRenderCounter++;
  const [incr, setIncr] = useState(0);

  useEffect(() => {
    let id = setTimeout(() => {
      setIncr((i) => i + 1);
    }, 5000);
    return () => {
      window.clearInterval(id);
    };
  });

  switch (type) {
    case 'State1':
      return (
        <div>
          <div>{'App renderCounter: ' + appRenderCounter}</div>
          <hr />
          <State1 key={appRenderCounter} name={'State1'} />
        </div>
      );
  }
}

let renderCounter = 0;
function State1(props) {
  renderCounter++;
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    console.log(props.name, 'subscribe');
    let id = setTimeout(() => handleStatusChange({ isOnline: true }), 2000);
    return () => {
      window.clearInterval(id);
      window.console.log(props.name, 'unsubscribe');
    };
  });

  return (
    <div>
      <div>{isOnline === null ? 'Loading...' : isOnline ? 'Online' : 'Offline'}</div>
      <div>{'renderCounter: ' + renderCounter}</div>
    </div>
  );
}
