const { useEffect, useState } = React

import { NoteEdit } from "./NoteEdit.jsx";

export function NoteDetails({ note, onClose, onSaveNote }) {
    return (
        <div className="modal-overlay">
            <div className="note-preview note">
                <NoteEdit note={note} onSaveNote={onSaveNote}/>
                <div className="modal-actions">
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );


}