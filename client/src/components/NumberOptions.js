import React from "react";
import '../styles/order.css'

const NumberOptions = ({ btnDsb, NmOfCfe, handleNm }) =>{
    return (
      <div className="numberOf">
        <span className="fw-bold">Select One Option</span>
        <br />
        <span>Quantity: </span>
        <div className="form-check form-check-inline radio">
          <label htmlFor="oneSelected" className="details">
            <input
              onChange={handleNm}
              type={"radio"}
              className={"form-check-input"}
              value={1}
              checked={NmOfCfe === 1}
              id={"oneSelected"}
              disabled={btnDsb}
            />
          </label>
        </div>
        <div className="form-check form-check-inline radio">
          <label htmlFor="twoSelected" className="details">
            + 2
            <input
              onChange={handleNm}
              type={"radio"}
              className={"form-check-input"}
              value={2}
              checked={NmOfCfe === 2}
              id={"twoSelected"}
              disabled={btnDsb}
            />
          </label>
        </div>
        <div className="form-check form-check-inline radio">
          <label htmlFor="threeSelected" className="details">
            + 3
            <input
              onChange={handleNm}
              type={"radio"}
              className={"form-check-input"}
              value={3}
              checked={NmOfCfe === 3}
              id={"threeSelected"}
              disabled={btnDsb}
            />
          </label>
        </div>
      </div>
    );
}

export default NumberOptions