import { loadFromStorage, makeId, getRandomIntInclusive, saveToStorage, getRandomDate, makeLorem } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getFilterFromSearchParams,
    getEmptyNote
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            console.log('All notes:', notes);
            // if (filterBy.txt) {
            //     const regExp = new RegExp(filterBy.txt, 'i')
            //     notes = notes.filter(note => regExp.test(note.search))
            // }
            if (filterBy.type) {
                notes = notes.filter(note => note.type.includes(filterBy.type))
                console.log('Filtered notes by type:', notes);
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

function getFilterFromSearchParams(searchParams) {
    // const txt = searchParams.get('txt') || ''
    const type = searchParams.get('type') || ''
    return {
        // txt,
        type
    }
}

function _createNotes() {
    const type = ['NoteTxt', 'NoteImg']
    let notes = loadFromStorage(NOTE_KEY) 
    if (!notes || !notes.length) {
        notes = [
            _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            _createNote(type[getRandomIntInclusive(0, type.length - 1)])
        ]

        console.log(notes);
        

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
                txt: makeLorem(20),
            }
            break;
        case 'NoteImg':
            note.info = {
                title: makeLorem(5),
                url: 'assets/img/BATMAN.jpeg',
            }
            break;
        case 'NoteTodos':
            note.info = {
                title: makeLorem(5),
                todos: [
                    { txt: makeLorem(20), doneAt: null },
                    { txt: makeLorem(20), doneAt: getRandomDate(note.createdAt, new Date()) }
                ]
            }
            break;
    }

    return note
}

function _setNextPrevNoteId(note) {
    return storageService.query(NOTE_KEY)
        .then((notes) => {
            const noteIdx = notes.findIndex((currNote) => currNote.id === note.id)
            const nextNote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
            const prevNote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
            note.nextNoteId = nextNote.id
            note.prevNoteId = prevNote.id
            return note
        })
}

