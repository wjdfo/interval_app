import React, { useState } from "react";
import "./sidebar.css";

function Sidebar(props) {
    const [selected, setSelected] = useState(null);

    const selectItem = (e) => {
        setSelected(e.target.id);
    };

    return (
        <div className="sidebar" style = {{}}>
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Sidebar test</h3>
                    <ul className="sidebarList">
                        {
                            props.timers.map((e, i)=> {
                                return (<h3 className = {props.timers[i].id === selected ? "selected" : "no"} id = {props.timers[i].id} onClick = {selectItem}>
                                            {props.timers[i].id}
                                        </h3>)
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;