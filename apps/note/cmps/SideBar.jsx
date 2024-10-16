const { useState, useEffect } = React
const {useNavigate} = ReactRouter

import { appLabels } from "../../../services/util.service.js";

export function SideBar({ isOpen, onSetFolder }) {

    const [activeItem, setActiveItem] = useState("Notes");
    const navigate = useNavigate()

    // useEffect(()=>{
    //     navigate(`/note/?folder=Notes`)
    // })

    const handleItemClick = (item) => {
        setActiveItem(item); // Update the active item
        onSetFolder(item)
        navigate(`/note/?folder=${item}`)
    };

    const labels = ["Crit", "family"]

    return (
        <div className={`sidebar-notes ${isOpen ? 'open' : 'closed'}`}>
            <div
                className={`sidebar-notes-item ${activeItem === "Notes" ? "active" : ""}`}
                onClick={() => handleItemClick("Notes")}
            >
                <button className="icon-button" aria-label="Notes">
                    <i className="fa-regular fa-lightbulb"></i>
                </button>
                <span className="side-text">Notes</span>

            </div>
            {/* <div
                className={`sidebar-notes-item ${activeItem === "Label" ? "active" : ""}`}
                onClick={() => handleItemClick("Label")}
            >
                <button className="icon-button" aria-label="Label">
                    <i className="fa-solid fa-tag"></i>
                </button>
                <span className="side-text">Label</span>
            </div> */}

            <div
                className={`sidebar-notes-item ${activeItem === "Archive" ? "active" : ""}`}
                onClick={() => handleItemClick("Archive")}
            >
                <button className="icon-button" aria-label="Archive">
                    <i className="fa-solid fa-box-archive"></i>
                </button>
                <span className="side-text">Archive</span>
            </div>
            <div
                className={`sidebar-notes-item ${activeItem === "Trash" ? "active" : ""}`}
                onClick={() => handleItemClick("Trash")}
            >
                <button className="icon-button" aria-label="Trash">
                    <i className="fa-solid fa-trash-can"></i>
                </button>
                <span className="side-text">Trash</span>
            </div>
        </div>
    );
}

{/* <div className={`sidebar-notes-item ${isActive ? "active" : ""}`}>
<span className="material-icons-outlined hover">{icon}</span>
<span className="sidebar-text">{text}</span>
</div> */}


{/* <SideBarItem icon="lightbulb" text="Notes" isActive={true} />
<SideBarItem icon="notifications" text="Reminders" />
<SideBarItem icon="edit" text="Edit Labels" />
<SideBarItem icon="archive" text="Archive" />
<SideBarItem icon="delete" text="Trash" /> */}