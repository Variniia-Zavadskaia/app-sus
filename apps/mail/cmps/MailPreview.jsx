export function MailPreview({mail}) {
  const {subject, body, from, to, sentAt, isRead, labels} = mail

  return (
    <section className={`mail-preview ${isRead ? 'read' : 'unread'} flex column space-between`}>
      {labels && labels.length > 0 && (
        <p className="mail-labels">
          <strong>Labels:</strong> {labels.join(', ')}
        </p>
      )}
      <div className="mail-header flex space-between align-center">
        <h2 className="mail-subject">{subject}</h2>

        <p className="mail-sent">
          <strong>Sent at:</strong> {new Date(sentAt).toLocaleString()}
        </p>
      </div>
      <div className="mail-info flex column">
        <p className="mail-from">
          <strong>From:</strong> {from}
        </p>
      </div>
      <div className="mail-content flex  space-between">
        <p className="mail-body">{body}</p>
        <p className="mail-status">{isRead ? 'Read' : 'Unread'}</p>
      </div>
    </section>
  )
}
