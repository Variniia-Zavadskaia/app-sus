const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM
import { ColorInput } from "./ColorInput.jsx"
import { composeMailNoteTxt } from "./dynamic-inputs/NoteTxt.jsx";
import { composeMailNoteTodos } from "./dynamic-inputs/NoteTodos.jsx";
import { composeMailNoteImg } from "./dynamic-inputs/NoteImg.jsx";

export function NoteFooter({ note, onRemoveNote, onEditNote, onSaveNote, onSaveCopy }) {

    const [noteStyle, setNoteStyle] = useState(note.style || { backgroundColor: '#e8f0fe' })
    const navigate = useNavigate()

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

    function handleSendToMail() {
        // if (note.type === 'NoteTxt') {
            const {title, body} = composeMailData()

            console.log("title:", title, "\nbody:", body);
            

            const queryTitle = encodeURIComponent(title);
            const queryBody = encodeURIComponent(body);

            navigate(
                `/mail/?status=inbox&folder=inbox?subject=${queryTitle}&body=${queryBody}`,
                {
                    state: {title, body}
                }
            );
        // }
    };

    function composeMailData() {
        switch (note.type) {
            case 'NoteTxt':
                return composeMailNoteTxt({note})
            case 'NoteImg':
                return composeMailNoteImg({note});
            case 'NoteTodos':
                return composeMailNoteTodos({note});
            default:
                return <div>Unknown note type</div>;
        }
    } 

    function onRemove() {
        if (note.folder !== "Trash") {
            note.folderBeforeRemove = note.folder
            note.folder = "Trash"
            onSaveNote(note)
        } else {
            //ask user if 
            // if yes - remove, else don'
            onRemoveNote(note.id)
        }
    }

    function onRestore() {
        console.log('test');

        if (note.folder === "Trash" && note.folderBeforeRemove) {
            note.folder = note.folderBeforeRemove;
            note.folderBeforeRemove = null;
            onSaveNote(note);
        }
    }

    function onArchive() {
        if (note.folder !== "Archive") {
            note.folder = "Archive"

        } else {
            note.folder = "Notes"
        }
        onSaveNote(note)
    }

    function onMakeCopy() {
        let newNote = JSON.parse(JSON.stringify(note))

        newNote.id = ''
        newNote.isPinned = false
        onSaveCopy(newNote)
    }

    return (
        <footer className="note-footer">
            {/* <section className="active-btn"> */}
            {note.folder !== "Trash" ? (
                <div className="note-icons">
                    <div className="tooltip">
                        <button className="icon-button" onClick={onTogglePin} aria-label={`${note.isPinned ? 'Unpin' : 'Pin'} `}>
                            <i className={`fa-solid ${note.isPinned ? 'fa-thumbtack-slash' : 'fa-thumbtack'} `}></i>
                        </button>
                        <span className="tooltip-text">{`${note.isPinned ? 'Unpin' : 'Pin'} `}</span>
                    </div>

                    <div className="tooltip">
                        <ColorInput className="icon-button" onSetNoteStyle={onSetNoteStyle} currentColor={noteStyle.backgroundColor} aria-label="Background" />
                        <span className="tooltip-text">Background Color</span>
                    </div>

                    <div className="tooltip">
                        <button className="icon-button" onClick={handleSendToMail} aria-label="Send">
                            <i className="fa-solid fa-envelope"></i>
                        </button>
                        <span className="tooltip-text">Send to Mail</span>
                    </div>



                    {/* {onEditNote !== null &&
                        <div className="tooltip">
                            <button className="icon-button" onClick={() => onEditNote(note)} aria-label="Edit">
                                <i className="fa-solid fa-pen-to-square"></i>
                            </button>
                            <span className="tooltip-text">Edit</span>
                        </div>} */}

                    {note.folder !== "Archive" ? (
                        <div className="tooltip">
                            <button className="icon-button" onClick={onArchive} aria-label="Archive">
                                <i className="fa-regular fa-share-from-square"></i>
                            </button>
                            <span className="tooltip-text">Archive</span>
                        </div>) : (
                        <div className="tooltip">
                            <button className="icon-button" onClick={onArchive} aria-label="Return from archive">
                                <i className="fa-solid fa-arrow-up-right-from-square"></i>
                            </button>
                            <span className="tooltip-text">Return from archive</span>
                        </div>)}

                    <div className="tooltip">
                        <button className="icon-button" onClick={onMakeCopy} aria-label="Make Copy">
                           <i className="fa-solid fa-copy"></i>
                        </button>
                        <span className="tooltip-text">Make Copy</span>
                    </div>

                    {onRemoveNote !== null &&
                        <div className="tooltip">
                            <button className="icon-button" onClick={onRemove} aria-label="Remove">
                                <i className="fa-solid fa-trash-can"></i>
                            </button>
                            <span className="tooltip-text">Remove</span>
                        </div>}
                </div>) : (
                <div className="note-icons">
                    <div className="tooltip">
                        <button className="icon-button" onClick={() => onRemoveNote(note.id)} aria-label="Delete permanently">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                        <span className="tooltip-text">Delete permanently</span>
                    </div>

                    <div className="tooltip">
                        <button className="icon-button" onClick={onRestore} aria-label="Restore">
                            <i className="fa-solid fa-trash-can-arrow-up"></i>
                        </button>
                        <span className="tooltip-text">Restore</span>
                    </div>
                </div>
            )}

        </footer>
    )

}

{/* <div className="tooltip">
    <button className="icon-button" aria-label="Delete permanently">
    <i className="fa-solid fa-trash"></i>
    </button>
    <span className="tooltip-text">Delete permanently</span>
</div>

<div className="tooltip">
    <button className="icon-button" aria-label="Restore">
    <i className="fa-solid fa-trash-can-arrow-up"></i>
    </button>
    <span className="tooltip-text">Restore</span>
</div> */}






