import React, {useState} from 'react';
import './styles.css'
import {log, getLogList, LogList} from './logger'

export default function Counter(props) {

    log('Counter line 7');

    const [count, setCount] = useState(0);
    log('count '+count);

    return <div className={'Counter'}>
        <div className={'title'} key="title">Counter 02</div>
        <div className={'description'} key="description">Simple Counter with useState</div>
        <div className={'panel'} key="2">{count}</div>
        <div>
            <a className={'button'} key="1" onClick={() => setCount(count + 1)}>Update counter</a>
        </div>
        <div><LogList/></div>
    </div>

}
