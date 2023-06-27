import React from "react";

const CheckBoxes = ({ state, setState, title }) => {
  return (
    <div>
      <input
        type="checkbox"
        className="checkBoxes"
        value={state}
        onChange={setState}
      />
      <label>{title}</label>
    </div>
  );
};

export default CheckBoxes;
