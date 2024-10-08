const { Link } = ReactRouterDOM
const { useEffect, useRef } = React
import { NotePreview } from "./NotePreview.jsx";


export function NoteList({ notes, onRemoveNote, onEditNote }) {
   
    // const notesRef = useRef(null)
    // useEffect(() => {
    //     const notesContainer = notesRef.current;
          
    //      // Add notes to the container
    // for (let x = 0; x <= 10; x++) {
    //     const note = makeNote();
    //     // Append the JSX element as a DOM node using React's render
    //     notesContainer.appendChild(note);
    //   }
  
    //   // Initialize Isotope
    //   new Isotope(notesContainer, {
    //     itemSelector: '.note',
    //     layoutMode: 'masonry',
    //   });
    // }, []);
      
        // return <div className="notes"></div>;

    console.log(notes);
    

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
