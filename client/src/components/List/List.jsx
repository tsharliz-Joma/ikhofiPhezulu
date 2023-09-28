import React from "react";
import './List.css'

const List = (props) => {
  const { list, onClick } = props
  return list.map((order) => (
    <>
      <div key={order._id} onClick={onClick} className="list_container">
        <div className="list_inner_container">
          <div className="btn fs-5 list_button">
            {order.name}{" "}{order.coffeeSize}{" "}
            {order.coffeeName}{" "}
            {order.coffeeMilk}{" "}
            {order.number}
          </div>
        </div>
      </div>
    </>
  ));
};

export default List;
