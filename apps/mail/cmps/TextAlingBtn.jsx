export function TextAlignButtons({onChangeTxtAlign}) {
  return (
    <div>
      <button onClick={() => onChangeTxtAlign('left')}>Left</button>
      <button onClick={() => onChangeTxtAlign('center')}>Center</button>
      <button onClick={() => onChangeTxtAlign('right')}>Right</button>
    </div>
  )
}
