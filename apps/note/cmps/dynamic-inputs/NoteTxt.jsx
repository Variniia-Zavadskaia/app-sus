
export function NoteTxt(props) {
    return (
        <section>
            <h3>{props.info.title}</h3>
            <p>{props.info.txt}</p>
        </section>
    );
}

export function EditNoteTxt(props) {
    function handleChange(target) {
        let field = target.name

        props.onChangeInfo(target.name, target.value);
    }

    return (
        <div className="note-show" >
            <input
                id='title'
                name='title'
                type="text"
                className="note-title"
                onChange={(ev) => handleChange(ev.target)}
                value={props.info.title || ''}
                placeholder="Title"
            />
            <div>
                <textarea
                    id='txt'
                    name='txt'
                    type="text"
                    cols='30'
                    rows='3'
                    value={props.info.txt}
                    onChange={(ev) => handleChange(ev.target)}
                    className="note-text"
                    placeholder="Take a note..."
                />
            </div>
        </div>
    );
}

