const { useEffect, useState } = React
const { useSearchParams } = ReactRouterDOM

import { AddNote } from "../cmps/AddNote.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteDetails } from "../cmps/NoteDetails.jsx"
import { NoteHeader } from "../cmps/NoteHeader.jsx"
import { SideBar } from "../cmps/SideBar.jsx"
import { showErrorMsg, showSuccessMsg, showUserMsg } from "../../../services/event-bus.service.js"
import { noteService } from "../services/note.service.js"
import { getTruthyValues } from "../../../services/util.service.js"


export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [searchPrms, setSearchPrms] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchPrms))
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        loadNotes()
        setSearchPrms(getTruthyValues(filterBy))
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy)
            .then(setNotes)
            .catch(err => {
                console.log('Problems getting notes:', err)
                showErrorMsg('Could not load notes')
            })
    }

    function onRemoveNote(noteId) {
        setNotes(notes => notes.filter(note => note.id !== noteId))
        noteService.remove(noteId)
            .then(() => {
                showSuccessMsg('Note removed successfully!')
            })
            .catch(err => {
                console.log('Problems removing note:', err)
                showErrorMsg(`Problems removing note (${noteId})`)
            })
    }

    function openEditModal(note) {
        console.log('openEditModal');

        setSelectedNote(note);
        setIsModalOpen(true);
    };

    function closeEditModal() {
        setIsModalOpen(false);
        setSelectedNote(null);
    };

    function onSaveNote(noteToSave) {
        setNotes(prevNotes => prevNotes.map(note => note.id === noteToSave.id ? noteToSave : note))
        closeEditModal()
        noteService.save(noteToSave)
            .then(() => {
                showSuccessMsg('note has successfully saved!')
            })
            .catch(() => {
                console.error('Could not save note:', err)
                showErrorMsg(`Couldn't save note`)
            })
    }

    function onAddNote(noteToAdd) {
        // setNotes(prevNotes => [...prevNotes, noteToAdd]);
        noteService.save(noteToAdd)
            .then(() => {
                showSuccessMsg('note has successfully added!')
                loadNotes()
            })
            .catch(() => {
                console.error('Could not add note:', err)
                showErrorMsg(`Couldn't add note`)
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(preFilter => ({ ...preFilter, ...filterBy }))
    }

    if (!notes) return <h1>Loading...</h1>
    return (
        <section className="note-index">
            <section className="note-header">
                <NoteHeader filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            </section>
            <div className="note-body">
                <SideBar />
                <div className="note-content">
                    <AddNote onAddNote={onAddNote} />
                    <NoteList
                        notes={notes}
                        onRemoveNote={onRemoveNote}
                        onEditNote={openEditModal}
                        onSaveNote={onSaveNote}
                    />
                </div>
                    {isModalOpen && (
                        <NoteDetails
                            note={selectedNote}
                            onClose={closeEditModal}
                            onSaveNote={onSaveNote}
                            onRemoveNote={onRemoveNote}
                        />
                    )}
            </div>
        </section>
    )
}

