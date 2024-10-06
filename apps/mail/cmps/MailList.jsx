const {useNavigate} = ReactRouter

import {MailPreview} from './MailPreview.jsx'

export function MailList({mails, updateMailStatus, onRemove}) {
  const navigate = useNavigate()


  const handleMailClick = (mail) => {
    console.log(`Clicked mail ID: ${mail.id}`)

    // Update isRead status locally before navigating
    const updatedMail = {...mail, isRead: true}
    updateMailStatus(mail.id, updatedMail)

    // Navigate to mail details
    navigate(`/mail/${mail.id}`, {state: onRemove})
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
