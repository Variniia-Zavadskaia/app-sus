import {MailFilter} from './MailFilter.jsx'
const { useNavigate} = ReactRouter


export function MailHeader({filterBy, onSetFilterBy, openMenu, filteredMails ,updateMailStatus}) {
  const navigate = useNavigate()
  
  function goMailIndexPage(){
    navigate('/mail')
  }

  function navToComingSoon() {
    navigate(`/mail/underConstruction`)
  }

  return (
    <div className="mail-header-app">
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
        <div className="logo" onClick={goMailIndexPage}>
          <i className="fa-solid fa-m"></i>
        </div>
        <div className="empty-place"></div>
      </div>
      <div className="mail-filter-container ">
        <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} mails={filteredMails} updateMailStatus={updateMailStatus}/>
        <i className="fa-regular fa-circle-question" title="Support" onClick={navToComingSoon}></i>
        <i className="fa-solid fa-gear" title="Settings" onClick={navToComingSoon}></i>
      </div>

      <div className="user-action">
        <i className="fa-solid fa-grip" title="App" onClick={navToComingSoon}></i>
        <div className="user-img-container">
          <img src="https://via.placeholder.com/150" alt="user-img" className="user-img" />
        </div>
      </div>
    </div>
  )
}
