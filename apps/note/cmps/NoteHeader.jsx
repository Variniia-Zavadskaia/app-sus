import { NoteFilter } from "../cmps/NoteFilter.jsx"

export function NoteHeader({ filterBy, onSetFilterBy, onMenuClick }) {

    return (
        // <div className="note-header">
        <nav className="note-header-nav">
            <div className="logo-area">
                <div className="tooltip">
                    <button className="menu-button" aria-label="Main Menu" onClick={onMenuClick}>
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
            <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />

            <div className="profile-actions-area">
                {/* <div className="tooltip">
                    <button className="icon-button" aria-label="List View">
                        <i className="fa-solid fa-list"></i>
                    </button>
                    <span className="tooltip-text">List View</span>
                </div> */}

                <div className="tooltip">
                    <img
                        className="logo-img"
                        src="assets/img/ghost.png"
                        alt="Logo"
                        aria-hidden="true"
                    />
                    <span className="tooltip-text">Happy Ghost</span>
                </div>
            </div >
        </nav >


    );
};
