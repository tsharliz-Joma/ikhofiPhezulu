import React from "react";
import "./List.css";

const List = (props) => {
  const { list, onClick } = props;
  return list.map((order) => (
    <>
      <div onClick={onClick} className="col-10 col-lg-4 mx-auto">
        <div className="btn btn-outline-dark py-2 my-2 fs-5 col-12">
          <div className="text-start" key={order._id}>
            {order.name}{" "}
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
