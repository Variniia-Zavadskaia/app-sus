import { loadFromStorage, makeId, getRandomIntInclusive, saveToStorage, getRandomDate } from './util.service.js'
import { storageService } from './async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.search))
            }
            if (filterBy.type) {
                notes = notes.filter(note => note.type.includes(filterBy.type))
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
        .then(note => _setNextPrevNoteId(note))
}

function remove(noteId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(type = '', backgroundColor = '#00d') {
    return {
        type,
        isPinned: false,
        style: {
            backgroundColor
        },
        info: {},
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        type: '',
    }
}

function _createNotes() {
    const type = ['NoteTxt', 'NoteImg', 'NoteTodos']
    let notes = loadFromStorage(NOTE_KEY) || []
    if (!notes || !notes.length) {
        notes = [
            _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            _createNote(type[getRandomIntInclusive(0, type.length - 1)])
        ]
        saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(type) {
    const note = getEmptyNote(type)
    note.id = makeId()
    note.createdAt = getRandomDate(new Date(2020, 0, 1), new Date());

    switch (type) {
        case 'NoteTxt':
            note.info = {
                txt: makeLorem(50),
            }
            break;
        case 'NoteImg':
            note.info = {
                title: makeLorem(10),
                url: 'assets/img/BATMAN.jpeg',
            }
            break;
        case 'NoteTodos':
            note.info = {
                title: makeLorem(10),
                todos: [
                    { txt: makeLorem(20), doneAt: null },
                    { txt: makeLorem(20), doneAt: getRandomDate(note.createdAt, new Date()) }
                ]
            }
            break;
    }

    return note
}
