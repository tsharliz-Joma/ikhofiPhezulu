import React from "react";
import './List.css'

const List = (props) => {
  const { list, onClick } = props
  return list.map((order) => (
    <div key={order.objectID} onClick={onClick} className="list_container">
      <div className="list_inner_container">
        <div className="btn fs-5 list_button">
          <span>{order.name}</span>
          <br></br>
          <span>{order.coffeeSize}</span>&nbsp;
          {order.coffeeMilk}
          {order.coffeeName}
        </div>
      </div>
    </div>
  ));
};

export default List;
