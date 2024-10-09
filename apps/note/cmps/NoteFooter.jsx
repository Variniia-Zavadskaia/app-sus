export function NotePrevFooter() {
   

    return (
        <footer className="app-footer full main-layout">
            <section className="active-btn">
                <button className="btn"><i className="fa-solid fa-thumbtack"></i></button>
                <ColorInput onSetNoteStyle={onSetNoteStyle}  currentColor={noteStyle.backgroundColor} />
                <button className="btn"><i className="fa-solid fa-envelope"></i></button>
                <button className="btn" onClick={() => onEditNote(note)}><i className="fa-solid fa-pen-to-square"></i></button>
                <button className="btn" onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash-can"></i></button>
            </section> 
        </footer>
    )
    
}