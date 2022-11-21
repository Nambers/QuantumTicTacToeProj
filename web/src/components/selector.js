import React, { useState } from 'react';
import { EuiComboBox } from '@elastic/eui';

function Selector(props) {
  const options = [
    {
      label: "Measure this qubit",
      id: 0,
      qubitNum: "1",
    },
    {
      label: "Apply Hadamard gate",
      id: 1,
      qubitNum: "1",
    },
    {
      label: "Apple Z gate following by Hadamard gate",
      id: 2,
      qubitNum: "1",
    },
    {
      label: "Apply a c-not gate within two qubit",
      id: 3,
      qubitNum: "2",
    },
    {
      label: "Swap these two qubit",
      id: 4,
      qubitNum: "2",
    }
  ];

  const [selectedOptions, setSelected] = useState([options[0]]);

  const onChange = (selectedOptions) => {
    // We should only get back either 0 or 1 options.
    if (selectedOptions.length === 0) {
      props.setOption(-1)
      props.setQubitNum("unknown :(")
      props.onChange(-1)
    } else {
      props.setOption(selectedOptions[0].id)
      props.setQubitNum(selectedOptions[0].qubitNum)
      props.onChange(selectedOptions[0].id)
    }
    setSelected(selectedOptions);

  };

  return (
    <EuiComboBox
      aria-label="Accessible screen reader label"
      placeholder="Select a single option"
      singleSelection={{ asPlainText: true }}
      options={options}
      selectedOptions={selectedOptions}
      onChange={onChange}
    />
  );
};
export { Selector };