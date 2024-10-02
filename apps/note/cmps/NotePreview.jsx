// const { useState } = React

export function NotePreview({ note }) {

    // const [isPinned, setIsPinned] = useState(false);
    // const handlePin = () => {
    //     setIsPinned(!isPinned);
    //   };
      
    return (
        <article className="note-preview">
            <h2>{note.info.title}</h2>
            {/* <h4>{note}</h4> */}
            {/* <img src={`../assets/img/${note.vendor}.png`} alt="" /> */}
        </article>
    )
}

