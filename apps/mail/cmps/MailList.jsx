const {useNavigate } = ReactRouterDOM


import {MailPreview} from './MailPreview.jsx'

export function MailList({mails, updateMailStatus, onRemoveMail, showArchived }) {
  console.log('Rendering MailList with mails:', mails)
  
  const navigate = useNavigate()

  const handleMailClick = (mail) => {
    console.log(`Clicked mail ID: ${mail.id}`)

    // Update isRead status locally before navigating
    const updatedMail = {...mail, isRead: true}
    updateMailStatus(mail.id, updatedMail)

    // Navigate to mail details
    navigate(`/mail/${mail.id}`) 
  }

  const filteredMails = mails.filter((mail) => (showArchived ? mail.removedAt : !mail.removedAt))

  if (!filteredMails.length) return <p>No mails to display</p>

  return (
    <table className="mail-list-table">
      <tbody>
        {filteredMails.map((mail) => (
          <MailPreview key={mail.id} mail={mail}
          onRemoveMail={onRemoveMail} 
          updateMailStatus={updateMailStatus}
          onClick={() => handleMailClick(mail)} />
        ))}
      </tbody>
    </table>
  )
}
