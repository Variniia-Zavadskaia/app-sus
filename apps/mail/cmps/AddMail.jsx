import {showErrorMsg, showSuccessMsg} from '../../../services/event-bus.service.js'
import {mailService} from '../services/mail.service.js'
import {TxtEditor} from './TxtEditor.jsx'

const {useState, useEffect} = React

export function AddMail({onClose, onMailAdded, data}) {
  const [mailToSave, setMailToSave] = useState(mailService.getEmptyMail())
  const [textColor, setTextColor] = useState('#000000') //DEfault color txt
  const [fontFamily, setFontFamily] = useState('Arial') // Default font
  const [fontSize, setFontSize] = useState(16) // Default font size
  const [textAlign, setTextAlign] = useState('left') // Default text alignment
   
  // const location = useLocation()
  useEffect(() => {
    // inside state: title and body of new mail from note 
    console.log('mail from note', data)
    if(data){
      setMailToSave({...mailToSave, subject: data.title, body: data.body})
    }
  }, [])

    useEffect(() => {
    if (initialBody) {
      setMailToSave((prevMail) => ({ ...prevMail, body: initialBody })); // Set initial body text
    }
  }, [initialBody])

  function handleChange({target}) {
    const {name, value} = target
    setMailToSave((prevMail) => ({...prevMail, [name]: value}))
  }

  function onSaveMail(ev) {
    ev.preventDefault()
    const newMail = {
      ...mailToSave,
      id: '',
      sentAt: Date.now(),
      createdAt: Date.now(),
      from: 'user@appsus.com',
      isStared: false,
    }

    mailService
      .safeSave(newMail)
      .then((savedMail) => {
        console.log('Mail saved successfully:', savedMail)
        setMailToSave(mailService.getEmptyMail())
        showSuccessMsg('Sent mail')
        onMailAdded(savedMail)
        onClose()
      })
      .catch((err) => {
        console.error('Error:', err)
        showErrorMsg('An unexpected error occurred: ', err.message)
      })
      .finally(() => {
        showSuccessMsg('Sent mail')
        onClose()
      })
  }

  function handleStyleChange(style, value) {
    switch (style) {
      case 'textColor':
        setTextColor(value)
        break
      case 'fontFamily':
        setFontFamily(value)
        break
      case 'fontSize':
        setFontSize(value)
        break
      case 'textAlign':
        setTextAlign(value)
        break
      default:
        break
    }
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
            autoComplete="off"
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
            autoComplete="off"
          />
        </div>

       
        <TxtEditor
          textColor={textColor}
          fontFamily={fontFamily}
          fontSize={fontSize}
          textAlign={textAlign}
          body={mailToSave.body}
          onChange={(value) => setMailToSave((prev) => ({...prev, body: value}))}
          onChangeStyle={handleStyleChange}
          onClick={onSaveMail}
        />
      </form>
    </section>
  )
}
