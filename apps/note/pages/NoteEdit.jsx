const { useParams, useNavigate } = ReactRouter
const { useState, useEffect } = React

import { AddNote } from "../cmps/AddNote.jsx"
import { EditNoteTxt } from "../cmps/dynamic-inputs/NoteTxt.jsx";
import { EditNoteImg } from "../cmps/dynamic-inputs/NoteImg.jsx";
import { EditNoteTodos } from "../cmps/dynamic-inputs/NoteTodos.jsx";
import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg, showUserMsg } from "../../../services/event-bus.service.js"

export function NoteEdit({type = ''}) {
    const [note, setNote] = useState(noteService.getEmptyNote())

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!params.noteId) return
        noteService.get(params.noteId).then(setNote)
    }, [])

    // useEffect(() => {
    //     if (!params.noteId) {
    //         setNote(prevNote => ({
    //             ...prevNote, type }),
    //         }))
    //         return
    //     }
    //     noteService.get(params.noteId).then(setNote)
    // }, [])

    function onSave(ev) {
        ev.preventDefault()
        noteService.save(note)
            .then(() => showSuccessMsg('note has successfully saved!'))
            .catch(() => showErrorMsg(`couldn't save note`))
            .finally(() => navigate('/note'))
    }

    function onChangeInfo(field, val) {
        setNote(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, [field]: val },
        }))
    }

    return (
        <section className="note-edit backdrop">
            <AddNote/>
            <form onSubmit={onSave}>
                <DynamicCmp cmpType={note.type} info={note.info} onChangeInfo={onChangeInfo} />
                <button>Save</button>
            </form>
        </section>
    )

}

function DynamicCmp(props) {
    // console.log('props:', props)
    switch (props.cmpType) {
        case 'NoteTxt':
            // return <Hello name={props.name} age={props.age} handleClick={props.handleClick} />
            return <EditNoteTxt {...props} />
        case 'NoteImg':
            return <EditNoteImg {...props} />

        case 'NoteTodos':
            return <EditNoteTodos {...props} />
    }

}