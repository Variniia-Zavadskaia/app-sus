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
            if(filterBy.folder){
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
        labels:[]
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
            _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
            _createNote(type[getRandomIntInclusive(0, type.length - 1)]),
        ]

        console.log(notes);


        saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(type) {
    const note = getEmptyNote(type)
    note.id = makeId()
    note.createdAt = getRandomDate(new Date(2020, 0, 1), new Date());
    note.style.backgroundColor = '#e8f0fe'

    if (!_createNote.availableImages) {
        _createNote.availableImages = [
           'Batman.jpeg',
        'Clairvoyant.jpeg',
        'Deadpool.jpeg',
        'SnowWhite.jpeg'
        ];
    }


    const getRandomImage = () => {
        if (_createNote.availableImages.length === 0) {
            console.warn('use all');
            return null; 
        }
        const randomIdx = Math.floor(Math.random() * _createNote.availableImages.length);
        const selectedImage = _createNote.availableImages.splice(randomIdx, 1)[0]; 
        return `assets/img/${selectedImage}`;
    };

    switch (type) {
        case 'NoteTxt':
            note.info = {
                title: 'Title txt',
                txt: 'The quick brown fox jumps over the lazy dog, seeking adventure in a world filled with endless possibilities.',
            }
            break;
        case 'NoteImg':
            const randomImageUrl = getRandomImage();
            note.info = {
                title: 'I am AWESOME',
                url: randomImageUrl || 'assets/img/default.jpeg',
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

