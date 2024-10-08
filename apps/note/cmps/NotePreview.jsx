const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { NoteTxt } from "./dynamic-inputs/NoteTxt.jsx";
import { NoteImg } from "./dynamic-inputs/NoteImg.jsx";
import { NoteTodos } from "./dynamic-inputs/NoteTodos.jsx";
import { ColorInput } from "../../note/cmps/dynamic-inputs/ColorInput.jsx"
import { noteService } from "../services/note.service.js"

export function NotePreview({ note, onRemoveNote, onEditNote, onSaveNote }) {

    const [noteStyle, setNoteStyle] = useState(note.style || { backgroundColor: '#e8f0fe' })
    const noteId = note.id

    function onSetNoteStyle(newStyle) {
        const updatedStyle = { ...noteStyle, ...newStyle };
        setNoteStyle(updatedStyle);
        note.style = updatedStyle;
        onSaveNote(note)
    }

    function onTogglePin() {
        note.isPinned = !note.isPinned
        onSaveNote(note)
    }
   
    function onChangeInfo(field, val) {
        const updatedNote = {
            ...note,
            info: { ...note.info, [field]: val },
        };

        onEditNote(updatedNote);
    }

    return (
        <article className="note-preview" style={{ backgroundColor: noteStyle.backgroundColor }}>
            <DynamicCmp cmpType={note.type} info={note.info} onChangeInfo={onChangeInfo} />

            <section className="active-btn">
                <button className="btn" onClick={onTogglePin}><i className={`fa-solid ${note.isPinned ? 'fa-thumbtack-slash' : 'fa-thumbtack'} `}></i></button>
                <ColorInput onSetNoteStyle={onSetNoteStyle} currentColor={noteStyle.backgroundColor} />
                <button className="btn"><i className="fa-solid fa-envelope"></i></button>
                <button className="btn" onClick={() => onEditNote(note)}><i className="fa-solid fa-pen-to-square"></i></button>
                <button className="btn" onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash-can"></i></button>
            </section>
        </article>
    )
}

function DynamicCmp({ cmpType, info, onChangeInfo }) {
    switch (cmpType) {
        case 'NoteTxt':
            return <NoteTxt info={info} onChangeInfo={onChangeInfo} />
        case 'NoteImg':
            return <NoteImg info={info} onChangeInfo={onChangeInfo} />;

        case 'NoteTodos':
            return <NoteTodos info={info} onChangeInfo={onChangeInfo} />;
        default:
            return <div>Unknown note type</div>;
    }

}