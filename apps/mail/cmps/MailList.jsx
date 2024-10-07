const {useNavigate} = ReactRouter

import {MailPreview} from './MailPreview.jsx'

export function MailList({mails, updateMailStatus, onRemoveMail}) {
  const navigate = useNavigate()

  const handleMailClick = (mail) => {
    console.log(`Clicked mail ID: ${mail.id}`)

    // Update isRead status locally before navigating
    const updatedMail = {...mail, isRead: true}
    updateMailStatus(mail.id, updatedMail)

    // Navigate to mail details
    navigate(`/mail/${mail.id}`, {state: onRemoveMail})
  }

  if (!mails.length) return <p>No mails to display</p>

  return (
    <table className="mail-list-table">
      <tbody>
        {mails.map((mail) => (
          <MailPreview key={mail.id} mail={mail} onClick={() => handleMailClick(mail)} />
        ))}
      </tbody>
    </table>
  )
}
