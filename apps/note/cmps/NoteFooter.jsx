const { useState} = React
import { ColorInput } from "../../note/cmps/dynamic-inputs/ColorInput.jsx"

export function NoteFooter({ note, onRemoveNote, onEditNote, onSaveNote}) {

    const [noteStyle, setNoteStyle] = useState(note.style || { backgroundColor: '#e8f0fe' })

    function onSetNoteStyle(newStyle) {
        const updatedStyle = { ...noteStyle, ...newStyle };
        setNoteStyle(updatedStyle);
        note.style = updatedStyle;
        onSaveNote(note)
    }

    function onTogglePin() {
        note.isPinned = !note.isPinned
        onSaveNote(note)
    }
   
    return (
        <footer className="note-footer">
            <section className="active-btn">
                <div className="icons">
                    <div className="tooltip">
                        <button className="icon-button" onClick={onTogglePin} aria-label={`${note.isPinned ? 'Unpin' : 'Pin'} `}>
                            <i className={`fa-solid ${note.isPinned ? 'fa-thumbtack-slash' : 'fa-thumbtack'} `}></i>
                        </button>
                        <span className="tooltip-text">Pin</span>
                    </div>
                    <div className="tooltip">
                        <ColorInput className="icon-button" onSetNoteStyle={onSetNoteStyle} currentColor={noteStyle.backgroundColor} aria-label="Background" />
                        <span className="tooltip-text">Background Color</span>
                    </div>
                    <div className="tooltip">
                        <button className="icon-button" aria-label="Send">
                            <i className="fa-solid fa-envelope"></i>
                        </button>
                        <span className="tooltip-text">Send</span>
                    </div>
                    <div className="tooltip">
                        <button className="icon-button" onClick={() => onEditNote(note)} aria-label="Edit">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <span className="tooltip-text">Edit</span>
                    </div>
                    <div className="tooltip">
                        <button className="icon-button" onClick={() => onRemoveNote(note.id)} aria-label="Remove">
                            <i className="fa-solid fa-trash-can"></i>
                        </button>
                        <span className="tooltip-text">Remove</span>
                    </div>
                </div>
                {/* <button className="close-btn" type="button">
                    Close
                </button> */}
            </section>
        </footer>
    )

}

// {/* <div className="form-container active-form">
//     <form>
//         {/* <input type="text" className="note-title" placeholder="Title" />
//   <input className="note-text" type="text" placeholder="Take a note..." /> */}
//         <section className="active-btn">
//             <div className="icons">
//                 <div className="tooltip">
//                     <button className="icon-button" onClick={onTogglePin} aria-label="Pin">
//                         <i className={`fa-solid ${note.isPinned ? 'fa-thumbtack-slash' : 'fa-thumbtack'} `}></i>
//                     </button>
//                     <span className="tooltip-text">Pin</span>
//                 </div>
//                 <div className="tooltip">
//                     <ColorInput className="icon-button" onSetNoteStyle={onSetNoteStyle} currentColor={noteStyle.backgroundColor} aria-label="Pallete" />
//                     <span className="tooltip-text">Pallete</span>
//                 </div>
//                 <div className="tooltip">
//                     <button className="icon-button"  aria-label="Send">
//                     <i className="fa-solid fa-envelope"></i>
//                     </button>
//                     <span className="tooltip-text">Send</span>
//                 </div>
//                 <div className="tooltip">
//                     <button className="icon-button" onClick={() => onEditNote(note)} aria-label="Edit">
//                     <i className="fa-solid fa-pen-to-square"></i>
//                     </button>
//                     <span className="tooltip-text">Edit</span>
//                 </div>
//                 <div className="tooltip">
//                     <button className="icon-button" onClick={() => onRemoveNote(note.id)} aria-label="Remove">
//                     <i className="fa-solid fa-trash-can"></i>
//                     </button>
//                     <span className="tooltip-text">Remove</span>
//                 </div>
//             </div>
//             <button className="close-btn" type="button">
//                 Close
//             </button>
//         </section>
//     </form>
// </div> */}


