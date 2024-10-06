const {useEffect, useState} = React
const {useParams, useNavigate, useLocation} = ReactRouter
const {Link} = ReactRouterDOM

import {showErrorMsg, showSuccessMsg, showUserMsg} from '../../../services/event-bus.service.js'
import {mailService} from '../services/mail.service.js'

export function MailDetails() {
  const [mail, setMail] = useState(null)
  const {mailId} = useParams()
  //   console.log(mailId, 'mailid from params')

  const { state } = useLocation();

  const navigate = useNavigate()

  useEffect(() => {
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
  

  function onRemoveMail(mailId) {
    console.log(state ,'remove mail');
    state.onRemove('Tezka')
    const mailsFiltered = mail.filter((mail) => mail.id !== mailId)
    mailService
      .remove(mailId)
      .then(() => {
        setMails(mailsFiltered)
        showSuccessMsg(`Mail removed successfully!`)
      })
      .catch((err) => {
        console.log('Problems removing mail:', err)
        showErrorMsg(`Problems removing mail (${mailId})`)
      })
  }




  function onBack() {
    navigate('/mail')
  }

  if (!mail) return <h1>Loading...</h1>

  const {subject, body, from, to, sentAt, isRead, prevMailId, nextMailId} = mail

  return (
    <section className="mail-info-page main-layout flex flex-column">
    <section className="mail-action-nav-bar space-between flex">
      <p className="back-nav" onClick={onBack} title="back to income mails">
        <i className="fa-solid fa-arrow-left"></i>
      </p>
      <section className="prev-next-btn actions-btn">
      <button title="delete mail" className="delete-btn"onClick={() => onRemoveMail(mail.id)}><i className="fa-solid fa-trash"></i></button>
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
    </section>
    
    <section className={`mail-info ${isRead ? 'read' : 'unread'} flex column`}>
      <div className="mail-header flex space-between ">
        <div className="mail-details flex column">
          <h2 className="subject">{subject}</h2>
          <p className="from">
            <strong>From:</strong> {from}
          </p>
          <p className="to">
            <strong>To:</strong> {to}
          </p>
        </div>
        <p className="sent align-end">
          <strong>Sent at:</strong> {new Date(sentAt).toLocaleString()}
        </p>
      </div>
      
      <hr className="divider" />
      <p>{body}</p>
    </section>
  </section>
  )
}
