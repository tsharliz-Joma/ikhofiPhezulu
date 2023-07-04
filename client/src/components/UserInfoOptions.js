import React from "react";



const UserInfoOptions = ({ handleName, handleNumber, pN,eN }) => {
    return (
      <div>
        <div className="input-box">
          <label htmlFor="name">
            Name:
            <input
              onChange={handleName}
              value={eN}
              id="name"
              type="text"
              placeholder="Enter Your Name"
            />
          </label>
        </div>
        <div className="input-box">
          <label htmlFor="mobile">
            Mobile:
            <input
              onChange={handleNumber}
              value={pN}
              id="mobileNumber"
              type="text"
              placeholder="Enter Your Mobile Number"
            />
          </label>
        </div>
      </div>
    );
}


export default UserInfoOptions