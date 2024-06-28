import React, { useState } from "react";
import "./sidebar.css";

function Sidebar(props) {
    const selectItem = (e) => {
        props.handlerSetSelected(parseInt(e.target.id));
    };

    const Input = () => {
        const [isStep, setIsStep] = useState(false);
        const [numStep, setNumStep] = useState(0);
        
        const selectHandler = (e) => {
            setNumStep(parseInt(e.target.value))
            setIsStep(true);
        }

        const DynamicInput = () => {
            var i;
            var arr = [];
            for (i = 0; i < numStep; i++) {
                arr.push(i);
            }
            
            if (isStep)
                return (
                    <div className="dynamic-input">
                        {
                            arr.map((e, i) => {
                                return <input type = "text" id = {e} placeholder="분 단위로 입력"></input>
                        })}
                    </div>
                )
        }

        return (
            <div className="input-popup">
                <select id = "step" onChange={selectHandler}>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <DynamicInput />
            </div>
        )
    }

    // const addButton = Input => {
    //     console.log(Input);
    //     const width = window.outerWidth / 4;
    //     const height = window.outerHeight / 3;
    //     const left = window.screenX + (window.outerWidth - width) / 2;
    //     const top = window.screenY + (window.outerWidth - height) / 2;
    //     const windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;
        
    //     const popup = window.open(Input, 'input', windowFeatures);

    // }

    const DeleteButton = ({deleteList}) => {
        function deleteConfirm() {
            if (window.confirm(props.selected+"를 삭제할까요?")) {
                alert("삭제 되었습니다.");
                return true;
            } else return false;
        }

        return (
            <span className = "delete-button" onClick = {() => {
                if (deleteConfirm()) deleteList(props.selected);
            }}>🗑</span>
        )
    }

    return (
            <div className="sidebarMenu">
                <div className="sidebar-header">
                <h3 className="sidebarTitle" style = {{width : "80%", textAlign : "center"}}>즐겨찾기 리스트</h3>
                <span style = {{color : "yellow", fontSize :"3vh", marginRight :"10px"}}>➕</span>
                </div>
                <ul className="sidebarList">
                    {
                        props.timers.map((e, i)=> {
                            if (i === props.selected) {
                                return (
                                    <h3 className = "selected" id = {i} key = {i} onClick = {selectItem}>
                                        {props.timers[i].title} <DeleteButton deleteList = {props.delete}/>
                                    </h3>
                                )
                            } else {
                                return (<h3 className = "no" id = {i} key = {i} onClick = {selectItem}>
                                    {props.timers[i].title}
                                </h3>)
                            }
                        })
                    }
                </ul>
            </div>
        )
}

export default Sidebar;