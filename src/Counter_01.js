import React, {useState} from 'react';
import './styles.css'

export default function Counter(props) {

    const [count, setCount] = useState(0);

    return <div className={'Counter'}>
        <div className={'title'} key="title">Counter 01</div>
        <div className={'description'} key="description">Simple Counter with useState</div>
        <div className={'panel'} key="2">{count}</div>
        <div>
            <a className={'button'} key="1" onClick={() => setCount(count + 1)}>Update counter</a>
        </div>
    </div>
}
