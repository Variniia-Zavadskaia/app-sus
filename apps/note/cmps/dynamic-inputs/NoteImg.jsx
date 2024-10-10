const { useState, useEffect } = React

export function NoteImg(props) {
    return (
        <section>
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

    return (
        <div className="note-img-input">
            <label className='bold-txt' htmlFor="title">Title: </label>
            <input onChange={handleChange} value={props.info.title || ''}
                id='title' type="text" name='title' />
            <button
                id="fileSelect"
                onClick={(e) => {
                    document.getElementById("fileElem").click();
                    e.preventDefault();
                }}
            >
                Select File
            </button>
            <input
                id="fileElem"
                type="file"
                style={{ display: "none" }}
                onChange={handleFile}
            />
            <div id="fileList">
                {!file ? (
                    <p>No file selected!</p>
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