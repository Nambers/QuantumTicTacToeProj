import React, {useState} from 'react';
import {EuiComboBox} from '@elastic/eui';

function GameModeSel(props) {
    const options = [
        {
            label: "With human",
            id: 0
        },
        {
            label: "With simple AI",
            id: 1
        },
        {
            label: "With normal AI",
            id: 2
        }
    ];

    const [selectedOptions, setSelected] = useState([options[0]]);

    const onChange = (selectedOptions) => {
        // We should only get back either 0 or 1 options.
        if (selectedOptions.length === 0) {
            props.setOption(-1)
        } else {
            props.setOption(selectedOptions[0].id)
        }
        setSelected(selectedOptions);
    };

    return (
        <EuiComboBox
            aria-label="Accessible screen reader label"
            placeholder="Select a game mode"
            singleSelection={{asPlainText: true}}
            options={options}
            selectedOptions={selectedOptions}
            onChange={onChange}
        />
    );
};
export {GameModeSel};