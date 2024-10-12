const { useState, useEffect } = React

export function NoteImg(props) {
    return (
        <section className="note-img">
            <h3>{props.info.title}</h3>
            <img src={props.info.url} alt="" />
        </section>
    )
}

export function EditNoteImg(props) {
    const [file, setFile] = useState(null);
    const [fileUrl, setFileUrl] = useState("");

    useEffect(() => {
        // Clean up the object URL when the component unmounts
        return () => {
            if (fileUrl) {
                URL.revokeObjectURL(fileUrl);
            }
        };
    }, [fileUrl]);

    const handleFile = (ev) => {
        const selectedFile = ev.target.files[0];
        if (selectedFile) {
            const url = URL.createObjectURL(selectedFile);
            setFile(selectedFile);
            setFileUrl(url);
            props.onChangeInfo('url', url)
        }
    };
    function handleChange(ev) {
        props.onChangeInfo(ev.target.name, ev.target.value); // Pass title change to parent
    };

    function loadImageFromInput(ev) {
        const reader = new FileReader()
    
        function onImageReady(img) {
            props.onChangeInfo('url', img.src);
        }

        reader.onload = ev => {
            let img = new Image()
            img.src = ev.target.result
            img.onload = () => onImageReady(img)
        }
        reader.readAsDataURL(ev.target.files[0])
    }

    return (
        <div className="note-img-input ">
            <input onChange={handleChange} value={props.info.title || ''}
                id='title' type="text" name='title' />
            <div className="upload-img-btn">
                <input type="file" className="file" name="image"
                    onChange={loadImageFromInput} accept="image/*" />
            </div>
            <div id="fileList">
                {!file ? (
                    <img src={props.info.url} alt="" />
                ) : (
                    <div>
                        <img
                            src={props.info.url}
                            alt={file ? file.name : "Selected file"}
                            height={60}
                        />
                        <span>{`${file.name}: ${file.size} bytes`}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

// return (
//     <div className="note-img-input">
//         <div className="tooltip">
//             <button className="icon-button" onClick={(e) => {
//                 document.getElementById("fileElem").click();
//                 e.preventDefault();
//             }} aria-label="Choose Image">
//                 <i className="fa-solid fa-image"></i>
//             </button>
//             <span className="tooltip-text">Choose New Image</span>
//         </div>
//         <input onChange={handleChange} value={props.info.title || ''}
//             id='title' type="text" name='title' />
//         <input
//             id="fileElem"
//             type="file"
//             style={{ display: "none" }}
//             onChange={handleFile}
//         />
//         <div id="fileList">
//             {!file ? (
//                 <img src={props.info.url} alt="" />
//             ) : (
//                 <div>
//                     <img
//                         src={props.info.url}
//                         alt={file ? file.name : "Selected file"}
//                         height={60}
//                     />
//                     <span>{`${file.name}: ${file.size} bytes`}</span>
//                 </div>
//             )}
//         </div>
//     </div>
// );