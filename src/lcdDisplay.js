import React from 'react'

function LCDDisplay(props) {
    return <div className="lcdDisplay">
      <div className={props.solarClass}>{props.display}</div>
      </div>
}

export default LCDDisplay