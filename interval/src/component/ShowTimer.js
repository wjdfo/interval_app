import React, { useEffect, useRef, useState } from 'react';
import './Timer.css';

const ShowTimer = (props) => {
    const [flag, setFlag] = useState(false);
    const [m, setM] = useState(props.time);
    const [s, setS] = useState(0);
    const time = useRef(props.time * 60);
    // const time = useRef(10);
    const timerId = useRef(null);
    
    useEffect(() => {
        timerId.current = setInterval(() => {
            setM(parseInt(time.current / 60));
            setS(time.current % 60);
            time.current -= 1;
        }, 1000);

        return () => clearInterval(timerId.current);
    }, []);

    useEffect(()=>{
        if (time.current === 4) {
            setFlag(true);
        }

        if (time.current < 0) {
            console.log('time out');
            clearInterval(timerId.current);
        }
    }, [s]);

    const getSeconds = (time) => {
        const seconds = Number(time % 60);
        if(seconds < 10) {
            return "0" + String(seconds);
        } else {
            return String(seconds);
        }
    }

    return (
        <div className= {flag ? "urgent-time" : "loose-time"}>
            <h1>{parseInt(m)} : {getSeconds(s)}</h1>
        </div>
    )
}

export default ShowTimer;