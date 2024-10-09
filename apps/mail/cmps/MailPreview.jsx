import {formatTimeAgo} from '../../../services/util.service.js'

export function MailPreview({mail, onClick, onRemoveMail}) {
  const {subject, body, from, sentAt, isRead} = mail
  const truncatedBody = body.length > 10 ? `${body.substring(0, 50)}...` : body
  const timeAgo = formatTimeAgo(sentAt)

  return (
    <tr className={`mail-review ${isRead ? 'read' : 'unread'} `} onClick={onClick}>
      <td className="select">
        <input type="checkbox" />
      </td>
      <td className="star-col ">
        <span className="star">
          <i className="fa-regular fa-star"></i>
        </span>
      </td>
      <td className="mail-sender">{from}</td>
      <td className="mail-subject">{subject} - </td>
      <td className="mail-body">{truncatedBody}</td>
      <td className="mail-sent"> {timeAgo}</td>
      <td className="action-hover">
        <div
          title="delete mail"
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation() // Prevent row click
            onRemoveMail(mail.id) // Call the remove mail function
          }}
        >
          <i className="fa-solid fa-trash"></i>
        </div>
      </td>
    </tr>
  )
}
