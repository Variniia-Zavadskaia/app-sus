import { NoteTxt } from "./dynamic-inputs/NoteTxt.jsx";
import { NoteImg } from "./dynamic-inputs/NoteImg.jsx";
import { NoteTodos } from "./dynamic-inputs/NoteTodos.jsx";
import { ColorInput } from "../../note/cmps/dynamic-inputs/ColorInput.jsx"
// import { NotePrevFooter } from "./NotePrevFooter.jsx";

const { useRef, useState } = React
const { Outlet, NavLink } = ReactRouterDOM
const { Link } = ReactRouterDOM

export function NotePreview({ note, onRemoveNote }) {

    const [noteStyle, setNoteStyle] = useState({
        backgroundColor: '#101010',
    })

    function onSetNoteStyle(newStyle) { // { backgroundColor: 'royalblue }
        setNoteStyle(prevStyle => ({ ...prevStyle, ...newStyle }))
    }
    // const [isPinned, setIsPinned] = useState(false);
    // const handlePin = () => {
    //     setIsPinned(!isPinned);




    // const handleFocusOut = (event) => {
    //     let relatedTarget = event.relatedTarget;
    //     if (!relatedTarget) {
    //         setShowTitle(false);
    //     }
    // };

    function onChangeInfo(params) {

    }
    // const height = Math.floor(100 + Math.random() * 500);

    return (
        <article className="note-preview note" >
            {/* <div className="note-inner" style={{ height: `${height}px` }}> */}

            <DynamicCmp cmpType={note.type} info={note.info} onChangeInfo={onChangeInfo} />

            {/* <section className="active-btn"> */}
            {/* <NotePrevFooter /> */}
            {/* </section> */}

            <section className="active-btn">
                <button className="btn"><i className="fa-solid fa-thumbtack"></i></button>
                <ColorInput  {...noteStyle} name="Lala" onSetNoteStyle={onSetNoteStyle}/>
                <button className="btn"><i className="fa-solid fa-envelope"></i></button>
                <Link to={`/note/edit/${note.id}`}><button className="btn"><i className="fa-solid fa-pen-to-square"></i></button></Link>
                <button className="btn" onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash-can"></i></button>
            </section>
            {/* </div> */}
        </article>
    )
}

function DynamicCmp(props) {
    // console.log('props:', props)
    switch (props.cmpType) {
        case 'NoteTxt':
            // return <Hello name={props.name} age={props.age} handleClick={props.handleClick} />
            return <NoteTxt {...props} />
        case 'NoteImg':
            return <NoteImg {...props} />

        case 'NoteTodos':
            return <NoteTodos {...props} />
    }

}