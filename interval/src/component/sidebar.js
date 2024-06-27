import React, { useState } from "react";
import "./sidebar.css";

function Sidebar(props) {
    const [selected, setSelected] = useState(null);

    const selectItem = (e) => {
        setSelected(e.target.id);
    };

    const DeleteButton = ({deleteList}) => {
        function deleteConfirm() {
            if (window.confirm(selected+"를 삭제할까요?")) {
                alert("삭제 되었습니다.");
                return true;
            } else return false;
        }

        return (
            <span className = "delete-button" onClick = {() => {
                if (deleteConfirm()) deleteList(selected);
            }}>🗑</span>
        )
    }

    return (
        <div className="sidebar" style = {{}}>
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Sidebar test</h3>
                    <ul className="sidebarList">
                        {
                            props.timers.map((e, i)=> {
                                if (props.timers[i].id === selected) {
                                    return (
                                        <h3 className = "selected" id = {props.timers[i].id} key = {i} onClick = {selectItem}>
                                            {props.timers[i].id} <DeleteButton deleteList = {props.delete}/>
                                        </h3>
                                    )
                                } else {
                                    return (<h3 className = "no" id = {props.timers[i].id} key = {i} onClick = {selectItem}>
                                        {props.timers[i].id}
                                    </h3>)
                                }
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;