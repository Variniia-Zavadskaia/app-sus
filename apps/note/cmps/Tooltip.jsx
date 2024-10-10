export function Tooltip({ icon, text, small }) {
    return (
      <div className="tooltip">
        <span
          className={`material-icons-outlined hover ${small ? "small-icon" : ""}`}
        >
          {icon}
        </span>
        <span className="tooltip-text">{text}</span>
      </div>
    );
  }