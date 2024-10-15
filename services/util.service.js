// export const utilService = {
//     makeId,
//     makeLorem,
//     getRandomIntInclusive,
//     getRandomColor,
//     padNum,
//     getDayName,
//     getMonthName,
//     loadFromStorage,
//     saveToStorage,
//     getRandomDate
// }

export function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function loadFromStorage(key) {
  const data = localStorage.getItem(key)
  return data ? JSON.parse(data) : undefined
}

export function makeId(length = 6) {
  var txt = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }

  return txt
}

export function makeLorem(size = 100) {
  var words = [
    'The sky',
    'above',
    'the port',
    'was',
    'the color of television',
    'tuned',
    'to',
    'a dead channel',
    '.',
    'All',
    'this happened',
    'more or less',
    '.',
    'I',
    'had',
    'the story',
    'bit by bit',
    'from various people',
    'and',
    'as generally',
    'happens',
    'in such cases',
    'each time',
    'it',
    'was',
    'a different story',
    '.',
    'It',
    'was',
    'a pleasure',
    'to',
    'burn',
  ]
  var txt = ''
  while (size > 0) {
    size--
    txt += words[Math.floor(Math.random() * words.length)] + ' '
  }
  return txt
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive
}

export function padNum(num) {
  return num > 9 ? num + '' : '0' + num
}

export function getRandomColor() {
  const letters = '0123456789ABCDEF'
  var color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export function getDayName(date, locale) {
  date = new Date(date)
  return date.toLocaleDateString(locale, {weekday: 'long'})
}

export function getMonthName(date) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return monthNames[date.getMonth()]
}

export function getRandomDate(startDate, endDate) {
  const startTimestamp = startDate.getTime()
  const endTimestamp = endDate.getTime()
  const randomTimestamp = Math.random() * (endTimestamp - startTimestamp) + startTimestamp
  return new Date(randomTimestamp)
}

export function getTruthyValues(obj) {
  const newObj = {}
  for (const key in obj) {
    const value = obj[key]
    if (value || value === 0) {
      newObj[key] = value
    }
  }
  return newObj
}

export const formatTimeAgo = (dateString) => {
  const now = new Date()
  const sentDate = new Date(dateString)
  const secondsAgo = Math.floor((now - sentDate) / 1000)

  if (secondsAgo < 60) {
    return `${secondsAgo} sec${secondsAgo === 1 ? '' : 's'} ago`
  } else if (secondsAgo < 3600) {
    const minutesAgo = Math.floor(secondsAgo / 60)
    return `${minutesAgo} min${minutesAgo === 1 ? '' : 's'} ago`
  } else if (secondsAgo < 86400) {
    const hoursAgo = Math.floor(secondsAgo / 3600)
    return `${hoursAgo} hr${hoursAgo === 1 ? '' : 's'} ago`
  } else {
    return sentDate.toLocaleDateString() // Returns date if more than a day ago
  }
}

export  const appLabels=['Critical', 'Family', 'Work','Friends', 'Spam', 'Memories', 'Romantic']

export function animateCSS(el, animation = '', isRemoveClass = true) {
  const prefix = 'animate__'
  return new Promise((resolve, reject) => {
      const animationName = `${prefix}${animation}`
      el.classList.add(`${prefix}animated`, animationName)

      function handleAnimationEnd(event) {
          event.stopPropagation()
          if (isRemoveClass) el.classList.remove(`${prefix}animated`, animationName)
          resolve('Animation ended')
      }

      el.addEventListener('animationend', handleAnimationEnd, { once: true })
  })
}
