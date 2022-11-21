import React from 'react';
function Square(props) {
    return (
        <button className="square" onClick={() => props.clickFunc(props.index)} style={{ backgroundColor: props.value.bgColor }}>
            {props.value.value}
        </button>
    )
}
export { Square }