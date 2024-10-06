const {useEffect, useState} = React
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

  useEffect(() => {
    loadMails()
    setSearchPrms(getTruthyValues(filterBy))
  }, [filterBy])

  function loadMails() {
    mailService
      .query(filterBy)
      .then(setMails)
      .catch((err) => {
        console.log('Problems getting mails:', err)
        showErrorMsg('Failed to load mails. Please try again.')
      })
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((preFilter) => ({...preFilter, ...filterBy}))
  }

  function updateMailStatus(id, updates) {
    setMails((prevMails) => prevMails.map((mail) => (mail.id === id ? {...mail, ...updates} : mail)))
  }

  if (!mails) return <h1>Loading...</h1>
  return (
    <section className="mail-index">
    <div className="mail-filter-container">
      <MailFolderList filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
    </div>
    <MailList mails={mails} updateMailStatus={updateMailStatus} />
  </section>
  )
}
