import { NotePreview } from "./NotePreview.jsx";


export function NoteList({ notes, onRemoveNote, onEditNote, onSaveNote }) {
    const pinnedExists = notes.findIndex(note => note.isPinned) !== -1
    const unpinnedExists =  notes.findIndex(note => !note.isPinned) !== -1

    return (
        <div className="note-container  " >
                <div className="pinned " >
                    {pinnedExists && <h4> Pinned </h4> } 
                    <div className="note-layout" >
                        {notes.filter(note => note.isPinned).map(note =>
                            <div key={note.id} className="note-pinned">
                                <NotePreview note={note} onRemoveNote={onRemoveNote} onEditNote={onEditNote} onSaveNote={onSaveNote} />
                            </div>
                        )}
                    </div>
                </div>
                <div className="unpinned " >
                    {pinnedExists && unpinnedExists && <h4> Others</h4>}
                    <div className="note-layout" >
                        {notes.filter(note => !note.isPinned).map(note =>
                                <NotePreview note={note} onRemoveNote={onRemoveNote} onEditNote={onEditNote} onSaveNote={onSaveNote} />
                        )}
                    </div>
                </div>
            </div>
    )

}
