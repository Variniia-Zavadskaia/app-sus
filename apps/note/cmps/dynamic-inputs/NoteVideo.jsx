const { useState, useEffect } = React

export function NoteVideo(props) {
    return (
        <section className="note-img">
            <h3>{props.info.title}</h3>
            <img src={props.info.url} alt="" />
        </section>
    )
}