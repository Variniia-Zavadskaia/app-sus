const { useState } = React
export function SideBar({ isOpen }) {

    const [activeItem, setActiveItem] = useState("Notes");
    const handleItemClick = (item) => {
        setActiveItem(item); // Update the active item
    };
    return (
        <div className={`sidebar-notes ${isOpen ? 'open' : 'closed'}`}>
            <div
                className={`sidebar-notes-item ${activeItem === "Notes" ? "active" : ""}`}
                onClick={() => handleItemClick("Notes")}
            >
                <button className="icon-button" aria-label="Notes">
                    <i className="fa-regular fa-lightbulb"></i>
                </button>
                <span className="tooltip-text">Notes</span>

            </div>
            <div
                className={`sidebar-notes-item ${activeItem === "Reminders" ? "active" : ""}`}
                onClick={() => handleItemClick("Reminders")}
            >
                <button className="icon-button" aria-label="Reminders">
                    <i className="fa-solid fa-bell"></i>
                </button>
                <span className="tooltip-text">Reminders</span>
            </div>
            <div
                className={`sidebar-notes-item ${activeItem === "Edit Labels" ? "active" : ""}`}
                onClick={() => handleItemClick("Edit Labels")}
            >
                <button className="icon-button" aria-label="Edit Labels">
                    <i className="fa-solid fa-pen"></i>
                </button>
                <span className="tooltip-text">Edit Labels</span>
            </div>
            <div
                className={`sidebar-notes-item ${activeItem === "Archive" ? "active" : ""}`}
                onClick={() => handleItemClick("Archive")}
            >
                <button className="icon-button" aria-label="Archive">
                    <i className="fa-solid fa-box-archive"></i>
                </button>
                <span className="tooltip-text">Archive</span>
            </div>
            <div
                className={`sidebar-notes-item ${activeItem === "Trash" ? "active" : ""}`}
                onClick={() => handleItemClick("Trash")}
            >
                <button className="icon-button" aria-label="Trash">
                    <i className="fa-solid fa-trash-can"></i>
                </button>
                <span className="tooltip-text">Trash</span>
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