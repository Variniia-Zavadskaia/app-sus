const { useParams, useNavigate } = ReactRouter
const { useState, useEffect } = React

import { EditNoteTxt } from "./dynamic-inputs/NoteTxt.jsx";
import { EditNoteImg } from "./dynamic-inputs/NoteImg.jsx";
import { EditNoteTodos } from "./dynamic-inputs/NoteTodos.jsx";
import { NoteFooter } from "./NoteFooter.jsx";
import { showErrorMsg, showSuccessMsg, showUserMsg } from "../../../services/event-bus.service.js"

export function NoteEdit({ note, onRemoveNote, onSaveNote }) {
    const [noteToEdit, setNoteToEdit] = useState(note)

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
            <form onSubmit={onSave} className="note-form ">
                <DynamicCmp
                    cmpType={noteToEdit.type}
                    info={noteToEdit.info}
                    onChangeInfo={onChangeInfo} />
                <section className="form-actions">
                    <NoteFooter
                        note={note}
                        onRemoveNote={onRemoveNote}
                        onEditNote={(note) => { console.log('nahui');}}
                        onSaveNote={onSaveNote} />
                    <button className="close-btn" type="submit">
                        Save
                    </button>
                </section>
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