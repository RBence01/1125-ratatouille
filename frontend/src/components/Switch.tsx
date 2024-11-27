import "../css/Switch.css"

export default function Switch({onChange, defaultValue = false, round = false, editOn = false} : {onChange?: any, defaultValue?: boolean, round?: boolean, editOn?: boolean}) {
    return <label className="switch">
          {editOn ? <input type="checkbox" checked={defaultValue} onChange={onChange}/> : <input type="checkbox" checked={defaultValue} disabled/>}
          <span className={"slider" + (round ? " round" : "")}></span>
    </label>
}