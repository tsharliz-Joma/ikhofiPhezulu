import React from "react";
import { Link } from "react-router-dom";
import OrderForm from "../components/OrderForm/OrderForm";


// const backEndUrl = "http://localhost:1969/api/coffee";
// const SERVERURL = "http://localhost:1969";
// const socket = io.connect("http://localhost:1969/");

const Order = ({ socket }) => {

  // const navigate = useNavigate();

 
  // const handleNm = (e) => {
  //   setNumberOfCoffee(e.target.value);
  //   setButtonDisabled(true)
  //   if(e.target.style.backgroundColor === "black"){
  //     e.target.style.backgroundColor = "white";
  //   } else {
  //     e.target.style.backgroundColor = "black";
  //   }
  // };


  //=================VERIFY USER LOGGED IN=======================//
  // const updateUserName = async () => {
  //   const req = await axios.get("http://localhost:1969/api/user-data", {
  //     headers: {
  //       "x-access-token": localStorage.getItem("token"),
  //     },
  //   });
  //   const data = req;
  //   if (data.status === 200) {
  //     setEmployeeName(data);
  //     // console.log(data)
  //   } else {
  //     alert(data.error);
  //   }
  // };



  //=============================================================//

  return (
    <div>
      <div className="form-body">
        <div className="form-container">
          <OrderForm socket={socket} />
        </div>
        {/* <button className="btn btn-outline-secondary">Previous Orders</button> */}
      </div>
    </div>
  );
};

export default Order;
