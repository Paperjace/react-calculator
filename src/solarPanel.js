import React from 'react'

function SolarPanel(props) {
    return <div className="solarPanel" onMouseOver={props.onMouseOver} onMouseLeave={props.onMouseLeave}></div>
}

export default SolarPanel