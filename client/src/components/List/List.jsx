import React from "react";
import "./List.css";

const List = (props) => {
  const { list, onClick } = props;
  return list.map((order) => (
    <>
      <div key={order._id} onClick={onClick} className="">
        <div className="btn btn-outline-dark py-2 my-2 fs-5 col-10">
          <div className="text-start">
            {order.name} <br />
            {order.coffeeSize} {order.coffeeName}
            <br />
            {order.coffeeMilk} {order.number}
          </div>
        </div>
      </div>
    </>
  ));
};

export default List;
