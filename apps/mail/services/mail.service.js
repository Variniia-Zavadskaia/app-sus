import {loadFromStorage, makeId, saveToStorage} from '../../../services/util.service.js'
import {storageService} from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'


_createMails()

export const mailService = {
  query,
  get,
  remove,
  save,
  update,
  getEmptyMail,
  getUserLogged,
  getDefaultFilter,
  getFilterFromSearchParams,
  debounce,

}

function query(filterBy = {}) {
  const loggedInUser = getUserLogged()

  return storageService.query(MAIL_KEY).then((mails) => {
    // console.log('Fetched mails:', mails)
    if (filterBy.txt) {
      const regExp = new RegExp(filterBy.txt, 'i')
      mails = mails.filter((mail) => regExp.test(mail.subject) || regExp.test(mail.body))
    }

    if (filterBy.folder) {
      switch (filterBy.folder) {
        case 'inbox':
          mails = mails.filter((mail) => !mail.removedAt && mail.to === loggedInUser.email)
          break
        case 'star':
          mails = mails.filter((mail) => mail.isStared)
          break
        case 'sent':
          mails = mails.filter((mail) => mail.from === loggedInUser.email)
          break
        case 'draft':
          mails = mails.filter((mail) => !mail.to)
          break
        case 'bin':
          mails = mails.filter((mail) => mail.removedAt)
          break
        default:
          break
      }
    }

    if (filterBy.isRead !== undefined && filterBy.isRead !== null) {
      mails = mails.filter((mail) => mail.isRead === filterBy.isRead)
    }

    return mails
  })
}

function get(mailId) {
  return storageService.get(MAIL_KEY, mailId).then((mail) => _setNextPrevMailId(mail))
}

function update(mailId, updatedMail) {
  return storageService.put(mailId, updatedMail).then(() => {
    console.log('Mail updated in storage:', updatedMail)
  })
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

function getUserLogged(){
  return {
    email: 'user@appsus.com',
    fullName: 'Mahatma Appsus',
  }
}

function getEmptyMail(subject = '', body = '', from = getUserLogged().email, to = '') {

  return {
    id: makeId(),
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
    folder: 'inbox',
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
  const mails = loadFromStorage(MAIL_KEY)
  if (!mails || !mails.length) {
    const defaultMails = [
      _createMail('Miss you!', 'Would love to catch up sometimes', 'momo@momo.com', loggedInUser.email, ['romantic']),

      _createMail(
        'Project meeting',
        "Don't forget our meeting tomorrow at 10 AM.",
        'boss@appsus.com',
        loggedInUser.email,
        ['important']
      ),

      _createMail('Party Invite', 'You are invited to my birthday party.', 'friend@appsus.com', loggedInUser.email, [
        'social',
      ]),

      _createMail('Newsletter', 'Check out our latest products!', 'shop@appsus.com', loggedInUser.email, []),

      _createMail(
        'Project Update',
        'The project meeting is scheduled for next Monday. Please prepare your reports.',
        'manager@company.com',
        loggedInUser.email,
        []
      ),

      _createMail(
        'Discount Offer!',
        'Get 50% off on all items this weekend only! Use code SAVE50 at checkout.',
        'deals@shopping.com',
        loggedInUser.email,
        []
      ),

      _createMail(
        'Event Invitation',
        'You are invited to our annual tech conference. Join us for exciting talks and networking!',
        'events@techworld.com',
        loggedInUser.email,
        []
      ),
      _createMail(
        'Meeting Reminder',
        'This is a reminder for the meeting scheduled tomorrow at 2 PM. Please be on time.',
        'hr@company.com',
        loggedInUser.email,
        []
      ),

      _createMail(
        'Invoice Due',
        'Your invoice for the month of September is due. Please make the payment by October 15th.',
        'billing@services.com',
        loggedInUser.email,
        []
      ),

      _createMail(
        'New Course Available',
        'Enroll in our latest course on Full Stack Development and enhance your skills.',
        'courses@onlinelearning.com',
        loggedInUser.email,
        []
      ),

      _createMail(
        'System Maintenance',
        'Our systems will undergo maintenance on Sunday from 1 AM to 5 AM. Expect downtime during this period.',
        'support@techsolutions.com',
        loggedInUser.email,
        []
      ),

      _createMail(
        'Password Change Request',
        'A request to change your password was made. If this wasn’t you, please contact support immediately.',
        'security@company.com',
        loggedInUser.email,
        []
      ),

      _createMail(
        'Flight Confirmation',
        'Your flight to New York is confirmed. Check-in opens 24 hours before departure.',
        'booking@airline.com',
        loggedInUser.email,
        []
      ),

      _createMail(
        'Job Application Received',
        'We have received your application for the Software Engineer position. We will get back to you soon.',
        'careers@company.com',
        loggedInUser.email,
        []
      ),

      _createMail(
        'Holiday Sale',
        'Enjoy up to 70% off on our exclusive holiday collection! Don’t miss out on these deals.',
        'sales@fashionstore.com',
        loggedInUser.email,
        []
      ),

      _createMail(
        'Appointment Confirmation',
        'Your appointment with Dr. Smith is confirmed for October 10th at 3 PM.',
        'appointments@healthcare.com',
        loggedInUser.email,
        []
      ),

      _createMail(
        'Welcome to the Newsletter',
        'Thank you for subscribing to our newsletter! You will now receive the latest updates and offers.',
        'newsletter@brand.com',
        loggedInUser.email,
        []
      ),
    ]
    saveToStorage(MAIL_KEY, defaultMails)
    // console.log('Mails initialized and saved:', defaultMails)
  } else {
    // console.log('Existing mails found, no initialization needed.')
  }
}

function _createMail(subject, body, from, to, labels = []) {
  const mail = getEmptyMail(subject, body, from, to)
  mail.labels = labels
  return mail
}

function _setNextPrevMailId(mail) {
  // console.log('Setting next and previous mail IDs for:', mail)
  return query()
    .then((mails) => {
      // console.log('All mails fetched:', mails) // Check what's returned

      if (!mails || mails.length === 0) {
        // console.error('No mails found!')
        return mail // Return the original mail if no mails are available
      }

      const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)

      if (mailIdx === -1) {
        // console.error('Mail not found in the list')
        return mail // If the mail is not found, return the original mail
      }
      const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
      const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]

      mail.nextMailId = nextMail.id
      mail.prevMailId = prevMail.id
      return mail
    })
    .catch((err) => {
      // console.error('Error fetching mails:', err)
      return mail // Return the original mail in case of an error
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
