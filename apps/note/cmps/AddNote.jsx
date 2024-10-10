const { useState, useRef, useEffect } = React

import { NoteEdit } from './NoteEdit.jsx';
import { noteService } from '../services/note.service.js';

export function AddNote({ onAddNote }) {
    const [noteToAdd, setNoteToAdd] = useState(null)
    const [noteType, setNoteType] = useState('');
    const formRef = useRef(null);


    useEffect(() => {
        function handleClickOutside(event) {
            if (formRef.current && !formRef.current.contains(event.target)) {
                console.log('Clicked outside of div!');
                setNoteType('');
            }
        }

        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on cleanup
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, []);

    function onSubmit(noteToAdd) {
        onAddNote(noteToAdd);
        setNoteType('');
    }

    function createNewNote(type) {
        console.log(type);
        setNoteType(type);
        setNoteToAdd(noteService.getEmptyNote(type))
    }

    return (
        <div className="add-note" ref={formRef}>
            {noteType ? (
                <div>
                    <NoteEdit note={noteToAdd} onSaveNote={onSubmit} />
                </div>
            ) : (
                <div className="note-form">
                    <div className="note-show" >
                        <input
                            id="content"
                            onFocus={() => { createNewNote('NoteTxt') }}
                            placeholder="Take a note..."
                            onChange={(e) => handleChange('content', e.target.value)}
                        />
                        <div className="note-cmpn">
                            <div className="tooltip">
                                <button className="icon-button" onClick={() => createNewNote('NoteTodos')} aria-label="Add Todo">
                                    <i className="fa-regular fa-square-check"></i>
                                </button>
                                <span className="tooltip-text">Add Todo</span>
                            </div>
                            <div className="tooltip">
                                <button className="icon-button" onClick={() => createNewNote('NoteImg')} aria-label="Add Image">
                                    <i className="fa-solid fa-image"></i>
                                </button>
                                <span className="tooltip-text">Add Image</span>
                            </div>
                        </div>

                    </div>
                </div>
            )}


        </div>
    );
}

<div className="tooltip">
    <button className="icon-button" onClick={() => createNewNote('NoteImg')} aria-label="Add Image">
        <i className="fa-solid fa-image"></i>
    </button>
    <span className="tooltip-text">Add Image</span>
</div>