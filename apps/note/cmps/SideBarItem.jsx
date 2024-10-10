export function SideBarItem({ icon, text, isActive }) {

    return (
        <div className={`sidebar-notes-item ${isActive ? "active" : ""}`}>
            <span className="material-icons-outlined hover">{icon}</span>
            <span className="sidebar-text">{text}</span>
        </div>
    );
}