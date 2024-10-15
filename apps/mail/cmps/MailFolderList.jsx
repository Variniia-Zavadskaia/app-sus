const {useState, useEffect} = React
const {useNavigate} = ReactRouter

export function MailFolderList({filterBy = {}, onSetFilterBy, isMenuOpen, unreadMailCount, onComposeClick}) {
  const [selectedFolder, setSelectedFolder] = useState(filterBy.folder || 'inbox')
  const navigate = useNavigate()

  const folders = [
    {name: 'Inbox', value: 'inbox', icon: 'fa-solid fa-inbox'},
    {name: 'Star', value: 'star', icon: 'fa-regular fa-star'},
    // {name: 'Do later', value: 'clock', icon: 'fa-regular fa-clock'},
    {name: 'Sent', value: 'sent', icon: 'fa-regular fa-paper-plane'},
    // {name: 'Draft ', value: 'draft ', icon: 'fa-regular fa-file'},
    {name: 'Bin ', value: 'bin', icon: 'fa-solid fa-trash'},
  ]

  useEffect(() => {
    onSetFilterBy({folder: selectedFolder})
  }, [selectedFolder])

  function handleFolderChange(folder) {
    setSelectedFolder(folder)
    navigate(`/mail?folder=${folder}`)
  }

  return (
    <div className={`label-folder-list ${isMenuOpen ? 'open' : 'close'}`}>
      <div className="new-mail-btn">
        <button className="compose-btn" onClick={onComposeClick}>
          <i className="fa-solid fa-pencil"></i>
          <span className="compose-label">Compose</span>
        </button>
      </div>

      {folders.map((folder) => (
        <ul key={folder.value}>
          <label className={`folder-icon ${selectedFolder === folder.value ? 'active' : ''}`}>
            <li>
              <input
                type="radio"
                name="folder"
                value={folder.value}
                checked={selectedFolder === folder.value}
                onChange={() => handleFolderChange(folder.value)}
                hidden
              />
              <div className={`icon ${folder.icon}`}></div>
              <p className="folder-label">
                {folder.name}
                {folder.value === 'inbox' && unreadMailCount > 0 && (
                  <span className="unread-count"> {unreadMailCount}</span>
                )}
              </p>
            </li>
          </label>
        </ul>
      ))}
    </div>
  )
}
