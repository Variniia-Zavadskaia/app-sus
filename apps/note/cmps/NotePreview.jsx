export function NotePreview({ note }) {
    return (
        <article className="note-preview">
            <h2>note Vendor: {note.vendor}</h2>
            <h4>note Speed: {note.maxSpeed}</h4>
            <img src={`../assets/img/${note.vendor}.png`} alt="" />
        </article>
    )
}

import React, { useState } from 'react';
import { NotePreview } from './NotePreview';

const NoteList = ({ notes }) => {
    const [noteList, setNoteList] = useState(notes);

    const handleRemove = (id) => {
        setNoteList(prevNotes => prevNotes.filter(note => note.id !== id));
    };

    const handlePinToggle = (id) => {
        setNoteList(prevNotes =>
            prevNotes.map(note =>
                note.id === id ? { ...note, isPinned: !note.isPinned } : note
            )
        );
    };

    const handleColorChange = (id, color) => {
        setNoteList(prevNotes =>
            prevNotes.map(note =>
                note.id === id ? { ...note, style: { ...note.style, backgroundColor: color } } : note
            )
        );
    };

    return (
        <div className="note-list">
            {noteList.map(note => (
                <NotePreview
                    key={note.id}
                    note={note}
                    onRemove={handleRemove}
                    onPinToggle={handlePinToggle}
                    onColorChange={handleColorChange}
                />
            ))}
        </div>
    );
};

export default NoteList;