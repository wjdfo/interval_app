import React, { useEffect, useState } from "react";
import './App.css';
import ShowTimer from "./component/ShowTimer";
import Sidebar from "./component/sidebar";

function App() {
  const [isOpen, setIsOpen] = useState(false); //sidebar toggle
  const [myTimers, setMyTimers] = useState([{title : "default", step : [1,2,3,4]}]); //sidebar에 내 타이머 리스트 보여주기
  const [selected, setSelected] = useState(0); //선택된 타이머 index
  const [startTimer, setStartTimer] = useState(false);
  const [time, setTime] = useState(null);
  const [index, setIndex] = useState(0);

  async function loadTimer(){
    let arr = [];
    const response = await fetch("http://localhost:5000/", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
      },
      body : JSON.stringify({
        "title" : "Initializing timer.",
        "userId" : "user"
      }),
    
    }).then((res) => {
      return res.json();

    })
    .catch(() => {
      console.log("Can't load any data from server");
      return null;
    })

    if (response != null) {
      var keys = Object.keys(response);
      for (var i = 0; i < keys.length; i++){
        var key = keys[i];
        arr.push({
          title : key,
          step : response[key]
        })
      }
    }
    else {
      arr.push({
        title : "default",
        step : [1 , 2, 3, 4]
      })
    }

    setMyTimers(arr);
  }

  // mount될 때, backend 서버에서 한번만 사용자의 timer 데이터 받아옴
  useEffect(() => {
    loadTimer();
  }, []);

  useEffect(() => {
    if (index < myTimers[selected].step.length)
      setTime(myTimers[selected].step[index])
  }, [index, selected, myTimers])

  const handleStep = () => {
    if (index < myTimers[selected].step.length-1)
      setIndex(index+1);
  }

  // index대로 선택된 아이템 보여줌
  const selectItem = (index) => {
    setSelected(index);
    console.log(selected);
  }

  // toggle sidebar
  const toggleMenu = () => {
    setIsOpen(isOpen => !isOpen);
  }

  const appendTimer = (newTimer) => {
    setMyTimers([...myTimers, newTimer.step]);
  }

  const deleteTimer = (id) => {
    let temp = [...myTimers];
    temp.splice(id, 1);

    setMyTimers(temp); // id가 다른 배열 요소들만 배열에 추가한 뒤 myTimers에 저장
    setSelected(null)
  }

  return (
    <div className="container">
      <div className = "header">
        <span className = "side-opener" onClick = {toggleMenu} style = {{fontSize : '4vh', textAlign : 'left'}}>⭐</span>
      </div>
      <div className="main-container">
        <div className={isOpen ? "show-side" : "hide-side"} >
          <Sidebar timers = {myTimers} append = {appendTimer} delete = {deleteTimer} selected = {selected} selectItem = {selectItem}/>
        </div>
          <div className="select-viewer">
            {myTimers.length ? (<h4>{myTimers[selected].title}</h4>) : console.log("데이터 로딩 안됨.")}
            { myTimers.length ?
            myTimers[selected].step.map((e, i) => {
              return <span key = {i}>{e}</span>
            }) : console.log("ㅇㅇ")}
          </div>
          <button onClick={() => {setStartTimer(!startTimer);}}>START</button>
          {startTimer && time && <ShowTimer time = {time}/>}
      </div>
    </div>
  );
}

export default App;
