export function FontSizeButtons({onUpdateLineSize}) {
  return (
    <div>
      <button onClick={() => onUpdateLineSize(1)}>Increase Size</button>
      <button onClick={() => onUpdateLineSize(-1)}>Decrease Size</button>
    </div>
  )
}
