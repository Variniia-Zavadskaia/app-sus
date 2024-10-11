const { useParams, useNavigate } = ReactRouter
const { useState, useEffect } = React

import { EditNoteTxt } from "./dynamic-inputs/NoteTxt.jsx";
import { EditNoteImg } from "./dynamic-inputs/NoteImg.jsx";
import { EditNoteTodos } from "./dynamic-inputs/NoteTodos.jsx";
import { NoteFooter } from "./NoteFooter.jsx";
import { showErrorMsg, showSuccessMsg, showUserMsg } from "../../../services/event-bus.service.js"

export function NoteEdit({ note, onRemoveNote = null, onSaveNote }) {
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

    function onChangeNote(note) {
        setNoteToEdit({...note})        
    }
    

    return (
        <section className="note-edit" style={{ backgroundColor: noteToEdit.style.backgroundColor }}>
            <div className="note-form ">
                <DynamicCmp
                    cmpType={noteToEdit.type}
                    info={noteToEdit.info}
                    onChangeInfo={onChangeInfo} />
                <section className="form-actions">
                    <NoteFooter
                        note={noteToEdit}
                        onRemoveNote={onRemoveNote}
                        onEditNote={null}
                        onSaveNote={onChangeNote} />
                    <button className="close-btn" type="submit" onClick={onSave}> Save </button>
                </section>
            </div>
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