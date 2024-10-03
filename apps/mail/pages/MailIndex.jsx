const {useEffect, useState} = React
const {Link, useSearchParams} = ReactRouterDOM

import {showErrorMsg, showSuccessMsg, showUserMsg} from '../../../services/event-bus.service.js'
import {getTruthyValues} from '../../../services/util.service.js'
import {MailFilter} from '../cmps/MailFilter.jsx'
import {MailList} from '../cmps/MailList.jsx'
import {mailService} from '../services/mail.service.js'

export function MailIndex() {
  const [mails, setMails] = useState(null)
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
      })
  }

  function onRemoveMail(mailId) {
    mailService
      .remove(mailId)
      .then(() => {
        setMails((mails) => mails.filter((mail) => mail.id !== mailId))
        showSuccessMsg(`Mail removed successfully!`)
      })
      .catch((err) => {
        console.log('Problems removing mail:', err)
        showErrorMsg(`Problems removing mail (${mailId})`)
      })
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((preFilter) => ({...preFilter, ...filterBy}))
  }

  if (!mails) return <h1>Loading...</h1>
  return (
    <section className="mail-index">
      <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      <MailList mails={mails} />
    </section>
  )
}
