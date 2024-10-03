import {MailPreview} from "./MailPreview.jsx"


export function MailList({mails}) {
  if (!mails.length) return <p>No mails to display</p>

  return (
    <ul  className="mail-list flex column">
        {mails.map(mail =>
            <li key={mail.id} className="mail-list-item">
                <MailPreview mail={mail} />
            </li>
         )}

    </ul >
  )
}
