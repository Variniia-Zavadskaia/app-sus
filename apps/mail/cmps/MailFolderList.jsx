const {useState, useEffect} = React

export function MailFolderList({filterBy, onSetFilterBy}) {
  const [selectedFolder, setSelectedFolder] = useState(filterBy.folder || 'inbox')

  useEffect(() => {
    onSetFilterBy({folder: selectedFolder})
  }, [selectedFolder])

  function handleFolderChange(folder) {
    setSelectedFolder(folder)
  }

  

  const folders = [
    { name: 'Inbox', value: 'inbox', icon: 'fa-solid fa-inbox' },
    { name: 'Sent', value: 'sent', icon: 'fa-solid fa-paper-plane' },
    { name: 'Trash', value: 'trash', icon: 'fa-solid fa-trash' },
    { name: 'Draft', value: 'draft', icon: 'fa-solid fa-pencil-alt' },  ]

  return (
    <div className="mail-folder-list space-between">
      {folders.map((folder) => (
        <ul>
          <label key={folder.value} className={`folder-icon ${selectedFolder === folder.name ? 'active' : ''}`}>
            <li>
              <input
                type="radio"
                name="folder"
                value={folder.value}
                checked={selectedFolder === folder.value}
                onChange={() => handleFolderChange(folder.value)}
                hidden
              />
              <i className={`fa-solid ${folder.icon}`}></i>
              <span className="folder-label">{folder.label}</span>
            </li>
          </label>
        </ul>
      ))}
    </div>
  )
}
