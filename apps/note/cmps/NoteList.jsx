import { NotePreview } from "./NotePreview.jsx";


export function NoteList({ notes, onRemoveNote, onEditNote, onSaveNote }) {
    return (
        <div className="note-container  " >
            {/* <div className="note-list note-layout"> */}

                <div className="pinned " >
                    <h4> Pinned </h4>
                    <div className="note-layout" >
                        {notes.filter(note => note.isPinned).map(note =>
                            <div key={note.id} className="note-item note-pinned">
                                <NotePreview note={note} onRemoveNote={onRemoveNote} onEditNote={onEditNote} onSaveNote={onSaveNote} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="unpinned" >
                    <h4> Others</h4>
                    <div className="note-layout" >
                        {notes.filter(note => !note.isPinned).map(note =>
                            <div key={note.id} className="note-item note-unpinned">
                                <NotePreview note={note} onRemoveNote={onRemoveNote} onEditNote={onEditNote} onSaveNote={onSaveNote} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        // </div>
    )

}
