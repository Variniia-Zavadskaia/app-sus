const {useEffect, useState, useRef} = React
const {Link, useSearchParams} = ReactRouterDOM

import {showErrorMsg, showSuccessMsg, showUserMsg} from '../../../services/event-bus.service.js'
import {getTruthyValues} from '../../../services/util.service.js'
import {MailFilter} from '../cmps/MailFilter.jsx'
import {MailFolderList} from '../cmps/MailFolderList.jsx'
import {MailList} from '../cmps/MailList.jsx'
import {mailService} from '../services/mail.service.js'

export function MailIndex() {
  const [mails, setMails] = useState([])
  const [searchPrms, setSearchPrms] = useSearchParams()
  const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchPrms))

  const mailsRef = useRef([]) //to track the curr state
  const initialMailsRef = useRef([]) // to store the initial state

  useEffect(() => {
    loadMails()
    setSearchPrms(getTruthyValues(filterBy))
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
        console.log('loadmails ', loadedMails)

        setMails(loadedMails) // Set state
      })
      .catch((err) => {
        console.log('Problems getting mails:', err)
        showErrorMsg('Failed to load mails. Please try again.')
      })
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((preFilter) => ({...preFilter, ...filterBy}))
  }

  function onRemoveMail(mailId) {
    console.log(state, 'remove mail')
    state.onRemove('Tezka')
    const mailsFiltered = mail.filter((mail) => mail.id !== mailId)
    mailService
      .remove(mailId)
      .then(() => {
        setMails(mailsFiltered)
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
    setMails(updatedMails) // Update the state with the new status

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

  if (!mails) return <h1>Loading...</h1>
  return (
    <section className="mail-index">
      <section className="mail-header ">
        <button className="menu-icon-btn" data-menu-icon-btn onClick={openMenu}>
          <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="menu-icon">
            <g>
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
            </g>
          </svg>
        </button>
        <div className="mail-filter-container ">
          <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        </div>
      </section>
      <div className="mail-content-wrapper">
        <aside className="mail-folder-list">
          <MailFolderList filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        </aside>
        <main className="mail-list-container">
          <MailList mails={mails} updateMailStatus={updateMailStatus} onRemoveMail={onRemoveMail} />
        </main>
      </div>
    </section>
  )
}
