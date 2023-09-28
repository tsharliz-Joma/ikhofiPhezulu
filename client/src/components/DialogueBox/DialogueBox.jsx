import React from "react";

const DialogueBox = ({cDot, onClick}) => {
  return (
    <div className="container col-12">
      <div className="mx-auto col-10 text-center">
        <div className="">
          <p className="d-inline-block border rounded bg-light p-2 fs-2 mt-5">
            {cDot}
          </p>
        </div>
        <button onClick={onClick} className="btn btn-dark btn-lg">
          Back
        </button>
        <button onClick={onClick} className="btn btn-dark btn-lg">
          Coffee Up
        </button>
      </div>
    </div>
  );
};

export default DialogueBox;
