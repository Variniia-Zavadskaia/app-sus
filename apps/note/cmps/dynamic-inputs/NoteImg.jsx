export function NoteImg(props) {


    return (
        <section>
            <h2>{props.info.title}</h2>
            <img src={props.info.url} alt="" />
        </section>
    )

}

export function AddNoteImg(props) {
    return (
        <section>
            <h2>{props.info.title} Nahui</h2>
            <img src={props.info.url} alt="" />
        </section>
    )
}

export function EditNoteImg(props) {
    return (
        <section>
            <h2>{props.info.title} Nahui</h2>
            <img src={props.info.url} alt="" />
        </section>
    )
}