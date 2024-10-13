const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { NoteTxt } from "./dynamic-inputs/NoteTxt.jsx";
import { NoteImg } from "./dynamic-inputs/NoteImg.jsx";
import { NoteTodos } from "./dynamic-inputs/NoteTodos.jsx";
import { NoteFooter } from "./NoteFooter.jsx";

export function NotePreview({ note, onRemoveNote, onEditNote, onSaveNote }) {


    function onChangeInfo(field, val) {
        const updatedNote = {
            ...note,
            info: { ...note.info, [field]: val },
        };

        onEditNote(updatedNote);
    }

    return (
        <article 
            className="note-preview" 
            style={{ backgroundColor: note.style.backgroundColor }}>
            <div onClick={()=>onEditNote(note)}>
                <DynamicCmp cmpType={note.type} info={note.info} onChangeInfo={onChangeInfo} />
            </div> 
            <NoteFooter 
                note={note} 
                onRemoveNote={onRemoveNote} 
                onEditNote={onEditNote} 
                onSaveNote={onSaveNote} 
                onSaveCopy={onSaveNote}/>
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