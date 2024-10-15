const {useEffect, useState, useRef} = React
const {useSearchParams} = ReactRouterDOM
const {useLocation} = ReactRouter

import {AppLoader} from '../../../cmps/AppLoader.jsx'
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

  const [mailFromNote, setMailFromNote] = useState({title: '', body: ''})

  const mailsRef = useRef([]) //to track the curr state
  const initialMailsRef = useRef([]) // to store the initial state

  const location = useLocation()

  // useEffect(() => {
  //   // console.log(mailFromNote)
  // }, [mailFromNote])

  useEffect(() => {
    loadMails()
    setSearchPrms(getTruthyValues(filterBy))
    if (location.state) {
      setMailFromNote(location.state)
      setIsComposeOpen(true)
    }
  }, [filterBy, mailFromNote])

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
      console.log(filterBy.folder, 'filterby.folder')

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
          console.log('Filtered bin mails:', filtered)
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

    if (filterBy.search) {
      const searchText = filterBy.search.toLowerCase()
      filtered = filtered.filter(
        (mail) => mail.subject.toLowerCase().includes(searchText) || mail.body.toLowerCase().includes(searchText)
      )
    }

    setFilteredMails(filtered)
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((preFilter) => ({...preFilter, ...filterBy}))
    setFilteredMails([])
  }

  function toggleCompose() {
    setIsComposeOpen((prev) => !prev) // Toggle the compose form visibility
  }

  function removeMailToBin(mailId) {
    const currentDate = new Date().toISOString()
    updateMailStatus(mailId, {...mails, removedAt: currentDate })

  }

  function onRemoveMail(mailId) {
    const mailToRemove = mails.find((mail) => mail.id === mailId)

    if (mailToRemove) {
      // If the mail is already in the bin, remove it from the service and update state
      if (mailToRemove.removedAt) {
        mailService
          .remove(mailId)
          .then(() => {
            // Remove the mail from both mails and filteredMails
            setMails((prevMails) => prevMails.filter((mail) => mail.id !== mailId))
            setFilteredMails((prevFilteredMails) => prevFilteredMails.filter((mail) => mail.id !== mailId))

            showSuccessMsg(`Mail removed from bin successfully!`)
          })
          .catch((err) => {
            console.log('Problems removing mail from bin:', err)
            showErrorMsg(`Problems removing mail from bin (${mailId})`)
          })
      } else {
        removeMailToBin(mailId)
      }
    }
  }

  // Update mail status without reloading all mails
  function updateMailStatus(mailId, updatedMail) {
    const updatedMails = mails.map((mail) => (mail.id === mailId ? {...mail, ...updatedMail} : mail))
    setFilteredMails(updatedMails)
    mailService
    .update(mailId, updatedMail)
    .then(() => {
      setMails(updatedMails)
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

  if (!mails.length) return <AppLoader />
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
