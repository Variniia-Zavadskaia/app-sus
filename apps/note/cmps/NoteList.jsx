import { NotePreview } from "./NotePreview.jsx";


export function NoteList({ notes, onRemoveNote, onEditNote }) {
    return (
        <div className="note-list note-layout" >
            {notes.map(note =>
                <div key={note.id} className="note-item">
                    <NotePreview note={note} onRemoveNote={onRemoveNote} onEditNote={onEditNote} />
                    <section>
                        {/* <button onClick={() => onRemoveNote(note.id)}>Remove</button> */}
                        {/* <button ><Link to={`/note/${note.id}`}>Details</Link></button> */}
                        {/* <button ><Link to={`/note/edit/${note.id}`}>Edit</Link></button> */}
                    </section>
                </div>
            )}
        </div>
    )

}
