import {MailFilter} from './MailFilter.jsx'

export function MailHeader({filterBy, onSetFilterBy, openMenu}) {
  return (
    <div className="mail-header">
      <div className="header-nav-logo">
        <div className="menu-btn">
          <button
            className="menu-icon-btn"
            data-menu-icon-btn
            onClick={openMenu}
            title="main menu"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
        <div className="logo">
          <i className="fa-solid fa-m"></i>
        </div>
        <div className="empty-place"></div>
      </div>
      <div className="mail-filter-container ">
        <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        <i className="fa-regular fa-circle-question" title="Support"></i>
        <i className="fa-solid fa-gear" title="Settings"></i>
      </div>

      <div className="user-action">
        <i className="fa-solid fa-grip" title="App"></i>
        <div className="user-img-container">
          <img src="https://via.placeholder.com/150" alt="user-img" className="user-img" />
        </div>
      </div>
    </div>
  )
}
