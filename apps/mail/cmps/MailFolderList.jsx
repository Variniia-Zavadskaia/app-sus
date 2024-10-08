import {MailIndex} from '../pages/MailIndex'

const {useState, useEffect} = React

export function MailFolderList({filterBy = {}, onSetFilterBy, isMenuOpen}) {
  const [selectedFolder, setSelectedFolder] = useState(filterBy.folder || 'inbox')

  const folders = [
    {name: 'Inbox', value: 'inbox', icon: 'fa-solid fa-inbox'},
    {name: 'Star', value: 'star', icon: 'fa-regular fa-star'},
    {name: 'Do later', value: 'clock', icon: 'fa-regular fa-clock'},
    {name: 'Sent', value: 'sent', icon: 'fa-regular fa-paper-plane'},
    {name: 'Draft ', value: 'draft ', icon: 'fa-regular fa-file'},
  ]

  useEffect(() => {
    onSetFilterBy({folder: selectedFolder})
  }, [selectedFolder])

  function handleFolderChange(folder) {
    setSelectedFolder(folder)
  }

  // Function to filter mails based on the selected folder
  function filterMails() {
    let filtered = []
    switch (selectedFolder) {
      case 'inbox':
        filtered = mails.filter((mail) => !mail.removedAt && mail.to === loggedInUser.email)
        break
      case 'star':
        filtered = mails.filter((mail) => mail.isStared)
        break
      case 'clock':
        // For example, assume "Do Later" is just unread mails
        filtered = mails.filter((mail) => !mail.isRead)
        break
      case 'sent':
        filtered = mails.filter((mail) => mail.from === loggedInUser.email)
        break
      case 'draft':
        // Assume drafts are mails with no 'to' address yet
        filtered = mails.filter((mail) => !mail.to)
        break
      default:
        filtered = mails
    }
    setFilteredMails(filtered)
  }

  return (
    <div className={`label-folder-list ${isMenuOpen ? 'open' : 'close'}`}>
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
              <p className="folder-label">{folder.name}</p>
            </li>
          </label>
        </ul>
      ))}
    </div>
  )
}
