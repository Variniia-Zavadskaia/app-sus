export function FontSelector({onChangeFontFamily}) {
  const fonts = [
    'Arial',
    'Verdana',
    'Georgia',
    'Times New Roman',
    'Courier New',
    'Comic Sans MS',
    'Trebuchet MS',
    'Impact',
    'Lucida Console',
    'Tahoma',
    'Palatino Linotype',
    'Garamond',
    'Segoe UI',
  ]

  const handleFontChange = (event) => {
    const selectedFont = event.target.value
    onChangeFontFamily(selectedFont)
  }

  return (
    <select onChange={handleFontChange} className="font-selector">
      {fonts.map((font) => (
        <option key={font} value={font}>
          {font}
        </option>
      ))}
    </select>
  )
}
