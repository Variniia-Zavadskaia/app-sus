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
      <div className="mail-filter-container">
        <MailFolderList filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      </div>
      <MailList mails={mails} updateMailStatus={updateMailStatus} onRemove={console.log} />
    </section>
  )
}
