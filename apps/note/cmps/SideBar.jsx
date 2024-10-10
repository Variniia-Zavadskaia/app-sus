import { SideBarItem } from "../cmps/SideBarItem.jsx";

export function SideBar(params) {
    return (
        <div className="sidebar-notes">
          <SideBarItem icon="lightbulb" text="Notes" isActive={true} />
          <SideBarItem icon="notifications" text="Reminders" />
          <SideBarItem icon="edit" text="Edit Labels" />
          <SideBarItem icon="archive" text="Archive" />
          <SideBarItem icon="delete" text="Trash" />
        </div>
      );
}