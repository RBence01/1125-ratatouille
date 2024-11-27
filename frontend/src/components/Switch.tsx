import "../css/Switch.css"

export default function Switch({onChange = null, defaultValue = false, round = false, editOn = true} : {onChange?: any, defaultValue?: boolean, round?: boolean, editOn?: boolean}) {
    return <label className="switch">
          {editOn ? <input type="checkbox" defaultChecked={defaultValue} onChange={onChange}/> : <input type="checkbox" checked={defaultValue} disabled/>}
          <span className={"slider" + (round ? " round" : "")}></span>
    </label>
}