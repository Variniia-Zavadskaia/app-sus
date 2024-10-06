const { useState, useRef } = React

export function ColorInput({ name, onSetNoteStyle, backgroundColor }) {
 console.log('DDDFFDDFFDD');
 
    const [color, setColor] = useState('#fff');
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);
  
    const colors = [
        '#F44236',
        '#9C27B0',
        '#3F51B5',
        '#2196F3',
        '#4caf50',
        '#101010',
    ]

    function onSetColor(color) {
        const newStyle = { backgroundColor: color }
        onSetNoteStyle(newStyle)
    }

    function handleFocusOut(event) {
        let relatedTarget = event.relatedTarget;
        if (!relatedTarget) {
            setShowPicker(false);
        }
    };

    const handleColorChange = (color) => {
      setColor(color.hex);
    };
  
    function togglePicker() {
        console.log('PPPPPPPPPPP');
        
      setShowPicker(!showPicker);
    };
  
    return (
      <div onBlur={handleFocusOut} >
         <button className="btn" onClick={() => setShowPicker(true)}><i className="fa-solid fa-palette"></i></button>
          <div className="color-container" ref={pickerRef} style={{ display: showPicker ? '' : 'none' }}>
             {colors.map(color => (
                    <div
                        key={color}
                        className={`item ${color === backgroundColor ? 'chosen' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => onSetColor(color)}
                    ></div>
                ))}
          </div>
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





