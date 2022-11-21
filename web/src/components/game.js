import { Board } from "./board";
import { Selector } from "./selector";
import {
    EuiFlexGroup,
    EuiFlexItem,
    EuiIconTip,
    EuiButton,
} from '@elastic/eui';
import React, { useState } from 'react'

async function pushOption(selectQubits, option, setQubits, setImage) {
    let response = await fetch("http://localhost:5000/" + "data?selectQubits=" + JSON.stringify(selectQubits) + "&option=" + option);
    try {
        await response.json().then((res) => {
            console.log(res)
            setQubits(res.qubits)
            setImage("data:image/png;base64," + res.base64)
        })
    } catch (e) {
        console.error(e)
    }
}
function Game() {
    const [option, setOption] = useState(0)
    const [qubitNum, setQubitNum] = useState("1")
    const [qubits, setQubits] = useState(Array(9).fill("?"))
    const [image, setImage] = useState("data:image/png;base64,")
    const [player, setPlayer] = useState("X")
    const [clickedQubits, setClickedQubits] = useState([])
    const onClickEach = (index, clicked, setClicked) => {
        if (clicked) {
            if (option == 0 || option == 1 || option == 2) {
                // measure || H || zh
                if (qubits[index] != "?" || clickedQubits.length > 1) {
                    // problem
                    console.log("err")
                    setClicked(false)
                } else {
                    clickedQubits.push(index)
                }
            } else if (option == 3 || option == 4) {
                if (clickedQubits.length > 2) {
                    console.log("err")
                    setClicked(false)
                } else {
                    clickedQubits.push(index)
                }
            }
        } else {
            setClickedQubits(clickedQubits.filter(function (value, index, arr) {
                return value != index;
            }))
        }
    }
    return (
        <EuiFlexGroup direction="column">
            <EuiFlexItem>
                <EuiFlexGroup>
                    <EuiFlexItem>
                        <Board qubits={qubits} onClick={onClickEach} player={player} />
                    </EuiFlexItem>
                    <EuiFlexItem>
                        <img src={image} />
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiFlexGroup alignItems="left">
                    <EuiFlexItem grow={false}>
                        <Selector setOption={setOption} setQubitNum={setQubitNum} />
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                        <EuiIconTip
                            content={"For this operation, you need to select " + qubitNum + " qubits"}
                            position="right"
                        />
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                        <EuiButton onClick={() => {
                            pushOption([0], option, setQubits, setImage)
                            if (player == "X") {
                                setPlayer("O")
                            } else {
                                setPlayer("X")
                            }
                        }}>
                            Done
                        </EuiButton>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiFlexItem>
        </EuiFlexGroup>
    );
}
export { Game };