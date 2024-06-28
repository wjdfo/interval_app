import React, { useEffect, useState } from "react";
import './App.css';
import Sidebar from "./component/sidebar";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [myTimers, setMyTimers] = useState([{
    title : "default",
    step : [1,1,1,1]
  }]);
  const [selected, setSelected] = useState(0);
  const [timer, setTimer] = useState([1, 1, 1, 1])
  
  const loadTimer = async () => {
    const response = await fetch("http://localhost:5000/", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
      },
      body : JSON.stringify({
        "title" : "Initializing timer.",
        "userId" : "user"
      }),
    
    }).then((res) => res.json())
    
    let arr = [];
    var keys = Object.keys(response);
    for (var i = 0; i < keys.length; i++){
      var key = keys[i];
      arr.push({
        title : key,
        step : response[key]
      })
    }

    setMyTimers(arr);
  }

  useEffect(() => {
    loadTimer();
  }, [myTimers])

  const handlerSetSelected = (v) => {
    setSelected(v);
    setTimer(myTimers[v].step);
    console.log(timer);
  }

  const toggleMenu = () => {
    setIsOpen(isOpen => !isOpen);
  }

  const appendTimer = ({newTimer}) => {
    setMyTimers([...myTimers, newTimer]);
  }

  const deleteTimer = (id) => {
    let temp = [...myTimers];
    temp.splice(id, 1);

    setMyTimers(temp); // id가 다른 배열 요소들만 배열에 추가한 뒤 myTimers에 저장
  }
  
  return (
    <div className="container">
      <div className = "header">
        <span onClick = {toggleMenu} style = {{fontSize : '4vh', textAlign : 'left'}}>⭐</span>
      </div>
      <div className={isOpen ? "show-side" : "hide-side"} >
        <Sidebar timers = {myTimers} append = {appendTimer} delete = {deleteTimer} selected = {selected} handlerSetSelected = {handlerSetSelected}/>
      </div>
    </div>
  );
}

export default App;
