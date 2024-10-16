const { useEffect, useState } = React

import { NoteEdit } from "./NoteEdit.jsx";

export function NoteDetails({ note, onClose, onSaveNote, onRemoveNote }) {
    function removeNote(noteId) {
        onClose();
        onRemoveNote(noteId);
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content" >
                <NoteEdit 
                    note={note} 
                    onSaveNote={onSaveNote} 
                    onRemoveNote={removeNote}
                    onSaveCopy={onSaveNote} />
            </div>
        </div>
    );


}