import {utilService} from '../../../services/util.service.js'
const { loadFromStorage, saveToStorage, makeId } = utilService

import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
const loggedInUser = {
  email: 'user@appsus.com',
  fullName: 'Mahatma Appsus',
}

_createMails()

export const mailService = {
  query,
  get,
  remove,
  save,
  getEmptyMail,
  getDefaultFilter,
  getFilterFromSearchParams,
  debounce
}

function query(filterBy = {}) {
  return storageService.query(MAIL_KEY).then((mails) => {
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      mails = mails.filter((mail) => regExp.test(mail.subject) || regExp.test(mail.body))
    }
    if (filterBy.isRead !== null) {
      mails = mails.filter((mail) => mail.isRead === filterBy.isRead)
    }
    return mails
  })
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId).then((mail) => _setNextPrevMailId(mail))
}

function remove(mailId) {
  return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
  if (mail.id) {
    return storageService.put(MAIL_KEY, mail)
  } else {
    return storageService.post(MAIL_KEY, mail)
  }
}

function getEmptyMail(subject = '', body = '', from = loggedInUser.email, to = '') {
  return {
    id:  makeId(),
    subject,
    body,
    isRead: false,
    sentAt: Date.now(),
    createdAt: Date.now(),
    removedAt: null,
    from,
    to,
    isStared: false,
    labels: [],
  }
}

function getDefaultFilter() {
  return {
    status: 'inbox',
    txt: '',
    isRead: null,
    isStared: null,
    labels: [],
  }
}

function getFilterFromSearchParams(searchParams) {
  const status = searchParams.get('status') || 'inbox'
  const txt = searchParams.get('txt') || ''
  const isRead = searchParams.get('isRead') !== null ? searchParams.get('isRead') === 'true' : null
  const isStared = searchParams.get('isStared') !== null ? searchParams.get('isStared') === 'true' : null
  const labels = searchParams.getAll('labels') || []
  return {status, txt, isRead, isStared, labels}
}

function _createMails() {
    let mails = loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
      mails = [
        _createMail('Miss you!', 'Would love to catch up sometimes', 'momo@momo.com', loggedInUser.email, ['romantic']),
        _createMail('Project meeting', 'Don\'t forget our meeting tomorrow at 10 AM.', 'boss@appsus.com', loggedInUser.email, ['important']),
        _createMail('Party Invite', 'You are invited to my birthday party.', 'friend@appsus.com', loggedInUser.email, ['social']),
        _createMail('Newsletter', 'Check out our latest products!', 'shop@appsus.com', loggedInUser.email, [])
       ]
      saveToStorage(MAIL_KEY, mails)
    }
  }

function _createMail(subject, body, from, to, labels = []) {
  const mail = getEmptyMail(subject, body, from, to)
  mail.labels = labels
  return mail
}

function _setNextPrevMailId(mail) {
  return query().then((mails) => {
    const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
    const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
    const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
    mail.nextMailId = nextMail.id
    mail.prevMailId = prevMail.id
    return mail
  })
}

function debounce(func, delay) {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
