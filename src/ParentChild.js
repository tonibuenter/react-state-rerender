import React, {useEffect, useRef, useState} from 'react';
import './styles.css'

const globiCounter = new Set();


let renderParent = 0;
let renderChild = 0;

export default function ParentChild({globi}) {



    globi.current.ParentChild_render++;

    console.log('globi.current', globi.current);
    globiCounter.add(globi.current);
    console.log('globiCounter', globiCounter.size);

    useEffect(() => {
        globi.current.ParentChild_useEffect++
    }, [globi.current.client]);

    console.log('globi.client:', globi.client)

    const [pValue, setPValue] = useState(1000);

    useEffect(() => {
        document.title = 'pValue=' + pValue;
    }, [pValue]);

    return <div>
        <hr/>
        {JSON.stringify(globi.current)} number of globi {globiCounter.size}
        <hr/>
        <h4>Parent</h4>
        <div>
            <button onClick={() => setPValue((v) => v + 1)}>Incr pValue</button>
        </div>
        <div>
            {'pValue: ' + pValue}
        </div>

        <hr/>
        <Child title={'Child: key=static'} key={'static'} pValue={pValue} globi={globi} pAction={pAction}/>

        <hr/>
        <Child title={'Child: key={renderParent}'} key={renderParent} pValue={pValue} globi={globi} pAction={pAction}/>

        <hr/>
        {pValue % 5 === 0 ?
            <Child key={'modulo5'} title={'Child: <pValue % 5 === 0>'} globi={globi}  pValue={pValue}
                   pAction={pAction}/> : 'no child, pValue: ' + pValue}
        <hr/>
    </div>


    function pAction() {
        setPValue((v) => v - 1)
    }
}


function Child({title, pValue, pAction, globi}) {

    const [pValueStateNoUseEffect] = useState(pValue);
    const [pValueState, setPValueState] = useState(pValue);

    useEffect(() => {
        setPValueState(pValue);
    }, [pValue]);

    globi.current.Child_render++;
    renderChild++;

    return <div>
        <h4>{title}</h4>
        <div>
            <button onClick={() => pAction((v) => v + 1)}>Call Parent</button>
        </div>
        <div style={{display: 'grid', gridTemplateColumns: '40px auto 40px'}}>
            <table style={{gridColumnStart: '2', gridColumnEnd: '3'}}>
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
}
