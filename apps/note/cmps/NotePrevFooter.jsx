import{ColorInput} from "../../note/cmps/dynamic-inputs/ColorInput.jsx"

const { useState } = React

export function NotePrevFooter() {
    const [cmpType, setCmpType] = useState('color')

    const [footerStyle, setFooterStyle] = useState({
        backgroundColor: '#101010',
        // fontSize: '16px'
    })

    function onSetFooterStyle(newStyle) { // { backgroundColor: 'royalblue }
        setFooterStyle(prevStyle => ({ ...prevStyle, ...newStyle }))
    }

    return (
        <footer style={footerStyle} className="app-footer full main-layout">
            <section >
                {/* <DynamicCmp {...footerStyle} name="Lala" cmpType={cmpType} onSetFooterStyle={onSetFooterStyle} /> */}
                <section className="active-btn">
                    <button className="btn"><i className="fa-solid fa-thumbtack"></i></button>
                    <button className="btn"><i className="fa-solid fa-palette"></i></button>
                    <button className="btn"><i className="fa-solid fa-envelope"></i></button>
                    <Link to={`/note/edit/${note.id}`}><button className="btn"><i className="fa-solid fa-pen-to-square"></i></button></Link>
                    <button className="btn" onClick={() => onRemoveNote(note.id)}><i className="fa-solid fa-trash-can"></i></button>
                </section>
               
                <select value={cmpType} onChange={(ev) => setCmpType(ev.target.value)}>
                    
                    <option value="color">Color</option>
                    <option value="fontSize">Font size</option>
                </select>
            </section>
        </footer>
    )
    
}