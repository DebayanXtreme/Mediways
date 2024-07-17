import React from "react";

const RadioButtons = () => {
  const [selectedValue, setSelectedValue] = React.useState("option1");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div>
      <input
        type="radio"
        name="radio-buttons"
        value="option1"
        checked={selectedValue === "option1"}
        onChange={handleChange}
      />
      <label htmlFor="option1">Option 1</label>
      <input
        type="radio"
        name="radio-buttons"
        value="option2"
        checked={selectedValue === "option2"}
        onChange={handleChange}
      />
      <label htmlFor="option2">Option 2</label>
    </div>
  );
};

export default RadioButtons;