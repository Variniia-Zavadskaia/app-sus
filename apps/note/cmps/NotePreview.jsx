// const { useState } = React
import { NoteTxt } from "./dynamic-inputs/NoteTxt.jsx";
import { NoteImg } from "./dynamic-inputs/NoteImg.jsx";
import { NoteTodos } from "./dynamic-inputs/NoteTodos.jsx";

const { Link } = ReactRouterDOM


export function NotePreview({ note, onRemoveNote  }) {

    // const [isPinned, setIsPinned] = useState(false);
    // const handlePin = () => {
    //     setIsPinned(!isPinned);
    //   };

   function onChangeInfo(params) {
    
   }

    return (
        <article className="note-preview">
           
            <DynamicCmp cmpType={note.type} info={note.info} onChangeInfo={onChangeInfo} />
            
            <section className="active-btn">
                <button className="btn"><i className="fa-solid fa-thumbtack"></i></button>
                <button className="btn"><i className="fa-solid fa-palette"></i></button>
                <button className="btn"><i className="fa-solid fa-envelope"></i></button>
                <Link to={`/note/edit/${note.id}`}><button className="btn"><i className="fa-solid fa-pen-to-square"></i></button></Link>
                <button className="btn" onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash-can"></i></button>
            </section>
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