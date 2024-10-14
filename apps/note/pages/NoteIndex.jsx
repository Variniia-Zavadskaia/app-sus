const { useEffect, useState } = React
const { useSearchParams, useLocation, useNavigate } = ReactRouterDOM

import { AppLoader } from '../../../cmps/AppLoader.jsx'
import { AddNote } from "../cmps/AddNote.jsx"
import { AddMail } from "../../mail/cmps/AddMail.jsx"
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [folder, setFolder] = useState('Notes')


    // Handling location for pre-filling notes from emails
    const location = useLocation();
    const navigate = useNavigate()

    useEffect(() => {
        console.log();

        loadNotes()
        setSearchPrms(getTruthyValues(filterBy))
    }, [filterBy])

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const mailTitle = params.get('title') || '';
        const mailBody = params.get('body') || '';
        const noteId = params.get('noteID') || '';

        // If email data is present, show the modal and prefill the form
        if (noteId) {
            const noteToEdit = notes.find(note => note.id == noteId)
            openEditModal(noteToEdit)
        }
        else if (mailTitle || mailBody) {
            const newNote = noteService.getEmptyNote('NoteTxt')
            newNote.info.title = mailTitle
            newNote.info.txt = mailBody
            openEditModal(newNote)
        }
    }, [location])

    // function handleChange({target}) {

    //     const {name, value} = target
    //     setMailToSave((prevMail) => ({...prevMail, [name]: value}))
    //   }

    function sendNoteEditQuery(noteToEdit) {
        navigate(`/note/?noteID=${noteToEdit.id}`);
    }

    function loadNotes() {
        noteService.query(filterBy)
            .then(setNotes)
            .catch(err => {
                console.log('Problems getting notes:', err)
                showErrorMsg('Could not load notes')
            })
    }

    const onToggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState); // Toggle sidebar open/close
    };

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
        navigate('/note')
    };

    function onSaveNote(noteToSave, closeModal = true) {
        if (closeModal) closeEditModal();
        if (noteToSave.id && noteToSave.id !== '') {
            setNotes(prevNotes => prevNotes.map(note => note.id === noteToSave.id ? noteToSave : note))
            noteService.save(noteToSave)
                .then(() => {
                    showSuccessMsg('note has successfully saved!')

                })
                .catch(() => {
                    console.error('Could not save note:', err)
                    showErrorMsg(`Couldn't save note`)
                })
        }
        else {
            onAddNote(noteToSave)
        }
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

    function onSetFolder(folder) {
        setFolder(folder)
    }

    if (!notes) return <AppLoader />
    return (
        <section className="note-index">
            <section className="note-header">
                <NoteHeader filterBy={filterBy} onSetFilterBy={onSetFilterBy} onMenuClick={onToggleSidebar} />
            </section>
            <div className="note-body">
                <SideBar isOpen={isSidebarOpen} onSetFolder={onSetFolder} />
                <div className='note-content-wrapper'>
                    <div className="note-content">
                        <AddNote onAddNote={onAddNote} />
                        <NoteList
                            notes={notes.filter(note => note.folder === folder)}
                            onRemoveNote={onRemoveNote}
                            onEditNote={sendNoteEditQuery}
                            onSaveNote={onSaveNote}
                        />
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <NoteDetails
                    note={selectedNote}
                    onClose={closeEditModal}
                    onSaveNote={onSaveNote}
                    onRemoveNote={onRemoveNote}
                />
            )}
        </section>
    )
}

