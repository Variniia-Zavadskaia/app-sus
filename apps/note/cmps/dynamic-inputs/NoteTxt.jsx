const { useState, useEffect } = React

export function NoteTxt(props) {
    console.log(props.info.txt);
    
    return (
        <p>{props.info.txt}</p>
    )
}

// export function AddNoteTxt(props) {
//     return (
//         <section>
//             <h2>{props.info.title} Nahui</h2>
//             <img src={props.info.url} alt="" />
//         </section>
//     )
// }

export function EditNoteTxt(props) {

    function handleChange(value ) {
        props.onChangeInfo('txt', value)
    }

    return (
        <div>
            {/* <label className='bold-txt note-txt' htmlFor="txt"></label>
            <input onChange={handleChange} value={props.info.txt}
                id='txt' type="text" name='txt' /> */}
            <h2>text edit</h2>
            <textarea
                name='txt'
                cols='30'
                rows='10'
                value={props.info.txt}
                onChange={(ev) => handleChange(ev.target.value)}
            ></textarea>
        </div>
    )
}