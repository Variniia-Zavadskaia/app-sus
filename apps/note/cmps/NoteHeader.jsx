
export function NoteHeader({ filterBy, onSetFilterBy }) {
    return (
        // <div className="note-header">
            <nav className="note-header-nav">
                <div className="logo-area">
                <div className="tooltip">
                    <button className="menu-button" aria-label="Main Menu">
                        <i className="fa-solid fa-bars"></i>
                    </button>
                    <span className="tooltip-text">Main Menu</span>
                    </div>

                    <img
                        className="logo-img"
                        src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
                        srcSet="
    https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png 1x,
    https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png 2x
  "
                        alt="Logo"
                        aria-hidden="true"
                    />
                    <span className="logo-text">Keep</span>
                    
                </div>
                {/* Search bar */}
                <div className="search-area">
                    <div className="tooltip">
                        <button className="icon-button" aria-label="Search">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <span className="tooltip-text">Search</span> {/* Tooltip text */}
                    </div>
                    <input type="text" className="search-input" placeholder="Search" />
                </div>

                <div className="settings-area">
                    <div className="tooltip">
                        <button className="icon-button" aria-label="Refresh">
                            <i className="fa-solid fa-rotate-right"></i>
                        </button>
                        <span className="tooltip-text">Refresh</span>
                    </div>

                    <div className="tooltip">
                        <button className="icon-button" aria-label="List View">
                            <i className="fa-solid fa-list"></i>
                        </button>
                        <span className="tooltip-text">List View</span>
                    </div>

                    <div className="tooltip">
                        <button className="icon-button" aria-label="Settings">
                            <i className="fa-solid fa-gear"></i>
                        </button>
                        <span className="tooltip-text">Settings</span>
                    </div>
                </div>

                <div className="profile-actions-area">
                    <div className="tooltip">
                        <button className="icon-button" aria-label="Apps">
                            <i className="fa-solid fa-grip"></i>
                        </button>
                        <span className="tooltip-text">Apps</span>
                    </div>

                    <div className="tooltip">
                        <button className="icon-button" aria-label="Account">
                            <i className="fa-regular fa-circle-user"></i>
                        </button>
                        <span className="tooltip-text">Account</span>
                    </div>
                </div>
            </nav >
        // </div >

    );
};
