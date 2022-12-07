import {Board} from "./board";
import {Selector} from "./selector";
import {EuiButton, EuiFlexGroup, EuiFlexItem, EuiIconTip, EuiText,} from '@elastic/eui';
import React, {useState} from 'react'
import {GameModeSel} from "./gameModeSel";

function pushOption(selectQubits, option) {
    return fetch("http://localhost:5000/" + "data?selectQubits=" + JSON.stringify(selectQubits) + "&option=" + option)
}

async function getImage(setImage) {
    let response = await fetch("http://localhost:5000/image");
    try {
        await response.json().then((res) => {
            setImage("data:image/png;base64," + res.base64)
        })
    } catch (e) {
        console.error(e)
    }
}

function reset(setQubits, setPlayer, setIsDisableDoneButt) {
    fetch("http://localhost:5000/reset");
    var temp = Array(9).fill(Array(1).fill(null))
    temp.forEach((val, index, arr) => {
        arr[index] = {clicked: false, value: "?", bgColor: "white", id: index}
    })
    setQubits(temp)
    setIsDisableDoneButt(false)
    setPlayer("Next player: X")
}

function AIMove(gameMode) {
    return fetch("http://localhost:5000/AIMove?option=" + JSON.stringify(gameMode))
}

function parseJsonData(resp, qubits, setQubits, setPlayer, setIsDisableDoneButt) {
    resp.then(res => res.json()).then(res => {
        var temp = qubits.slice()
        temp.forEach((value, index, arr) => {
            arr[index].value = res.qubits[index]
            arr[index].clicked = false
            arr[index].bgColor = "white"
        })
        setQubits(temp)
        if (res.win !== "?") {
            if (res.win !== "draw") {
                setPlayer(res.win + " win!")
                console.log(res.win + " win!")
            } else {
                setPlayer("draw! no result.")
                console.log("draw! no result.")
            }
            setIsDisableDoneButt(true)
        }
    })
}

function Game() {
    const [option, setOption] = useState(0)
    const [qubitNum, setQubitNum] = useState("1")
    const [gameMode, setGameMode] = useState(0)
    var temp = Array(9).fill(Array(1).fill(null))
    temp.forEach((val, index, arr) => {
        arr[index] = {clicked: false, value: "?", bgColor: "white", id: index}
    })
    const [qubits, setQubits] = useState(temp)
    const [image, setImage] = useState("")
    const [isDisableDoneButt, setIsDisableDoneButt] = useState(false)
    const [player, setPlayer] = useState("Next player: X")
    if (image == "") {
        // [1] is placeHolder
        parseJsonData(pushOption([1], 5), qubits, setQubits, setPlayer, setIsDisableDoneButt)
        getImage(setImage)
    }
    const [selectedCount, setSelectedCount] = useState(0)
    const onOperationChange = (op) => {
        if (op === -1) {
            setSelectedCount(0)
            var temp = qubits.slice()
            temp.forEach((value, index, arr) => {
                arr[index].clicked = false
                arr[index].bgColor = "white"
            })
            setQubits(temp)
        }
    }
    const updatePlayer = (player, setPlayer) => {
        if (player === "Next player: X") {
            setPlayer("Next player: O")
        } else {
            setPlayer("Next player: X")
        }
    }
    const onClickEach = (index) => {
        if (!qubits[index].clicked) {
            if (option === -1) {
                console.log("You should choose a operation first")
            } else if (selectedCount > qubitNum - 1) {
                console.log("You cannot choose one more qubits for this operation")
            } else if (option === 0 || option === 1 || option === 2) {
                if (qubits[index].value !== "?") {
                    console.log("You cannot choose a already determined qubit for this operation")
                } else {
                    setSelectedCount(selectedCount + 1)
                    var temp = qubits.slice()
                    temp[index].clicked = true
                    temp[index].bgColor = "coral"
                    setQubits(temp)
                }
            } else if (option === 3 || option === 4) {
                setSelectedCount(selectedCount + 1)
                var temp = qubits.slice()
                temp[index].clicked = true
                temp[index].bgColor = "coral"
                setQubits(temp)
            }

        } else {
            var temp = qubits.slice()
            temp[index].clicked = false
            temp[index].bgColor = "white"
            setQubits(temp)
            setSelectedCount(selectedCount - 1)
        }
    }
    return (
        <EuiFlexGroup direction="column">
            <EuiFlexItem style={{ "heigh": "100em" }}>
                <EuiFlexGroup>
                    <EuiFlexItem grow={false}>
                        <Board qubits={qubits} onClick={onClickEach} player={player} />
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                        <img src={image} alt="" style={{ "height": "30em" }} />
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiFlexGroup alignItems="left">
                    <EuiFlexItem grow={false}>
                        <Selector setOption={setOption} setQubitNum={setQubitNum} onChange={onOperationChange} />
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                        <EuiIconTip
                            content={"For this operation, you need to select " + qubitNum + " qubits"}
                            position="right"
                        />
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                        <EuiButton isDisabled={isDisableDoneButt} onClick={() => {
                            parseJsonData(pushOption(qubits.filter((value, index, arr) => value.clicked).map((value, index, arr) => value.id), option),
                                qubits, setQubits, setPlayer, setIsDisableDoneButt)
                            setSelectedCount(0)
                            getImage(setImage)
                            if (gameMode !== 0) {
                                parseJsonData(AIMove(gameMode), qubits, setQubits, setPlayer, setIsDisableDoneButt)
                                getImage(setImage)
                            } else {
                                updatePlayer(player, setPlayer)
                            }
                        }}>
                            Done
                        </EuiButton>
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                        <EuiButton onClick={() => {
                            reset(setQubits, setPlayer, setIsDisableDoneButt)
                            getImage(setImage)
                        }}>
                            Reset
                        </EuiButton>
                    </EuiFlexItem>
                </EuiFlexGroup>
            </EuiFlexItem>
            <EuiFlexItem>
                <EuiText>Select game mode:</EuiText>
                <GameModeSel setOption={setGameMode}/>
            </EuiFlexItem>
        </EuiFlexGroup>
    );
}
export { Game };