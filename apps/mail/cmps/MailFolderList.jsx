const {useState, useEffect} = React

export function MailFolderList({filterBy, onSetFilterBy}) {
  const [selectedFolder, setSelectedFolder] = useState(filterBy.folder || 'inbox')

  useEffect(() => {
    onSetFilterBy({folder: selectedFolder})
  }, [selectedFolder])

  function handleFolderChange(folder) {
    setSelectedFolder(folder)
  }

  return (
    <div className="mail-folder-list">
      <label>
        <input
          type="radio"
          name="folder"
          value="inbox"
          checked={selectedFolder === 'inbox'}
          onChange={() => handleFolderChange('inbox')}
        />
        Inbox
      </label>
      <label>
        <input
          type="radio"
          name="folder"
          value="sent"
          checked={selectedFolder === 'sent'}
          onChange={() => handleFolderChange('sent')}
        />
        Sent
      </label>
      <label>
        <input
          type="radio"
          name="folder"
          value="trash"
          checked={selectedFolder === 'trash'}
          onChange={() => handleFolderChange('trash')}
        />
        Trash
      </label>
      <label>
        <input
          type="radio"
          name="folder"
          value="draft"
          checked={selectedFolder === 'draft'}
          onChange={() => handleFolderChange('draft')}
        />
        Draft
      </label>
    </div>
  )
}
