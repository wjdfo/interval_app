import React from "react";
import ReactDOM from 'react-dom/client';
import DynamicInputForm from "./DynamicInputForm";
import "./sidebar.css";

function Sidebar(props) {
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 2;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    const selectItem = (e) => {
        props.selectItem(parseInt(e.target.id));
    };

    const openWindow = () => {
        const newWindow = window.open("inputInterface.html", '_blank', `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`);

        if (newWindow) {
            newWindow.onload = () => {
                const root = ReactDOM.createRoot(newWindow.document.getElementById('root'));
    
                return root.render(<DynamicInputForm/>);
            }
        }
    }

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
                <span className = "plus" onClick = {openWindow} style = {{color : "yellow", fontSize :"3vh", marginRight :"10px", cursor : "pointer"}}>➕</span>
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