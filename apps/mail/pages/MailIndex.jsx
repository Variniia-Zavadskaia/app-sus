const {useEffect, useState, useRef} = React
const {useSearchParams} = ReactRouterDOM
const {useLocation} = ReactRouter

import {showErrorMsg, showSuccessMsg} from '../../../services/event-bus.service.js'
import {getTruthyValues} from '../../../services/util.service.js'
import {AddMail} from '../cmps/AddMail.jsx'
import {MailFolderList} from '../cmps/MailFolderList.jsx'
import {MailHeader} from '../cmps/MailHeader.jsx'
import {MailList} from '../cmps/MailList.jsx'
import {mailService} from '../services/mail.service.js'

export function MailIndex() {
  const [mails, setMails] = useState([])
  const [searchPrms, setSearchPrms] = useSearchParams()
  const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchPrms))
  const [isMenuOpen, setIsMenuOpen] = useState(false) //menu-asideBar state
  const [filteredMails, setFilteredMails] = useState([]) // folderList state
  const [unreadCount, setUnreadCount] = useState(0) //  unreadCount state
  const [isComposeOpen, setIsComposeOpen] = useState(false) // addMail form state
  const [initialBody, setInitialBody] = useState('') // State for initial body text

  const [mailFromNote, setMailFromNote] = useState({title: '', body: ''});

  const mailsRef = useRef([]) //to track the curr state
  const initialMailsRef = useRef([]) // to store the initial state

  const location = useLocation()

  useEffect(() => {
    // console.log(mailFromNote)
  }, [mailFromNote])

  useEffect(() => {
    loadMails()
    setSearchPrms(getTruthyValues(filterBy))
    if (location.state) {
      setMailFromNote(location.state);
      console.log(mailFromNote)
      setIsComposeOpen(true)
    }
    
  }, [filterBy])

  function loadMails() {
    mailService
      .query(filterBy)
      .then((loadedMails) => {
        // Save the initial mails state only once after loading
        if (!initialMailsRef.current.length) {
          initialMailsRef.current = loadedMails
        }
        mailsRef.current = loadedMails // Track latest mails
        // console.log('loadmails ', loadedMails)

        setMails(loadedMails) // Set state
        filterMails(loadedMails) //filter the mails by  folder value
        setUnreadCount(countUnreadMails(loadedMails))
      })
      .catch((err) => {
        console.log('Problems getting mails:', err)
        showErrorMsg('Failed to load mails. Please try again.')
      })
  }

  // Function to filter mails based on folder and isRead
  function filterMails(mails) {
    let filtered = [...mails]
    const loggedInUser = mailService.getUserLogged()

    if (filterBy.folder) {
      switch (filterBy.folder) {
        case 'inbox':
          filtered = filtered.filter((mail) => !mail.removedAt && mail.to === loggedInUser.email)
          break
        case 'star':
          filtered = filtered.filter((mail) => mail.isStared)
          break
        case 'sent':
          filtered = filtered.filter((mail) => mail.from === loggedInUser.email)
          break
        case 'draft':
          filtered = filtered.filter((mail) => !mail.to)
          break
        case 'bin':
          filtered = filtered.filter((mail) => mail.removedAt)
          break
        default:
          break
      }
    }

    if (filterBy.isRead !== undefined && filterBy.isRead !== null) {
      filtered = filtered.filter((mail) => mail.isRead === filterBy.isRead)
    }

    if (filterBy.sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))
    } else if (filterBy.sortBy === 'title') {
      filtered.sort((a, b) => a.subject.localeCompare(b.subject))
    }

    setFilteredMails(filtered)
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((preFilter) => ({...preFilter, ...filterBy}))
  }

  function toggleCompose() {
    setIsComposeOpen((prev) => !prev) // Toggle the compose form visibility
  }

  function onRemoveMail(mailId) {
    console.log(mailId, 'remove mail')

    const updatedMails = mails.map((mail) => (mail.id === mailId ? {...mail, removedAt: true} : mail))
    mailService
      .remove(mailId)
      .then(() => {
        setFilteredMails(updatedMails)
        showSuccessMsg(`Mail removed successfully!`)
      })
      .catch((err) => {
        console.log('Problems removing mail:', err)
        showErrorMsg(`Problems removing mail (${mailId})`)
      })
  }

  // Update mail status without reloading all mails
  function updateMailStatus(id, updatedMail) {
    const updatedMails = mails.map((mail) => (mail.id === id ? updatedMail : mail))
    setFilteredMails(updatedMails) // Update the state with the new status

    // Persist to storage after updating state
    mailService
      .update('mailDB', updatedMail)
      .then(() => {
        console.log('Mail updated in the service')
      })
      .catch((err) => {
        console.error('Error updating mail status:', err)
      })
  }

  const openMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  function countUnreadMails(mails) {
    const loggedInUser = mailService.getUserLogged()
    return mails.filter((mail) => !mail.isRead && mail.to === loggedInUser.email && !mail.removedAt).length
  }

  

  if (!mails.length) return <h1>Loading...</h1>
  return (
    <section className="mail-index">
      <header className="mail-header-section ">
        <MailHeader
          filterBy={filterBy}
          onSetFilterBy={onSetFilterBy}
          isMenuOpen={isMenuOpen}
          openMenu={openMenu}
          mails={filteredMails}
          updateMailStatus={updateMailStatus}
        />
      </header>
      <aside className="mail-folder-list">
        <MailFolderList
          filterBy={filterBy}
          onSetFilterBy={onSetFilterBy}
          isMenuOpen={isMenuOpen}
          unreadMailCount={unreadCount}
          onComposeClick={toggleCompose}
        />{' '}
      </aside>
      <section className="mail-content-wrapper">
        <main className="mail-list-container">
          <MailList mails={filteredMails} updateMailStatus={updateMailStatus} onRemoveMail={onRemoveMail} />
          {isComposeOpen && <AddMail onClose={toggleCompose} data={mailFromNote} />}
        </main>
      </section>
    </section>
  )
}
