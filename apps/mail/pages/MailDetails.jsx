const {useEffect, useState} = React
const {useParams, useNavigate, useLocation} = ReactRouter
const {Link, useSearchParams} = ReactRouterDOM

import {showErrorMsg, showSuccessMsg, showUserMsg} from '../../../services/event-bus.service.js'
import {formatTimeAgo, getTruthyValues} from '../../../services/util.service.js'
import {MailFolderList} from '../cmps/MailFolderList.jsx'
import {MailHeader} from '../cmps/MailHeader.jsx'
import {mailService} from '../services/mail.service.js'

export function MailDetails() {
  const [mail, setMail] = useState(null)
  const {mailId} = useParams()
  const [searchPrms, setSearchPrms] = useSearchParams()

  const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchPrms))
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  //   console.log(mailId, 'mailid from params')

  const {state} = useLocation()

  const navigate = useNavigate()

  useEffect(() => {
    setSearchPrms(getTruthyValues(filterBy))
    loadMail()
  }, [mailId])

  function loadMail() {
    // console.log(`Fetching mail with ID: ${mailId}`)
    mailService
      .get(mailId)
      .then((fetchedMail) => {
        // console.log('Fetched mail:', fetchedMail)
        if (fetchedMail) {
          //   console.log('Setting mail state:', fetchedMail)
          setMail(fetchedMail)
          //   console.log('Mail state after set:', mail)
        } else {
          console.log(`No mail found for ID: ${mailId}`)
          showErrorMsg('No mail found for the given ID.')
          navigate('/mail')
        }
      })
      .catch((err) => {
        console.error('Error fetching mail:', err)
        showErrorMsg('Error fetching mail.')
        navigate('/mail')
      })
  }

  function onBack() {
    navigate('/mail')
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((preFilter) => ({...preFilter, ...filterBy}))
  }

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  if (!mail) return <h1>Loading...</h1>
  
  
  const {subject, body, from, to, sentAt, isRead, prevMailId, nextMailId} = mail
  const timeAgo = formatTimeAgo(sentAt)

  return (
    <section className="mail-info-page ">
      <section className="mail-header-section ">
        <MailHeader filterBy={filterBy} onSetFilterBy={onSetFilterBy} isMenuOpen={isMenuOpen} openMenu={openMenu} />
        <MailFolderList filterBy={filterBy} onSetFilterBy={onSetFilterBy} isMenuOpen={isMenuOpen} />
      </section>

      <div className="mail-action-nav-bar ">
        <div className="action-btn-mail">
          <p className="back-nav" onClick={onBack} title="Back to Inbox">
            <i className="fa-solid fa-arrow-left"></i>
          </p>

          <div className="archive">
            <i className="fa-solid fa-box-archive" title="Archive"></i>
          </div>
          <div className="spam">
            <i className="fa-solid fa-exclamation" title="Report spam"></i>
          </div>
          <div title="delete mail" className="delete-btn" onClick={() => onRemoveMail(mail.id)}>
            <i className="fa-solid fa-trash"></i>
          </div>

          <div className="unread ">
            <i className="fa-regular fa-envelope" title="Mark as Unread"></i>
          </div>
          <div className="unread">
            <i className="fa-regular fa-folder-closed" title="Move to"></i>
          </div>
          <div className="unread">
            <i className="fa-solid fa-ellipsis-vertical" title="More"></i>
          </div>
        </div>
        <section className="actions-btn prev-next-btn">
          <button disabled={!prevMailId} title="prev mail">
            <Link to={`/mail/${prevMailId}`}>
              <i className="fa-solid fa-arrow-left"></i>
            </Link>
          </button>
          <button disabled={!nextMailId} title="next mail">
            <Link to={`/mail/${nextMailId}`}>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </button>
        </section>
      </div>

      <section className="mail-info">
        <div className="mail-details-header ">
          <h2 className="subject">{subject}</h2>
          <div className="sub-header">
            <div className="sender-img-container">
              <img src="https://via.placeholder.com/150" alt="sender-img" className="sender-img" />
              <p className="from">
                <strong>{from}</strong>
              </p>
            </div>
            <div className="to-details">
              <p className="to">to {to}</p>
            </div>
            <p className="sent ">{timeAgo}</p>
            <div className="mail-details-actions">
              <i className="fa-regular fa-star"></i>
              <i className="fa-regular fa-face-smile"></i>
              <i className="fa-solid fa-reply"></i>
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>
        </div>
        <div className="mail-details ">
          <p>{body}</p>
        </div>
      </section>
    </section>
  )
}
