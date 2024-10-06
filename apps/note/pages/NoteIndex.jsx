const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

import { showErrorMsg, showSuccessMsg, showUserMsg } from "../../../services/event-bus.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { getTruthyValues } from "../../../services/util.service.js"
import { AddNote } from "../cmps/AddNote.jsx"

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [searchPrms, setSearchPrms] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchPrms))

    useEffect(()=>{
        loadNotes()
        setSearchPrms(getTruthyValues(filterBy))
    },[filterBy])

    function loadNotes() {
        noteService.query(filterBy)
            .then(setNotes)
            .catch(err => {
                console.log('Problems getting notes:', err)
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(notes => notes.filter(note => note.id !== noteId))
                showSuccessMsg(`Note removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing note:', err)
                showErrorMsg(`Problems removing note (${noteId})`)
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(preFilter => ({ ...preFilter, ...filterBy }))
    }
    if (!notes) return <h1>Loading...</h1>
    return (
        <section className="note-index">
            {/* <CarFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} /> */}
            <AddNote/>
            <NoteList
                notes={notes}
                onRemoveNote={onRemoveNote}
            />

        </section>
    )
}

