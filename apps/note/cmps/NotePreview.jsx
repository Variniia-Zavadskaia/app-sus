// const { useState } = React

export function NotePreview({ note }) {

    // const [isPinned, setIsPinned] = useState(false);
    // const handlePin = () => {
    //     setIsPinned(!isPinned);
    //   };

    return (
        <article className="note-preview">
            <h2>{note.info.title}</h2>
            <h2>{note.info.txt}</h2>
            <img src={note.info.url} alt="" />
            <section className="active-btn">
                <button className="btn"><i className="fa-solid fa-thumbtack"></i></button>
                <button className="btn"><i className="fa-solid fa-palette"></i></button>
                <button className="btn"><i className="fa-solid fa-envelope"></i></button>
                <button className="btn"><i className="fa-solid fa-pen-to-square"></i></button>
                <button className="btn"><i className="fa-solid fa-trash-can"></i></button>
            </section>
        </article>
    )
}

