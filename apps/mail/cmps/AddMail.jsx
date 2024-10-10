import {showErrorMsg, showSuccessMsg} from '../../../services/event-bus.service.js'
import {mailService} from '../services/mail.service.js'
import { EmojiPicker } from './Emoji.jsx'
import { FontSelector } from './Font.jsx'
import { FontSizeButtons } from './FontSize.jsx'
import { TextAlignButtons } from './TextAlingBtn.jsx'
const {useState} = React
const {useNavigate} = ReactRouterDOM

export function AddMail({onClose}) {
  const [mailToSave, setMailToSave] = useState(mailService.getEmptyMail())
  const [textColor, setTextColor] = useState('#000000')
  const [fontFamily, setFontFamily] = useState('Arial') // Default font
  const [fontSize, setFontSize] = useState(16) // Default font size
  const [textAlign, setTextAlign] = useState('left') // Default text alignment
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const navigate = useNavigate()

  function handleChange({target}) {
    const {name, value} = target
    setMailToSave((prevMail) => ({...prevMail, [name]: value}))
  }

  function onSaveMail(ev) {
    ev.preventDefault()
    const mailToSave = {
      id: '', // Leave ID empty for new entries
      subject: subject,
      body: body,
      isRead: false,
      sentAt: Date.now(),
      from: 'user@appsus.com', // Add the appropriate sender email
      to: 'boss@company.com', // Add the recipient email
      createdAt: Date.now(), // If you need this field
      isStared: false, // If needed
      labels: [], // Initialize labels as needed
    }

    console.log('Mail to save:', mailToSave)
    mailService
      .safeSave(mailToSave)
      .then((mail) => {
        console.log('Mail saved successfully:', mail)
        setSubject('') // Clear the input fields after save
        setBody('')
      })
      .catch((err) => {
        console.log('Error:', err)
        showErrorMsg('An unexpected error occurred: ', err.message)
      })

      .finally(() => {
        showSuccessMsg('Sent mail')
        // onClose()
      })
  }

  return (
    <section className="add-mail">
      {/* Header */}
      <header className="add-mail-header">
        <h2>New Mail</h2>
        <button className="add-mail-close-btn" onClick={() => onClose()}>
          ✖
        </button>{' '}
        {/* Close button */}
      </header>

      {/* Mail Form */}
      <form onSubmit={onSaveMail} className="add-mail-form">
        {/* To Input */}
        <div className="add-mail-form-to">
          <label htmlFor="to">
            <span className="add-mail-span-to">To</span>
          </label>
          <input
            className="add-mail-input-to"
            type="email"
            name="to"
            id="to"
            value={mailToSave.to}
            onChange={handleChange}
            required
          />
        </div>

        {/* Subject Input */}
        <div className="add-mail-form-subject">
          <label htmlFor="subject">
            <span className="add-mail-span-subject">Subject</span>
          </label>
          <input
            className="add-mail-input-subject"
            type="text"
            name="subject"
            id="subject"
            value={mailToSave.subject}
            onChange={handleChange}
          />
        </div>

        {/* Body Input */}
        <div className="add-mail-form-body">
          <label htmlFor="body"></label>
          <textarea
            name="body"
            className="add-mail-textarea"
            value={mailToSave.body}
            onChange={handleChange}
            style={{ color: textColor, fontFamily: fontFamily, fontSize: `${fontSize}px`, textAlign: textAlign }} // Styled for user input

          ></textarea>
        </div>

        {/* Footer */}
        <footer className="form-actions">
          <button type="submit" className="form-send-btn" onClick={onSaveMail}>
            Send
          </button>
          <div className="color-picker">
            
            {/* <label htmlFor="color" className="add-mail-color-label">
              <i className="fa-light fa-fill-drip"></i>
            </label>
            <input type="color" id="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} /> */}
          </div>
          <div className="additional-controls">
          {/* <FontSelector onChangeFontFamily={setFontFamily} />
          <FontSizeButtons onUpdateLineSize={(diff) => setFontSize(prevSize => prevSize + diff)} />
          <TextAlignButtons onChangeTxtAlign={setTextAlign} />
          <EmojiPicker addEmoji={(emoji) => setBody(prevBody => prevBody + emoji)} /> */}
        </div>
          
          
        </footer>
      </form>
    </section>
  )
}
