const {useNavigate} = ReactRouter
import {MailPreview} from './MailPreview.jsx'

export function MailList({mails, updateMailStatus}) {
  const navigate = useNavigate()

  const handleMailClick = (mail) => {
    // Update the isRead status to true
    console.log(`Clicked mail ID: ${mail.id}`)
    updateMailStatus(mail.id, {isRead: true})
    console.log(`Updated mail:`, { ...mail, isRead: true });
    // Navigate to the mail info page
    navigate(`/mail/${mail.id}`)
  }

  if (!mails.length) return <p>No mails to display</p>

  return (
    <ul className="mail-list clean-list grid">
      {mails.map((mail) => (
        <li key={mail.id} className="mail-list-item" onClick={() => handleMailClick(mail)}>
          <MailPreview mail={mail} />
          <section className="mail-action-btn"></section>
        </li>
      ))}
    </ul>
  )
}
