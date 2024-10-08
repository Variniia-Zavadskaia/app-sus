// const { useState, useEffect } = React;

export function NoteTxt(props) {
    return (
        <p>{props.info.txt}</p>
    );
}

export function EditNoteTxt(props) {
    function handleChange(value) {
        props.onChangeInfo('txt', value);
    }

    return (
        <div>
            {/* <label className='bold-txt note-txt' htmlFor="txt">Edit Note Text</label> */}
            <textarea
                id='txt'
                name='txt'
                cols='30'
                rows='10'
                value={props.info.txt}
                onChange={(ev) => handleChange(ev.target.value)}
            />
        </div>
    );
}

