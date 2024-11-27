import "../css/Switch.css"

export default function Switch({onClick, round = false} : {onClick?: any, round?: boolean}) {
    return <label className="switch">
          <input type="checkbox"/>
          <span className={"slider" + (round ? " round" : "")}></span>
    </label>
}