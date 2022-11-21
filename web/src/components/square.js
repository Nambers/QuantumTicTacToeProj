import React, { useState } from 'react';
function Square(props) {
    const [style, setStyle] = useState({ backgroundColor: "white" })
    const [clicked, setClicked] = useState(true)
    const onClick = (clicked, setClicked, setStyle) => {
        setClicked(clicked !== true)
        if (clicked) {
            setStyle({ backgroundColor: "coral" })
        } else {
            setStyle({ backgroundColor: "white" })
        }
        props.clickFunc(props.index, clicked, setClicked)
    }
    return (
        <button className="square" onClick={() => onClick(clicked, setClicked, setStyle)} style={style}>
            {props.value}
        </button>
    )
}
export { Square }