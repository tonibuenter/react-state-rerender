import React, {useEffect, useState} from 'react';
import './App.css';


export default function AppUseCallback() {

    const [name, setName] = useState('Hans-');
    const [counter, setCounter] = useState(0);

    const add = () => setName(name + 'x');
    const incr = () => setCounter(counter + 1);


    useEffect(() => {
        setName(name + 'x')
    }, [counter])

    return (
        <div>
            <div>{name}</div>
            <button className="AppUseCallback" onClick={incr}>
                incr
            </button>
        </div>
    );
}
