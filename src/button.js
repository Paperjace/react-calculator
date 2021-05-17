import React from 'react'

function Button(props) {
    return <div className={props.className} onClick={props.onClick}>{props.buttonDisplay}</div>
}

export default Button