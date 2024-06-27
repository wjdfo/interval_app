import React from "react";
import "./sidebar.css";


function Sidebar({width}) {




    return (
        <div className="sidebar" style = {{}}>
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Sidebar test</h3>
                    <ul className="sidebarList">
                        <li className="sidebarItem">Menu1</li>
                        <li className="sidebarItem">Menu2</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;