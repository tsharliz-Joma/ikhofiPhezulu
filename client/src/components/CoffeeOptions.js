import React from "react";


const CoffeeOptions = ({ vHolder , handlerFunction }) => {
    return (
      <div className="input-box">
        <label htmlFor="coffeeName" className="details">
          Coffee:
          <select value={vHolder} onChange={handlerFunction}>
            <option value={"Latte"}>Latte</option>
            <option>Flat White</option>
            <option>Cappuccino</option>
            <option>Long Black</option>
            <option>Short Macchiato</option>
            <option>Long Macchiato</option>
            <option>Espresso</option>
            <option>Double Espresso</option>
          </select>
        </label>
      </div>
    );
}


export default CoffeeOptions
