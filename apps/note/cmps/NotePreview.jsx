const { useState } = React
const { Link } = ReactRouterDOM

import { NoteTxt } from "./dynamic-inputs/NoteTxt.jsx";
import { NoteImg } from "./dynamic-inputs/NoteImg.jsx";
import { NoteTodos } from "./dynamic-inputs/NoteTodos.jsx";
import { ColorInput } from "../../note/cmps/dynamic-inputs/ColorInput.jsx"
import { noteService } from "../services/note.service.js"

export function NotePreview({ note, onRemoveNote}) {

    const [noteStyle, setNoteStyle] = useState(note.style || { backgroundColor: '#e8f0fe' })

    function onSetNoteStyle(newStyle) {
        const updatedStyle = { ...noteStyle, ...newStyle };
        setNoteStyle(updatedStyle);
        note.style = updatedStyle;
        noteService.save(note)
        // onUpdateNoteStyle(note.id, updatedStyle);
    }
    // const [isPinned, setIsPinned] = useState(false);
    // const handlePin = () => {
    //     setIsPinned(!isPinned);

    function onChangeInfo(params) {

    }
    // const height = Math.floor(100 + Math.random() * 500);

    return (
        <article className="note-preview note" style={{ backgroundColor: noteStyle.backgroundColor }}>
            {/* <div className="note-inner" style={{ height: `${height}px` }}> */}

            <DynamicCmp cmpType={note.type} info={note.info} onChangeInfo={onChangeInfo} />

            {/* <section className="active-btn"> */}
            {/* <NotePrevFooter /> */}
            {/* </section> */}

            <section className="active-btn">
                <button className="btn"><i className="fa-solid fa-thumbtack"></i></button>
                <ColorInput onSetNoteStyle={onSetNoteStyle} name="Lala" currentColor={noteStyle.backgroundColor} />
                <button className="btn"><i className="fa-solid fa-envelope"></i></button>
                <Link to={`/note/edit/${note.id}`}><button className="btn"><i className="fa-solid fa-pen-to-square"></i></button></Link>
                <button className="btn" onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash-can"></i></button>
            </section>
            {/* </div> */}
        </article>
    )
}

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