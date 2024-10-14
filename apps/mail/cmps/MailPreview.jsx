import {formatTimeAgo} from '../../../services/util.service.js'
const {useState} = React
export function MailPreview({ mail, onRemoveMail, updateMailStatus, onClick }) {
  const [isSelected, setIsSelected] = useState(false)
  const {subject, body, from, sentAt, isRead, isStared} = mail
  const timeAgo = formatTimeAgo(sentAt)

  const truncatedBody = body.length > 10 ? `${body.substring(0, 50)}...` : body

  function handleSelect (ev)  {
    // ev.stopPropagation()
    ev.preventDefault()
    setIsSelected((isSelected) => !isSelected)
  }

  function handleStarClick(ev) {
    ev.stopPropagation()
    const updatedMail = {...mail, isStared: !isStared}
    updateMailStatus(mail.id, updatedMail)
  }

  // function handleUnreadClick(ev) {
  //   ev.stopPropagation()
  //   const updatedMail = {...mail, readAt: null}
  //   updateMailStatus(mail.id, updatedMail)
  // }
  function handleDeleteClick(ev) {
    ev.stopPropagation()
    onRemoveMail(mail.id)
  }



  return (
    <tr className={`mail-review ${isRead ? 'read' : 'unread'} `} onClick={onClick}>
      {/* <td className="select">
        <input type="checkbox" onChange={(e) => {
            e.preventDefault() // Prevent row click
            setIsSelected((isSelected) => !isSelected)
          }} />
      </td> */}
      <td className="star-col ">
        <span className="star" onClick={handleStarClick}>
        <i className={`fa-${isStared ? 'solid' : 'regular'} fa-star`} 
        style={{ color: isStared ? '#FFD700' : 'inherit' }}></i>
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
          onClick={handleDeleteClick}
        >
          <i className="fa-solid fa-trash"></i>
        </div>
      </td>
    </tr>
  )
}
