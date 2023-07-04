import React from "react";

const MilkOptions = ({ vHolder, handlerFunction }) => {
  return (
    <div className="input-box">
      <label htmlFor="coffeeMilk" className="details">
        Milk of Choice:
        <select value={vHolder} onChange={handlerFunction}>
          <option value="Full Cream">Full Cream</option>
          <option value="Skim Milk">Skim Milk</option>
          <option value="Soy Milk">Soy Milk</option>
          <option value="Almond Milk">Almond Milk</option>
          <option value="Oat Milk">Oat Milk</option>
        </select>
      </label>
    </div>
  );
};

export default MilkOptions;
