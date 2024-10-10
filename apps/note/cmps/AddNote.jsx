const { useState, useRef, useEffect } = React

import { NoteEdit } from './NoteEdit.jsx';
import { noteService } from '../services/note.service.js';

export function AddNote({onAddNote}) {
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
                <div className="note-form">
                    <NoteEdit note={noteToAdd} onSaveNote={onSubmit}/>
                </div>
            ) : (
                <div className="note-form">
                    <div className="note-show" >
                        <input
                            id="content"
                            onFocus={() => {createNewNote('NoteTxt')}}
                            placeholder="Take a note..."
                            onChange={(e) => handleChange('content', e.target.value)}
                        />
                        <div className="note-cmpn">
                            <button className="btn" onClick={() => createNewNote('NoteTodos')}><i className="fa-regular fa-square-check"></i></button>
                            <button className="btn" onClick={() => createNewNote('NoteImg')}><i className="fa-solid fa-image"></i></button>
                        </div>

                    </div>
                </div>
            )}


        </div>
    );
}

