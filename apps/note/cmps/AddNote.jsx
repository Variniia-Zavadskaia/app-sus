const { useState, useRef, useEffect } = React

import { EditNoteTxt } from './dynamic-inputs/NoteTxt.jsx';
import { EditNoteImg } from './dynamic-inputs/NoteImg.jsx';
import { EditNoteTodos } from './dynamic-inputs/NoteTodos.jsx';
import { NoteEdit } from './NoteEdit.jsx';
import { noteService } from '../services/note.service.js';

export function AddNote({onAddNote}) {
    const [noteChanged, setNoteChanged] = useState(false)
    const [noteToAdd, setNoteToAdd] = useState(null)
    const [noteType, setNoteType] = useState('');
    const [showTitle, setShowTitle] = useState(false);
    const formRef = useRef(null);
    const [noteContent, setNoteContent] = useState({ title: '', content: '' });


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
        setNoteChanged(false)
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
                            onFocus={() => {setShowTitle(true); createNewNote('NoteTxt')}}
                            placeholder="Take a note..."
                            value={noteContent.content}
                            onChange={(e) => handleChange('content', e.target.value)}
                        />
                        <div className="note-cmpn">
                            <button className="btn" onClick={() => createNewNote('NoteTodos')}><i className="fa-regular fa-square-check"></i></button>
                            <button className="btn" onClick={() => createNewNote('NoteImg')}><i className="fa-solid fa-image"></i></button>
                            {/* <button className="btn" ><i className="fa-solid fa-image"></i></button> */}
                        </div>

                    </div>
                </div>
            )}


        </div>
    );
}

function dummy() {
    return (
<form className="note-form" onBlur={handleFocusOut} onSubmit={handleSubmit}>
    {/* <div className="note-show" >
        <input
            id="title"
            ref={titleRef}
            style={{ display: showTitle ? '' : 'none' }}
            placeholder="Title"
        />
    </div> */}
    <div className="note-show" >
        <input
            id="content"
            onFocus={() => {setShowTitle(true); createNewNote('NoteTxt')}}
            placeholder="Take a note..."
            value={noteContent.content}
            onChange={(e) => handleChange('content', e.target.value)}
        />
        <div className="note-cmpn">
            <button className="btn" onClick={() => createNewNote('NoteTodos')}><i className="fa-regular fa-square-check"></i></button>
            <button className="btn" onClick={() => createNewNote('NoteImg')}><i className="fa-solid fa-image"></i></button>
            {/* <button className="btn" ><i className="fa-solid fa-image"></i></button> */}
        </div>

    </div>
</form>
    )
}

