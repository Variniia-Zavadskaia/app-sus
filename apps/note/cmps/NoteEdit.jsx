const { useParams, useNavigate } = ReactRouter
const { useState, useEffect } = React

import { AddNote } from "./AddNote.jsx"
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
    };

    function onChangeInfo(field, val) {
        setNoteToEdit(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, [field]: val },
        }))
    }

    return (
        <section className="note-edit backdrop">
            {/* <AddNote /> */}
            <form onSubmit={onSave}>
                <DynamicCmp cmpType={noteToEdit.type} info={noteToEdit.info} onChangeInfo={onChangeInfo} />
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