const {useEffect, useState} = React
const {useParams, useNavigate, useLocation} = ReactRouter
const {Link, useSearchParams} = ReactRouterDOM

import {AppLoader} from '../../../cmps/AppLoader.jsx'
import {showErrorMsg, showSuccessMsg, showUserMsg} from '../../../services/event-bus.service.js'
import {formatTimeAgo, getTruthyValues} from '../../../services/util.service.js'
import {EmojiPicker} from '../cmps/Emoji.jsx'
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

  function handleStarClick(ev) {
    ev.stopPropagation()
    const updatedMail = {...mail, isStared: !isStared}
    updateMailStatus(mail.id, updatedMail)
  }

  function sendToKeepApp() {
    if (mail) {
      //   const {subject, body} = mail
      const subject = encodeURIComponent(mail.subject)
      const body = encodeURIComponent(mail.body)
      // here you need to NAV it right
      navigate(`/note/?title=${subject}&body=${body}`)

      showSuccessMsg('Mail details sent to KeepApp!')
    }
  }

  function onRemoveMail(mailId) {
    console.log(mailId, 'remove mail')

    const updatedMails = mails.map((mail) => (mail.id === mailId ? {...mail, removedAt: true} : mail))
    mailService
      .remove(mailId)
      .then(() => {
        setFilteredMails(updatedMails)
        showSuccessMsg(`Mail removed successfully!`)
      })
      .catch((err) => {
        console.log('Problems removing mail:', err)
        showErrorMsg(`Problems removing mail (${mailId})`)
      })
  }

  // Update mail status without reloading all mails
  function updateMailStatus(id, updatedMail) {
    updatedMail = mail.map((mail) => (mail.id === id ? updatedMail : mail))
    setFilteredMails(updatedMails) // Update the state with the new status

    // Persist to storage after updating state
    mailService
      .update('mailDB', updatedMail)
      .then(() => {
        console.log('Mail updated in the service')
      })
      .catch((err) => {
        console.error('Error updating mail status:', err)
      })
  }

  function navToComingSoon() {
    navigate(`/mail/underConstruction`)
  }

  if (!mail) return <AppLoader />

  const {subject, body, from, to, sentAt, isRead, prevMailId, nextMailId, isStared} = mail
  const timeAgo = formatTimeAgo(sentAt)

  return (
    <section className="mail-info-page ">
      <section className="mail-details-header-section ">
        <MailHeader filterBy={filterBy} onSetFilterBy={onSetFilterBy} isMenuOpen={isMenuOpen} openMenu={openMenu} />
        <MailFolderList filterBy={filterBy} onSetFilterBy={onSetFilterBy} isMenuOpen={isMenuOpen} />
      </section>

      <div className="mail-action-nav-bar ">
        <div className="action-btn-mail">
          <p className="back-nav" onClick={onBack} title="Back to Inbox">
            <i className="fa-solid fa-arrow-left"></i>
          </p>

          <div className="archive" onClick={navToComingSoon}>
            <i className="fa-solid fa-box-archive" title="Archive"></i>
          </div>
          <div className="spam" onClick={navToComingSoon}>
            <i className="fa-solid fa-exclamation" title="Report spam"></i>
          </div>
          <div title="delete mail" className="mail-details-delete-btn" onClick={() => onRemoveMail(mail.id)}>
            <i className="fa-solid fa-trash"></i>
          </div>

          <div className="unread " onClick={navToComingSoon}>
            <i className="fa-regular fa-envelope" title="Mark as Unread"></i>
          </div>

          <div className="mail-details-sent-mail ">
            <i className="fa-solid fa-share-from-square" title="Send to KeepApp" onClick={sendToKeepApp}></i>
          </div>

          <div className="move-to" onClick={navToComingSoon}>
            <i className="fa-regular fa-folder-closed" title="Move to"></i>
          </div>
          <div className="more" onClick={navToComingSoon}>
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
          <div className="mail-details-actions">
            <span className="star" onClick={handleStarClick}>
              <i
                className={`fa-${isStared ? 'solid' : 'regular'} fa-star`}
                style={{color: isStared ? '#FFD700' : 'inherit'}}
              ></i>
            </span>
            <EmojiPicker />

            <i className="fa-solid fa-reply" onClick={navToComingSoon}></i>
            <i className="fa-solid fa-ellipsis-vertical" onClick={navToComingSoon}></i>
          </div>
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
          </div>
        </div>
        <div className="mail-details ">
          <p>{body}</p>
        </div>
      </section>
      {/* <MailList mails={filteredMails} updateMailStatus={updateMailStatus} onRemoveMail={onRemoveMail} /> */}
      {/* {isComposeOpen && <AddMail onClose={toggleCompose} data={mailFromNote} />} */}
    </section>
  )
}
