import React from "react";

const SugarOptions = ({ vHolder, handlerFunction }) => {
  return (
    <div className="input-box">
      <label htmlFor="coffeeSugar" className="details">
        Sugar:
        <select value={vHolder} onChange={handlerFunction}>
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
      </label>
    </div>
  );
};

export default SugarOptions;
