const { useState, useRef, useEffect } = React

export function ColorInput({ name, onSetNoteStyle, backgroundColor }) {
    console.log('DDDFFDDFFDD');

    const [color, setColor] = useState('#e8f0fe');
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);

    const colors = [
        '#e8f0fe',
        '#f5deb3',
        '#dda0dd',
        '#40e0d0',
        '#2196F3',
        '#4caf50',
        '#ffd700',
        '#ff6347',
    ]

    function onSetColor(selectedColor) {
        const newStyle = { backgroundColor: selectedColor }
        onSetNoteStyle(newStyle)
        setColor(selectedColor)
        setShowPicker(false)
    }
    useEffect(() => {
        function handleClickOutside(event) {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [pickerRef]);

    function togglePicker() {
        console.log('PPPPPPPPPPP');
        setShowPicker(prevShowPicker => !prevShowPicker);
    };

    return (
        <div className="color-picker-wrapper">
            <button className="btn" onClick={togglePicker}><i className="fa-solid fa-palette"></i></button>
            {showPicker && (
                <div className="color-container" ref={pickerRef}>
                    {colors.map(c => (
                        <div
                            key={c}
                            className={`item ${c === backgroundColor ? 'chosen' : ''}`}
                            style={{ backgroundColor: c }}
                            onClick={() => onSetColor(c)}
                        ></div>
                    ))}
                </div>
            )}
        </div>
    );

    /*
        const [showTitle, setShowTitle] = useState(false);
        const titleRef = useRef(null);
    
        const handleFocusOut = (event) => {
            let relatedTarget = event.relatedTarget;
            if (!relatedTarget) {
                setShowTitle(false);
            }
        };
        */

    return (
        <div className="add-note">
            <form className="note-form" onBlur={handleFocusOut}>
                <div className="note-show" >
                    <input
                        id="title"
                        ref={titleRef}
                        style={{ display: showTitle ? '' : 'none' }}
                        placeholder="Title"
                    />
                </div>
                <div className="note-show" >
                    <input
                        id="content"
                        onFocus={() => setShowTitle(true)}
                        placeholder="Take a note..."
                    />
                    <div className="note-cmpn">
                        <button className="btn-cmpn" ><i className="fa-regular fa-square-check"></i></button>
                        <button className="btn-cmpn" ><i className="fa-solid fa-image"></i></button>
                    </div>

                </div>
            </form>
        </div>
    );
}





