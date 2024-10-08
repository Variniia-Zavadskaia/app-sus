const { useParams, useNavigate } = ReactRouter
const { useState, useEffect } = React

import { EditNoteTxt } from "./dynamic-inputs/NoteTxt.jsx";
import { EditNoteImg } from "./dynamic-inputs/NoteImg.jsx";
import { EditNoteTodos } from "./dynamic-inputs/NoteTodos.jsx";
import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg, showUserMsg } from "../../../services/event-bus.service.js"

export function NoteEdit({ note,  onSaveNote }) {
    // const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const [noteToEdit, setNoteToEdit] = useState(note)
    // const { noteId } = useParams()
    // const navigate = useNavigate()

    // useEffect(() => {
    //     setNoteToEdit(note)
    // }, [])

    // function loadNote() {
    //     noteService.get(noteId)
    //         .then(setNote)
    //         .catch(err => {
    //             console.log('Problem getting note', err)
    //             showErrorMsg('Problem getting note')
    //             navigate('/note')
    //         })
    // }

    function onSave(ev) {
        ev.preventDefault()
        onSaveNote(noteToEdit);
        showSuccessMsg('Note saved successfully!');
    };

    function onChangeInfo(field, val) {
        setNoteToEdit(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, [field]: val },
        }))
    }

    return (
        <section className="note-edit">
            {/* <AddNote /> */}
            <form onSubmit={onSave}>
                <DynamicCmp cmpType={noteToEdit.type} info={noteToEdit.info} onChangeInfo={onChangeInfo} />
                <button type="submit">Save</button>
            </form>
        </section>
    )

}

function DynamicCmp({ cmpType, info, onChangeInfo }) {
    switch (cmpType) {
        case 'NoteTxt':
            return <EditNoteTxt info={info} onChangeInfo={onChangeInfo} />
        case 'NoteImg':
            return <EditNoteImg info={info} onChangeInfo={onChangeInfo} />
        case 'NoteTodos':
            return <EditNoteTodos info={info} onChangeInfo={onChangeInfo} />
        default:
            return <div>Unknown note type</div>; 
    }
}