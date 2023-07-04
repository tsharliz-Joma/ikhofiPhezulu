import React from "react";

const SizeOptions = ({ vHolder, handlerFunction }) => {
  return (
    <div className="input-box">
      <label htmlFor="coffeeSize" className="details">
        Size:
        <select value={vHolder} onChange={handlerFunction}>
          <option value="Mug">Mug</option>
          <option value="Cup">Cup</option>
          <option value="Glass">Glass</option>
        </select>
      </label>
    </div>
  );
};

export default SizeOptions;
