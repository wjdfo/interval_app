import React, { useState } from "react";
import './App.css';
import Sidebar from "./component/sidebar";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [timer, setTimer] = useState(5);
  const [myTimers, setMyTimers] = useState([{
                                        id : "test",
                                        step : [1, 5, 1, 5]
                                      },
                                      {
                                        id : "test1",
                                        step : [3, 7, 3, 7]
                                      }
                                      ]);

  const StepIteration = () => {
    myTimers.forEach(e => {
      console.log(e.id);
      e.step.forEach(element => {
        console.log(element);
      })
    })
    console.log("Iteration Done");
  }

  const toggleMenu = () => {
    setIsOpen(isOpen => !isOpen);
  }

  const appendTimer = ({newTimer}) => {
    setMyTimers([...myTimers, newTimer])
  }

  const deleteTimer = ({id}) => {
    setMyTimers(myTimers.filter(myTimers => myTimers.id !== id)) // id가 다른 배열 요소들만 배열에 추가한 뒤 myTimers에 저장
  }

  const nextStep = ({speed}) => {
    setTimer(speed);
  }
  
  return (
    <div className="container">
      <ul className = "sidebar-wrapper">
        <span onClick = {toggleMenu} style = {{fontSize : '4vh', textAlign : 'left'}}>⭐</span>
      </ul>
      <ul className={isOpen ? "show-side" : "hide-side"} >
        <Sidebar timers = {myTimers} append = {appendTimer} delete = {deleteTimer}/>
      </ul>
    </div>
  );
}

export default App;
