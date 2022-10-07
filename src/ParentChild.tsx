import React, { useEffect, useState } from 'react';
import './styles.css';

var triggerTimer = function () {
  setTimeout(() => {
    const fun = getExternalFire();
    if (fun && typeof fun === 'function') {
      fun();
    }
    triggerTimer();
    console.debug('window.triggerTimer', typeof (window as any)?.triggerTimer);
  }, 2000);
};

triggerTimer();

const globiCounter = new Set();

let renderParent = 0;
let renderChild = 0;
let dynKey = 0;
let externalFire: any;

function getExternalFire() {
  return externalFire;
}

export default function ParentChild({ globi }: any): JSX.Element {
  globi.current.ParentChild_render++;

  console.log('globi.current', globi.current);
  globiCounter.add(globi.current);
  console.log('globiCounter', globiCounter.size);

  useEffect(() => {
    globi.current.ParentChild_useEffect++;
  }, [globi.current.client]);

  console.log('globi.client:', globi.client);

  const [pValue, setPValue] = useState(1000);
  const [extValue, setExtValue] = useState(0);
  externalFire = () => setExtValue((i) => i + 1);

  useEffect(() => {
    document.title = 'pValue=' + pValue;
  }, [pValue]);

  return (
    <div>
      <hr />
      {JSON.stringify(globi.current)} number of globi {globiCounter.size}
      <hr />
      <h4>Parent</h4>
      <div>{`window.triggerTimer:${typeof triggerTimer}`}</div>
      <div>{'extValue: ' + extValue}</div>
      <div>
        <button onClick={() => setPValue((v) => v + 1)}>Incr pValue</button>
      </div>
      <div>{'pValue: ' + pValue}</div>
      <hr />
      <Child title={'Child: key=static'} key={'static'} pValue={pValue} globi={globi} pAction={pAction} />
      <hr />
      <Child title={`Child: key=${dynKey}`} key={dynKey++} pValue={pValue} globi={globi} pAction={pAction} />
      <hr />
      {pValue % 5 === 0 ? (
        <Child key={'modulo5'} title={'Child: <pValue % 5 === 0>'} globi={globi} pValue={pValue} pAction={pAction} />
      ) : (
        'no child, pValue: ' + pValue
      )}
      <hr />
    </div>
  );

  function pAction() {
    setPValue((v) => v - 1);
  }
}

function Child({ title, pValue, pAction, globi }: any): JSX.Element {
  const [pValueStateNoUseEffect] = useState(pValue);
  const [pValueState, setPValueState] = useState(pValue);

  useEffect(() => {
    setPValueState(pValue);
  }, [pValue]);

  globi.current.Child_render++;
  renderChild++;

  return (
    <div>
      <h4>{title}</h4>
      <div>
        <button onClick={() => pAction((v: any) => v + 1)}>Call Parent</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '40px auto 40px' }}>
        <table style={{ gridColumnStart: '2', gridColumnEnd: '3' }}>
          <tbody>
            <tr>
              <td>{'pValue'}</td>
              <td>{pValue}</td>
            </tr>
            <tr>
              <td>{'state.pValueState'}</td>
              <td>{pValueState}</td>
            </tr>
            <tr>
              <td>{'state.pValueStateNoUseEffect'}</td>
              <td>{pValueStateNoUseEffect}</td>
            </tr>
            <tr>
              <td>{'renderChild'}</td>
              <td>{renderChild}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
