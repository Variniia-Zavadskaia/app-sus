const { useState } = React

export function NoteImg(props) {
    return (
        <section>
            <h2>{props.info.title}</h2>
            <img src={props.info.url} alt="" />
        </section>
    )

}

// export function AddNoteImg(props) {
//     return (
//         <section>
//             <h2>{props.info.title} Nahui</h2>
//             <img src={props.info.url} alt="" />
//         </section>
//     )
// }

export function EditNoteImg(props) {
    // const [file, setFile] = useState();
    function handleChange({ target }) {
        const { type, name: prop } = target
        let value

        switch (type) {
            case 'text':
                value = target.value
                break;

            case 'file':
                value = URL.createObjectURL(target.files[0])
                break;
        }
        props.onChangeInfo(prop, value)
    }

    // function handleChange(e) {
    //     console.log(e.target.files);
    //     // setFile(URL.createObjectURL(e.target.files[0]));
    //     props.onChangeInfo('url', URL.createObjectURL(e.target.files[0]))
    // }

    return (
        <div className="note-img-input">
            <label className='bold-txt' htmlFor="title">Title: </label>
            <input onChange={handleChange} value={props.info.title}
                id='title' type="text" name='title' />
            <div>

                <input type="file" onChange={handleChange} name='url' />
                <img src={props.info.url} />
            </div>
        </div>
    );
}