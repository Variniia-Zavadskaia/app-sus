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
  return (
    <select onChange={(e) => onChangeFontFamily(e.target.value)}>
      {fonts.map((font) => (
        <option key={font} value={font}>
          {font}
        </option>
      ))}
    </select>
  )
}
