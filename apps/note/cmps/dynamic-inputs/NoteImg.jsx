export function NoteImg(props) {


    return (
        <section>
            <h2>{props.info.title}</h2>
            <img src={props.info.url} alt="" />
        </section>
    )

}