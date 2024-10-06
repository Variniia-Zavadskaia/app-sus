
export function MailPreview({mail}) {
  const {subject, body, from, to, sentAt, isRead, labels} = mail
  const truncatedBody = body.length > 10 ? `${body.substring(0, 50)}...` : body

  return (
    <tr className="mail-review">
      <td className="star-col">
        <span className="star">
          <i className="fa-regular fa-star"></i>
        </span>
      </td>
      <td className="mail-sender">{from}</td>
      <td className="mail-subject">{subject} - </td>
      <td className="mail-body">{truncatedBody}</td>
      <td className="mail-sent"> {new Date(sentAt).toLocaleString()}</td>
      <td className="action-hover"></td>
    </tr>
  )
}
