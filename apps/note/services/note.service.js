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
    getEmptyNote,
    getEmptyNoteTodo
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            console.log('All notes:', notes);
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => {
                    const { txt = '', title = '', todos = [] } = note.info || {}
                    const isMatchInTodos = todos.some(todo => regExp.test(todo.txt));
                    return regExp.test(txt) || regExp.test(title) || isMatchInTodos;
                })
                // notes = notes.filter(note => noteIncludes(note))
                console.log('Filtered notes by text:', notes);
            }
            if (filterBy.type) {
                notes = notes.filter(note => note.type.includes(filterBy.type))
                console.log('Filtered notes by type:', notes);
            }
            if (filterBy.folder) {
                notes = notes.filter(note => note.folder.includes(filterBy.folder))
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

// function saveTodo(noteId, todoToSave) {
//     return get(noteId).then(note => {
//         const todo = _createReview(reviewToSave)
//         book.reviews.unshift(review)
//         return save(book).then(() => review)
//     })
// }

function getEmptyNoteTodo() {
    return { txt: '', doneAt: null }
}

function getEmptyNote(type = '', backgroundColor = '#fff') {
    return {
        type,
        folder: 'Notes',
        isPinned: false,
        style: {
            backgroundColor
        },
        info: {},
        labels: []
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
    const type = ['NoteTxt', 'NoteImg', 'NoteTodos']

    let notes = loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            // _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            // _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            // _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            // _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            // _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            // _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            // _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            // _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            {
                id: makeId(),
                folder: 'Archive',
                createdAt: getRandomDate(new Date(2020, 0, 1), new Date()),
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#dda0dd'
                },
                info: {
                    title: 'Title3',
                    txt: 'It is impossible to say how first the idea entered my brain; but once conceived, it haunted me day and night. Object there was none. Passion there was none. I loved the old man. He had never wronged me.'
                }
            },
            {
                id: makeId(),
                folder: 'Notes',
                createdAt: getRandomDate(new Date(2020, 0, 1), new Date()),
                type: 'NoteImg',
                isPinned: true,
                info: {
                    url: 'assets/img/Batman.jpeg',
                    title: 'I am BATMAN'
                },
                style: {
                    backgroundColor: '#e8f0fe'
                }
            },
            {
                id: makeId(),
                folder: 'Archive',
                createdAt: getRandomDate(new Date(2020, 0, 1), new Date()),
                type: 'NoteTodos',
                isPinned: false,
                style: {
                    backgroundColor: '#e8f0fe'
                },
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { id: makeId(), txt: 'Watch a new movie', doneAt: null },
                        { id: makeId(), txt: 'Take a walk in the park', doneAt: null },
                        { id: makeId(), txt: 'Catch up with friends', doneAt: null },
                        { id: makeId(), txt: 'Play a favorite game', doneAt: null }
                    ]
                }
            },

            {
                id: makeId(),
                folder: 'Notes',
                createdAt: getRandomDate(new Date(2020, 0, 1), new Date()),
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#ffd700'
                },
                info: {
                    title: 'Title2',
                    txt: 'Japan is a beautiful island nation known for its rich culture, advanced technology, traditional arts, delicious cuisine, and iconic landmarks like Mount Fuji and ancient temples. It blends modernity with deep-rooted traditions seamlessly.'
                }
            },
            {
                id: makeId(),
                folder: 'Notes',
                createdAt: getRandomDate(new Date(2020, 0, 1), new Date()),
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'assets/img/Fire.jpeg',
                    title: 'Sunny Day Smiles'
                },
                style: {
                    backgroundColor: '#40e0d0'
                }
            },
            {
                id: makeId(),
                folder: 'Trash',
                createdAt: getRandomDate(new Date(2020, 0, 1), new Date()),
                type: 'NoteTodos',
                isPinned: false,
                style: {
                    backgroundColor: '#e8f0fe'
                },
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { id: makeId(), txt: 'Check emails', doneAt: null },
                        { id: makeId(), txt: 'Finish project report', doneAt: null},
                        { id: makeId(), txt: 'Team meeting call', doneAt: null },
                        { id: makeId(), txt: 'Prepare presentation', doneAt: null },
                        { id: makeId(), txt: 'Update tasks in tracker', doneAt: null },
                    ]
                }
            },

            {
                id: makeId(),
                folder: 'Notes',
                createdAt: getRandomDate(new Date(2020, 0, 1), new Date()),
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#e8f0fe'
                },
                info: {
                    title: 'Title1',
                    txt: 'The quick brown fox jumps over the lazy dog, seeking adventure in a world filled with endless possibilities.',
                }
            },
            {
                id: makeId(),
                folder: 'Trash',
                createdAt: getRandomDate(new Date(2020, 0, 1), new Date()),
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'assets/img/No.jpeg',
                    title: 'Secret Revealed'
                },
                style: {
                    backgroundColor: '#e8f0fe'
                }
            },
            {
                id: makeId(),
                folder: 'Notes',
                createdAt: getRandomDate(new Date(2020, 0, 1), new Date()),
                type: 'NoteTodos',
                isPinned: true,
                style: {
                    backgroundColor: '#f5deb3'
                },
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { id: makeId(), txt: 'Driving license', doneAt: null },
                        { id: makeId(), txt: 'Coding power', doneAt: null }
                    ]
                }
            }
        ]

        for (let i = 0; i < notes.length; i++) {
            if (notes[i].type === 'NoteTodos') {
                for (let j = 0; j < notes[i].info.todos.length; j++) {
                    if (getRandomIntInclusive(0,1)) {
                        notes[i].info.todos[j].doneAt = getRandomDate(notes[i].createdAt, new Date());
                    }
                }
            }
        }
        console.log(notes);
        saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(type) {
    const note = getEmptyNote(type)
    note.id = makeId()
    note.createdAt = getRandomDate(new Date(2020, 0, 1), new Date());
    note.style.backgroundColor = '#e8f0fe'

    switch (type) {
        case 'NoteTxt':
            note.info = {
                title: 'Title txt',
                txt: 'The quick brown fox jumps over the lazy dog, seeking adventure in a world filled with endless possibilities.',
            }
            break;
        case 'NoteImg':
            note.info = {
                title: 'I am BATMAN',
                url: 'assets/img/Batman.jpeg',
            }
            break;
        case 'NoteTodos':
            note.info = {
                title: 'Get my stuff together',
                todos: [
                    { id: makeId(), txt: 'Driving license', doneAt: null },
                    { id: makeId(), txt: 'Coding power', doneAt: getRandomDate(note.createdAt, new Date()) }
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

