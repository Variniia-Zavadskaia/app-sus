const { useState, useRef } = React

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
    const titleRef = useRef(null);
    const [noteContent, setNoteContent] = useState({ title: '', content: '' });

    function handleFocusOut(event) {
        let relatedTarget = event.relatedTarget;
        if (!relatedTarget) {
            setShowTitle(false);
        }
    };

    function handleSubmit(ev) {
        ev.preventDefault();
        // Add the logic to save the note
        console.log(noteContent);
    }

    function onChangeInfo(field, val) {
        setNoteContent(prevNote => ({
            ...prevNote,
            info: { ...prevNote.info, [field]: val },
        }))
    }

    function createNewNote(type) {
        setNoteChanged(false)
        console.log(type);

        setNoteToAdd(noteService.getEmptyNote(type))
    }

    return (
        <div className="add-note">
            <form className="note-form" onBlur={handleFocusOut} onSubmit={handleSubmit}>
                <div className="note-show" >
                    <input
                        id="title"
                        ref={titleRef}
                        style={{ display: showTitle ? '' : 'none' }}
                        placeholder="Title"
                    />
                </div>
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
        </div>
    );
}


// <FontAwesomeIcon icon="fa-regular fa-square-check" />

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

