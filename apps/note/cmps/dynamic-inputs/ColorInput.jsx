const { useState, useRef, useEffect } = React

export function ColorInput({ onSetNoteStyle, backgroundColor }) {
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
        <div className="color-picker-wrapper" >
            <button className="icon-button" onClick={togglePicker}><i className="fa-solid fa-palette"></i></button>
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
}







