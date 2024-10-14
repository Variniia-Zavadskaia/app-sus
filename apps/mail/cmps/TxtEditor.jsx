const {useState} = React

import '../../../assets/css/apps/mail/cmps/new-mail-text-editor.css'
import {EmojiPicker} from './Emoji.jsx'
import {FontSelector} from './Font.jsx'

export function TxtEditor({textColor, fontFamily, fontSize, textAlign, body, onChange, onChangeStyle, onClick}) {
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderlined, setIsUnderlined] = useState(false)
  const [footerVisible, setFooterVisible] = useState(false)
  const [activeButton, setActiveButton] = useState(null)
  const [imgUrls, setImgUrls] = useState([])
  const getTextStyle = () => ({
    color: textColor,
    fontFamily: fontFamily,
    fontSize: `${fontSize}px`,
    textAlign: textAlign,
    fontWeight: isBold ? 'bold' : 'normal',
    fontStyle: isItalic ? 'italic' : 'normal',
    textDecoration: isUnderlined ? 'underline' : 'none',
  })

  function toggleBold() {
    setIsBold((prev) => !prev)
  }

  function toggleItalic() {
    setIsItalic((prev) => !prev)
  }

  function toggleUnderline() {
    setIsUnderlined((prev) => !prev)
  }

  function addEmojiToBody(emoji) {
    onChange(body + emoji)
  }

  function handleTextChange(event) {
    onChange(event.target.value)
  }

  function toggleFooter(ev) {
    ev.preventDefault()
    setFooterVisible((prev) => !prev)
  }

  function toggleEmojiPicker(event) {
    event.preventDefault()
    setEmojiPickerVisible((prev) => !prev)
  }

  function handleButtonClick(button) {
    setActiveButton(button)
  }

  function loadImageFromInput(ev) {
    const reader = new FileReader()

    reader.onload = (ev) => {
      let img = new Image()
      img.src = ev.target.result
      img.onload = () => {
        loadImg(img.src)
      }
    }
    reader.readAsDataURL(ev.target.files[0])
  }

  function loadImg(src) {
    console.log(src)

    const imgEl = <img key={src} src={src} alt="test" />
    setImgUrls([...imgUrls, imgEl])

    
  }

  return (
    <div className="form-body-and-action">
      <div className="add-mail-form-body">
        <label htmlFor="body"></label>
        <textarea
          name="body"
          className="add-mail-textarea"
          value={body}
          onChange={handleTextChange}
          style={getTextStyle()}
          rows={10}
          cols={30}
        />
      </div>
      {imgUrls.length ? imgUrls.map((url, idx) => <img key={idx} src={url} alt="test" />) : ''}
      <div className="txt-editor">
        <button type="submit" className="form-send-btn" onClick={onClick}>
          Send
        </button>
        <button type="button" className="editor-footer-tool" onClick={toggleFooter}>
          <span className="editor-icon">
            <i className="fa-solid fa-a"></i>
          </span>
        </button>
        <footer className={`form-actions ${footerVisible ? 'visible' : ''}`}>
          <div className="additional-controls">
            {/* Text color input */}
            <div className="color-picker">
              <label htmlFor="color" className="add-mail-color-label">
                <span className="add-mail-color-label-icon">
                  <i className="fa-solid fa-fill-drip"></i>
                </span>
              </label>
              <input
                type="color"
                id="color"
                value={textColor}
                onChange={(e) => onChangeStyle('textColor', e.target.value)}
              />
            </div>

            {/* Font Family Selector */}
            <FontSelector onChangeFontFamily={(value) => onChangeStyle('fontFamily', value)} />

            {/* Font Size Selector */}
            <select
              value={fontSize}
              onChange={(e) => onChangeStyle('fontSize', parseInt(e.target.value))} // Ensure the value is parsed as an integer
            >
              <option value={16}>Small</option>
              <option value={20}>Medium</option>
              <option value={24}>Large</option>
            </select>
            <div className="txt-editor-action-btn-container">
              {/* Font Style Buttons */}
              <button type="button" onClick={toggleBold} style={{fontWeight: isBold ? 'bold' : 'normal'}}>
                <span className="bold-icon">
                  <i className="fa-solid fa-bold"></i>
                </span>
              </button>
              <button type="button" onClick={toggleItalic} style={{fontStyle: isItalic ? 'italic' : 'normal'}}>
                <span className="italic-icon">
                  <i className="fa-solid fa-italic"></i>
                </span>
              </button>
              <button
                type="button"
                onClick={toggleUnderline}
                style={{textDecoration: isUnderlined ? 'underline' : 'none'}}
              >
                <span className="underline-icon">
                  <i className="fa-solid fa-underline"></i>
                </span>
              </button>
              {/* Text Alignment Buttons */}

              <button type="button" onClick={() => onChangeStyle('textAlign', 'left')}>
                <span className="txt-align-left">
                  <i className="fa-solid fa-align-left"></i>
                </span>
              </button>
              <button type="button" onClick={() => onChangeStyle('textAlign', 'center')}>
                <span className="txt-align-center">
                  <i className="fa-solid fa-align-center"></i>
                </span>
              </button>
              <button type="button" onClick={() => onChangeStyle('textAlign', 'right')}>
                <span className="txt-align-right">
                  <i className="fa-solid fa-align-right"></i>
                </span>
              </button>
              <button type="button" onClick={() => onChangeStyle('textAlign', 'justify')}>
                <span className="txt-align-justify">
                  <i className="fa-solid fa-align-justify"></i>
                </span>
              </button>
            </div>
          </div>
        </footer>
        <EmojiPicker addEmoji={addEmojiToBody} />
        <div className="upload-img-btn">
          <div className="tooltip">
            <button className="icon-button img" aria-label="Add Image">
              <i className="fa-regular fa-image"></i>
              <input
                type="file"
                className="file hidden-input"
                name="image"
                onChange={loadImageFromInput}
                accept="image/*"
              />
            </button>
            <span className="tooltip-text">Add Image</span>
          </div>
        </div>
      </div>
    </div>
  )
}
