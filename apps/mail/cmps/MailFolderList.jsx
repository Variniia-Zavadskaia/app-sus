const {useState, useEffect} = React

export function MailFolderList({filterBy= {}, onSetFilterBy, isMenuOpen}) {
  const [selectedFolder, setSelectedFolder] = useState(filterBy.folder || 'inbox')

  useEffect(() => {
    onSetFilterBy({folder: selectedFolder})
  }, [selectedFolder])

  function handleFolderChange(folder) {
    setSelectedFolder(folder)
  }

  const folders = [
    {name: 'Inbox', value: 'inbox', icon: 'fa-solid fa-inbox'},
    {name: 'Star', value: 'star', icon: 'fa-regular fa-star'},
    {name: 'Do later', value: 'clock', icon: 'fa-regular fa-clock'},
    {name: 'Sent', value: 'sent', icon: 'fa-regular fa-paper-plane'},
    {name: 'Draft ', value: 'draft ', icon: 'fa-regular fa-file'},
  ]

  return (
    <div className={`label-folder-list ${isMenuOpen ? 'open' : 'close'}`}>
      {' '}
      {folders.map((folder) => (
        <ul key={folder.value}>
          <label className={`folder-icon ${selectedFolder === folder.name ? 'active' : ''}`}>
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
              <p className="folder-label">{folder.name}</p>
            </li>
          </label>
        </ul>
      ))}
    </div>
  )
}
