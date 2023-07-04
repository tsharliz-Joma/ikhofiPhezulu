import React from "react";

const List = (props) => {
  const { list, onClick } = props
  return list.map((order) => (
    <div
      key={order.objectID}
      onClick={onClick}
      className="order-display-div">
      <div className="order-inner-div">
        <button className="btn fs-5 order-button">
          {order.name} - {order.coffeeSize} {order.coffeeMilk}{" "}
          {order.coffeeName}
        </button>
      </div>
    </div>
  ));
};

export default List;
