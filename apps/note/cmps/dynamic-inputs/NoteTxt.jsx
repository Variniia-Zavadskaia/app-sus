
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
        <div>
            <label className='bold-txt' htmlFor="title">Title: </label>
            <input onChange={(ev) => handleChange(ev.target)} value={props.info.title || ''}
                id='title' type="text" name='title' />
            <label className='bold-txt' htmlFor="txt"></label>
            <textarea
                id='txt'
                name='txt'
                cols='30'
                rows='10'
                value={props.info.txt}
                onChange={(ev) => handleChange(ev.target)}
            />
        </div>
    );
}

