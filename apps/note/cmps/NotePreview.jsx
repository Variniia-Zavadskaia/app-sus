const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { NoteTxt } from "./dynamic-inputs/NoteTxt.jsx";
import { NoteImg } from "./dynamic-inputs/NoteImg.jsx";
import { NoteTodos } from "./dynamic-inputs/NoteTodos.jsx";
import { ColorInput } from "../../note/cmps/dynamic-inputs/ColorInput.jsx"
import { noteService } from "../services/note.service.js"

export function NotePreview({ note, onRemoveNote, onEditNote, onSaveNote }) {

    const [noteStyle, setNoteStyle] = useState(note.style || { backgroundColor: '#e8f0fe' })
    const [isPinned, setIsPinned] = useState(false);
    const noteId = note.id

    // useEffect(() => {
    //     setNoteToPreview(note)
    //  }, [])

    function onSetNoteStyle(newStyle) {
        const updatedStyle = { ...noteStyle, ...newStyle };
        setNoteStyle(updatedStyle);
        // noteService.save({ ...note, style: updatedStyle })
        //     .catch(err => console.error('Error saving note style', err))
        // onUpdateNoteStyle(note.id, updatedStyle);
        note.style = updatedStyle;
        onSaveNote(note)
    }

    function onTogglePin() {
        note.isPinned = !note.isPinned
        onSaveNote(note)
    }
    // const [isPinned, setIsPinned] = useState(false);
    // const handlePin = () => {
    //     setIsPinned(!isPinned);

    //  function loadNote() {
    //     console.log('fff');

    //      noteService.get(noteId)
    //          .then(setNoteToPreview)
    //          .catch(err => {
    //              console.log('Problem getting note', err)
    //              showErrorMsg('Problem getting note')
    //              navigate('/note')
    //          })
    //  }

    function onChangeInfo(field, val) {
        const updatedNote = {
            ...note,
            info: { ...note.info, [field]: val },
        };

        onEditNote(updatedNote);

        // noteService.save(updatedNote)
        //     .catch(err => console.error('Error saving note info', err));
    }

    function handlePin() {
        const updatedNote = { ...note, isPinned: !isPinned };
        setIsPinned(!isPinned);

        noteService.save(updatedNote)
            .catch(err => console.error('Error pinning note', err));
    }

    return (
        <article className="note-preview" style={{ backgroundColor: noteStyle.backgroundColor }}>
            <DynamicCmp cmpType={note.type} info={note.info} onChangeInfo={onChangeInfo} />

            {/* <section className="active-btn"> */}
            {/* <NotePrevFooter /> */}
            {/* </section> */}

            <section className="active-btn">
                <button className="btn" onClick={onTogglePin}><i className={`fa-solid ${note.isPinned ? 'fa-thumbtack-slash' : 'fa-thumbtack'} `}></i></button>
                <ColorInput onSetNoteStyle={onSetNoteStyle} currentColor={noteStyle.backgroundColor} />
                <button className="btn"><i className="fa-solid fa-envelope"></i></button>
                {/* <Link to={`/note/edit/${note.id}`}><button className="btn"><i className="fa-solid fa-pen-to-square"></i></button></Link> */}
                <button className="btn" onClick={() => onEditNote(note)}><i className="fa-solid fa-pen-to-square"></i></button>
                <button className="btn" onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash-can"></i></button>
            </section>
            {/* </div> */}
        </article>
    )
}
{/* <i class="fa-regular fa-thumbtack"></i> */}
{/* <i class="fa-solid fa-thumbtack-slash"></i> */}
function DynamicCmp({ cmpType, info, onChangeInfo }) {
    // console.log('props:', props)
    switch (cmpType) {
        case 'NoteTxt':
            // return <Hello name={props.name} age={props.age} handleClick={props.handleClick} />
            return <NoteTxt info={info} onChangeInfo={onChangeInfo} />
        case 'NoteImg':
            return <NoteImg info={info} onChangeInfo={onChangeInfo} />;

        case 'NoteTodos':
            return <NoteTodos info={info} onChangeInfo={onChangeInfo} />;
        default:
            return <div>Unknown note type</div>;
    }

}